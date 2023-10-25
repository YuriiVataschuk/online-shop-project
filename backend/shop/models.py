import os
import uuid

from django.db import models
from django.utils.text import slugify

from users.models import User


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
    size = models.CharField(max_length=10, choices=SIZES, blank=True, null=True)
    photo = models.ImageField(upload_to=product_image_file_path)

    def __str__(self):
        return self.name


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    products = models.ManyToManyField(Product, blank=True)

    def add_product(self, product):
        self.products.add(product)
        self.save()

    def remove_product(self, product):
        self.products.remove(product)
        self.save()

    def clear_cart(self):
        self.products.clear()
        self.save()

    def get_total_price(self):
        total_price = 0
        for product in self.products.all():
            total_price += product.price
        return total_price