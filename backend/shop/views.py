from rest_framework import viewsets

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

    def filter_by_category(self, request, *args, **kwargs):
        category = self.request.query_params.get("category")
        queryset = Product.objects.filter(category=category)
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)

    def filter_by_price(self, request, *args, **kwargs):
        price = self.request.query_params.get('price')
        queryset = Product.objects.filter(price=price)
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)




