from django.urls import path
from .views import LoginView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = 'api'
urlpatterns = [
    path('login/',LoginView.as_view(),name='login'),

]