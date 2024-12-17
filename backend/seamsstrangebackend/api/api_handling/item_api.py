from rest_framework import viewsets, status
from rest_framework.response import Response
from ..serializers import ItemSerializer
from ..models import Item




class ItemViewSet(viewsets.ModelViewSet):

    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    http_method_names = ['get','post','delete','put']

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
    

