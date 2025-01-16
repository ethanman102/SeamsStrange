from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import ItemSerializer
from ..models import Item
from ..authenticate import JWTCookieAuthentication
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.shortcuts import get_object_or_404
import boto3
from django.conf import settings

RECOMMEND_NUM = 3 

class ItemViewSet(viewsets.ModelViewSet):

    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    http_method_names = ['get','post','delete','put']
    authentication_classes = [JWTCookieAuthentication]
    
    
    def get_permissions(self):
        if self.action in ['destroy','update','create']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]
    
    # https://stackoverflow.com/questions/59720294/override-permission-and-authentication-classes-in-viewset-list-method``
    def get_authenticators(self):
        authentication_classes = [JWTCookieAuthentication]
        print('running')

        action_map = {key.lower(): value for key,
                      value in self.action_map.items()}
        action_name = action_map.get(self.request.method.lower())
        if action_name in ['destroy','create','update']:
            return [auth() for auth in authentication_classes]

        return []      
    
    
 

    def create(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        item = serializer.save()
        headers = self.get_success_headers(serializer.data)

        
        # include the id field
        serializer.data['id'] = item.id
        return Response(serializer.data,status=status.HTTP_201_CREATED,headers=headers)
    
    def destroy(self, request, *args, **kwargs):
        item = self.get_object()
        images = item.images.all()
        client = boto3.client(service_name='s3',
                              region_name=settings.AWS_REGION,
                              aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        
        for image in images:
            # remove all images from the database
            client.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,Key=image.url)

        # images will cascade
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def update(self, request, *args, **kwargs):
        item = self.get_object()
        serializer = self.get_serializer(instance=item,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        # include the id field
        serializer.data['id'] = item.id
        return Response(serializer.data,status=status.HTTP_200_OK,headers=headers)
    
    def list(self, request, *args, **kwargs):

        page = request.GET.get('page',1)
        size = request.GET.get('size',20)

        tag_names = request.GET.getlist('tag')
        
        # ENSURE provided size is actually an integer type.
        try:
            size = int(size)
        except ValueError:
            size = 20

        items = self.get_queryset()

        # query params will be sent with 'tag' key and items must match ALL tag names.
        for tag in tag_names:
            items = items.filter(tags__name__iexact=tag)

        # paginate the results.
        paginator = Paginator(items,size)
        try:
            items = paginator.page(page)
        except PageNotAnInteger:
            items = paginator.page(1)
        except EmptyPage:
            items = paginator.page(paginator.num_pages) # return the last page of results.

        serializer = self.get_serializer(items,many=True)
        headers = self.get_success_headers(serializer.data)
        response_data = {
            'items':serializer.data,
            'total_pages':paginator.num_pages if len(items) != 0 else 0
        }
        return Response(response_data,status=status.HTTP_200_OK,headers=headers)
    
    def retrieve(self, request, *args, **kwargs):
        item = self.get_object()
        serializer = self.get_serializer(item)
        headers = self.get_success_headers(serializer.data)
        serializer.data['id'] = item.id
        return Response(serializer.data,status=status.HTTP_200_OK,headers=headers)
        

class ItemRecommendationView(APIView):
    '''
     Recommendation get endpoint for items. It grabs RECCOMENDED_NUM amount of items based on items thatr have one of the similar tags. If no tags are similar or the # of
     items is less than RECOMMEND_NUM then populate with the most recently created items not already in the list.
    '''
    def get(self,request,id):
        item = get_object_or_404(Item,id=id)

        # if the item has no tags then just return the first 3 objects.
        if item.tags.count() == 0:
            items = Item.objects.all().exclude(id=id)[:RECOMMEND_NUM]
            return Response({"items": ItemSerializer(items,many=True).data},status=status.HTTP_200_OK)
        
        tag_array = [tag.name for tag in item.tags.all()]
        items = Item.objects.filter(tags__name__in=tag_array).exclude(id=id).distinct()[:RECOMMEND_NUM]
        item_count = items.count()
        if item_count < RECOMMEND_NUM:
            remaining = RECOMMEND_NUM - item_count
            # get the required items to not query again, we do not want items repeating or the item viewing to be shown twice.
            excluded_ids = [id]
            for queried_item in items:
                excluded_ids.append(queried_item.id)
            
            # perform one last query to get the remaining items as most recently created items.
            remaining_items = Item.objects.all().exclude(id__in=excluded_ids)[:remaining]
            completed_recommendations = remaining_items | items
            return Response({"items" : ItemSerializer(completed_recommendations,many=True).data},status=status.HTTP_200_OK)

        # else the case when the first query (atleast RECOMMEND_NUM amount of item with similar tags) are found
        return Response({"items": ItemSerializer(items,many=True).data},status=status.HTTP_200_OK)     

