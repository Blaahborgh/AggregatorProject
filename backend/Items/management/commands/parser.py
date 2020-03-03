import requests
import json
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand, CommandError
from Items.models import Novel, Author, Tag

f = open("configs.json", "r")
f1 = f.read()
config = json.loads(f1)

i = 0

initialurl = config[i]['initialurl']
page = requests.get(initialurl)
soup = BeautifulSoup(page.text, 'html.parser')

def fiction_page_soup(url):
    page1 = requests.get(url)
    return BeautifulSoup(page1.text, 'html.parser')

def get_author(fictionpage):
    return fictionpage.find(config[i]['authorpath']['tag'], {config[i]['authorpath']['attr'] : config[i]['authorpath']['attrvalue']}).get_text(strip=True)

def get_name(fiction):
    return fiction.find(config[i]['namepath']['tag'], {config[i]['namepath']['attr'] : config[i]['namepath']['attrvalue']}).get_text(strip=True)

def get_tags(fictionpage):
    if (config[i]['siteurl'] == "https://www.fictionpress.com"):
        for tag in fictionpage.find_all(config[i]['tagspath']['tag'], {config[i]['tagspath']['attr'] : config[i]['tagspath']['attrvalue']}):
            line = tag.get_text(strip=True).split(' - ')
            genres = line[2].split('/')
            return genres
    else:
        tags = []
        for tag in fictionpage.find_all(config[i]['tagspath']['tag'], {config[i]['tagspath']['attr'] : config[i]['tagspath']['attrvalue']}):
            tags.append(tag.get_text(strip=True))
        return tags

def get_desc(fictionpage):
    return fictionpage.find(config[i]['descpath']['tag'], {config[i]['descpath']['attr'] : config[i]['descpath']['attrvalue']}).get_text()

def get_chcount(fictionpage):
    for chapters in fictionpage.find_all(config[i]['chcountpath']['tag'], {config[i]['chcountpath']['attr'] : config[i]['chcountpath']['attrvalue']}): pass
    try:
        if chapters:
            return int(chapters.get(config[i]['chcountpath']['getattr'])) + 1
    except UnboundLocalError:
        return 0

def get_url(fiction):
    return config[i]['siteurl'] + fiction.find(config[i]['urlpath']['tag'], {config[i]['urlpath']['attr'] : config[i]['urlpath']['attrvalue']}).get(config[i]['urlpath']['getattr'])

def get_image(fictionpage):
    try:
        return fictionpage.find(config[i]['imagepath']['tag'], {config[i]['imagepath']['attr'] : config[i]['imagepath']['attrvalue']}).get(config[i]['imagepath']['getattr'])
    except AttributeError:
        return 'null'

def fiction_list_soup():
    for fiction in soup.find_all(config[i]['listpath']['tag'], {config[i]['listpath']['attr'] : config[i]['listpath']['attrvalue']}):
        fictionpage = fiction_page_soup(get_url(fiction))
        authorobj, created = Author.objects.get_or_create(
            name = get_author(fictionpage)
        )
        novelobj, created = Novel.objects.get_or_create(
            author = authorobj,
            name = get_name(fiction),
            desc = get_desc(fictionpage),
            chcount = get_chcount(fictionpage),
            url = get_url(fiction),
            image = get_image(fictionpage)
        )
        for tag in get_tags(fictionpage):
            tagobj, created = Tag.objects.get_or_create(
                name = tag
            )
            # print(tagobj.name)
            novelobj.tags.add(tagobj)
        print(novelobj.name)

class Command(BaseCommand):
    help = 'Populate database with output from parser'
    def handle(self, *args, **options):
        fiction_list_soup()