from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.postgres_operator import PostgresOperator
from airflow.operators.s3_to_redshift_operator import S3ToRedshiftOperator

default_args = {
    'owner': 'admin',
    'depends_on_past': False,
    'start_date': datetime(2023, 3, 22),
    'retries': 0,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    's3_to_redshift',
    default_args=default_args,
    description='Load CSV file from S3 to Redshift every hour',
    schedule_interval='@hourly',
)

load_data = S3ToRedshiftOperator(
    task_id='load_data',
    s3_bucket='mlops-api-output',
    s3_key='2023/2023.csv',
    schema='capstone_api',
    table='my_table',
    copy_options=[
        "CSV",
        "IGNOREHEADER 1",
    ],
    redshift_conn_id='redshift',
    aws_conn_id='aws_default',
    column_list=["AREA_NM","AREA_CONGEST_LVL","AREA_CONGEST_MSG","AREA_PPLTN_MIN","AREA_PPLTN_MAX","MALE_PPLTN_RATE","FEMALE_PPLTN_RATE","PPLTN_RATE_0","PPLTN_RATE_10","PPLTN_RATE_20","PPLTN_RATE_30","PPLTN_RATE_40","PPLTN_RATE_50","PPLTN_RATE_60","PPLTN_RATE_70","RESNT_PPLTN_RATE","NON_RESNT_PPLTN_RATE","REPLACE_YN","PPLTN_TIME","ROAD_MSG","ROAD_TRAFFIC_IDX","ROAD_TRFFIC_TIME","ROAD_TRAFFIC_SPD","ACDNT_CNTRL_CNT","WEATHER_TIME","TEMP","SENSIBLE_TEMP","MAX_TEMP","MIN_TEMP","HUMIDITY","WIND_DIRCT","WIND_SPD","PRECIPITATION","PRECPT_TYPE","PCP_MSG","SUNRISE","SUNSET","UV_INDEX_LVL","UV_INDEX","UV_MSG","PM25_INDEX","PM25","PM10_INDEX","PM10","AIR_IDX","AIR_IDX_MVL","AIR_IDX_MAIN","AIR_MSG","NEWS_LIST"],
    dag=dag,
)

load_data

