import os
import uuid

from django.db import models
from django.utils.text import slugify


def news_image_file_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.title)}-{uuid.uuid4()}{extension}"

    return os.path.join("uploads", "news", filename)


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Size(models.Model):
    name = models.CharField(max_length=55, unique=True)

    class Meta:
        verbose_name_plural = "sizes"

    def __str__(self):
        return self.name


class Product(models.Model):
    GENDER_CHOICES = (
        ("M", "Male"),
        ("F", "Female"),
        ("U", "Unisex"),
    )

    SEASON_CHOICES = (
        ("Su", "Summer"),
        ("A", "Autumn"),
        ("W", "Winter"),
        ("Sp", "Spring"),
    )

    article = models.IntegerField(null=False, blank=False)
    name = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField()
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="products", null=True
    )
    price = models.FloatField()
    # photo = models.ImageField(upload_to=news_image_file_path, blank=True)
    color = models.CharField(max_length=55)
    size = models.ForeignKey(Size, on_delete=models.CASCADE, related_name="products", null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    season = models.CharField(max_length=2, choices=SEASON_CHOICES)
    fabric = models.CharField(max_length=255)
