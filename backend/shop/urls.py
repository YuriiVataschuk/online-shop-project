from django.urls import path, include

from rest_framework import routers

from shop.views import ProductViewSet

router = routers.DefaultRouter()
router.register("products", ProductViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path(
        'products/filter-by-category/',
        ProductViewSet.as_view({'get': 'filter_by_category'}),
        name='product-filter-by-category'
    ),
    path(
        'products/filter-by-price/',
        ProductViewSet.as_view({'get': 'filter_by_price'}),
        name='product-filter-by-price'
    )
]

app_name = "shop"
