curl -X PUT "http://localhost:9200/planecrash"   

curl -X POST "http://localhost:9200/planecrash/_close"

curl -X PUT "http://localhost:9200/planecrash/_settings" -H "Content-Type: application/json" -d '{
  "analysis": {
    "filter": {
      "my_synonyms": {
        "type": "synonym",
        "synonyms_path": "synonyms_planes.txt"
      }
    },
    "analyzer": {
      "my_analyzer": {
        "type": "custom",
        "tokenizer": "standard",
        "filter": ["lowercase", "my_synonyms"]
      }
    }
  }
}'

curl -X POST "http://localhost:9200/planecrash/_open"

curl -X PUT 'http://localhost:9200/planecrash/_mappings' -H "Content-Type: application/json" -d '{
  "properties": {
    "date": {
      "type": "date"
    },
    "time": {
      "type": "integer"
    },
    "location": {
      "type": "text"
    },
    "operator": {
      "type": "text"
    },
    "route": {
      "type": "text"
    },
    "ac": {
      "type": "text"
    },
    "registration": {
      "type": "keyword"
    },
    "aboard": {
      "type": "integer"
    },
    "fatalities": {
      "type": "integer"
    },
    "ground": {
      "type": "integer"
    },
    "summary": {
      "type": "text",
      "analyzer": "my_analyzer"
    }
  }
}'
