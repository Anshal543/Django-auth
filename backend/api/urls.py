from django.urls import path
from .views import (
    RegisterAPIView,
    LoginAPIView,
    UserAPIView,
    RefreshTokenAPIView,
    LogoutAPIView,
    ForgotAPIView,
    ResetAPIView,
    TwoFactorAPIView
)

urlpatterns = [
    path("register/", RegisterAPIView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("two-factor/", TwoFactorAPIView.as_view(), name="oauth"),
    path("user/", UserAPIView.as_view(), name="login"),
    path("refresh/", RefreshTokenAPIView.as_view(), name="refresh"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
    path("forgot/", ForgotAPIView.as_view(), name="forgot"),
    path("reset/", ResetAPIView.as_view(), name="reset"),
]
