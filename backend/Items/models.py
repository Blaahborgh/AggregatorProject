from django.db import models

class Novel(models.Model):
    author = models.ForeignKey(
        'Author',
        null = True,
        on_delete = models.SET_NULL
    )
    name = models.CharField(max_length=200)
    tags = models.ManyToManyField('Tag')
    desc = models.TextField()
    chcount = models.IntegerField()
    url = models.URLField(max_length=200)
    image = models.URLField(max_length=200)
    def __str__(self):
        return self.name

class Author(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name