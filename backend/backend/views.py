from django.shortcuts import render

from rest_framework import viewsets

from .serializers import QuoteSerializer
from .models import Quote

class QuoteViewSet(viewsets.ModelViewSet):
    queryset = Quote.objects.all().order_by('author')
    serializer_class = QuoteSerializer
