from django.core.management.base import BaseCommand
from scrapy_parser.spiders.Novels_spider import RoyalroadSpider
from scrapy_parser.spiders.Novels_spider import ScribblehubSpider
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings


class Command(BaseCommand):
    help = 'Activate parser and populate database. Arg: website(default=all)'

    def add_arguments(self, parser):
        parser.add_argument('website', nargs='?', default='all', choices=['all','royalroad','scribblehub'])

    def handle(self, *args, **options):
        process = CrawlerProcess(get_project_settings())
        if options.get('website', None) == 'all':
            process.crawl(RoyalroadSpider)
            process.crawl(ScribblehubSpider)
        elif options.get('website', None) == 'royalroad':
            process.crawl(RoyalroadSpider)
        elif options.get('website', None) == 'scribblehub':
            process.crawl(ScribblehubSpider)
        process.start()
