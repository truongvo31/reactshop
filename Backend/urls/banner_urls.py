from django import views
from django.urls import path
from Backend.views import banner_views as views

urlpatterns = [
    path('', views.getBanners, name='Banners'),
]
