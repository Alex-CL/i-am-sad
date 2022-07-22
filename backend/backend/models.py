import uuid

from django.db import models

class List(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    title = models.CharField(max_length = 100)
    createdAt = models.DateField()
    
    def __str__(self):
    	return self.title


class Quote(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    author = models.CharField(max_length = 100)
    quote = models.TextField()
    lists = models.ManyToManyField(List)

    def __str__(self):
        return self.quote


