from django.urls import path,include
from .api_handling.jwt_auth import LoginView, LogoutView, HttpCookieRefreshView
from .api_handling.item_api import ItemViewSet
from .api_handling.tag_api import TagViewSet
from rest_framework.routers import DefaultRouter


app_name = 'api'
router = DefaultRouter()
router.register(r'items',ItemViewSet)
router.register(r'tags',TagViewSet)
urlpatterns = [

    # authentication urls with jwt tokens and http only cookies.
    path('login/',LoginView.as_view(),name='login'),
    path('logout/',LogoutView.as_view(),name='logout'),
    path('refresh/',HttpCookieRefreshView.as_view(),name='refresh'),
    
    # item api routes
    path('',include(router.urls)),
    
]