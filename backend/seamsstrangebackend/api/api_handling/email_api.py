from django.core.mail import EmailMultiAlternatives, BadHeaderError
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import requests
import json

'''
Create an email with a text format and an html format for contacting the seams strange account for item/product inquries
'''
class EmailView(APIView):
    def post(self,request):
        data = request.data
        contacter_name = data.get('name','')
        contacter_email = data.get('email','')
        message = data.get('message','The sender did not provide a message, this message is just filler')
        sent_from = data.get('sent_from',"Contact Page")
        recaptcha_received = data.get('recaptchaValue','')

        secret_recaptcha_key = settings.RECAPTCHA_SECRET_KEY

        # Allow Message to be blank to allow admins to contact the individual with the provided email.
        if not contacter_name or not contacter_email or not recaptcha_received:
            return Response({"error" : "name or email can not be blank!, ensure recaptcha completed!"},status=status.HTTP_400_BAD_REQUEST)
        
        # render the html and text templates for the new email.

        # check the recaptcha is valid using google's api endpoint.
        data = {
            'secret' : secret_recaptcha_key,
            'response' : recaptcha_received
        }

        response = requests.post("https://www.google.com/recaptcha/api/siteverify",data=data)
        response = json.loads(response.text)
        print(response)
        if not response['success']:
            return Response({'error': 'reCAPTCHA failed'},status=status.HTTP_400_BAD_REQUEST)

        context = {
            "name" : contacter_name,
            "email" : contacter_email,
            "message" : message,
            "sent_from" : sent_from
        }

        text_content = render_to_string(
            "api/email_template.txt",
            context=context
        )

        html_content = render_to_string(
            "api/email_template.html",
            context=context
        )

        msg = EmailMultiAlternatives(
            "Inquiry",
            text_content,
            settings.EMAIL_HOST_USER,
            [settings.EMAIL_SEND_TO]
        )
        msg.attach_alternative(html_content,"text/html")
        try:
            msg.send(fail_silently=False)
        except BadHeaderError:
            return Response({"error":"Invalid Header found"},status=status.HTTP_400_BAD_REQUEST)
        return Response({"success":"email has been sent"})

