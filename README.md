# SeamsStrange
Welcome to SeamsStrange, a Djano backend with a PostgresSQL database, and React frontend website for my Mom's Embroidary business. At the business she specializes in custom embroidary items such as scarfs, hats, shirts, and more! She also loves to post updates about her life and her company.

This github contains a Django Rest Framework backend to allow my mother to update posts with images, commonmark syntax, and edit/delete/create listings for her embroidary items! All of this functionality for unsafe HTTP methods is protected by JWT Cookie Auth overriden from DRF's simplejwt package! 

# Screenshots from SeamsStrange

## Homepage
![Homepage](https://cdn.discordapp.com/attachments/784654670181826570/1332594068064309361/image.png?ex=6795d270&is=679480f0&hm=7d3fcb39676fc311eeb77d1eaebbd7f77ba10456f9a85fdc201fb39096f20bf3&)

## Admin
![AdminHome](https://cdn.discordapp.com/attachments/784654670181826570/1332595769274011720/image.png?ex=6795d405&is=67948285&hm=285c8ba3bd89f329060c9ef3be127439577b6fb7d94e1ced45c1f77cb4aed5af&)

![AdminItem1](https://cdn.discordapp.com/attachments/784654670181826570/1332596378529959936/image.png?ex=6795d497&is=67948317&hm=c5a7e977d16ea766cfc34cbc52219487f014a3cf2c2507ddd105635e956b6219&)

![AdminItem2](https://cdn.discordapp.com/attachments/784654670181826570/1332604126634442863/image.png?ex=6795dbce&is=67948a4e&hm=643644b1b84aed5f4fd9a7a72ca7e70b5c2f5e20a1d07fc709e68f26ccd89e3f&)

![AdminTags](https://cdn.discordapp.com/attachments/784654670181826570/1332596224796397578/image.png?ex=6795d472&is=679482f2&hm=98ad61c96aba8c406ff7a27e6f864b9dfcef0d74caadd8b8c8125ebf6fecc9b1&)

![AdminDelete](https://cdn.discordapp.com/attachments/784654670181826570/1332604533582594058/image.png?ex=6795dc2f&is=67948aaf&hm=ffc1af8c29cb3c5565b7ab858300d4a2d6a9ed131294df78481c90b7cf7618b2&)

![AdminSocials](https://cdn.discordapp.com/attachments/784654670181826570/1332596652338319432/image.png?ex=6795d4d8&is=67948358&hm=e4348a2debc7abc41e3c450848242b8539514ce1ac242316931131ecfa0bc0cb&)

## Shop
![ShopHome](https://cdn.discordapp.com/attachments/784654670181826570/1332601675289985075/image.png?ex=6795d985&is=67948805&hm=8b3a50c0934b8e2eb3dbba7b4536d0c85d27484ad9cb094cf158555cc5717ff4&)
![SingularItem](https://cdn.discordapp.com/attachments/784654670181826570/1332600682406084629/image.png?ex=6795d899&is=67948719&hm=2277d7bc99c7784e6963a5b9ca99cfca1f479ad383a897912ac0d00d3a35a169&)
![Recommended](https://cdn.discordapp.com/attachments/784654670181826570/1332600794800717855/image.png?ex=6795d8b4&is=67948734&hm=feb3a50dc231f1513c354d0ab1b60dfed3d8bda9adfa4f4d2fef51acae56cf3b&)

# How to run 
This site is currently deployed on heroku! To see the running webpage you can visit: https://www.seamsstrange.com/

To run the application locally you can do the following:

Django Backend:
open up a terminal and navigate to the seamsstrangebackend folder from the root directory:

first you must install the dependencies in requirements.txt

cd backend
pip install -r requirements.txt

Next run the server

cd ./backend/seamsstrangebackend
python manage.py runserver

Your backend should be at the link: http://localhost:8000

To run the frontend do the following:

from the root of the repository: You must have node.js installed on your machine.

cd ./frontend/seamsstrangefrontend
npm install (this will install the required dependencies)
npm run dev

Viola, you're now up and running!


# Notes from Ethanman102
 - Thanks for checking out my github repository for my mother's website. This project helped me to better my understanding of HTTP protocols and authentcation methods available to us currently, especially their implementation to create a secure website!
 - This project also was my first time utilizing the react.js library to create a dynamic frontend for the site! It is a major change from my previous work utilizing django's template system which required more precision to ensure jinja worked adequetly!

I am also open for feedback and if you notice anything whilst perusing my repository please don't hesistate to reach out to me at: ekeys@ualberta.ca or ethankey.s@yahoo.com!

 # Resources:
 - Obviously learning can't be done without some research! Please find below the list of articles and hypermedia I utilized to help build this project :)

### JWT Backend Auth Resources
 1. https://medium.com/grad4-engineering/how-to-blacklist-json-web-tokens-in-django-43fb88ae3d17
    This resource was utilized to learn how to explicity blacklist refresh tokens after logouts.
2. https://www.geeksforgeeks.org/how-to-manage-local-vs-production-settings-in-django/ This resource was utilized to learn about setting production .env settings to allow for secure cookies to be allowed whether testing locally or in production
3. https://www.procoding.org/jwt-token-as-httponly-cookie-in-django This resource was utilized to help understand how to set jwt tokens from simplejwt in an httponly cookie.
4. https://www.youtube.com/watch?v=PUzgZrS_piQ&list=LL&index=7 This resource was utilized to help understand how to use JWT tokens an the importance of using an httponly cookie.
5. https://stackoverflow.com/questions/66247988/how-to-store-jwt-tokens-in-httponly-cookies-with-drf-djangorestframework-simplej This resource was utilized to learn about overriding the given TokenObtainPairView and RefreshTokenView to store them in HTTP only cookies
6. https://narancsblog.com/webdevelopment/creating-token-obtain-and-token-refresh-apis-in-django/ This resource was utilized to understand how to override the TokeRefreshView to customize it for httponly cookies
