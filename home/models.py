from django.db import models

# Create your models here.


class Tag(models.Model):
    tag = models.CharField("Data Tag", max_length=50, blank=False, default="blank")
    def __str__(self):
        return str(self.tag)

class Question(models.Model):
    question = models.CharField("Question", max_length=500, blank=False, null=False, default="blank")

    def __str__(self):
        return str(self.question)


class Answer(models.Model):
    answer = models.CharField("Answer", max_length=500, blank=False, null=False, default="blank")

    def __str__(self):
        return str(self.answer)

class Data(models.Model):
    tag = models.ManyToManyField(Tag)
    question = models.ManyToManyField(Question)
    answer = models.ManyToManyField(Answer)

    def __str__(self):
        return str(self.question)
