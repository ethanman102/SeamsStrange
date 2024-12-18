# SeamsStrange
Welcome to SeamsStrange, a Djano backend React frontend website for my Mom's Embroidary business. At the business she specializes in custom embroidary items such as scarfs, hats, shirts, and more! She also loves to post updates about her life and her company.

This github contains a Django Rest Framework backend to allow my mother to update posts with images, commonmark syntax, and edit/delete/create listings for her embroidary items! All of this functionality for unsafe HTTP methods is protected by JWT Cookie Auth overriden from DRF's simplejwt package! 

### To view the complete REST documentation please follow this link to the projects wiki:

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
