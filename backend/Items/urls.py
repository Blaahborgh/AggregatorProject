from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import NovelViewSet, AuthorViewSet, TagViewSet

router = DefaultRouter()
router.register(r'novels', NovelViewSet)
router.register(r'authors', AuthorViewSet)
router.register(r'tags', TagViewSet)

urlpatterns = router.urls

# urlpatterns = [
#     # path('novels/', NovelView.as_view()),
#     path('novels/', NovelView.as_view({'get': 'list'})),
#     path('novels/<int:pk>', NovelView.as_view({'get': 'retrieve'})),
#     path('authors/', AuthorView.as_view()),
#     # path('tags/', TagView.as_view()),
#     path('tags/', TagView.as_view({'get': 'list'})),
#     path('tags/<int:pk>', TagView.as_view({'get': 'retrieve'})),
# ]
