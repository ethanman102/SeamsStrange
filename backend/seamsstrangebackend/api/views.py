
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
    '''
    Function: get_csrf_token(request)
    Args: request: a request object to extract the csrf token from or generate for the new user
    Returns: a valid csrf token or the set csrf token already.
    '''
    csrftoken = csrf.get_token(request)
    return csrftoken

# Create your views here.
class LoginView(TokenObtainPairView):
    '''
    LoginView: Inherits from TokenObtainPairView to ensure we can store the jwt access and refresh tokens in http only cookies instead
    of simply being forced to store them in the session of the browser // local storage.
    Allows for added website security.
    '''
    def post(self, request, *args, **kwargs):
        '''
        Method: post(self, request, *args, **kwargs)
        Purpose: accept a valid email and password field in the request object from the frontend. 
        Checks to see if the user actually exists and the correct credentials were provided. If so sets a csrf token in a non httponly cookie,
        and jwt access and refresh tokens in httponly cookies
        '''

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
            secure=settings.PRODUCTION_MODE,
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        response.set_cookie(
            key='refresh',
            value=refresh_token,
            httponly=True,
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.PRODUCTION_MODE,
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        # ensure the using logging in gets a valid csrf token for usage in state changing requests.
        csrftoken = get_csrf_token(request)
        response.set_cookie('csrftoken',
                            csrftoken,
                            secure=settings.PRODUCTION_MODE,
                            samesite='Lax',
                            httponly=False)

        response.data['success'] = 'Logged in user'
        return response

class LogoutView(APIView):
    '''
    LogoutView: Inherits from APIView
    Purpose: To log out a user and delete their http only cookies storing the access and refresh jwt token pairs
    '''
    def post(self, request):
        '''
        Method: post(self,request)
        Purpose: log out user and delete their cookies.
        Args: request: request object containing the cookies to be removed theoretically
        '''
        response = Response()
        refresh = request.COOKIES.get('refresh',None)
        # blacklist the token for extra security to ensure a logged out token can not be used under its expiry.
        if refresh:
            try:
                token = RefreshToken(refresh)
                token.blacklist()
            except InvalidToken:
                pass
        # delete jwt http only cookies.
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        response.data = {"Success" : "logged out user"}
        return response
    

class HttpCookieRefreshView(TokenRefreshView):
    '''
    HttpCookieRefreshView: Inherits from TokenRefreshView
    Purpose: to generate a new access token based on a refresh token stored in an httponly cookie.
    Restores the new access token in the http only cookie if successful.
    '''
    def post(self, request, *args, **kwargs):
        '''
        Method: post(self, request, *args, **kwargs)
        Purpose: to use the refresh token when the access token in jwt auth expired. Both tokens stored in http only cookies
        Override allows to use the cookie system for added security.
        Args: request: the request object theoretically containing the access and refresh cookies.
        '''

        # ensure refresh token validity.
        refresh = request.COOKIES.get('refresh', None)
        if refresh is None:
            raise ValidationError('No token provided')
        
        serializer = self.get_serializer(data={'refresh':refresh})
        if not serializer.is_valid():
            raise ValidationError('Refresh token is not valid')
        
        # remove the access token from the response itself and store it in the http only cookie rewriting the previous.
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

        # ensure a CSRF token is set and that it is NOT HTTPONLY so that JS on frontend can access.
        csrftoken = get_csrf_token(request)
        response.set_cookie('csrftoken',
                            csrftoken,
                            secure=settings.PRODUCTION_MODE,
                            samesite='Lax',
                            httponly=False)

        response.data = {'Success': 'New access token obtained'}
        return response

        








        
