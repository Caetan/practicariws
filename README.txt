1º Preparar venv*:
    make prepare_env

2º Crawling:
    make crawling

Esto crea un planecrashes.json en /crawling/crawlingenv/scrapy_project/planecrashes.json con los documentos scrapeados

3º Bulk de los documentos en planecrashes.json a Elasticsearch:
    make bulk

4º Cliente React:
    make client

* ## Problemas con venv

Es probable que haya que cambiar el pyvenv.conf por el path del ordenador donde se comprueba, ya que si no, probablemente no funcionará el venv

Si no funciona, los paquetes necesarios para el scrapping de Python son:
- pip install elasticsearch
- pip install Scrapy

En este caso, se pueden ejecutar los comandos del Makefile obviando la activación del venv
