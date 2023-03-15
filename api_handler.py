import csv
import time
# needs "pip install xmltodict"
import xmltodict
import requests
import schedule
import boto3
import os
from datetime import datetime

# S3 클라이언트 생성
s3 = boto3.client('s3',aws_access_key_id='HIDDEN', aws_secret_access_key='HIDDEN')
now = datetime.now()

def find_dict(res, search):
    for key, value in res.items():
        if search == key:
            return {key: value}


def response_maker(dict_response):
    out = {}
    out.update(find_dict(dict_response["SeoulRtd.citydata"]["CITYDATA"], "AREA_NM"))
    out.update(dict_response["SeoulRtd.citydata"]["CITYDATA"]["LIVE_PPLTN_STTS"]["LIVE_PPLTN_STTS"])
    out.update(dict_response["SeoulRtd.citydata"]["CITYDATA"]["ROAD_TRAFFIC_STTS"]["AVG_ROAD_DATA"])

    try:
        accident_status = dict_response["SeoulRtd.citydata"]["CITYDATA"]["ACDNT_CNTRL_STTS"]["ACDNT_CNTRL_STTS"]
    except TypeError:
        out.update({"ACDNT_CNTRL_CNT": 0})
    else:
        # If you need the accident information, use this code (but this is not good for statistics)
        if type(accident_status) is list:
            out.update({"ACDNT_CNTRL_CNT": len(accident_status)})
            for i in range(len(accident_status)):
                tmp = dict(("ACDNT" + str(i) + "_" + key, value) for (key, value) in accident_status[i].items())
                out.update(tmp)
        else:
            out.update(accident_status)
        out.update({"ACDNT_CNTRL_CNT": len(accident_status)})

    weather_status = dict_response["SeoulRtd.citydata"]["CITYDATA"]["WEATHER_STTS"]["WEATHER_STTS"]
    weather_status.pop("FCST24HOURS", None)
    out.update(weather_status)
    return out


# if __name__ == "__main__":

def job():
    print(("-" * 20) + "Program Start" + ("-" * 20))
    start = time.time()

    url_base = "http://openapi.seoul.go.kr:8088/"
    url_authentication_key = 'HIDDEN'
    url_datasource = "/xml/citydata"
    url_page = "/1/5/"
    url_places = ["경복궁·서촌마을", "광화문·덕수궁", "창덕궁·종묘",
                  "강남 MICE 관광특구", "동대문 관광특구", "명동 관광특구", "이태원 관광특구", "잠실 관광특구", "종로·청계 관광특구", "홍대 관광특구",
                  "가로수길", "낙산공원·이화마을", "노량진", "북촌한옥마을", "성수카페거리", "수유리 먹자골목", "쌍문동 맛집거리", "압구정로데오거리", "여의도", "영등포 타임스퀘어", "인사동·익선동", "창동 신경제 중심지", "DMC(디지털미디어시티)",
                  "가산디지털단지역", "강남역", "건대입구역", "고속터미널역", "교대역", "구로디지털단지역", "서울역", "선릉역", "신도림역", "신림역", "신촌·이대역", "왕십리역", "역삼역", "연신내역", "용산역"]

    output_filename = time.strftime("%Y%m%d") + ".csv"

    check_availability = []

    for places in range(len(url_places)):
        url = url_base + url_authentication_key + url_datasource + url_page + url_places[places]
        print("now connecting...: " + url)

        response = requests.get(url)
        dict_response = xmltodict.parse(response.content)
        # # to debug response file
        # with open("test.json", "w", encoding="UTF-8") as file:
        #     file.write(str(dict_response))

        if dict_response["SeoulRtd.citydata"]["RESULT"]["RESULT.CODE"] == "INFO-000":
            response_output = response_maker(dict_response)
            with open(output_filename, "a" if places == 0 else "a", encoding="UTF-8") as file:
                writer_object = csv.writer(file)
                if places == 0 and now.hour == 0:
                    writer_object.writerow(response_output.keys())
                writer_object.writerow(response_output.values())

                file.close()
            check_availability.append(0)
        else:
            check_availability.append(1)
        time.sleep(2)
    file_path = os.path.realpath(output_filename)
    file_name = output_filename

    # S3 버킷 이름과 업로드할 객체 키를 지정합니다.
    bucket_name = 'capstone-api-output'
    object_key = time.strftime("%Y%m%d")+"/" + file_name

    # 로컬 파일을 S3에 업로드합니다.
    s3.upload_file(file_path, bucket_name, object_key)
    end = time.time()

    print(("-" * 22) + "Program End" + ("-" * 22))
    print("result: ", check_availability)
    print("elapsed time: ", end - start, "sec")

schedule.every().hour.at(":00").do(job)
while True:
    schedule.run_pending()
    time.sleep(1)


