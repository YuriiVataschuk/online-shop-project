import os
import uuid

from django.db import models
from django.utils.text import slugify

from users.models import User


class Description(models.Model):
    EN = models.TextField(null=True)
    UA = models.TextField(null=True)


def product_image_file_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.name)}-{uuid.uuid4()}{extension}"

    return os.path.join("uploads", "product", filename)


class Product(models.Model):
    CATEGORIES = (
        ("Shirts", "Shirts"),
        ("Sweatshirts", "Sweatshirts"),
        ("Hoodies", "Hoodies"),
    )

    COLORS = (
        ("Black", "Black"),
        ("White", "White"),
    )

    name = models.CharField(max_length=255, null=False, blank=False)
    price = models.FloatField()
    discount = models.IntegerField(blank=True, null=True)
    category = models.CharField(max_length=50, choices=CATEGORIES)
    photo = models.ImageField(upload_to=product_image_file_path, null=True, blank=True)
    description = models.OneToOneField(Description, on_delete=models.CASCADE, null=True, blank=True)
    color = models.CharField(max_length=50, choices=COLORS, null=True, blank=True, default="Black")

    def __str__(self):
        return self.name


class Order(models.Model):
    SIZES = (
        ("S", "S"),
        ("M", "M"),
        ("L", "L"),
        ("XL", "XL"),
    )

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.CharField(max_length=10, choices=SIZES, blank=True, null=True)
    quantity = models.IntegerField(default=1)


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255, blank=False, null=False, default="name")
    phone_number = models.CharField(max_length=255, blank=False, null=False, default="number")
    orders = models.ManyToManyField(Order)


class Contact(models.Model):
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)