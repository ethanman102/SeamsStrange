from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from .serializers import UserSerializer
from .models import User


# Create your views here.
class LoginView(APIView):
    def post(self,request):
        email = request.data.get('email')
        password = request.data.get('password')

        if email is None or password is None:
            raise ValidationError('Email and Username are required')
        
        serializer = UserSerializer(data=request.data, partial=True)
        if not serializer.is_valid():
            raise AuthenticationFailed('Email / Password format Invalid')
        
        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('No User exists')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Password is Incorrect')
        
        return Response({'Login Successful'},status=200)
        



        
