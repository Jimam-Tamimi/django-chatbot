from django.db import models

# Create your models here.


class Tag(models.Model):
    tag = models.CharField("Data Tag", max_length=50, blank=False, default="blank")
    def __str__(self):
        return str(self.tag)

class Message(models.Model):
    message = models.CharField("Message", max_length=500, blank=False, null=False, default="blank")
    index = models.PositiveBigIntegerField('Index', default=0, null=True, blank=True)



    class Meta:
        ordering  = ['-index']


    def __str__(self):
        return str(self.message)


class Reply(models.Model):
    reply = models.CharField("Reply", max_length=500, blank=False, null=False, default="blank")

    def __str__(self):
        return str(self.reply)

class Data(models.Model):
    tag = models.ManyToManyField(Tag)
    message = models.ManyToManyField(Message)
    reply = models.ManyToManyField(Reply)
    index = models.PositiveBigIntegerField('Index', default=0, null=True, blank=True)
    
    
    class Meta:
        ordering  = ['-index']

    def __str__(self):
        return str("".join(message.message + " | " for message in self.message.all().order_by('-index') ))

class MessageException(models.Model):
    message = models.CharField("Exception Message", max_length=200, null=False, blank=False)

    def __str__(self):
        return str(self.message)
