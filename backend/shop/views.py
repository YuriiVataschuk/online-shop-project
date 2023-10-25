from rest_framework import viewsets, permissions
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
    permission_classes = [permissions.AllowAny]  # Дозволяємо анонімним користувачам створювати корзини

    @action(detail=False, methods=['post'])
    def create_cart(self, request):
        if not request.user.is_authenticated:
            cart = Cart.objects.create()
            serializer = CartSerializer(cart)
            return Response(serializer.data, status=201)

        return Response({'message': 'You are already logged in.'}, status=400)

    @action(detail=True, methods=['post'])
    def add_product(self, request, pk=None):
        product_id = request.data.get('product_id')
        if product_id is not None:
            product = Product.objects.get(pk=product_id)
            cart = self.get_object()
            cart.products.add(product)  # Додаємо продукт до корзини
            return Response({'message': 'Product added to cart.'}, status=201)

        return Response({'message': 'Invalid product ID.'}, status=400)

    @action(detail=True, methods=['post'])
    def remove_product(self, request, pk=None):
        product_id = request.data.get('product_id')
        if product_id is not None:
            product = Product.objects.get(pk=product_id)
            cart = self.get_object()
            cart.products.remove(product)  # Видаляємо продукт з корзини
            return Response({'message': 'Product removed from cart.'}, status=200)

        return Response({'message': 'Invalid product ID.'}, status=400)

    @action(detail=True, methods=['post'])
    def clear_cart(self, request, pk=None):
        cart = self.get_object()
        cart.products.clear()  # Очищаємо корзину від усіх продуктів
        return Response({'message': 'Cart cleared.'}, status=200)