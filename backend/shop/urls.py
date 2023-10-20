from django.urls import path, include

from rest_framework import routers

from shop.views import ProductViewSet, ShirtsViewSet, SweatshirtsViewSet, HoodiesViewSet


router = routers.DefaultRouter()
router.register("products", ProductViewSet, basename="products")
router.register("shirts", ShirtsViewSet, basename="shirts")
router.register("sweatshirts", SweatshirtsViewSet, basename="sweatshirts")
router.register("hoodies", HoodiesViewSet, basename="hoodies")

urlpatterns = [
    path("", include(router.urls))
]

app_name = "shop"
