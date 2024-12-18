from rest_framework import viewsets, status
from rest_framework.response import Response
from ..serializers import ItemSerializer
from ..models import Item
from ..authenticate import JWTCookieAuthentication
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated,AllowAny





# Already handles getting with the retrieve method for the api!
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
            items = items.filter(tags__name__icontains=tag)

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
        

    

