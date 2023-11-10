## Elasticsearch

Version 8.10.3 -> https://www.elastic.co/guide/en/elasticsearch/reference/current/targz.html

Configuración usada: [elasticsearch.yml](elasticsearch.yml)

Para realizar el relevance feedback por sinónimos, es necesario copiar el fichero de sinónomos [synonyms_planes.txt](synonyms_planes.txt) en la configuración de Elasticsearch `elasticsearch-8.10.3/config/synonyms_planes.txt`.

Una vez iniciado el servicio de Elasticsearch con la configuración indicada, se puede crear el índice y su mapeo.

En el fichero [index_utils.sh](index_utils.sh) aparecen los comandos para la creación y el mapeo del índice necesario.
```
make create_index
```

## How to run

1º Preparar venv*:
```
make prepare_env
```

El siguiente paso de crawling lleva mucho tiempo, ya que crawlea toda la página. Puede usarse el fichero [planecrashes.json](planecrashes.json) que se proporciona ya con el contenido de la página crawleada y scrapeada.
Para usarlo, hay que moverlo a la carpeta [crawling/crawlingenv/scrapy_project/](crawling/crawlingenv/scrapy_project/). Una vez hecho, puede saltarse al paso 3.

```
cp planecrashes.json crawling/crawlingenv/scrapy_project/
```


2º Crawling:
```
make crawling
```

Esto crea un `planecrashes.json` en [crawling/crawlingenv/scrapy_project/](crawling/crawlingenv/scrapy_project/) con los documentos scrapeados.


3º Bulk de los documentos en `planecrashes.json` a Elasticsearch:
```
make bulk
``````


4º Cliente React:
```
make client
``````


## Problemas con venv*

Es probable que haya que cambiar en [crawling/crawlingenv/pyvenv.cfg](crawling/crawlingenv/pyvenv.cfg) el path de la máquina donde se corre, ya que si no probablemente no funcionará el venv.

Si no funciona, los paquetes necesarios para el scrapping de Python son:
- pip install elasticsearch
- pip install Scrapy

(ver [crawling/requirements.txt](crawling/requirements.txt) para más dependecias)

En este caso, se pueden ejecutar los comandos del Makefile obviando el paso 1 y la activación del venv en los pasos 2 y 3.
