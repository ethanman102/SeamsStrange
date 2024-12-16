from rest_framework import serializers
from .models import User,Tag,Item,Image

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','email','password']
        read_only_fields = ['id']
        extra_kwargs = {
            'password' : {'write_only' : True}
        }

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('created_on','name','color')
        extra_kwargs = {
            'created_on' : {'read_only' : True},
            'name': {'validators':[]}
        }

#class ImageSerializer(serializers.ModelSerializer):
   # class Meta:
        #model = Image
        #fields = ()

class ItemSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    #images = ImageSerializer(many=True)
    
    class Meta:
        model = Item
        fields = '__all__'
    
    def create(self, validated_data):
        tags_data = validated_data.pop('tags',[])
        item = Item.objects.create(**validated_data)
        for tag in tags_data:
            tag_obj = Tag.objects.get_or_create(**tag)[0]
            item.tags.add(tag_obj)
        return item
