from rest_framework import viewsets, status
from rest_framework.response import Response
from ..serializers import TagSerializer
from ..models import Tag
from ..authenticate import JWTCookieAuthentication
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated,AllowAny


class TagViewSet(viewsets.ModelViewSet):
    
