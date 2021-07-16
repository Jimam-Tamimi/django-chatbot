from django.conf import settings

def get_base_url(request):
    return {
        'BASE_URL': settings.BASE_URL
    }
