from rest_framework import serializers

from .models import Product, Cart, Order


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductListSerializer(ProductSerializer):
    class Meta:
        model = Product
        fields = ("id", "name", "price", "discount", "photo")


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True)

    class Meta:
        model = Cart
        fields = ["id", 'user', 'orders']


