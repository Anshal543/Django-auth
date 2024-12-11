from django.shortcuts import render
from rest_framework.views import APIView
import random, string
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.exceptions import APIException, AuthenticationFailed
from .models import User, UserToken, ResetPassword
from .authentication import (
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
)
from .authentication import JWTAuthentication
from datetime import datetime, timezone, timedelta
from django.core.mail import send_mail, EmailMessage


class RegisterAPIView(APIView):
    def post(self, request):
        data = request.data
        if data["password"] != data["password_confirm"]:
            raise APIException("Passwords do not match")
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginAPIView(APIView):
    def post(self, request):
        current_time = datetime.now(timezone.utc)
        data = request.data
        email = data.get("email")
        password = data.get("password")
        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed("Invalid credentials")
        if not user.check_password(password):
            raise APIException("Incorrect password")
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        UserToken.objects.create(
            user_id=user.id,
            token=refresh_token,
            expired_at=current_time + timedelta(days=7),
        )
        response = Response()
        response.set_cookie(key="refresh_token", value=refresh_token, httponly=True)
        response.data = {
            "access_token": access_token,
        }
        return response

class TwoFactorAPIView(APIView):
    def post(self,request):
        pass

class UserAPIView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class RefreshTokenAPIView(APIView):
    def post(self, request):
        current_time = datetime.now(timezone.utc)
        refresh_token = request.COOKIES.get("refresh_token")
        id = decode_refresh_token(refresh_token)
        if not UserToken.objects.filter(
            user_id=id, token=refresh_token, expired_at__gt=current_time
        ).exists():
            raise AuthenticationFailed("Invalid refresh token")
        access_token = create_access_token(id)
        return Response({"access_token": access_token})


class LogoutAPIView(APIView):
    # authentication_classes = [JWTAuthentication]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        UserToken.objects.filter(token=refresh_token).delete()
        # UserToken.objects.filter(user_id=request.user.id).delete()
        response = Response()
        response.delete_cookie("refresh_token")
        response.data = {"message": "success"}
        return response


class ForgotAPIView(APIView):
    def post(self, request):
        email = request.data["email"]
        token = "".join(
            random.choice(string.ascii_lowercase + string.digits) for _ in range(10)
        )
        ResetPassword.objects.create(email=email, token=token)
        url = f"http://localhost:5173/reset/{token}"
        # send_mail(
        #     subject="Reset Password",
        #     message=f'Click the <a href="%s">link</a> to reset your password'%url,
        #     from_email="from@emample.com",
        #     recipient_list=[email],
        # )
        email = EmailMessage(
            subject="Reset Password",
            body=f'Click the <a href="{url}">link</a> to reset your password',
            from_email="from@example.com",
            to=[email],
        )
        email.content_subtype = "html" 
        email.send()
        return Response({"message": "success"})


class ResetAPIView(APIView):
    def post(self, request):
        data = request.data
        if data["password"] != data["password_confirm"]:
            raise APIException("Passwords do not match")

        token = data["token"]
        reset = ResetPassword.objects.filter(token=token).first()
        if reset is None:
            raise APIException("Invalid token")
        user = User.objects.filter(email=reset.email).first()
        if user is None:
            raise APIException("User not found")

        user.set_password(data["password"])
        user.save()
        reset.delete()
        return Response({"message": "success"})
