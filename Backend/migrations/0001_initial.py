# Generated by Django 4.0.3 on 2022-11-17 06:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BannerParent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('auto', models.BooleanField(default=False)),
                ('timeout', models.SmallIntegerField(default=3000)),
                ('addedDate', models.DateField(auto_now_add=True)),
                ('status', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('brandID', models.AutoField(primary_key=True, serialize=False)),
                ('brandName', models.CharField(max_length=50)),
                ('brandOrigin', models.CharField(max_length=50)),
                ('image', models.ImageField(default='', upload_to='brands/')),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('categoryID', models.AutoField(primary_key=True, serialize=False)),
                ('categoryName', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('code', models.CharField(blank=True, max_length=10, null=True, unique=True)),
            ],
            options={
                'ordering': ['name', 'id'],
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('style', models.CharField(max_length=50, unique=True)),
                ('image', models.ImageField(upload_to='products/')),
                ('variant', models.CharField(choices=[('None', 'None'), ('Size', 'Size'), ('Color', 'Color'), ('Size-Color', 'Size-Color')], default='None', max_length=10)),
                ('description', models.TextField(max_length=1024)),
                ('slug', models.SlugField(unique=True)),
                ('status', models.CharField(choices=[('True', 'True'), ('False', 'False')], max_length=10)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('updated_at', models.DateField(auto_now=True)),
                ('brand', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='product', to='Backend.brand')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product', to='Backend.category')),
            ],
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=50)),
                ('image', models.ImageField(upload_to='products/')),
                ('color', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variant_img_color', to='Backend.color')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_image', to='Backend.product')),
            ],
            options={
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
                ('index', models.SmallIntegerField(default=99)),
            ],
            options={
                'ordering': ['index', 'name', 'id'],
            },
        ),
        migrations.CreateModel(
            name='Variant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('quantity', models.IntegerField(default=0)),
                ('price', models.IntegerField(default=0)),
                ('status', models.BooleanField(default=True)),
                ('sku', models.CharField(default='', max_length=50, unique=True)),
                ('color', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variant_color', to='Backend.color')),
                ('image', models.ManyToManyField(related_name='variant_image', to='Backend.productimage')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_variant', to='Backend.product')),
                ('size', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variant_size', to='Backend.size')),
            ],
            options={
                'ordering': ['product', 'color', 'size'],
            },
        ),
        migrations.CreateModel(
            name='BannerChild',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('description', models.TextField(blank=True, null=True)),
                ('img', models.ImageField(upload_to='banners/')),
                ('color', models.CharField(choices=[('blue', 'Blue'), ('orange', 'Orange'), ('pink', 'Pink'), ('white', 'White'), ('black', 'Black')], default='blue', max_length=7)),
                ('path', models.CharField(max_length=120)),
                ('index', models.IntegerField(default=0)),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bannerchilds', to='Backend.bannerparent')),
            ],
            options={
                'ordering': ['index', 'id'],
            },
        ),
        migrations.AddConstraint(
            model_name='variant',
            constraint=models.UniqueConstraint(fields=('product', 'color', 'size'), name='variant unique'),
        ),
    ]
