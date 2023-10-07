from django.contrib import admin

from shop.models import Product, Category, Size

admin.site.register(Product)
admin.site.register(Size)
admin.site.register(Category)
