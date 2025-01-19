from django.urls import path,include
from .api_handling.jwt_auth import LoginView, LogoutView, HttpCookieRefreshView, ProvideAuthenticationStateView
from .api_handling.item_api import ItemViewSet, ItemRecommendationView
from .api_handling.tag_api import TagViewSet
from .api_handling.email_api import EmailView
from .api_handling.images_api import ImageView
from .api_handling.social_api import SocialView
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
    path('authenticated/',ProvideAuthenticationStateView.as_view(),name='authenticated'),
    path('email/',EmailView.as_view(),name="email"),
    path('images/', ImageView.as_view(),name='images'),
    path('images/<int:id>/',ImageView.as_view(),name="images-delete"),
    path('socials/',SocialView.as_view(),name="socials"),
    # item api routes
    path('',include(router.urls)),
    path('items/<int:id>/recommendations/',ItemRecommendationView.as_view(),name="recommendations")
    
]