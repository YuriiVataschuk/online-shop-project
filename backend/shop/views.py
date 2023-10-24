from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Product, Cart
from .serializers import ProductSerializer, ProductListSerializer, CartSerializer


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


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    @action(detail=True, methods=['post'])
    def add_product(self, request, pk=None):
        product_id = request.data.get('product_id')
        if product_id is not None:
            product = Product.objects.get(pk=product_id)
            self.get_object().add_product(product)
            return Response({'message': 'Product added to cart.'})
        return Response({'message': 'Invalid product ID.'}, status=400)

    @action(detail=True, methods=['post'])
    def remove_product(self, request, pk=None):
        product_id = request.data.get('product_id')
        if product_id is not None:
            product = Product.objects.get(pk=product_id)
            self.get_object().remove_product(product)
            return Response({'message': 'Product removed from cart.'})
        return Response({'message': 'Invalid product ID.'}, status=400)

    @action(detail=True, methods=['post'])
    def clear_cart(self, request, pk=None):
        self.get_object().clear_cart()
        return Response({'message': 'Cart cleared.'})
