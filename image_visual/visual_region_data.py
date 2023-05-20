import pandas as pd
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import boto3
import os
import io
from matplotlib import rc, font_manager
import schedule
import time


def job():
    s3 = boto3.client('s3', aws_access_key_id="{HIDDEN}", aws_secret_access_key="{HIDDEN}")

    # S3 버킷 및 파일 경로
    bucket_name = 'mlops-api-output'
    file_key = '2023/2023.csv'

    # CSV 파일 다운로드 및 읽기
    response = s3.get_object(Bucket=bucket_name, Key=file_key)
    df = pd.read_csv(io.BytesIO(response["Body"].read()))
    df_index_list = df.index
    df.insert(0,"지역",df_index_list)
    df_reset= df.reset_index(drop=True)
    df_reset['PPLTN_TIME']=df_reset['PPLTN_TIME'].apply(lambda _ : datetime.strptime(_,'%Y-%m-%d %H:%M'))

    local_list = df_reset["지역"].unique()
    # 한국 휴일 객체 생성

    # 최근 2주 데이터 가져오기
    total_male_mean_value = []
    total_female_mean_value = []
    total_rate_10 = []
    total_rate_20 = []
    total_rate_30 = []
    total_rate_40 = []
    total_rate_50 = []
    for i in local_list:
        local_df = df_reset["지역"] == i  # "지역" column에서 "경복궁" 값을 가지고 있는 행 추출
        filtered_local_df = df_reset[local_df]
        # 날짜를 기준으로 정렬
        filtered_local_df = filtered_local_df.sort_values('PPLTN_TIME', ascending=False)
        # 최신 날짜 가져오기
        latest_date = filtered_local_df.iloc[0]['PPLTN_TIME']
        # 최근 14일 동안의 데이터 선택
        start_date = latest_date - timedelta(days=14)

        recent_data = filtered_local_df[filtered_local_df['PPLTN_TIME'] >= start_date]

    # print(recent_data)

        # 특정 열의 평균값 계산
        male_mean_value = round(recent_data['MALE_PPLTN_RATE'].mean(), 1)
        female_mean_value = round(recent_data['FEMALE_PPLTN_RATE'].mean(), 1)
        RATE_10 = round(recent_data['PPLTN_RATE_0'].mean(), 1) + round(recent_data['PPLTN_RATE_10'].mean(), 1)  # 0~10대 비율
        RATE_20 = round(recent_data['PPLTN_RATE_20'].mean(), 1)  # 20대 비율
        RATE_30 = round(recent_data['PPLTN_RATE_30'].mean(), 1)  # 30대 비율
        RATE_40 = round(recent_data['PPLTN_RATE_40'].mean(), 1)  # 40대 비율
        RATE_50 = round(recent_data['PPLTN_RATE_50'].mean(), 1) + round(recent_data['PPLTN_RATE_60'].mean(), 1) + round(
        recent_data['PPLTN_RATE_70'].mean(), 1)  # 50~70대 비율

        total_male_mean_value.append(male_mean_value)
        total_female_mean_value.append(female_mean_value)
        total_rate_10.append(RATE_10)
        total_rate_20.append(RATE_20)
        total_rate_30.append(RATE_30)
        total_rate_40.append(RATE_40)
        total_rate_50.append(RATE_50)

    # 새로운 DataFrame 생성
    data = {'region': local_list,
        'male': total_male_mean_value,
        'female': total_female_mean_value,
        'rate_10' : total_rate_10,
        'rate_20' : total_rate_20,
        'rate_30' : total_rate_30,
        'rate_40' : total_rate_40,
        'rate_50' : total_rate_50
        }
    df = pd.DataFrame(data)

    for i in local_list:


        local_df = df["region"] == i  # "지역" column에서 "지역 정보" 값을 가지고 있는 행 추출
        filtered_local_df = df[local_df]
        labels = filtered_local_df.columns[1:3]
        labels_column = filtered_local_df[['female','male']].values
        # print(labels)
        values = [labels_column[0,0],labels_column[0,1]]
        colors = ['#ffc000', '#d395d0']
        explode = (0.05, 0.05)  # 조각을 돌출시킬 값
        wedgeprops = {'width': 0.5, 'edgecolor': 'w', 'linewidth': 5}
        label =["남성","여성"]

        plt.rcParams["font.family"] = 'NanumGothic'  # 한글 폰트 적용

        # 그래프 그리기 인구 성비 원형 파이
        plt.pie(values, labels=label,autopct='%.1f%%', startangle=260, counterclock=False, explode=explode, shadow=True, colors=colors)
        plt.legend(label)
        #plt.title("%s 남녀 성비율" % i,weight='bold',fontsize=10)
        plt.axis('equal')  # 원을 원형으로 유지
        plt.axis('off')
        plt.savefig("%s_rate_sex.png"%i,pad_inches=0) # 각 구에 맞는 성 비율 이미지
        # plt.show()
        output_filename = "%s_rate_sex.png"%i
        file_name = output_filename

        file_path = os.path.realpath(output_filename)
        # # # S3 버킷 이름과 업로드할 객체 키를 지정합니다.
        bucket_name = 'mlops-models-bucket'
        object_key = "sex,old-rate/" + "%s/"%i  +file_name
        # 로컬 파일을 S3에 업로드합니다.
        s3.upload_file(file_path, bucket_name, object_key)

        plt.close()
        plt.clf() # plt 초기화


        # 데이터 준비
        rate_column = filtered_local_df[['rate_10', 'rate_20', 'rate_30', 'rate_40', 'rate_50']].values
        x = ['20대 미만', '20대', '30대', '40대', '50대 이상']
        rate_values = [rate_column[0,0],rate_column[0,1],rate_column[0,2],rate_column[0,3],rate_column[0,4]]
        # 최고값 찾기
        max_value = max(rate_values)
        max_index = rate_values.index(max_value)

        plt.rcParams["font.family"] = 'NanumGothic'  # 한글 폰트 적용
        colors = ['#ffc000', '#d395d0','#CCCDF5','#CDF5CC','#F4CCF5']
        # 막대 그래프 그리기
        x = plt.bar(x, rate_values,color=colors)

        # 최고값 표시
        plt.text(max_index, max_value, str(round(max_value,1))+"%", ha='center', va='bottom',weight='bold',fontsize=8,color='black')

        # 크기 표시하기
        for p in x.patches:
            left, bottom, width, height = p.get_bbox().bounds
            plt.annotate(f"{str(int(height))+'%'}", (left + width / 2, height * 0.5), ha='center', size=10, color='black')
        #plt.title("%s 나이대 비율" % i,weight='bold',fontsize = 10)
        plt.savefig("%s_rate_old.png" % i) # 각 구에 맞는 나이 비율 이미지
        plt.close()
        plt.clf() # plt 초기화


        output_filename = "%s_rate_old.png" % i
        file_name = output_filename

        file_path = os.path.realpath(output_filename)
        # # # S3 버킷 이름과 업로드할 객체 키를 지정합니다.
        bucket_name = 'mlops-models-bucket'
        object_key = "sex,old-rate/" + "%s/" % i + file_name
        # 로컬 파일을 S3에 업로드합니다.
        s3.upload_file(file_path, bucket_name, object_key)

schedule.every().day.at("00:10").do(job)

while True:
    schedule.run_pending()
    time.sleep(1)

# print(df)
