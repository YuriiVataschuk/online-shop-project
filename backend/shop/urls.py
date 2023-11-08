from django.urls import path, include

from rest_framework import routers

from .views import ProductViewSet, CartViewSet, OrderViewSet, ContactViewSet

router = routers.DefaultRouter()
router.register("products", ProductViewSet, basename="products")
router.register(r'cart', CartViewSet)
router.register("order", OrderViewSet)
router.register("contacts", ContactViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("cart/user_carts/", CartViewSet.as_view({'get': 'user_carts'}), name="user_carts"),
]

app_name = "shop"
