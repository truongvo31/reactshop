from django.db import models
from django.utils.safestring import mark_safe
from django.core.validators import validate_comma_separated_integer_list
from django.db.models import Sum

# Create your models here.


class Category(models.Model):
    categoryID = models.AutoField(primary_key=True)
    categoryName = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self) -> str:
        return self.categoryName

    def getName(self):
        return self.categoryName


class Size(models.Model):
    name = models.CharField(max_length=10)
    index = models.SmallIntegerField(default=99)

    def __str__(self) -> str:
        return self.name

    class Meta:
        ordering = ['index', 'name', 'id']


class Color(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=10, blank=True, null=True, unique=True)

    def __str__(self) -> str:
        return self.name

    def color_tag(self):
        if self.code is not None:
            return mark_safe('<p style="background-color:{}">Color: </p>'.format(self.code))
        else:
            return ""

    class Meta:
        ordering = ['name', 'id']


class Brand(models.Model):
    brandID = models.AutoField(primary_key=True)
    brandName = models.CharField(max_length=50)
    brandOrigin = models.CharField(max_length=50)
    image = models.ImageField(upload_to='brands/', default="")

    def __str__(self) -> str:
        return self.brandName

    def getName(self):
        return self.brandName

    def image_tag(self):
        if self.image.url is not None:
            return mark_safe('<img src="{}" height="50" />'.format(self.image.url))
        else:
            return ""


class BannerParent(models.Model):
    name = models.CharField(max_length=50, null=False,
                            blank=False, unique=True)
    auto = models.BooleanField(default=False)
    timeout = models.SmallIntegerField(default=3000)
    addedDate = models.DateField(auto_now_add=True, auto_now=False)
    status = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.name


class BannerChild(models.Model):
    BLUE = 'blue'
    ORANGE = 'orange'
    PINK = 'pink'
    WHITE = 'white'
    BLACK = 'black'
    BANNER_COLOR_CHOICES = [
        (BLUE, 'Blue'),
        (ORANGE, 'Orange'),
        (PINK, 'Pink'),
        (WHITE, 'White'),
        (BLACK, 'Black'),
    ]
    title = models.CharField(max_length=120, null=False, blank=False)
    parent = models.ForeignKey(
        BannerParent, on_delete=models.CASCADE, related_name='bannerchilds')
    description = models.TextField(null=True, blank=True)
    img = models.ImageField(upload_to='banners/')
    color = models.CharField(
        max_length=7, choices=BANNER_COLOR_CHOICES, default=BLUE)
    path = models.CharField(max_length=120, null=False, blank=False)
    index = models.IntegerField(null=False, blank=False, default=0)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['index', 'id']


class Product(models.Model):
    STATUS = (
        ('True', 'True'),
        ('False', 'False'),
    )

    VARIANTS = (
        ('None', 'None'),
        ('Size', 'Size'),
        ('Color', 'Color'),
        ('Size-Color', 'Size-Color')
    )

    category = models.ForeignKey(
        Category, related_name="product", on_delete=models.CASCADE)
    title = models.CharField(max_length=150, null=False, blank=False)
    style = models.CharField(
        max_length=50, blank=False, null=False, unique=True)
    image = models.ImageField(
        upload_to="products/", null=False, blank=False)
    variant = models.CharField(max_length=10, choices=VARIANTS, default='None')
    description = models.TextField(max_length=1024)
    slug = models.SlugField(null=False, unique=True)
    status = models.CharField(max_length=10, choices=STATUS)
    created_at = models.DateField(auto_now_add=True, auto_now=False)
    updated_at = models.DateField(auto_now_add=False, auto_now=True)
    brand = models.ForeignKey(
        Brand, related_name="product", on_delete=models.CASCADE, default="")

    def __str__(self) -> str:
        return self.title

    def image_tag(self):
        if self.image.url is not None:
            return mark_safe('<img src="{}" height="50" />'.format(self.image.url))
        else:
            return ""

    @property
    def get_variants_total_qty(self):
        return Variant.objects.filter(product=self).aggregate(Sum('quantity'))['quantity__sum']


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, related_name="product_image", on_delete=models.CASCADE)
    title = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to="products/")
    color = models.ForeignKey(
        Color, related_name="variant_img_color", on_delete=models.CASCADE)

    def __str__(self) -> str:
        if self.title != "":
            return self.title
        else:
            return str(self.id)

    class Meta:
        ordering = ['id']


class Variant(models.Model):
    title = models.CharField(max_length=150, null=False, blank=False)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='product_variant')
    color = models.ForeignKey(
        Color, on_delete=models.CASCADE, related_name='variant_color')
    size = models.ForeignKey(
        Size, on_delete=models.CASCADE, related_name='variant_size')
    image = models.ManyToManyField(ProductImage, related_name="variant_image")
    quantity = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    status = models.BooleanField(default=True)
    sku = models.CharField(max_length=50, blank=False,
                           null=False, default="", unique=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['product', 'color', 'size']
        constraints = [
            models.UniqueConstraint(
                fields=['product', 'color', 'size'], name='variant unique')
        ]
