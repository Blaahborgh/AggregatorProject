# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
from Items.models import Novel
from Items.models import Author
from Items.models import Tag


class ScrapyParserPipeline(object):
    def process_item(self, item, spider):
        authorobj, created = Author.objects.get_or_create(
            name=item['author']
        )

        novelobj, created = Novel.objects.get_or_create(
            author=authorobj,
            name=item['name'],
            desc=item['desc'],
            chcount=item['chcount'],
            url=item['url'],
            image=item['image']
        )

        for tag in item['tags']:
            tagobj, created = Tag.objects.get_or_create(
                name=tag
            )
            novelobj.tags.add(tagobj)

        return item