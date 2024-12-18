from django.contrib import admin
from .models import Tag,User,Item,Image

# Register your models here.
admin.site.register(Tag)
admin.site.register(Item)
admin.site.register(Image)
admin.site.register(User)