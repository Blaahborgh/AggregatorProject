import scrapy


class ParentalSpider(scrapy.Spider):
    name = "parent"
    start_urls = []
    namepath = ''
    authorpath = ''
    tagspath = ''
    descpath = ''
    chcountpath = ''
    imagepath = ''
    urlpath = ''
    pagerpath = ''

    def parse(self, response):
        yield from response.follow_all(response.xpath(self.urlpath), self.parse_fic)
        yield from response.follow_all(response.xpath(self.pagerpath), self.parse)

    def parse_fic(self, response):
        udesc = ''
        for p in response.xpath(self.descpath).getall():
            udesc = udesc + p
        yield {
            'name': response.xpath(self.namepath).get(),
            'author': response.xpath(self.authorpath).get(),
            'url': response.request.url,
            'tags': response.xpath(self.tagspath).getall(),
            'desc': udesc,
            'chcount': len(response.xpath(self.chcountpath).getall()),
            'image': response.xpath(self.imagepath).get(),
        }


class RoyalroadSpider(ParentalSpider):
    name = "royalroad"
    start_urls = [
        'https://www.royalroad.com/fictions/best-rated'
    ]
    namepath = '//h1[@property="name"]/text()'
    authorpath = '//span[@property="name"]/a/text()'
    tagspath = '//span[@property="genre"]/text()'
    descpath = '//div[@property="description"]//text()'
    chcountpath = '//td[@data-order]'
    imagepath = '//img[@property="image"]/@src'
    urlpath = '//h2[@class="fiction-title"]/a'
    pagerpath = '//a[contains(text(), "Next")]'


class ScribblehubSpider(RoyalroadSpider):
    name = "scribblehub"
    start_urls = [
        'https://www.scribblehub.com/series-ranking/'
    ]
    namepath = '//div[@class="fic_title"]/text()'
    authorpath = '//span[@class="auth_name_fic"]/text()'
    tagspath = '//a[@id="etagme"]/text()'
    descpath = '//div[@property="description"]//text()'
    chcountpath = '//li[@toc_w]'
    imagepath = '//img[@property="image"]/@src'
    urlpath = '//div[@class="search_title"]/a'
    pagerpath = '//li[@class="page-link next")]/a'
