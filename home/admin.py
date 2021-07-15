from django.contrib import admin
from home.models import Tag, Question, Answer, Data
# Register your models here.
admin.site.register((Tag, Question, Answer, Data))
