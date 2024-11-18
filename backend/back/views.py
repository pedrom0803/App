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
        email = request.data.get('email')
        password = request.data.get('password')

        # Busca o usuário pelo email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(request, username=user.username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
            resposta = {
                'refresh_token': str(refresh),
                'access_token': str(access_token),
                'id_user': user.id
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

class CreatClientView(APIView):
    def post(self, request):
        nome_completo=request.data.get("nameForm")
        email=request.data.get("emailForm")
        password=request.data.get("passwordForm")
        if User.objects.filter(email=email).exists():
            return Response({"error": "O  emial já está em uso."},status= status.HTTP_400_BAD_REQUEST)
        username = " ".join([nome_completo.split()[0], nome_completo.split()[-1]])
        
        user = User.objects.create_user(username, email, password)
        
        u = Utilizador(user=user, nome_completo=nome_completo, tipo_user="Cliente")
        u.save()
        
        return Response({"message": "Usuário criado com sucesso."}, status=status.HTTP_201_CREATED)
    
        
        
class InfoUserView(APIView):
    def get(self, request, id):
        try:
            utilizador = Utilizador.objects.get(user_id=id)
            # Retorna os dados do usuário em formato JSON
            return Response({
                "nome_completo": utilizador.nome_completo,
                "email": utilizador.user.email,  # Acessa o email do modelo User
                "contacto": utilizador.contacto,
                "tipo_user": utilizador.tipo_user,
                "morada": utilizador.morada,
                "distrito": utilizador.distrito,
                "concelho": utilizador.concelho,
                "codigo_postal": utilizador.codigo_postal,
                "porta": utilizador.porta,
            }, status=status.HTTP_200_OK)
        except Utilizador.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        
class ChangeInfoClientView(APIView):
    def post(self,request):
        id=request.data.get("id")
        values=request.data.get("values")

        contacto = values["contacto"]
        morada=values["morada"]
        distrito=values["distrito"]
        concelho= values["concelho"]
        porta=values["porta"]
        codigo_postal = values["codigo_postal"]

        try:
            utilizador = Utilizador.objects.get(user_id=id)
            utilizador.contacto=str(contacto)
            utilizador.morada=str(morada)
            utilizador.distrito=str(distrito)
            utilizador.concelho=str(concelho)
            utilizador.porta=str(porta)
            utilizador.codigo_postal = str(codigo_postal)
            
            utilizador.save()
        except KeyError as e:
            return Response({"detail": f"Missing field: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        except Utilizador.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Unexpected error: {e}")
            return Response({"detail": f"Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"detail": "Dados atualizados com sucesso"}, status=status.HTTP_200_OK)
    
class GetDistritosConcelhos(APIView):
    def get(self, request):
        return