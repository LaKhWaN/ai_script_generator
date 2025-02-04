from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('generate_script/', views.generate_script, name="generate_script"),
    path('get_scripts/', views.get_saved_scripts, name='get_saved_scripts'),
    path('get_script/<int:script_id>/', views.get_script, name='get_script')
]