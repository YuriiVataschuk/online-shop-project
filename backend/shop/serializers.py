from rest_framework import serializers

from shop.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductListSerializer(ProductSerializer):
    class Meta:
        model = Product
        fields = ("id", "name", "price", "discount")
