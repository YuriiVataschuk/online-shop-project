import os
import uuid

from django.db import models
from django.utils.text import slugify


def product_image_file_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.name)}-{uuid.uuid4()}{extension}"

    return os.path.join("uploads", "product", filename)


class Product(models.Model):

    SIZES = (
        ("S", "S"),
        ("M", "M"),
        ("L", "L"),
        ("XL", "XL"),
    )

    CATEGORIES = (
        ("Shirts", "Shirts"),
        ("Sweatshirts", "Sweatshirts"),
        ("Hoodies", "Hoodies"),
    )

    name = models.CharField(max_length=255, null=False, blank=False)
    price = models.FloatField()
    discount = models.IntegerField(blank=True, null=True)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORIES)
    size = models.CharField(max_length=10, choices=SIZES)
    photo = models.ImageField(upload_to=product_image_file_path)
