from math import trunc
from django.http.response import JsonResponse
from django.shortcuts import render
from json import  loads
from home.models import MessageException, Data
from random import choice
from difflib import SequenceMatcher
# Create your views here.
def getResponse(reuqest):
    def strInStr(userMessage, message):
        userMessageList = list(userMessage.lower())
        messageList = list(message.lower())
        for char in messageList:
            if(char in userMessageList):
                continue
            else:
                return False
                break
        return True
    
    def getReply(userMessage):
        for data in Data.objects.all():
            for message in data.message.all():
                if(userMessage.lower() in message.message.lower() or strInStr(userMessage, message.message)):
                    userMessageLength = len(userMessage)
                    messageLength = len(message.message)
                    print( messageLength / userMessageLength)
                    if(messageLength / userMessageLength < 2 or messageLength / userMessageLength > .5):
                        matchQuestionRatio = SequenceMatcher(None,userMessage.lower(), message.message.lower()).ratio()
                        if(matchQuestionRatio >= .65):
                            randReply = choice(data.reply.all()).reply
                            data.index += 1
                            data.save()
                            return randReply
        return None
        


    requestData = loads(reuqest.body)
    userMessage = requestData['message'].lower()
    if(len(Data.objects.all()) == 0):
        return JsonResponse({"satus": True, "reply": "Please contact with the developer."})
    reply = getReply(userMessage)
    if(reply is not None):
        context = {
            "status": True,
            "reply": reply
        }
    else:
        messageException = MessageException.objects.all()

        context = {
            "status": True,
            "reply": choice(messageException).message
        }
    
    return JsonResponse(context)