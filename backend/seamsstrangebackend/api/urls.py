from django.urls import path
from .views import LoginView, LogoutView, HttpCookieRefreshView


app_name = 'api'
urlpatterns = [

    # authentication urls with jwt tokens and http only cookies.
    path('login/',LoginView.as_view(),name='login'),
    path('logout/',LogoutView.as_view(),name='logout'),
    path('refresh/',HttpCookieRefreshView.as_view(),name='refresh')
]