from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import UserAsciiArt
from .utils import image_to_ascii


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )
        Token.objects.create(user=user)  # Create token on signup
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class UserAsciiArtSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(write_only=True, required=True)

    class Meta:
        model = UserAsciiArt
        fields = ["image", "ascii_art"]
        read_only_fields = ["ascii_art"]

    def create(self, validated_data):
        image_file = validated_data.pop("image")
        ascii_str = image_to_ascii(image_file)
        return UserAsciiArt.objects.create(ascii_art=ascii_str, **validated_data)
