from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import boto3
from uuid import uuid4
from django.shortcuts import get_object_or_404
from ..models import Item,Image
from ..authenticate import JWTCookieAuthentication
from rest_framework.permissions import IsAuthenticated

class ImageView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes=[JWTCookieAuthentication]
    def post(self,request):
        try:
            item_id = request.data.get('item')
        except:
            return Response({'error' : 'Please provide an item id'},status=status.HTTP_400_BAD_REQUEST)

        item = get_object_or_404(Item,id=item_id)

        images = request.FILES.getlist('images')

        client = boto3.client(service_name='s3',
                              region_name=settings.AWS_REGION,
                              aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        
        for image in images:
            uuid = uuid4()
            file_name = image.name + str(uuid)
            client.upload_fileobj(image,settings.AWS_STORAGE_BUCKET_NAME,file_name)
            image_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/{file_name}"
            Image.objects.create(item=item,url=image_url)


        return Response({'success':'yay'})
    
    def delete(self,request,id):
        img_id = self.kwargs.get('id')
        image = get_object_or_404(Image,id=img_id)
        client = boto3.client(service_name='s3',
                              region_name=settings.AWS_REGION,
                              aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        
        client.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,Key=image.url)
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


