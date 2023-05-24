import pandas as pd
import numpy as np
from prophet import Prophet
from datetime import datetime, timedelta
import holidays
import os
import matplotlib.dates as mdates
import matplotlib.pyplot as plt
import boto3
import matplotlib as mpl
import io
from sklearn.metrics import mean_squared_error
import math


# S3 버킷 및 파일 경로
bucket_name = 'mlops-api-output'
file_key = '2023/2023.csv'

# S3 클라이언트 생성
s3 = boto3.client('s3', aws_access_key_id="{HIDDEN}",
                  aws_secret_access_key="{HIDDEN}")

# CSV 파일 다운로드 및 읽기
response = s3.get_object(Bucket=bucket_name, Key=file_key)
df = pd.read_csv(io.BytesIO(response["Body"].read()))

df_index_list = df.index
df.insert(0, "지역", df_index_list)
df_reset = df.reset_index(drop=True)
df_reset['PPLTN_TIME'] = df_reset['PPLTN_TIME'].apply(lambda _: datetime.strptime(_, '%Y-%m-%d %H:%M'))
df_reset['PPLTN_TIME'] = df_reset['PPLTN_TIME'].dt.strftime('%Y-%m-%d %H:00:00')
local_list = df_reset["지역"].unique()

# 한국 휴일 객체 생성
kr_holidays = holidays.KR()
df_reset['holiday'] = df_reset.PPLTN_TIME.apply(lambda x: True if x in kr_holidays else False)
df = df_reset.rename(columns={'PPLTN_TIME': 'ds', 'AREA_PPLTN_MAX': 'y'})
df['ds'] = pd.to_datetime(df['ds'])

# RMSE, y 평균값, yhat 평균값을 저장할 데이터프레임 생성
rmse_df = pd.DataFrame(columns=['지역', 'RMSE', 'y 평균값', 'yhat 평균값'])


for i in local_list:
    plt.clf()  # plt 초기화
    local_df = df["지역"] == i  # "지역" column에서 "경복궁" 값을 가지고 있는 행 추출
    print(i)
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
    model = Prophet(
        # Trend
        growth="linear",
        changepoints=None,
        n_changepoints=10,
        changepoint_range=1,
        changepoint_prior_scale=0.5,
        interval_width=0.95,

        # Holiday
        holidays=None)
    model.fit(new_df)
    # 미래 예측 생성
    future = model.make_future_dataframe(freq="H", periods=24)
    # print(future)
    # 미래 예측
    forecast = model.predict(future)
    test_day = latest_date
    start_day = test_day - timedelta(days=1) # 어제 날짜
    test = new_df[new_df['ds'] > start_day]
    predict = forecast[forecast['ds'] > test_day]
    # 실제 값
    actual_values = test['y']
    # 예측 값
    predicted_values = predict['yhat']
    # RMSE 계산
    rmse = round(math.sqrt(mean_squared_error(actual_values, predicted_values)),2)
    # 평균 값 계산
    mean_value = round(predicted_values.mean(),2)

    # y의 평균값 계산
    y_mean = round(actual_values.mean(),2)

    # yhat의 평균값 계산
    yhat_mean = round(predicted_values.mean(),2)

    # 데이터프레임에 결과 값 추가
    rmse_df = rmse_df.append({'지역': i, 'RMSE': rmse, 'y 평균값': y_mean, 'yhat 평균값': yhat_mean}, ignore_index=True)

# CSV 파일로 저장
rmse_df.to_csv('result.csv', index=False)

