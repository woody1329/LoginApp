from django.urls import path

from .views import LoginView, SignupView, UserView

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("user/", UserView.as_view(), name="user"),
]
