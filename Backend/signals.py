from django.db.models.signals import pre_save, post_save
from django.contrib.auth.models import User
from Backend.models import Product, Variant, ProductImage


def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email


def updateVariantImg(sender, instance, **kwargs):
    variant = instance
    images = ProductImage.objects.filter(product_id=variant.product_id)
    image_colors = []
    for image in images:
        image_colors.append(image.color)
    final_colors = list(set(image_colors))
    if variant.color in final_colors:
        image_to_add = images.filter(color=variant.color)
        variant.image.add(*image_to_add)
    else:
        Variant.objects.filter(id=variant.id).delete()


pre_save.connect(updateUser, sender=User)
post_save.connect(updateVariantImg, sender=Variant)
