## Elasticsearch

Version 8.10.3 -> https://www.elastic.co/guide/en/elasticsearch/reference/current/targz.html

Configuración usada: `elasticsearch.yml`

1º Preparar venv*:
    make prepare_env

El siguiente paso de crawling lleva mucho tiempo, ya que crawlea toda la página. Puede usarse el fichero `planecrashes.json` que se proporciona ya con el contenido de la página cralewada y scrapeada.
Para usarlo, hay que moverlo a la carpeta `crawling/crawlingenv/scrapy_project/`. Una vez hecho, puede saltarse al paso 3.

2º Crawling:
    make crawling

Esto crea un planecrashes.json en `crawling/crawlingenv/scrapy_project/` con los documentos scrapeados

3º Bulk de los documentos en planecrashes.json a Elasticsearch:
    make bulk

4º Cliente React:
    make client


* ## Problemas con venv

Es probable que haya que cambiar el pyvenv.conf por el path del ordenador donde se comprueba, ya que si no, probablemente no funcionará el venv

Si no funciona, los paquetes necesarios para el scrapping de Python son:
- pip install elasticsearch
- pip install Scrapy

(ver crawling/requirements.txt para más dependecias)

En este caso, se pueden ejecutar los comandos del Makefile obviando la activación del venv.


## Alternativa

En caso de no funcionar la instalación. Se puede usar proyecto en la carpeta `practicariws_with_libs`. Este proyecto es exactamente igual que el anterior, pero está pusheado el venv con las librerias y dependecias usadas, por lo que no hay que instalar nada. Se puede seguir la anterior lista de pasos obviando el paso 1, que no es necesario.
