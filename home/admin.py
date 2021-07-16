from django.contrib import admin
from home.models import Tag, Message, Reply, Data, MessageException
# Register your models here.
admin.site.register((Tag, Message, Reply, Data, MessageException))
