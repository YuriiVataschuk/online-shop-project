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
        fields = ("size", "quantity", "product")


class CartSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True, read_only=False, allow_empty=False)

    class Meta:
        model = Cart
        fields = '__all__'

    def create(self, validated_data):
        orders_data = validated_data.pop('orders')
        cart = Cart.objects.create(**validated_data)
        for order_data in orders_data:
            Order.objects.create(cart=cart, **order_data)
        return cart