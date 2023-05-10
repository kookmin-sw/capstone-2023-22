import pandas as pd
import numpy as np
from prophet import Prophet
from datetime import datetime, timedelta
import holidays
from fbprophet.plot import add_changepoints_to_plot
import matplotlib.dates as mdates
import matplotlib.pyplot as plt

from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error

df = pd.read_csv('/Users/sunho99/PycharmProjects/python_Project/캡스톤디자인/series_data_modeling/2023.csv', index_col=0)

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
    print(i)
    filtered_local_df = df[local_df]


    # 날짜를 기준으로 정렬
    filtered_local_df = filtered_local_df.sort_values('ds', ascending=False)

    # 최신 날짜 가져오기
    latest_date = filtered_local_df.iloc[0]['ds']
    # 최근 n 일 동안의 데이터 선택
    start_date = latest_date - timedelta(days=30)

    new_df = filtered_local_df[filtered_local_df['ds'] >= start_date]

    test_day = "2023-05-08 00:00:00"
    new_df = new_df[new_df['ds'] <= test_day]

    # print(df['ds'])
    new_df = new_df.sort_values('ds', ascending=True)
    print(new_df)
    model = Prophet(
                    #Trend
                    growth="linear",
                    changepoints=None,
                    n_changepoints=10,
                    changepoint_range=1,
                    changepoint_prior_scale=0.05,
                    interval_width=0.95,
                    #Seasonlaity
                    seasonality_mode='additive',
                    yearly_seasonality='auto',
                    weekly_seasonality='auto',
                    daily_seasonality='auto',

                    #Holiday
                    holidays=None)
    model.fit(new_df)
    # 미래 예측 생성
    future = model.make_future_dataframe(freq="H",periods=24)
    # print(future)
    # 미래 예측
    forecast = model.predict(future)

    start_day = "2023-05-07 00:00:00"
    test_day = "2023-05-08 00:00:00"

    test = new_df[new_df['ds'] > start_day]

    train = forecast[forecast['ds'] <= test_day]
    train = train[train['ds'] > start_day]
    print(train)
    # print(train.info())
    print("@@@")

    predict = forecast[forecast['ds'] >= test_day]

    forecast = forecast[forecast['ds'] > start_day]



    # 관측된 데이터 포인트 제거
    # print(model.history.y)
    # future_predictions = forecast[df.shape[0]:]
    model.history.loc[:new_df.shape[0], 'y'] = None

    # 시각화
    fig = model.plot(forecast)
    ax = fig.gca()

    # x 축 눈금 설정
    locator = mdates.HourLocator(interval=2)  # 2시간 간격으로 눈금 설정
    formatter = mdates.DateFormatter('%m-%d %H')  # 날짜 형식 지정
    ax.xaxis.set_major_locator(locator)
    ax.xaxis.set_major_formatter(formatter)
    # x축 눈금 설정
    plt.gca().spines['right'].set_visible(False)  # 오른쪽 테두리 제거
    plt.gca().spines['top'].set_visible(False)  # 위 테두리 제거
    plt.gca().spines['left'].set_visible(False)  # 왼쪽 테두리 제거
    plt.gca().set_facecolor('#E6F0F8')  # 배경색

    # fcst_t = forecast['ds'].dt.to_pydatetime()
    # ax.plot(model.history['ds'].dt.to_pydatetime(), model.history['y'], color = 'black')
    ax.spines['left'].set_visible(False) # 왼쪽 여백 제거
    ax.spines['top'].set_visible(False) # 위쪽 여백 제거

    line0 = ax.fill_between(forecast['ds'], forecast['yhat_lower'], forecast['yhat_upper'], color='#edade4', alpha=0.3,label='bound') # 범주값 표시
    line1, = ax.plot(test['ds'], test['y'],color = 'black',label = 'Real data')
    line2, = ax.plot(predict['ds'], predict['yhat'], color='#8d2edb',label='Predict data') # 예측 값
    line3,= ax.plot(train['ds'], train['yhat'], color='#e64f3e', label='model data') # 실제값 추이

    # yticks = list(ax.get_yticks())  ## y축 눈금을 가져온다.
    #
    # for y in yticks:
    #     ax.axhline(y, linestyle=(0, (5, 2)), color='grey', alpha=0.5)  ## 눈금선 생성


    plt.xticks(rotation=45, ha='right')
    ax.legend(handles=[line0,line1, line2, line3], loc='upper left', fontsize=8,
              labels=['bound', 'Predict data', 'Real data','model data'], edgecolor='black', shadow=True)

    plt.savefig("%s_model.png" % i) # 각 구에 맞는 나이 비율 이미지
    # plt.show()
    plt.close()

    # break
