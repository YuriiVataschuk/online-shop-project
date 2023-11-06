from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Product, Cart, Order, Description
from .serializers import ProductSerializer, ProductListSerializer, CartSerializer, OrderSerializer


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

    def create(self, request, *args, **kwargs):
        en_description = request.data.get('description', {}).get('en_description')
        ua_description = request.data.get('description', {}).get('ua_description')

        if en_description is None or ua_description is None:
            return Response({"error": "Both en_description and ua_description are required."},
                            status=status.HTTP_400_BAD_REQUEST)

        request.data['description'] = {
            'en_description': en_description,
            'ua_description': ua_description,
        }

        return super().create(request, *args, **kwargs)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


