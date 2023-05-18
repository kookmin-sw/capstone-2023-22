import pandas as pd
import numpy as np
from prophet import Prophet
from datetime import datetime, timedelta
import holidays
import os
import matplotlib.dates as mdates
import matplotlib.pyplot as plt
import boto3
from matplotlib import rc, font_manager
# from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error
import matplotlib as mpl
import io
import schedule
import time

def job():
    # S3 버킷 및 파일 경로
    bucket_name = 'mlops-api-output'
    file_key = '2023/2023.csv'

    # S3 클라이언트 생성
    s3 = boto3.client('s3', aws_access_key_id="{HIDDEN}", aws_secret_access_key="{HIDDEN}")

    # CSV 파일 다운로드 및 읽기
    response = s3.get_object(Bucket=bucket_name, Key=file_key)
    df = pd.read_csv(io.BytesIO(response["Body"].read()))

    df_index_list = df.index
    df.insert(0,"지역",df_index_list)
    df_reset= df.reset_index(drop=True)
    df_reset['PPLTN_TIME']=df_reset['PPLTN_TIME'].apply(lambda _ : datetime.strptime(_,'%Y-%m-%d %H:%M'))
    df_reset['PPLTN_TIME'] = df_reset['PPLTN_TIME'].dt.strftime('%Y-%m-%d %H:00:00')
    local_list = df_reset["지역"].unique()


    # 한국 휴일 객체 생성
    kr_holidays = holidays.KR()
    df_reset['holiday'] = df_reset.PPLTN_TIME.apply(lambda x: True if x in kr_holidays else False)
    df = df_reset.rename(columns={'PPLTN_TIME': 'ds', 'AREA_PPLTN_MAX': 'y'})
    df['ds'] = pd.to_datetime(df['ds'])


    for i in local_list:

        plt.clf() # plt 초기화
        local_df = df["지역"] == i  # "지역" column에서 "경복궁" 값을 가지고 있는 행 추출
        filtered_local_df = df[local_df]


        # 날짜를 기준으로 정렬
        filtered_local_df = filtered_local_df.sort_values('ds', ascending=False)

        # 오늘 날짜 가져오기
        # latest_date = filtered_local_df.iloc[0]['ds']
        today = datetime.today().strftime("%Y-%m-%d 00:00:00")
        latest_date = datetime.today().strptime(today, "%Y-%m-%d 00:00:00")

        # 최근 n 일 동안의 데이터 선택
        start_date = latest_date - timedelta(days=30)

        new_df = filtered_local_df[filtered_local_df['ds'] >= start_date]

        test_day = latest_date
        new_df = new_df[new_df['ds'] <= test_day]

        # print(df['ds'])
        new_df = new_df.sort_values('ds', ascending=True)
        model = Prophet()
        # 주기성 설정
        model.add_seasonality(name='weekly', period=7, fourier_order=3)
        model.fit(new_df)

        # 미래 예측 생성
        # freq = "H",
        future = model.make_future_dataframe(periods=30)
        # print(future)
        # 미래 예측
        forecast = model.predict(future)

        # Day of week 그래프 생성
        plt.rcParams["font.family"] = 'NanumGothic' # 한글 폰트 적용
        mpl.rcParams['axes.unicode_minus'] = False

        forecast['day_of_week'] = forecast['ds'].dt.dayofweek
        mean_by_day = forecast.groupby('day_of_week')['yhat'].mean()
        day_labels = ["월","화","수","목","금","토","일"]
        mean_by_day.index = range(7)  # 0부터 6까지의 숫자로 변환

        # 최고값 찾기
        max_value = mean_by_day.max()
        max_day = mean_by_day.idxmax()

        # 최고값 표시
        plt.text(max_day, max_value,"주간 최고혼잡" , ha='center', va='bottom',bbox=dict(facecolor='white', edgecolor='black', boxstyle='round'))

        colors = ['#ffc000', '#d395d0', '#6a2ed1', '#CDF5CC', '#F4CCF5',"#d6a28b","#8bb2d6"]
        mean_by_day.plot(kind='line',linewidth=4,color=colors[2])
        # x 축 레이블 설정
        plt.xticks(range(7), day_labels)
        plt.savefig("%s_week.png" % i,bbox_inches = 'tight')
        plt.close()

        output_filename = "%s_week.png" % i
        file_name = output_filename
# #
        file_path = os.path.realpath(output_filename)
    # # S3 버킷 이름과 업로드할 객체 키를 지정합니다.
        bucket_name = 'mlops-models-bucket'
        object_key = "week_trend/" + "%s/" % i + file_name
        # 로컬 파일을 S3에 업로드합니다.
        s3.upload_file(file_path, bucket_name, object_key)

schedule.every().day.at("00:10").do(job)

while True:
     schedule.run_pending()
     time.sleep(1)
