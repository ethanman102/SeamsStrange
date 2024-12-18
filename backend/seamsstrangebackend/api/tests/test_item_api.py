from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from ..models import Item,User,Tag
from ..authenticate import JWTCookieAuthentication
from rest_framework_simplejwt.tokens import AccessToken
from http.cookies import SimpleCookie
from django.http import HttpRequest
from django.urls import reverse
import json


# Create your tests here.
class ItemAPITestCases(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.user = User.objects.create_user(email='ethankeys@ualberta.ca',
                                        name='Ethan',
                                        password='abc123!!',
                                        username='ethanman102')
        
        self.item1 = Item.objects.create(title='dog scarf',quantity='1',description='a dog scarf',etsy_url='')
        self.item2 = Item.objects.create(title='dog scarf with hat',quantity='1',description='a dog scarf',etsy_url='')
        self.item3 = Item.objects.create(title='cat leaf',quantity='1',description='a dog scarf',etsy_url='')

        self.item_json = {
            "tags":[],
            "title":"a cute dog scarf hat",
            "quantity":2,
            "description":"for blu with love",
            "sold_out":True,
            "etsy_url":""
            
        }

        self.tag1 = Tag.objects.create(name='scarf',color='#000000')
        self.tag2 = Tag.objects.create(name='hat',color='#000000')

        self.item1.tags.add(self.tag1)
        self.item1.save()

        self.item2.tags.add(self.tag1)
        self.item2.tags.add(self.tag2)
        self.item2.save()
        
        self.list_url_paginator = reverse('api:items-list') + '?page=2&size=2'
        self.list_url_filter_one_tag = reverse('api:items-list') + '?tag=scarf'
        self.list_url_filter_two_tag = reverse('api:items-list') + '?tag=scarf&tag=hat'
        
    def test_not_authenticated_destroy(self):
        response = self.client.delete(reverse('api:items-detail',args=[1]))
        self.assertEqual(response.status_code,401)

    def test_not_authenticated_update(self):
        response = self.client.put(reverse('api:items-detail',args=[2]),self.item_json,content_type='application/json')
        self.assertEqual(response.status_code,401)
    
    def test_not_authenticated_create(self):
        response = self.client.post(reverse('api:items-list'),self.item_json,content_type='application/json')
        self.assertEqual(response.status_code,401)

    def test_get_full_page_retrieve(self):
        response = self.client.get(reverse('api:items-list'))
        self.assertEqual(response.status_code,200)
        data = response.data
        self.assertTrue('items' in data)
        self.assertTrue('total_pages' in data)
        self.assertTrue(len(data['items']) > 0)
        self.assertTrue(len(data['items']) == 3)
        self.assertEqual(data['total_pages'],1)
        items = data['items']
        retrieved_items = []
        for item in items:
            retrieved_items.append(Item.objects.get(id = item['id']))  
        self.assertEqual(retrieved_items[0],self.item1)
        self.assertEqual(retrieved_items[1],self.item2)
        self.assertEqual(retrieved_items[2],self.item3)
    
    def test_retrieve_pagination(self):
        response = self.client.get(self.list_url_paginator)
        self.assertEqual(response.status_code,200)
        data = response.data
        self.assertTrue('items' in data)
        self.assertTrue('total_pages' in data)
        self.assertTrue(len(data['items']) > 0)
        self.assertTrue(len(data['items']) == 1)
        self.assertEqual(data['total_pages'],2)
        item = Item.objects.get(id=data['items'][0]['id'])
        self.assertEqual(item,self.item3)

    def test_retrieve_pagination_past_num_page(self):
        # should return the last page in the num pages, IE the same as test_retrieve_pagination.
        response = self.client.get(reverse('api:items-list')+'?page=3&size=2')
        self.assertEqual(response.status_code,200)
        data = response.data
        self.assertTrue('items' in data)
        self.assertTrue('total_pages' in data)
        self.assertTrue(len(data['items']) > 0)
        self.assertTrue(len(data['items']) == 1)
        self.assertEqual(data['total_pages'],2)
        item = Item.objects.get(id=data['items'][0]['id'])
        self.assertEqual(item,self.item3)


        
            

