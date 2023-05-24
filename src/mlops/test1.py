import json
import csv
import time
import xmltodict
import requests
import os
import boto3


def find_dict(res, search):
    for key, value in res.items():
        if search == key:
            return {key: value}


def response_maker(res):
    out = {}
    out.update(find_dict(res["SeoulRtd.citydata"]["CITYDATA"], "AREA_NM"))
    out.update(res["SeoulRtd.citydata"]["CITYDATA"]["LIVE_PPLTN_STTS"]["LIVE_PPLTN_STTS"])
    out.update(res["SeoulRtd.citydata"]["CITYDATA"]["ROAD_TRAFFIC_STTS"]["AVG_ROAD_DATA"])

    try:
        accident_status = res["SeoulRtd.citydata"]["CITYDATA"]["ACDNT_CNTRL_STTS"]["ACDNT_CNTRL_STTS"]
    except TypeError:
        out.update({"ACDNT_CNTRL_CNT": 0})
    else:
        # # If you need the accident information, use this code (but this is not good for statistics)
        # if type(accident_status) is list:
        #     out.update({"ACDNT_CNTRL_CNT": len(accident_status)})
        #     for i in range(len(accident_status)):
        #         tmp = dict(("ACDNT" + str(i) + "_" + key, value) for (key, value) in accident_status[i].items())
        #         out.update(tmp)
        # else:
        #     out.update(accident_status)
        out.update({"ACDNT_CNTRL_CNT": len(accident_status)})

    weather_status = dict_response["SeoulRtd.citydata"]["CITYDATA"]["WEATHER_STTS"]["WEATHER_STTS"]
    weather_status.pop("FCST24HOURS", None)
    out.update(weather_status)
    return out


# def lambda_handler(event, context):
# TODO implement
url_base = "http://openapi.seoul.go.kr:8088/"
url_authentication_key = "{HIDDEN}"
url_datasource = "/xml/citydata"
url_page = "/1/5/"
url_places = ["경복궁·서촌마을", "광화문·덕수궁", "창덕궁·종묘", "용산역"]

output_filename = time.strftime("%Y%m%d-%H%M%S") + ".csv"

check_availability = []

for places in range(len(url_places)):
    url = url_base + url_authentication_key + url_datasource + url_page + url_places[places]

    response = requests.get(url)
    dict_response = xmltodict.parse(response.content)
    # # to debug response file
    # with open("test.json", "w", encoding="UTF-8") as file:
    #     file.write(str(dict_response))

    if dict_response["SeoulRtd.citydata"]["RESULT"]["RESULT.CODE"] == "INFO-000":
        response_output = response_maker(dict_response)
        with open(output_filename, "w" if places == 0 else "a", encoding="UTF-8") as file:
            writer = csv.writer(file)
            if places == 0:
                writer.writerow(response_output.keys())
            writer.writerow(response_output.values())
    else:
        time.sleep(2)

s3 = boto3.client('s3')

bucket_name = 'sunhotest123'
s3_file_name = output_filename

def upload_file_to_s3(file_path, bucket_name):
    s3.upload_file(file_path, bucket_name, file_path.split("/")[-1])
upload_file_to_s3(s3_file_name, bucket_name)



