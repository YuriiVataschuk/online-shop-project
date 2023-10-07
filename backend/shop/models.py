import os
import uuid

from django.db import models
from django.utils.text import slugify


def product_image_file_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.name)}-{uuid.uuid4()}{extension}"

    return os.path.join("uploads", "product", filename)


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Size(models.Model):
    name = models.CharField(max_length=55, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    GENDER_CHOICES = (
        ("Male", "Male"),
        ("Female", "Female"),
        ("Unisex", "Unisex"),
    )

    SEASON_CHOICES = (
        ("Summer", "Summer"),
        ("Autumn", "Autumn"),
        ("Winter", "Winter"),
        ("Spring", "Spring"),
    )

    article = models.IntegerField(null=False, blank=False)
    name = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField()
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="products"
    )
    price = models.FloatField()
    photo = models.ImageField(upload_to=product_image_file_path)
    color = models.CharField(max_length=55)
    size = models.ForeignKey(Size, on_delete=models.CASCADE, related_name="products")
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    season = models.CharField(max_length=6, choices=SEASON_CHOICES)
    fabric = models.CharField(max_length=255)
