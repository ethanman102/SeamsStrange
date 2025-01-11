from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from ..models import Item,Tag
from django.urls import reverse

class TestRecommendations(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        self.item1 = Item.objects.create(title='dog scarf',quantity=1,description='a dog scarf',etsy_url='') # id 1

        self.tag1 = Tag.objects.create(name='scarf',color='#000000')
        self.tag2 = Tag.objects.create(name='hat',color='#000000')
        self.tag3 = Tag.objects.create(name='shorts',color='#000000')

        self.item1.tags.add(self.tag1)
        self.item1.tags.add(self.tag2)
        self.item1.save()

    def test_not_recommending_self(self):
        # tests to ensure that the item does not appear in the recommendations.
        response = self.client.get(reverse("api:recommendations",args=[1]))
        self.assertEqual(response.status_code,200)
        data = response.data
        self.assertTrue("items" in data)
        self.assertEqual(len(data['items']),0)

    def test_recommends_all_three_same_tag(self):
        # get the recommendations
        item2 = Item.objects.create(title='id2item',quantity=1,description='a dog scarf',etsy_url='') # id 2
        item3 = Item.objects.create(title='id3item ',quantity=1,description='a dog scarf',etsy_url='') # id 3
        item4 = Item.objects.create(title='id4item',quantity=1,description='a dog scarf',etsy_url='') # id 4
        item5 = Item.objects.create(title='id5item',quantity=1,description='a dog scarf',etsy_url='') # id 5

        item2.tags.add(self.tag1)
        item3.tags.add(self.tag1)
        item4.tags.add(self.tag1)
        item5.tags.add(self.tag3)
        item2.save()
        item3.save()
        item4.save()
        item5.save()
        # add the match tag 1.

        response = self.client.get(reverse("api:recommendations",args=[1]))
        self.assertEqual(response.status_code,200)
        data = response.data
        self.assertTrue("items" in data)
        self.assertEqual(len(data['items']),3)

        # create id array
        recommended_ids = [item['id'] for item in data['items']]
        created_ids = []
        created_ids.append(item2.id)
        created_ids.append(item3.id)
        created_ids.append(item4.id)

        for id in recommended_ids:
            self.assertTrue(id in created_ids)

        # check that all id's are different.
        for id in recommended_ids:
            self.assertEqual(recommended_ids.count(id),1)
    
    def test_fewer_similar_tags(self):
        # purpose should return all items with a similar tag and should then return the most recent item without the tag
        item2 = Item.objects.create(title='id2item',quantity=1,description='a dog scarf',etsy_url='') # id 2
        item3 = Item.objects.create(title='id3item ',quantity=1,description='a dog scarf',etsy_url='') # id 3
        item4 = Item.objects.create(title='id4item',quantity=1,description='a dog scarf',etsy_url='') # id 4
        item5 = Item.objects.create(title='id5item',quantity=1,description='a dog scarf',etsy_url='') # id 5

        item3.tags.add(self.tag1)
        item3.save()

        item5.tags.add(self.tag1)
        item5.save()

        expected_ids = []
        expected_ids.append(item4.id)
        expected_ids.append(item3.id)
        expected_ids.append(item5.id)

        response = self.client.get(reverse("api:recommendations",args=[1]))
        self.assertEqual(response.status_code,200)
        data = response.data
        self.assertTrue("items" in data)
        self.assertEqual(len(data['items']),3)

        recommended_ids = [item['id'] for item in data['items']]
        for id in recommended_ids:
            self.assertTrue(id in expected_ids)

        # check that all id's are different.
        for id in recommended_ids:
            self.assertEqual(recommended_ids.count(id),1)
        
        # check if atleast 1 item has no tags and 2 items have 1 tag
        tag_count = 0
        for item in data["items"]:
            self.assertTrue(len(item['tags']) == 0 or len(item['tags']) == 1)
            if len(item['tags'] == 1):
                tag_count += 1
        
        self.assertEqual(tag_count,2)

    def test_no_tags_match_recommends_most_recent(self):
        item2 = Item.objects.create(title='id2item',quantity=1,description='a dog scarf',etsy_url='') # id 2
        item3 = Item.objects.create(title='id3item ',quantity=1,description='a dog scarf',etsy_url='') # id 3
        item4 = Item.objects.create(title='id4item',quantity=1,description='a dog scarf',etsy_url='') # id 4
        item5 = Item.objects.create(title='id5item',quantity=1,description='a dog scarf',etsy_url='') # id 5

        expected_ids = []
        expected_ids.append(item4.id)
        expected_ids.append(item3.id)
        expected_ids.append(item5.id)

        response = self.client.get(reverse("api:recommendations",args=[1]))
        self.assertEqual(response.status_code,200)
        data = response.data
        self.assertTrue("items" in data)
        self.assertEqual(len(data['items']),3)

        recommended_ids = [item['id'] for item in data['items']]
        for id in recommended_ids:
            self.assertTrue(id in expected_ids)

        # assert no tags are in the items as they dont match!
        for item in data['items']:
            self.assertEqual(len(item['tags']),0)

        # assert all items are different!
        for id in recommended_ids:
            self.assertEqual(recommended_ids.count(id),1)

    def test_multiple_tags_recommendation(self):
        item2 = Item.objects.create(title='id2item',quantity=1,description='a dog scarf',etsy_url='') # id 2
        item3 = Item.objects.create(title='id3item ',quantity=1,description='a dog scarf',etsy_url='') # id 3
        item4 = Item.objects.create(title='id4item',quantity=1,description='a dog scarf',etsy_url='') # id 4
        item5 = Item.objects.create(title='id5item',quantity=1,description='a dog scarf',etsy_url='') # id 5

        item2.tags.add(self.tag1)
        item2.save()

        item4.tags.add(self.tag1)
        item4.tags.add(self.tag2)
        item4.save()
    
        item5.tags.add(self.tag2)
        item5.save()

        # add the unmatching tag to one item for testing
        item3.tags.add(self.tag3)
        item3.save()



        expected_ids = []
        expected_ids.append(item2.id)
        expected_ids.append(item4.id)
        expected_ids.append(item5.id)

        response = self.client.get(reverse("api:recommendations",args=[1]))
        self.assertEqual(response.status_code,200)
        data = response.data
        self.assertTrue("items" in data)
        self.assertEqual(len(data['items']),3)

        recommended_ids = [item['id'] for item in data['items']]
        for id in recommended_ids:
            self.assertTrue(id in expected_ids)
        
        self.assertTrue(item3.id not in recommended_ids)

        # assert all items are different!
        for id in recommended_ids:
            self.assertEqual(recommended_ids.count(id),1)








