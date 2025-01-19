from rest_framework import status
from rest_framework.response import Response
from ..authenticate import JWTCookieAuthentication
from rest_framework.permissions import IsAuthenticated
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
        social_type = request.data.get('type','').upper()
        if social_type not in SOCIAL_TYPES:
            return Response({'error':'non-supported media link'},status=status.HTTP_400_BAD_REQUEST)
        
        validator = URLValidator()
        link = request.data.get('link')
        try:
            validator(link)
        except ValidationError as e:
            return Response({'error':e},status=status.HTTP_400_BAD_REQUEST)
        
        parsed_url = urlparse(link)
        host = parsed_url.hostname

        if host not in SOCIAL_HOSTS:
            return Response({'error':'invalid social url'},status=status.HTTP_400_BAD_REQUEST)
        
        social = Social.objects.filter(type=social_type).first()

        if social_type:
            social.link = link
            social.save()
        else:
            Social.objects.create(type=social_type,link=link)
        
        return Response({'success':'Social Updated'},status=status.HTTP_200_OK)

        
