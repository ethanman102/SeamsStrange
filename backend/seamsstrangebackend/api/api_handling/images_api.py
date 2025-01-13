from django.core.mail import EmailMultiAlternatives, BadHeaderError
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import requests
import json

'''
Create an email with a text format and an html format for contacting the seams strange account for item/product inquries
'''
class ImageView(APIView):
    def post(self,request):
        print(len(request.FILES.getlist('images')))
