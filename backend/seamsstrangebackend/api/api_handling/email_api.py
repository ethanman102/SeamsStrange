from django.core.mail import EmailMultiAlternatives, BadHeaderError
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

'''
Create an email with a text format and an html format for contacting the seams strange account for item/product inquries
'''
class EmailView(APIView):
    def post(self,request):
        data = request.data
        contacter_name = data.get('name','')
        contacter_email = data.get('email','')
        message = data.get('message','')
        sent_from = data.get('sent_from',"Contact Page")

        # Allow Message to be blank to allow admins to contact the individual with the provided email.
        if not contacter_name or contacter_email:
            return Response({"error" : "name or email can not be blank!"},status=status.HTTP_400_BAD_REQUEST)
        
        # render the html and text templates for the new email.

        context = {
            "name" : contacter_name,
            "email" : contacter_email,
            "message" : message,
            "sent_from" : sent_from
        }

        text_content = render_to_string(
            "templates/api/email_template.txt",
            context=context
        )

        html_content = render_to_string(
            "templates/api/email_template.html",
            context=context
        )

        msg = EmailMultiAlternatives(
            "Inquiry",
            text_content,
            "ekeys5096@gmail.com",
            ["ekeys@ualberta.ca"]
        )
        msg.attach_alternative(html_content,"text/html")
        try:
            msg.send(fail_silently=False)
        except BadHeaderError:
            return Response({"error":"Invalid Header found"},status=status.HTTP_400_BAD_REQUEST)
        return Response({"success":"email has been sent"})

