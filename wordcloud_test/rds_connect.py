import time

import pymysql
import csv
import pandas as pd
from konlpy.tag import Okt
from soynlp.normalizer import *
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import matplotlib as mpl
from collections import Counter
import re
import numpy as np
from PIL import Image
import boto3
import io
import os
import schedule
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import pandas as pd
import requests



def job():
    try:
        # S3 클라이언트 생성
        s3 = boto3.client('s3', aws_access_key_id="{HIDDEN}", aws_secret_access_key="{HIDDEN}")


        host = '{HIDDEN}'
        user = '{HIDDEN}'
        port = 3306
        password = '{HIDDEN}'
        database = '{HIDDEN}'

        conn = pymysql.connect(host=host,port=port,user=user, password=password, database=database)
        cursor = conn.cursor()
        # feed,place,area
        query = "SELECT area_name,content FROM place LEFT JOIN feed ON place.id = feed.place_id JOIN area ON place.area_id = area.id WHERE length(content)>=1"
        cursor.execute(query) # 쿼리 실행
        results = cursor.fetchall()
        # CSV 파일로 저장
        csv_filename = 'query_results.csv'
        with open(csv_filename, 'w', newline='') as csv_file:
            csv_writer = csv.writer(csv_file)
            csv_writer.writerow([i[0] for i in cursor.description])  # 헤더 생성
            csv_writer.writerows(results)
        # 연결 종료
        cursor.close()
        conn.close()

        df = pd.read_csv("/home/ubuntu/wordcloud/query_results.csv")
        combined_reviews = df.groupby('area_name')['content'].apply(list).reset_index()

        for index, row in combined_reviews.iterrows():
            area_name = row['area_name']
            chrome_options = webdriver.ChromeOptions()
            chrome_options.add_argument("--headless")
            # linux 환경에서 필요한 option
            chrome_options.add_argument('--no-sandbox')
            chrome_options.add_argument('--disable-dev-shm-usage')
           #options.add_argument("--disable-blink-features=AutomationControlled")

            #options.add_experimental_option("excludeSwitches", ["enable-automation"])
            #options.add_experimental_option("useAutomationExtension", False)
            #options.add_experimental_option("prefs", {"prfile.managed_default_content_setting.images": 2})
            driver = webdriver.Chrome(
            executable_path='chromedriver',chrome_options=chrome_options)

            area_name = row['area_name']
            url = 'https://news.google.com/?hl=ko&gl=KR&ceid=KR%3Ako'
            driver.get(url)
            driver.implicitly_wait(3)
            keywords = area_name
            search = driver.find_element(By.XPATH,
                                     '//*[@id="gb"]/div[2]/div[2]/div/form/div[1]/div/div/div/div/div[1]/input[2]')

            search.send_keys(keywords)
            search.send_keys(Keys.ENTER)
            driver.implicitly_wait(30)
            url = driver.current_url
            resp = requests.get(url)
            soup = bs(resp.text, 'lxml')

            titles = [] # new 제목

            for link in soup.select('h3 >a'):
                href = 'https://news.google.com' + link.get('href')[1:]
                title = link.string
                titles.append(title)
            driver.quit()
            review_data = row['content']
            if len(review_data) < 10:
                continue
            total_reviews = []
            for review in review_data:
                total_reviews.append(review)
            okt = Okt()
            total_reviews = total_reviews + titles
            normalization_total_review = []

            # 문장 이상한거 수정 및 정규화 진행 전처리
            for review in total_reviews:  # 긍정리뷰
                pattern = '([ㄱ-ㅎㅏ-ㅣ]+)'  # 한글 자음, 모음 제거
                review = re.sub(pattern=pattern, repl='', string=review)
                pattern = '<[^>]*>'  # HTML 태그 제거
                review = re.sub(pattern=pattern, repl='', string=review)
                pattern = '[^\w\s\n]'  # 특수기호제거
                review = re.sub(pattern=pattern, repl='', string=review)
                clean_review = emoticon_normalize(review, num_repeats=3)  # 반복되는 이모티콘 정리 최대 3회
                clean_review = repeat_normalize(clean_review, num_repeats=3)  # 반복되는 문구 정리 최대 3회
                clean_review = only_hangle(clean_review)  # 리뷰중 영어 제외
                clean_review = okt.normalize(clean_review)  # 정리
                normalization_total_review.append(clean_review)

            pos_reviews = []
            for review in normalization_total_review:  # 형태소 분석
                clean_review = okt.pos(review, stem=True, join=True)

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
            for i in pos_reviews:  # 형용사 , 명사 가져오기
                for j in i:
                    text_tag = j.split("/")  # '편리하다/Adjective'
                    if  text_tag[1] == "Noun":
                        tag_reviews.append(text_tag[0])

            # 가장 많이 나온 단어부터 30개를 저장한다.
            count_tag_reviews = Counter(tag_reviews)
            tags = count_tag_reviews.most_common(50)
            # WordCloud를 생성한다.
            # 한글을 분석하기위해 font를 한글로 지정해주어야 된다. macOS는 .otf , window는 .ttf 파일의 위치를
            # 지정해준다. (ex. '/Font/GodoM.otf')
            masking_image = np.array(Image.open("/home/ubuntu/wordcloud/img2.png"))
            wc = WordCloud(font_path="/usr/share/fonts/truetype/nanum/NanumGothic.ttf",
                       random_state=123, background_color="white", max_font_size=200, max_words=30,
                       width=2000, height=1000,
                       mask=masking_image,  # masking
                       colormap='rainbow'
                       )

            cloud = wc.generate_from_frequencies(dict(tags))

            # 생성된 WordCloud를 test.jpg로 보낸다.
            cloud.to_file("%s.jpg"%area_name)
            plt.rcParams["font.family"] = 'NanumGothic' # 한글 폰트 적용
            mpl.rcParams['axes.unicode_minus'] = False
            plt.figure(figsize=(10, 10))
            plt.axis('off')
            plt.imshow(cloud, interpolation='bilinear')
            #plt.title("%s 트랜드"%area_name)
            plt.savefig("%s.jpg" % area_name) # 각 구에 맞는 나이 비율 이미지

            plt.close()

            output_filename = "%s.jpg" % area_name
            file_name = output_filename

            file_path = os.path.realpath(output_filename)
            # # # S3 버킷 이름과 업로드할 객체 키를 지정합니다.
            bucket_name = 'mlops-models-bucket'
            object_key = "wordcloud/" + "%s/" % area_name + file_name
            # 로컬 파일을 S3에 업로드합니다.
            s3.upload_file(file_path, bucket_name, object_key)
    except ValueError:
            pass
schedule.every(5).minutes.do(job)

while True:
    schedule.run_pending()
    time.sleep(1)
