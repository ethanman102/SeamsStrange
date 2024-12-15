from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from django.conf import settings

# Create your views here.
class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):

        # get the email and password fields set within the request.
        email = request.data.get('email')
        password = request.data.get('password')

        if email is None or password is None:
            raise ValidationError('Please provide both an Email and Password')
        
        user = authenticate(username=email,password=password)
        if user is None:
            raise AuthenticationFailed('User does not exist to login')
        
        # case where we can now log in the user and such provide the access and refresh tokens.
        response = super().post(request, *args, **kwargs)
        access_token = response.data['access']
        refresh_token = response.data['refresh']

        response = Response()

        # set the access and refresh cookies
        response.set_cookie(
            key='access',
            value=access_token,
            httponly=True,
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.PRODUCTION_MODE
        )

        response.set_cookie(
            key='refresh',
            value=refresh_token,
            httponly=True,
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.PRODUCTION_MODE
        )

        response.data = {"Success": "logged in User"}
        return response








        
