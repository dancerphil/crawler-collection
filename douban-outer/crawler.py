# -*- coding: utf-8 -*-

from pyquery import PyQuery as pq
import requests

url = 'http://58921.com/alltime'

content = requests.get(url).content
html = content.decode("utf8", "ignore")
html = pq(html)

print(html)
# -_-!!! 图片识别，算了不要分析了，去豆瓣拉数据填在后面就行了
