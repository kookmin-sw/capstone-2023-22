from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import pandas as pd
import requests

options = webdriver.ChromeOptions()
options.add_argument("--disable-blink-features=AutomationControlled")

options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option("useAutomationExtension", False)
options.add_experimental_option("prefs", {"prfile.managed_default_content_setting.images": 2})
driver = webdriver.Chrome(executable_path='/Users/sunho99/PycharmProjects/python_Project/캡스톤디자인/wordcloud_test/chromedriver', options=options)


keyword_data = []
url = 'https://news.google.com/?hl=ko&gl=KR&ceid=KR%3Ako'
driver.get(url)
driver.implicitly_wait(3)
keywords = input('Search keyword: ')
search = driver.find_element(By.XPATH,'//*[@id="gb"]/div[2]/div[2]/div/form/div[1]/div/div/div/div/div[1]/input[2]')

search.send_keys(keywords)
search.send_keys(Keys.ENTER)
driver.implicitly_wait(30)
url = driver.current_url
resp = requests.get(url)
soup = bs(resp.text, 'lxml')

titles = []

for link in soup.select('h3 >a'):
    href = 'https://news.google.com' + link.get('href')[1:]
    title = link.string
    titles.append(title)

print(titles)