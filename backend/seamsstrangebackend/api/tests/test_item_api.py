from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from ..models import Item,User,Tag
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
        
        self.item1 = Item.objects.create(title='dog scarf',quantity=1,description='a dog scarf',etsy_url='')
        self.item2 = Item.objects.create(title='dog scarf with hat',quantity=1,description='a dog scarf',etsy_url='')
        self.item3 = Item.objects.create(title='cat leaf',quantity=1,description='a dog scarf',etsy_url='')

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

    # authenticated views tests    
    def test_not_authenticated_destroy(self):
        response = self.client.delete(reverse('api:items-detail',args=[1]))
        self.assertEqual(response.status_code,401)

    def test_not_authenticated_update(self):
        response = self.client.put(reverse('api:items-detail',args=[2]),json.dumps(self.item_json),content_type='application/json')
        self.assertEqual(response.status_code,401)
    
    def test_not_authenticated_create(self):
        response = self.client.post(reverse('api:items-list'),json.dumps(self.item_json),content_type='application/json')
        self.assertEqual(response.status_code,401)

    # list tests
    def test_get_full_page_list(self):
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
        self.assertEqual(retrieved_items[0],self.item3)
        self.assertEqual(retrieved_items[1],self.item2)
        self.assertEqual(retrieved_items[2],self.item1)
    
    def test_list_pagination(self):
        response = self.client.get(self.list_url_paginator)
        self.assertEqual(response.status_code,200)
        data = response.data
        self.assertTrue('items' in data)
        self.assertTrue('total_pages' in data)
        self.assertTrue(len(data['items']) > 0)
        self.assertTrue(len(data['items']) == 1)
        self.assertEqual(data['total_pages'],2)
        item = Item.objects.get(id=data['items'][0]['id'])
        self.assertEqual(item,self.item1)

    def test_list_pagination_past_num_page(self):
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
        self.assertEqual(item,self.item1)
    
    def test_list_one_tag_param_filter(self):
        response = self.client.get(self.list_url_filter_one_tag)
        self.assertEqual(response.status_code,200)
        data = response.data
        self.assertTrue('items' in data)
        self.assertTrue('total_pages' in data)
        self.assertTrue(len(data['items']) > 0)
        self.assertTrue(len(data['items']) == 2)
        self.assertEqual(data['total_pages'],1)
        items = data['items']
        retrieved_items = []
        for item in items:
            retrieved_items.append(Item.objects.get(id = item['id']))
        self.assertEqual(retrieved_items[0],self.item2)
        self.assertEqual(retrieved_items[1],self.item1)

    def test_list_two_tag_param_filter(self):
        response = self.client.get(self.list_url_filter_two_tag)
        self.assertEqual(response.status_code,200)
        data = response.data
        self.assertTrue('items' in data)
        self.assertTrue('total_pages' in data)
        self.assertTrue(len(data['items']) > 0)
        self.assertTrue(len(data['items']) == 1)
        self.assertEqual(data['total_pages'],1)
        items = data['items']
        retrieved_items = []
        for item in items:
            retrieved_items.append(Item.objects.get(id = item['id']))
        self.assertEqual(retrieved_items[0],self.item2)
    
    def test_list_filter_tag_does_not_exist(self):
        response = self.client.get(reverse('api:items-list')+'?tag=NotAnExistingTag')
        self.assertEqual(response.status_code,200)
        data = response.data
        self.assertTrue('items' in data)
        self.assertTrue('total_pages' in data)
        self.assertTrue(len(data['items']) == 0)
        self.assertTrue(data['items'] == [])
        self.assertEqual(data['total_pages'],0)
    
    # retrieve tests
    def test_retrieve_item(self):
        response = self.client.get(reverse('api:items-detail',args=[1]))
        self.assertEqual(response.status_code,200)
        data = response.data
        self.assertEqual(data['id'],self.item1.id)
        self.assertEqual(data['title'],self.item1.title)
        self.assertEqual(int(data['quantity']),self.item1.quantity)
        self.assertEqual(data['etsy_url'],self.item1.etsy_url)
        self.assertEqual(data['description'],self.item1.description)
        self.assertEqual(bool(data['sold_out']),self.item1.sold_out)

    def test_retrieve_invalid_item(self):
        response = self.client.get(reverse('api:items-detail',args=[4]))
        self.assertEqual(response.status_code,404)
    
    # delete tests
    def test_delete_invalid_item(self):
        # log in first.
        response = self.client.post(reverse('api:login'),{
            'email':'ethankeys@ualberta.ca',
            'password':'abc123!!'
        })

        self.assertEqual(response.status_code,200)
        response = self.client.delete(reverse('api:items-detail',args=[4]))
        self.assertEqual(response.status_code,404)
    
    def test_delete_item(self):
        # log in first.
        response = self.client.post(reverse('api:login'),{
            'email':'ethankeys@ualberta.ca',
            'password':'abc123!!'
        })
        
        self.assertEqual(response.status_code,200)
        response = self.client.delete(reverse('api:items-detail',args=[3]))
        self.assertEqual(response.status_code,204)

        self.assertIsNone(Item.objects.filter(id=3).first())

    # update tests
    def test_update_invalid_json(self):
        # log in first.
        response = self.client.post(reverse('api:login'),{
            'email':'ethankeys@ualberta.ca',
            'password':'abc123!!'
        })

        invalid_json = {
            "tags":[],
            "title":"",
            "quantity":2,
            "description":"for blu with love",
            "sold_out":True,
            "etsy_url":""
            
        }

        response = self.client.put(reverse('api:items-detail',args=[2]),json.dumps(invalid_json),content_type='application/json')
        self.assertEqual(response.status_code,400)

        item2 = Item.objects.get(id=2)
        self.assertEqual(item2.title,self.item2.title)
        self.assertEqual(item2.quantity,self.item2.quantity)
        self.assertEqual(item2.description,self.item2.description)
        self.assertEqual(item2.sold_out,self.item2.sold_out)
        self.assertEqual(item2.etsy_url,self.item2.etsy_url)
        self.assertEqual(item2.tags,self.item2.tags)

    def test_update_invalid_item(self):
        # log in first.
        response = self.client.post(reverse('api:login'),{
            'email':'ethankeys@ualberta.ca',
            'password':'abc123!!'
        })

        response = self.client.put(reverse('api:items-detail',args=[6]),json.dumps(self.item_json),content_type='application/json')
        self.assertEqual(response.status_code,404)
    
    # create test.
    def test_create_invalid_json(self):
        # log in first.
        response = self.client.post(reverse('api:login'),{
            'email':'ethankeys@ualberta.ca',
            'password':'abc123!!'
        })

        self.assertEqual(response.status_code,200)

        invalid_json = {
            "tags":[],
            "title":"",
            "quantity":2,
            "description":"for blu with love",
            "sold_out":True,
            "etsy_url":""
            
        }

        response = self.client.post(reverse('api:items-list'),json.dumps(invalid_json),content_type='application/json')

        self.assertEqual(response.status_code,400)
    
    def test_create_item(self):
        # log in first.
        response = self.client.post(reverse('api:login'),{
            'email':'ethankeys@ualberta.ca',
            'password':'abc123!!'
        })

        self.assertEqual(response.status_code,200)
        response = self.client.post(reverse('api:items-list'),json.dumps(self.item_json),content_type='application/json')
        self.assertEqual(response.status_code,201)

        item_data = response.data
        item_created = Item.objects.filter(id=item_data['id']).first()
        self.assertIsNotNone(item_created)

        self.assertEqual(item_created.title,self.item_json['title'])
        self.assertEqual(item_created.quantity,self.item_json['quantity'])
        self.assertEqual(item_created.description,self.item_json['description'])
        self.assertEqual(item_created.etsy_url,self.item_json['etsy_url'])
        self.assertEqual(item_created.sold_out,self.item_json['sold_out'])



        





        
        





        


        
            

