# print("3434".isalpha())

import difflib



# print(difflib.SequenceMatcher(None,'hello','helo').ratio())


# print(list("hello"))


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

print(strInStr("Helo", "hello"))