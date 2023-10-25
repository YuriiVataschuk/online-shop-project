from django.urls import path, include

from rest_framework import routers

from .views import ProductViewSet, CartViewSet, add_to_cart, update_cart_item


router = routers.DefaultRouter()
router.register("products", ProductViewSet, basename="products")
router.register(r'cart', CartViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path('add_to_cart/', add_to_cart, name='add_to_cart'),
    path('update_cart_item/<int:order_id>/', update_cart_item, name='update_cart_item'),
]

app_name = "shop"
