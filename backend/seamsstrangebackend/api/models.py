from colorfield.fields import ColorField
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator
from django.utils import timezone

# Create your models here.

# Custom User Model, user will most likely only be made through createsuperuser manage.py command.
class User(AbstractUser):
    name = models.CharField(max_length=30,validators=[MinLengthValidator(3)])
    email = models.EmailField(max_length=255,unique=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=30)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name','username']

class Item(models.Model):
    title = models.CharField(max_length=100,null=False,blank=False)
    quantity = models.IntegerField(default=0)
    description = models.CharField(max_length=1000,null=True,blank=True)
    tags = models.ManyToManyField('Tag')
    created_on = models.DateTimeField(auto_now=True)
    sold_out = models.BooleanField(default=True)
    etsy_url = models.URLField(blank=True,null=True,default=None)

    class Meta:
        ordering = ['-id']

class Image(models.Model):
    url = models.URLField(null=False,blank=False)
    title = models.CharField(max_length=100,null=False,blank=False)
    description = models.CharField(max_length=500,null=True,blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    item = models.ForeignKey('Item',on_delete=models.CASCADE,null=True,related_name='images')

        
class Tag(models.Model):
    name = models.CharField(unique=True,max_length=30,validators=[MinLengthValidator(1)],blank=False,null=False,default='Item')
    color = ColorField(default='#FF000')
    created_on = models.DateTimeField(auto_now_add=True)
    




