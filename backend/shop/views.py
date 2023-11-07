from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Product, Cart, Order, Description, Contact
from .serializers import ProductSerializer, ProductListSerializer, CartSerializer, OrderSerializer, ContactSerializer


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
        EN = request.data.get('description', {}).get('EN')
        UA = request.data.get('description', {}).get('UA')

        if EN is None or UA is None:
            return Response({"error": "Both EN and UA are required."},
                            status=status.HTTP_400_BAD_REQUEST)

        request.data['description'] = {
            'EN': EN,
            'UA': UA,
        }

        return super().create(request, *args, **kwargs)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
