from django.contrib import admin
from .models import *
import admin_thumbnails


class BrandAdmin(admin.ModelAdmin):
    readonly_fields = ('image_tag', )
    list_display = ['brandName', 'brandOrigin', 'image_tag']


@admin_thumbnails.thumbnail('img')
class BannerChildInLine(admin.StackedInline):
    model = BannerChild
    extra = 1


class BannerAdmin(admin.ModelAdmin):
    list_display = ['name', 'status', 'addedDate', 'auto']
    inlines = [BannerChildInLine]


@admin_thumbnails.thumbnail('image')
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    readonly_fields = ('id',)
    extra = 1


class ProductVariantInline(admin.TabularInline):
    model = Variant
    # readonly_fields = ('image', )
    exclude = ('image',)
    extra: 1
    show_change_link = True


@admin_thumbnails.thumbnail('image')
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['image', 'title', 'image_thumbnail']
    list_per_page = 20


class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'status', 'image_tag']
    list_per_page = 20
    search_fields = ['title', 'style', 'slug', ]
    list_filter = ['category']
    readonly_fields = ('image_tag', )
    inlines = [ProductImageInline, ProductVariantInline]
    prepopulated_fields = {'slug': ('title', ), }


class ColorAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'color_tag']


class SizeAdmin(admin.ModelAdmin):
    list_display = ['name', ]


class VariantAdmin(admin.ModelAdmin):
    list_display = ['title', 'product', 'color',
                    'size', 'price', 'quantity']
    list_per_page = 20
    search_fields = ['title', 'product', 'color', 'size']
    list_filter = ['size', 'color']


# Register your models here.
admin.site.register(Product, ProductAdmin)
admin.site.register(Variant, VariantAdmin)
admin.site.register(Color, ColorAdmin)
admin.site.register(Size, SizeAdmin)
admin.site.register(Brand, BrandAdmin)
admin.site.register(Category)
admin.site.register(BannerParent, BannerAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
