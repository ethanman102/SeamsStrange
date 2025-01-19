from rest_framework import status
from rest_framework.response import Response
from ..authenticate import JWTCookieAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from urllib.parse import urlparse
from ..models import Social

SOCIAL_TYPES = ['INSTAGRAM','ETSY','FACEBOOK']
SOCIAL_HOSTS = ['www.instagram.com','www.facebook.com','www.etsy.com']


class SocialView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTCookieAuthentication]

    def post(self,request,*args,**kwargs):
        socials = request.data
        for social_type in socials:
            if social_type.upper() not in SOCIAL_TYPES:
                print(socials)
                return Response({'error':'non-supported media link'},status=status.HTTP_400_BAD_REQUEST)
        
        validator = URLValidator()
        for social_type in socials:
            link = request.data[social_type]
            if link == '' or link == None:
                social_to_remove = Social.objects.filter(type=social_type.upper()).first()
                if social_to_remove:
                    social_to_remove.link = ''
                    social_to_remove.save()
                continue
            try:
                validator(link)
            except ValidationError as e:
                return Response({'error':e},status=status.HTTP_400_BAD_REQUEST)
            
            parsed_url = urlparse(link)
            host = parsed_url.hostname

            if host not in SOCIAL_HOSTS:
                return Response({'error':'invalid social url'},status=status.HTTP_400_BAD_REQUEST)
            
            social = Social.objects.filter(type=social_type.upper()).first()

            if social:
                social.link = link
                social.save()
            else:
                Social.objects.create(type=social_type.upper(),link=link)
            
        return Response({'success':'Socials Updated'},status=status.HTTP_200_OK)
    
class SocialGetView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self,request,*args,**kwargs):
        socials = Social.objects.all()
        data = {}
        for social in socials:
            data[social.type] = social.link
        return Response(data,status=status.HTTP_200_OK)


        
