import asyncio

from rest_framework import serializers

from .models import Product, Cart, Order, Description, Contact
from .telegram_bot import send_telegram_message


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"

    def create(self, validated_data):
        contact = Contact.objects.create(**validated_data)
        telegram_token = "6523385208:AAEI_pMY_OJtyB9fXhpFPlY_BO0QjTparAE"
        # chat_id = "367218363"
        chat_id = "-4057702799"

        message_text = f"Запит на зворотній зв'язок:\n"
        for field_name, field_value in validated_data.items():
            message_text += f"{field_name}: {field_value}\n"

        asyncio.run(send_telegram_message(chat_id, message_text, telegram_token))

        return contact




class DescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Description
        fields = ('EN', 'UA')


class ProductSerializer(serializers.ModelSerializer):
    description = DescriptionSerializer()

    class Meta:
        model = Product
        fields = "__all__"

    def create(self, validated_data):
        description_data = validated_data.pop('description', {})
        description, _ = Description.objects.get_or_create(**description_data)
        product = Product.objects.create(description=description, **validated_data)
        return product

    def update(self, instance, validated_data):
        description_data = validated_data.get('description', {})
        if description_data:
            instance.description.EN = description_data.get('EN', instance.description.EN)
            instance.description.UA = description_data.get('UA', instance.description.UA)

        for attr, value in validated_data.items():
            if attr != 'description':
                setattr(instance, attr, value)

        instance.save()
        return instance


class ProductListSerializer(ProductSerializer):
    class Meta:
        model = Product
        fields = ("id", "name", "price", "discount", "photo")


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("size", "quantity", "product")


с