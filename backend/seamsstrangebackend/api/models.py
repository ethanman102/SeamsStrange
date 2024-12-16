from colorfield.fields import Colorfield
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator

# Create your models here.

# Custom User Model, user will most likely only be made through createsuperuser manage.py command.
class User(AbstractUser):
    name = models.CharField(max_length=30,validators=[MinLengthValidator(3)])
    email = models.EmailField(max_length=255,unique=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=30)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name','username']


class Tag()

