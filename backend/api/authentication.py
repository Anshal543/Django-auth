import jwt
from datetime import datetime, timedelta, timezone
from os import getenv
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import BaseAuthentication, get_authorization_header
from .models import User


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        if auth and len(auth) == 2:
            token = auth[1].decode("utf-8")
            id = decode_access_token(token)
            user = User.objects.get(pk=id)
            return (user, None)
        raise AuthenticationFailed("unauthenticated")


def create_access_token(id):
    current_time = datetime.now(timezone.utc)
    return jwt.encode(
        {
            "user_id": id,
            "exp": current_time + timedelta(minutes=2),
            "iat": current_time,
        },
        getenv("ACCESS_TOKEN_SECRET"),
        algorithm="HS256",
    )


def decode_access_token(token):
    try:
        payload = jwt.decode(token, getenv("ACCESS_TOKEN_SECRET"), algorithms=["HS256"])
        return payload.get("user_id")
    except:
        raise AuthenticationFailed("Invalid token or token expired")


def create_refresh_token(id):
    current_time = datetime.now(timezone.utc)
    return jwt.encode(
        {
            "user_id": id,
            "exp": current_time + timedelta(days=7),
            "iat": current_time,
        },
        getenv("REFRESH_TOKEN_SECRET"),
        algorithm="HS256",
    )


def decode_refresh_token(token):
    try:
        payload = jwt.decode(
            token, getenv("REFRESH_TOKEN_SECRET"), algorithms=["HS256"]
        )
        return payload.get("user_id")
    except:
        raise AuthenticationFailed("Invalid token or token expired")
