from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from Backend.models import Product
from Backend.serializers import ProductSerializer
from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.filter(
        status=True).exclude(product_variant__isnull=True)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getSpecificProduct(request, pk):
    product = Product.objects.get(slug=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
