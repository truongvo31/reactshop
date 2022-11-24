from django import views
from django.urls import path
from Backend.views import brand_views as views

urlpatterns = [
    path('', views.getBrands, name='Brands'),
]
