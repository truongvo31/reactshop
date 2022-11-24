from django import views
from django.urls import path
from Backend.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name='Products'),
    path('<str:pk>/', views.getSpecificProduct, name='Product'),
]
