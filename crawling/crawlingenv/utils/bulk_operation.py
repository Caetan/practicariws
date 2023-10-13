import json
from elasticsearch import Elasticsearch


client = Elasticsearch("http://localhost:9200",)
file_path = '../scrapy_project/planecrashes.json'
index_name = 'planecrash'

if __name__ == '__main__':
    with open(file_path, 'r') as file:
        for line in file:
            print(line)
            try:
                json_data = json.loads(line)
                client.index(
                    index="planecrash",
                    id=json_data["id"],
                    document=json_data["data"]
                )
                print(f"Indexing document: {json_data}")
            except Exception as e:
                print(f"Error indexing document: {e}")
