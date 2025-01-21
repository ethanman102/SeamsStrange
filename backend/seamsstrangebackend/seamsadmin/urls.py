"""
URL configuration for seamsstrangebackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from pathlib import Path
import environ

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')
PRODUCTION_MODE = env('PRODUCTION_MODE',default=False)


urlpatterns = [
    path('admin/', admin.site.urls),
]

if PRODUCTION_MODE != False:
    urlpatterns.append(path('api/',include('seamsstrangebackend.api.urls')))
else:
    urlpatterns.append(path('api/',include('api.urls')))
