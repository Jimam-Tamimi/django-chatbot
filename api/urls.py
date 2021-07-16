from django.urls import path
from django.urls.conf import include
from api import views

urlpatterns = [
    path('message/get-response/' , views.getResponse)
]