from django.urls import path, include

from rest_framework import routers

from .views import ProductViewSet, CartViewSet


router = routers.DefaultRouter()
router.register("products", ProductViewSet, basename="products")
router.register(r'cart', CartViewSet)

urlpatterns = [
    path("", include(router.urls))
]

app_name = "shop"
