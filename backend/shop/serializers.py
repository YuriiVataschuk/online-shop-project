from rest_framework import serializers

from .models import Product, Cart, Order, Description


class DescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Description
        fields = ('EN', 'UA')


class ProductSerializer(serializers.ModelSerializer):
    description = DescriptionSerializer()

    class Meta:
        model = Product
        fields = "__all__"

    def create(self, validated_data):
        description_data = validated_data.pop('description', {})
        description, _ = Description.objects.get_or_create(**description_data)
        product = Product.objects.create(description=description, **validated_data)
        return product


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
            order = Order.objects.create(cart=cart, **order_data)
            cart.orders.add(order)

        return cart