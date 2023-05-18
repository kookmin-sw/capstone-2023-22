
from konlpy.tag import Okt
from soynlp.normalizer import *
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from collections import Counter
import re
import numpy as np
from PIL import Image

def fileread(): # 리뷰 데이터파일 읽고 긍정 부정 분류후 데이터 전처리

    file_path = "/Users/sunho99/PycharmProjects/python_Project/캡스톤디자인/wordcloud_test/total_review.txt"
    total_reviews = []
    with open(file_path) as f:
        lines = f.readlines()
    for i in lines:
        total_reviews.append(i[2:].strip("\n"))
    okt = Okt()
    normalization_total_review = [] # 전처리 할 데이터 리스트
    # 문장 이상한거 수정 및 정규화 진행 전처리
    for review in total_reviews:  # 토탈 리뷰
        review = emoticon_normalize(review,num_repeats=3) #반복되는 이모티콘 정리 최대 3회
        review = repeat_normalize(review,num_repeats=3) # 반복되는 문구 정리 최대 3회
        review = only_hangle(review) # 리뷰중 영어 제외
        review = okt.normalize(review) # 정리
        normalization_total_review.append(review)

    with open("/Users/sunho99/PycharmProjects/python_Project/캡스톤디자인/wordcloud_test/total_review.txt", "w") as total_reviews_file_path:
        for i in normalization_total_review:
            total_reviews_file_path.write(i+"\n")

# fileread()

def total_review_toknizer(): # 불용어 처리
    file_path = "/Users/sunho99/PycharmProjects/python_Project/캡스톤디자인/wordcloud_test/total_review.txt"
    total_reviews = []
    with open(file_path) as f:
        lines = f.readlines()
    for i in lines:
        total_reviews.append(i.strip("\n"))

    okt = Okt()
    normalization_total_review = []

    # 문장 이상한거 수정 및 정규화 진행 전처리
    for review in total_reviews:  # 긍정리뷰
        pattern = '([ㄱ-ㅎㅏ-ㅣ]+)'  # 한글 자음, 모음 제거
        review = re.sub(pattern=pattern, repl='', string=review)
        pattern = '<[^>]*>'  # HTML 태그 제거
        review = re.sub(pattern=pattern, repl='', string=review)
        pattern = '[^\w\s\n]'  # 특수기호제거
        review = re.sub(pattern=pattern, repl='', string=review)
        clean_review = emoticon_normalize(review,num_repeats=3) #반복되는 이모티콘 정리 최대 3회
        clean_review = repeat_normalize(clean_review,num_repeats=3) # 반복되는 문구 정리 최대 3회
        clean_review = only_hangle(clean_review) # 리뷰중 영어 제외
        clean_review = okt.normalize(clean_review) # 정리


        normalization_total_review.append(clean_review)

    with open("/Users/sunho99/PycharmProjects/python_Project/캡스톤디자인/wordcloud_test/total_normalized_review.txt", "w") as positive_file_path:
        for i in normalization_total_review:
            positive_file_path.write(i+"\n")

    return normalization_total_review

def text_TAG(normalization_review):
    okt = Okt()

    pos_reviews = []
    for review in normalization_review: # 형태소 분석
        clean_review = okt.pos(review, stem=True,join=True)

        pos_reviews.append(clean_review)
    # {'Adjective': '형용사',
    #  'Adverb': '부사',
    #  'Alpha': '알파벳',
    #  'Conjunction': '접속사',
    #  'Determiner': '관형사',
    #  'Eomi': '어미',
    #  'Exclamation': '감탄사',
    #  'Foreign': '외국어, 한자 및 기타기호',
    #  'Hashtag': '트위터 해쉬태그',
    #  'Josa': '조사',
    #  'KoreanParticle': '(ex: ㅋㅋ)',
    #  'Noun': '명사',
    #  'Number': '숫자',
    #  'PreEomi': '선어말어미',
    #  'Punctuation': '구두점',
    #  'ScreenName': '트위터 아이디',
    #  'Suffix': '접미사',
    #  'Unknown': '미등록어',
    #  'Verb': '동사'}
    tag_reviews = []
    for i in pos_reviews: #형용사 , 명사 가져오기
        for j in i:
            text_tag = j.split("/") #'편리하다/Adjective'
            if text_tag[1] == "Adjective" or text_tag[1] == "Noun":
                tag_reviews.append(text_tag[0])

    count_tag_reviews = Counter(tag_reviews)
    return count_tag_reviews

normalize_review = total_review_toknizer()
tag_reviews_list = text_TAG(normalize_review)



# 가장 많이 나온 단어부터 150개를 저장한다.
counts = Counter(tag_reviews_list )
tags = counts.most_common(150)


# WordCloud를 생성한다.
# 한글을 분석하기위해 font를 한글로 지정해주어야 된다. macOS는 .otf , window는 .ttf 파일의 위치를
# 지정해준다. (ex. '/Font/GodoM.otf')
masking_image = np.array(Image.open("/Users/sunho99/PycharmProjects/python_Project/캡스톤디자인/wordcloud_test/img2.png"))
wc = WordCloud(font_path="/System/Library/Fonts/Supplemental/AppleGothic.ttf",
               random_state = 123,background_color="white", max_font_size=200,max_words=130,
               width=2000, height=1000,
               mask=masking_image,  # masking
               colormap='rainbow'
               )

cloud = wc.generate_from_frequencies(dict(tags))

# 생성된 WordCloud를 test.jpg로 보낸다.
cloud.to_file('test2.jpg')
plt.figure(figsize=(10, 10))
plt.axis('off')
plt.imshow(cloud, interpolation='bilinear')
plt.show()