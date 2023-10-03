from django.urls import path, include

from rest_framework import routers

from shop.views import ProductViewSet, SizeViewSet, CategoryViewSet

router = routers.DefaultRouter()
router.register("products", ProductViewSet)
router.register("sizes", SizeViewSet)
router.register("categories", CategoryViewSet)

urlpatterns = [
    path("", include(router.urls))
]

app_name = "shop"
