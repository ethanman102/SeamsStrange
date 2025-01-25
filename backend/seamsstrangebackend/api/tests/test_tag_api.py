from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from ..models import User
from ..authenticate import JWTCookieAuthentication
from rest_framework_simplejwt.tokens import AccessToken
from http.cookies import SimpleCookie
from django.http import HttpRequest
