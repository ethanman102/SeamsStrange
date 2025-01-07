from rest_framework import viewsets, status
from rest_framework.response import Response
from ..serializers import TagSerializer
from ..models import Tag
from ..authenticate import JWTCookieAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny


class TagViewSet(viewsets.ModelViewSet):

    serializer_class = TagSerializer
    queryset = Tag.objects.all()
    http_method_names = ['get','post','delete','put']
    authentication_classes = [JWTCookieAuthentication]
    
    
    def get_permissions(self):
        if self.action in ['destroy','update','create','retrieve']:
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
        if action_name in ['destroy','create','update','retrieve']:
            return [auth() for auth in authentication_classes]

        return []  
    
    def create(self,request,*args,**kwargs):
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tag = serializer.save()
        headers = self.get_success_headers(serializer.data)
        
        # include the id field
        serializer.data['id'] = tag.id
        return Response(serializer.data,status=status.HTTP_201_CREATED,headers=headers)
    
    def destroy(self, request, *args, **kwargs):
        tag = self.get_object()
        tag.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def update(self, request, *args, **kwargs):
        tag = self.get_object()
        serializer = self.get_serializer(instance=tag,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        # include the id field
        serializer.data['id'] = tag.id
        return Response(serializer.data,status=status.HTTP_200_OK,headers=headers)
    
    def list(self, request, *args, **kwargs):
        
        tags = self.get_queryset()

        serializer = self.get_serializer(tags,many=True)
        headers = self.get_success_headers(serializer.data)
        response_data = {
            'tags':serializer.data,
        }
        return Response(response_data,status=status.HTTP_200_OK,headers=headers)
        