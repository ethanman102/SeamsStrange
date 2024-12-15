from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import 

# Create your views here.
class LoginView(APIView):
    def post(self,request):