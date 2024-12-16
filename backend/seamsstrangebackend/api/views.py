
from django.middleware import csrf
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings


def get_csrf_token(request):
    csrftoken = csrf.get_token(request)
    return csrftoken

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

        # remove the tokens from the response because we want to ensure only gets sent in the cookies
        response.data.pop('refresh',None)
        response.data.pop('access',None)
        
        # set the access and refresh cookies
        response.set_cookie(
            key='access',
            value=access_token,
            httponly=True,
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.PRODUCTION_MODE
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        response.set_cookie(
            key='refresh',
            value=refresh_token,
            httponly=True,
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.PRODUCTION_MODE
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        csrftoken = get_csrf_token(request)
        response.set_cookie('csrftoken',
                            csrftoken,
                            secure=settings.PRODUCTION_MODE,
                            samesite='Lax',
                            httponly=False)

        response.data['success'] = 'Logged in user'
        return response

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        refresh = request.COOKIES.get('refresh',None)
        if refresh:
            try:
                token = RefreshToken(refresh)
                token.blacklist()
            except InvalidToken:
                pass
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        response.data = {"Success" : "logged out user"}
        return response
    

class HttpCookieRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh = request.COOKIES.get('refresh', None)
        if refresh is None:
            raise ValidationError('No token provided')
        
        serializer = self.get_serializer(data={'refresh':refresh})
        if not serializer.is_valid():
            raise ValidationError('Refresh token is not valid')
        
        access = serializer.validated_data.pop('access')
        response = Response()
        response.set_cookie(
            key='access',
            value=access,
            httponly=True,
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.PRODUCTION_MODE,
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        csrftoken = get_csrf_token(request)
        response.set_cookie('csrftoken',
                            csrftoken,
                            secure=settings.PRODUCTION_MODE,
                            samesite='Lax',
                            httponly=False)

        response.data = {'Success': 'New access token obtained'}
        return response

        








        
