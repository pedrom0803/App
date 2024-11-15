from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import *
from django.contrib.auth import logout
from django.http import JsonResponse

class LoginView(APIView):
    def post(self, request):
        print("Login")
        email = request.data.get('email')
        password = request.data.get('password')

        # Busca o usuário pelo email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # Autentica com o email e senha
        user = authenticate(request, username=user.username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
            resposta = {
                'refresh_token': str(refresh),
                'access_token': str(access_token),
            }

            try:
                utilizador = Utilizador.objects.get(user=user)
                resposta['user_type'] = str(utilizador.tipo_user)
            except Utilizador.DoesNotExist:
                resposta['user_type'] = "Administrador"

            return Response(resposta, status=status.HTTP_200_OK)

        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    

class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token", None)
            if not refresh_token:
                return Response({"error": "refresh_token not provided"}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()
            logout(request)
            return Response({"detail": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

