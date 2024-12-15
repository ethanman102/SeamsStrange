from django.urls import path
from .views import LoginView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = 'api'
urlpatterns = [
    path('login/',LoginView.as_view(),name='login'),
    path("token/", TokenObtainPairView.as_view(),'token'),
    path('refresh/',TokenRefreshView.as_view(),'refresh'),
]