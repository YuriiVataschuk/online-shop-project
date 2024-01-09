from typing import Dict, Any

from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers, status
from rest_framework.exceptions import AuthenticationFailed


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "email", "password", "is_staff")
        read_only_fields = ("id", "is_staff")
        extra_kwargs = {"password": {"write_only": True, "min_length": 5, "required": True}}

    def create(self, validated_data: Dict[str, Any]) -> get_user_model():
        # email = validated_data.get('email')
        # if get_user_model().objects.filter(email=email).exists():
        #     raise serializers.ValidationError("Користувач з таким емейлом вже існує", code=status.HTTP_400_BAD_REQUEST)

        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()
        else:
            return user


class AuthTokenSerializer(serializers.Serializer):
    email = serializers.CharField(label=_("Email"), write_only=True)
    password = serializers.CharField(
        label=_("Password"),
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )
    token = serializers.CharField(label=_("Token"), read_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"), email=email, password=password
            )
            if not user:
                raise AuthenticationFailed(_("Unable to log in with provided credentials."))
        else:
            raise AuthenticationFailed(_('Must include "email" and "password".'))

        attrs["user"] = user
        return attrs


class UserDetailSerializer(UserSerializer):

    class Meta:
        model = get_user_model()
        fields = ("id",
                  "gender",
                  "password",
                  "name",
                  "surname",
                  "phone",
                  "country",
                  "city",
                  "house",
                  "postcode",
                  "is_staff")
        read_only_fields = ("id", "is_staff")
        extra_kwargs = {"password": {"write_only": True, "min_length": 5, "required": False}}

    def validate_password(self, value):
        if value is None:
            return self.initial_data["password"]
        return value
