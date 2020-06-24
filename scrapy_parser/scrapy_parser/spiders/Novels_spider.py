import scrapy

class RoyalroadSpider(scrapy.Spider):
    name = "royalroad"
    namepath = ''
    authorpath = ''
    urlpath = ''
    tagspath = []
    descpath = []
    chcountpath = ''
    imagepath = ''
    pagerpath = ''

    def start_requests(self):
        url = 'https://www.royalroad.com/fictions/best-rated'
        self.namepath = '//h1[@property="name"]/text()'
        self.authorpath = '//span[@property="name"]/a/text()'
        self.tagspath = '//span[@property="genre"]/text()'
        self.descpath = '//div[@property="description"]//text()'
        self.chcountpath = '//td[@data-order]'
        self.imagepath = '//img[@property="image"]/@src'
        self.urlpath = '//h2[@class="fiction-title"]/a'
        self.pagerpath = '//a[contains(text(), "Next")]'
        yield scrapy.Request(url, self.parse)

    def parse(self, response):
        yield from response.follow_all(response.xpath(self.urlpath), self.parse_fic)
        yield from response.follow(response.xpath(self.pagerpath), self.parse)

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


class ScribblehubSpider(RoyalroadSpider):
    name = "scribblehub"

    def start_requests(self):
        url = 'https://www.scribblehub.com/series-ranking/'
        self.namepath = '//div[@class="fic_title"]/text()'
        self.authorpath = '//span[@class="auth_name_fic"]/text()'
        self.tagspath = '//a[@id="etagme"]/text()'
        self.descpath = '//div[@property="description"]//text()'
        self.chcountpath = '//li[@toc_w]'
        self.imagepath = '//img[@property="image"]/@src'
        self.urlpath = '//div[@class="search_title"]/a'
        self.pagerpath = '//li[@class="page-link next")]/a'
        yield scrapy.Request(url, self.parse)