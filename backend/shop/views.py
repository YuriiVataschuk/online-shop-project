from rest_framework import viewsets

from .models import Product
from .serializers import ProductSerializer, ProductListSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_serializer_class(self):
        if self.action == "list":
            return ProductListSerializer

        if self.action == "retrieve":
            return ProductSerializer

        return ProductSerializer

    def get_queryset(self):
        category = self.request.query_params.get("category")
        queryset = self.queryset

        if category:
            queryset = queryset.filter(category__icontains=category)

        return queryset
