from django.urls import path, include

from rest_framework import routers

from shop.views import ProductViewSet, ProductNameViewSet


router = routers.DefaultRouter()
router.register("products", ProductViewSet)
router.register(r'products/name', ProductNameViewSet, basename='product-name')

urlpatterns = [
    path("", include(router.urls))
]

app_name = "shop"
