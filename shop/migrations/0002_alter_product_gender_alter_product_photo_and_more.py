# Generated by Django 4.2.5 on 2023-10-03 19:16

from django.db import migrations, models
import shop.models


class Migration(migrations.Migration):

    dependencies = [
        ("shop", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="gender",
            field=models.CharField(
                blank=True,
                choices=[("M", "Male"), ("F", "Female"), ("U", "Unisex")],
                max_length=1,
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="photo",
            field=models.ImageField(
                blank=True, upload_to=shop.models.news_image_file_path
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="season",
            field=models.CharField(
                blank=True,
                choices=[
                    ("Su", "Summer"),
                    ("A", "Autumn"),
                    ("W", "Winter"),
                    ("Sp", "Spring"),
                ],
                max_length=2,
            ),
        ),
    ]
