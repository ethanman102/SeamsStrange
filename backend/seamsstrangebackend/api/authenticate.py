from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import CSRFCheck
from rest_framework import exceptions

# https://www.procoding.org/jwt-token-as-httponly-cookie-in-django
# The above resource was utilized to learn how to authenticate using the inherited properties of JWTauth for httponly cookies
# It also takes their code, enforce_csrf to ensure that a csrf token is present
def enforce_csrf(request):
    check = CSRFCheck(request)
    check.process_request(request)
    reason = check.process_view(request, None, (), {})
    if reason:
        raise exceptions.PermissionDenied('CSRF Failed: %s' % reason)

class JWTCookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_cookie = request.COOKIES.get('access',None)
        if access_cookie is None:
            return None
        
        validated_token = self.get_validated_token(access_cookie)
        enforce_csrf(request)
        return self.get_user(validated_token), validated_token
    