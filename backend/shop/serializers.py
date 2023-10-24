from rest_framework import serializers

from .models import Product, Cart


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductListSerializer(ProductSerializer):
    class Meta:
        model = Product
        fields = ("id", "name", "price", "discount", "photo")


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ["id", 'user', 'products']

    def add_product(self, product):
        self.instance.products.add(product)

    def remove_product(self, product):
        self.instance.products.remove(product)

    def clear_cart(self):
        self.instance.products.clear()
