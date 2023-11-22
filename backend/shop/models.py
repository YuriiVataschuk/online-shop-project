from datetime import datetime
import os
import uuid

import pytz
from django.db import models
from django.utils.text import slugify

from users.models import User


class Description(models.Model):
    EN = models.TextField(null=True, blank=True, default="OK")
    UA = models.TextField(null=True, blank=True, default="OK")


def product_image_file_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.name)}-{uuid.uuid4()}{extension}"

    return os.path.join("uploads/product", filename)


class Product(models.Model):
    CATEGORIES = (
        ("Shirts", "Shirts"),
        ("Sweatshirts", "Sweatshirts"),
        ("Hoodies", "Hoodies"),
        ("Pants", "Pants"),
        ("Bags", "Bags"),
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
    description = models.OneToOneField(
        Description,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
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
    created_at = models.CharField(max_length=16, blank=True)

    def save(self, *args, **kwargs):
        tz = pytz.timezone('Europe/Kiev')
        current_time = datetime.now(tz)
        formatted_current_time = current_time.strftime("%d.%m.%Y %H:%M")
        self.created_at = formatted_current_time

        super().save(*args, **kwargs)

    @property
    def total_price(self):
        orders = self.orders.all()
        total_price = 0.0
        for order in orders:
            product = order.product
            if product.discount is not None:
                total_price += product.price - (product.price * (product.discount / 100)) * order.quantity
            else:
                total_price += product.price * order.quantity

        return total_price








class Contact(models.Model):
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)