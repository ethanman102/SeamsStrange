from django.urls import path
from .api_handling.jwt_auth import LoginView, LogoutView, HttpCookieRefreshView
from .api_handling.item_api import ItemViewSet


app_name = 'api'
urlpatterns = [

    # authentication urls with jwt tokens and http only cookies.
    path('login/',LoginView.as_view(),name='login'),
    path('logout/',LogoutView.as_view(),name='logout'),
    path('refresh/',HttpCookieRefreshView.as_view(),name='refresh'),
    
    # item api routes
    path('item/create/',ItemViewSet.as_view({'post':'create'}),name='create_item'),
]