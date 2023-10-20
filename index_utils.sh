curl -X PUT "http://localhost:9200/planecrash"   

curl -X PUT 'http://localhost:9200/planecrash' -H "Content-Type: application/json" -d '{
  "mappings": {
    "properties": {
      "date": {
        "type": "Dates"
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
        "type": "text"
      }
    }
  }
}'