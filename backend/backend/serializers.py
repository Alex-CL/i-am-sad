from rest_framework import serializers

from .models import Quote

class QuoteSerializer(serializers.HyperlinkModelSerializer):
    class Meta:
        model = Quote
        fields = ('quote', 'author')
