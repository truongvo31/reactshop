from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ('name', )


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ('name', 'code')


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class BannerChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = BannerChild
        fields = ('id', 'title', 'description', 'img', 'color', 'path')
        depth = 1


class BannersSerializer(serializers.ModelSerializer):
    class Meta:
        model = BannerParent
        fields = ('id', 'name', 'auto', 'timeout', 'bannerchilds')
        depth = 1


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ("id", "image",)


class VariantSerializer(serializers.ModelSerializer):
    image = ProductImageSerializer(read_only=True, many=True)
    color = ColorSerializer(read_only=True, many=False)
    size = SizeSerializer(read_only=True, many=False)

    class Meta:
        model = Variant
        fields = ('id', 'title', 'color', 'size',
                  'quantity', 'price', 'image', 'sku')


class ProductSerializer(serializers.ModelSerializer):
    # product_variant = VariantSerializer(read_only=True, many=True)
    product_variant = serializers.SerializerMethodField()

    def get_product_variant(self, product):
        qs = Variant.objects.filter(
            product=product, status=True, quantity__gt=0)
        serializer = VariantSerializer(instance=qs, read_only=True, many=True)
        return serializer.data

    class Meta:
        model = Product
        fields = ('id', 'title', 'variant',
                  'description', 'slug', 'category', 'brand', 'product_variant')
        depth = 1


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'
        depth = 1


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    def get_name(self, obj):
        name = (obj.first_name + ' ' + obj.last_name).strip()
        if name == '':
            name = obj.email
        return name

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    class Meta:
        model = User
        fields = ('id', '_id', 'username', 'email', 'name', 'isAdmin')


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    class Meta:
        model = User
        fields = ('id', '_id', 'username', 'email', 'name', 'isAdmin', 'token')
