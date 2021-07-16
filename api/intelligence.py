import wikipedia
from datetime import datetime


stop_words = {'tell', 'me', 'about', 'can', 'your', 'please', 'plz', 'what', 'do', 'you', 'know'}


timeQuery = [
    'what is the time',
    'tell me the time',
    'the time'
]
def tellMeAbout(message):
    messageList = message.split()
    for word in stop_words:
        if(word in messageList):
            messageList.remove(word)
    topic = "".join(f"{word} " for word in messageList)
    topic = topic.strip()
    print(topic)
    try:
        return wikipedia.summary(topic, sentences = 1)
    except Exception:
        return "Couldn't find anything about this topic."


def getCurrentTime():
    currentTime = datetime.now()
    currentTimeStr = str(f"{currentTime.hour} hour and {currentTime.minute} minute")
    return currentTimeStr


def advanceMessages(message):
    if('about' in message):
        return tellMeAbout(message)
    elif('the time' in message or 'current time' in message):
        return getCurrentTime()

    else:
        return None
