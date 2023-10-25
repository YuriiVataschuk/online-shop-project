from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response

from .models import Product, Cart, Order
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


@api_view(['POST'])
def add_to_cart(request):
    user = request.user if request.user.is_authenticated else None

    cart, created = Cart.objects.get_or_create(user=user)

    if created:
        cart.user = user
        cart.save()

    product_id = request.data.get('product')
    size = request.data.get('size')

    order, created = Order.objects.get_or_create(product_id=product_id, size=size)

    cart.orders.add(order)

    serializer = CartSerializer(cart)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def update_cart_item(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    new_quantity = request.data.get('quantity', 1)

    order.quantity = new_quantity
    order.save()

    cart = Cart.objects.get(orders=order)

    serializer = CartSerializer(cart)
    return Response(serializer.data, status=status.HTTP_200_OK)
