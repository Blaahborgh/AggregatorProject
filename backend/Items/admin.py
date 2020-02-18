from django.contrib import admin
from .models import Novel, Author, Tag
# Register your models here.

admin.site.register(Novel)
admin.site.register(Author)
admin.site.register(Tag)