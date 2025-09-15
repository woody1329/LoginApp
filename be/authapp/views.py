from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

from .models import UserAsciiArt
from .serializers import LoginSerializer, UserAsciiArtSerializer, UserSerializer


class SignupView(APIView):
    parser_classes = [MultiPartParser, FormParser]  # accept files

    def post(self, request):
        # Standard user creation
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Handle optional image upload
            image_file = request.FILES.get("image")
            if image_file:
                ascii_serializer = UserAsciiArtSerializer(
                    data={"image": image_file}
                )
                ascii_serializer.is_valid(raise_exception=True)
                ascii_serializer.save(user=user)  # pass user as object, not id

            # Return token as before
            token = Token.objects.get(user=user)
            return Response(
                {
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                    },
                    "token": token.key,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data["username"],
                password=serializer.validated_data["password"],
            )
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response(
                    {
                        "user": {
                            "id": user.id,
                            "username": user.username,
                            "email": user.email,
                        },
                        "token": token.key,
                    },
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        art = UserAsciiArt.objects.filter(user=user).first()
        return Response(
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "ascii_art": art.ascii_art if art else "",
            },
            status=status.HTTP_200_OK,
        )
