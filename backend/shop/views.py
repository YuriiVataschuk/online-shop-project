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


class ProductNameViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [SearchFilter]
    search_fields = ['name']
