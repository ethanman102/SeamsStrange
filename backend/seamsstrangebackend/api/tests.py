from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import User
from rest_framework_simplejwt.tokens import AccessToken
from http.cookies import SimpleCookie
from rest_framework_simplejwt.exceptions import TokenError

# Create your tests here.
class JWTAuthTestCases(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.user = User.objects.create_user(email='ethankeys@ualberta.ca',
                                        name='Ethan',
                                        password='abc123!!',
                                        username='ethanman102')
        
    def test_valid_login(self):
        response = self.client.post(reverse('api:login'),{
            'email':'ethankeys@ualberta.ca',
            'password':'abc123!!'
        })

        self.assertEqual(response.status_code,200)
        # Morsel obj, first split gets the access=token; second split gets token; last slice gets token (no ;)
        access = str(self.client.cookies.get('access')).split()[1].split('=')[1][:-1]
        refresh = str(self.client.cookies.get('refresh')).split()[1].split('=')[1][:-1]

        self.assertNotEqual(refresh,access)
        self.assertNotEqual(access,None)
        self.assertNotEqual(refresh,None)
        self.assertEqual(response.status_code,200)

        # ensure the correct user with the access token was given!
        # https://stackoverflow.com/questions/63046840/getting-user-details-from-access-token-in-django-rest-framework-simple-jwt
        # Solution to get user from the access token by: quine9997 on Oct 22 2021
        access_token = AccessToken(access)
        
        user_id = access_token.get('user_id')

        self.assertNotEqual(user_id,None)

        user = User.objects.filter(id=user_id).first()
        self.assertNotEqual(user,None)

        self.assertEqual(user,self.user)
    
    def test_invalid_login_credentials(self):
        response = self.client.post(reverse('api:login'),{
            'email':'seamsstrange@ualberta.ca',
            'password':'abc123!!'
        })

        self.assertEqual(response.status_code,404)

    def test_missing_login_credentials(self):
        # missing email
        response = self.client.post(reverse('api:login'),{
            'password':'abc123!!'
        })

        self.assertEqual(response.status_code,400)

        # missing password
        response = self.client.post(reverse('api:login'),{
            'email':'seamsstrange@ualberta.ca',
        
        })

        self.assertEqual(response.status_code,400)

        # missing both email and password

        response = self.client.post(reverse('api:login'))

        self.assertEqual(response.status_code,400)
    
    def test_logout_view(self):
        # first log in the user to get the cookies set.
        response = self.client.post(reverse('api:login'),{
            'email':'ethankeys@ualberta.ca',
            'password':'abc123!!'
        })

        # ensure actually got the cookies
        self.assertIsNotNone(self.client.cookies.get('access'))
        self.assertIsNotNone(self.client.cookies.get('refresh'))

        refresh = str(self.client.cookies.get('refresh'))
        access = str(self.client.cookies.get('access'))

        self.assertFalse('access="";' in access)
        self.assertFalse('refresh="";' in refresh)

        # call the logout view which ultimately clears the cookies
        response = self.client.post(reverse('api:logout'))

        self.assertEqual(response.status_code,200)

        # check cookie was successfully deleted and cleared.
        refresh = str(self.client.cookies.get('refresh'))
        access = str(self.client.cookies.get('access'))
        
        self.assertTrue('access="";' in access)
        self.assertTrue('refresh="";' in refresh)
    
    def test_refresh_view(self):
        # get cookies set by logging in user.
        response = self.client.post(reverse('api:login'),{
            'email':'ethankeys@ualberta.ca',
            'password':'abc123!!'
        })

        self.assertEqual(response.status_code,200)
        # Morsel obj, first split gets the access=token; second split gets token; last slice gets token (no ;)
        access = str(self.client.cookies.get('access')).split()[1].split('=')[1][:-1]
        refresh = str(self.client.cookies.get('refresh')).split()[1].split('=')[1][:-1]
        
        self.assertNotEqual(access,refresh)

        # call the refresh view
        response = self.client.post(reverse('api:refresh'))

        self.assertEqual(response.status_code,200)

        refresh_new = str(self.client.cookies.get('refresh')).split()[1].split('=')[1][:-1]
        access_new = str(self.client.cookies.get('access')).split()[1].split('=')[1][:-1]

        self.assertEqual(refresh_new,refresh)
        self.assertNotEqual(refresh_new,access_new)
        self.assertNotEqual(access_new,access)

    def test_no_refresh_token_provided(self):
        response = self.client.post(reverse('api:refresh'))
        self.assertEqual(response.status_code,400)

    def test_invalid_refresh_token(self):
        self.client.cookies = SimpleCookie({'refresh':'suchabadtoken'})
        response = self.client.post(reverse('api:refresh'))
        self.assertEqual(response.status_code,400)


        


        



