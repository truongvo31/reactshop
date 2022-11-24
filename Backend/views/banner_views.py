from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from Backend.models import BannerParent
from Backend.serializers import BannersSerializer


@api_view(['GET'])
def getBanners(request):
    banners = BannerParent.objects.filter(status=True)
    serializer = BannersSerializer(banners, many=True)
    return Response(serializer.data)
