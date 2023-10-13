from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
import json
from elasticsearch import Elasticsearch
from datetime import datetime


class PlanecrashSpider(CrawlSpider):
    name = "planecrash"
    allowed_domains = ["www.planecrashinfo.com"]
    start_urls = ["https://www.planecrashinfo.com/database.htm"]

    client = Elasticsearch("http://localhost:9200",)

    rules = (
        # Rule(
        #     LinkExtractor(allow=(r'database\.htm',)),
        # ),
        Rule(
            LinkExtractor(allow=(r'https://www.planecrashinfo.com/\d{4}/\d{4}\.htm',)),
        ),
        Rule(
            LinkExtractor(allow=(r'https://www.planecrashinfo.com/\d{4}/\d{4}-\d+\.htm',)), callback="parse_accident",
        ),
    )


    def parse_accident(self, response):
        accident_id = response.url.rsplit('/')[-1].split(".")[0]
        title = response.css('td:nth-child(odd) b::text').getall()
        info = response.css('td:nth-child(even) font::text').getall()
        result = dict(zip([item.replace(':', '').replace('AC\n        Type', 'ac').rstrip().lower() for item in title], [item.replace('?', '').rstrip() for item in info[1:]]))
        for key in ["flight #", "cn / ln"]:
            del result[key]
        for key in ["aboard", "fatalities", "ground"]:
            if result[key] == "?":
                result[key] = ""
            else:
                result[key] = result[key].split(" ")[0]
        result["date"] = datetime.strptime(result["date"], "%B %d, %Y").strftime("%Y-%m-%dT%H:%M:%S.%fZ")
        result["aboard"] = int(result["aboard"])
        result["fatalities"] = int(result["fatalities"])
        json_result = {
            "id": accident_id,
            "data": result
        }
        print(json.dumps(json_result, indent=4))

        with open("../planecrashes.json", 'a+') as file:
            json.dump(json_result, file)
            file.write('\n')

        # client.index(
        #     index="planecrash",
        #     id=accident_id,
        #     document=result
        # )