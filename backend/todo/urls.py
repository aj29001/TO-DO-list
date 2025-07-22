from django.urls import path
from .views import TaskListCreateView, TaskRetrieveUpdateDestroy

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view()),
    path('tasks/<int:pk>/', TaskRetrieveUpdateDestroy.as_view()),
]