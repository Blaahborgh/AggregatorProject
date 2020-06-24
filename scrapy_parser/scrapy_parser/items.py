# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy.loader.processors import Join

class NovelItem(scrapy.Item):
    name = scrapy.Field()
    author = scrapy.Field()
    url = scrapy.Field()
    tags = scrapy.Field()
    desc = scrapy.Field(output_processor=Join())
    chcount = scrapy.Field()
    image = scrapy.Field()