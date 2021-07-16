# print("3434".isalpha())

import difflib



# print(difflib.SequenceMatcher(None,'hello','helo').ratio())


# print(list("hello"))


# def strInStr(userMessage, message):
#     userMessageList = list(userMessage.lower())
#     messageList = list(message.lower())
#     for char in messageList:
#         if(char in userMessageList):
#             continue
#         else:
#             return False
#             break
#     return True

# print(strInStr("Helo", "hello"))


import wikipedia

# page = wikipedia.page("Python (programming language)")

# print(page.summary)
# print(wikipedia.search("Barack"))

# print("n n n  ni nini ini ni". replace('n', ''))



# a =  {'is', 'the', 'but', "haven't", 'themselves', 'once', 'll', 'doesn', 'an', 'what', 'here', "should've", 'not', 'it', 'shouldn', 
# 'so', 'against', 'how', 'down', 'was', 'same', 'its', 'her', 'be', 'them', 'had', 'into', "shan't", 'y', 'himself', 'other', "you'll", 'a', 'under', 'below', 'own', 'hadn', 'd', 'hers', 'this', 'itself', 'whom', 'again', 'nor', 'am', 'my', 'when', 'to', 'through', 'him', "isn't", 'won', 'no', 'm', 'both', 'your', 'tell', "doesn't", 'these', 'why', 'during', "don't", 's', 'than', 'they', 't', 'because', "couldn't", 'haven', 'don', 'wasn', 'before', 'most', 'wouldn', 'which', "it's", 'he', 'very', 'me', 'do', 'who', 'ours', 'should', 'just', 'isn', 'our', 'until', 'any', 'his', 'we', 'ain', 'in', 'and', 'didn', "won't", 'doing', 'yours', 'has', 'aren', "that'll", 'then', 'where', 'at', 'now', 'each', 'as', 'ourselves', "you'd", "wouldn't", 'more', 'having', 'or', 'about', 'will', 'ma', 'are', 'o', 'needn', 'out', "wasn't", 'been', 'being', 've', 'such', "mightn't", 'by', "hasn't", 'i', 'while', 'myself', 'only', 'after', 'off', 'all', 'of', 'mightn', "needn't", 'too', 'yourself', 'did', 'those', 'on', 'couldn', "hadn't", "mustn't", 'some', 'she', 'that', 're', "you've", 'have', 'for', "aren't", 'if', 'can', 'does', 'above', 'over', 'yourselves', "you're", 'from', 'with', 'up', 'weren', 'hasn', "she's", 'their', "weren't", "shouldn't", 'were', "didn't", 'few', 'there', 'you', 'between', 'further', 'theirs', 'herself', 'shan', 'mustn'}

# print(set(a))

# a = "nnnfrnnfn"
# a.replace('n', '')
# print(a)


from api import intelligence

wikipedia.summary("python django", sentences = 2)

print(intelligence.advanceMessages('tell me about youtube'))

# print("name is jimam".split(' '))