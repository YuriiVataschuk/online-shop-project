from rest_framework import viewsets
from rest_framework.filters import SearchFilter

from rest_framework.response import Response

from shop.models import Product
from shop.serializers import ProductSerializer, ProductListSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_serializer_class(self):
        if self.action == "list":
            return ProductListSerializer

        if self.action == "retrieve":
            return ProductSerializer

        return ProductSerializer


class ShirtsViewSet(ProductViewSet):
    queryset = Product.objects.filter(category='Shirts',)
    serializer_class = ProductListSerializer


class SweatshirtsViewSet(ProductViewSet):
    queryset = Product.objects.filter(category='Sweatshirts')
    serializer_class = ProductListSerializer


class HoodiesViewSet(ProductViewSet):
    queryset = Product.objects.filter(category='Hoodies')
    serializer_class = ProductListSerializer
