elasticsearch:
	cd ../elasticsearch-8.10.3 && ./bin/elasticsearch

client:
	cd client/ && npm install && npm start

create_index:
	./index_utils.sh

prepare_env:
	cd crawling && \
	source ./crawlingenv/bin/activate && \
	pip install -r requirements.txt

crawling:
	cd crawling && \
	source ./crawlingenv/bin/activate && \
	cd crawlingenv/scrapy_project/spiders/ && \
	scrapy crawl planecrash 

bulk:
	cd crawling && \
	source ./crawlingenv/bin/activate && \
	cd crawlingenv/utils/ && \
	python3 bulk_operation.py
