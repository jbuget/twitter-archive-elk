# twitter-archive-elk

1. Clone and fetch the repository on your machine
2. Copy-paste your Twitter Archive `twitter-xxx/data/twitter.js` and `twitter-xxx/data/direct-messages.js` files into `./data/input` folder
3. Run `npm start:tweets` or `npm start:dms` to generate associated output file (`./data/output/tweets.ndjson` or `./data/output/direct-messages.ndjson`)
4. Start Docker Compose stack with `docker compose up -d`
5. Configure your ELK stack with instructions below
6. Import each output NDJSON files (with [FileDataViz integration](http://0.0.0.0:5601/app/home#/tutorial_directory/fileDataViz))
    * tweets:
      * Timestamp field: `created_at`
      * Timestamp format: `EEE MMM dd HH:mm:ss XX yyyy`
    * direct-messages:
        * Timestamp field: `created_at`
        * Timestamp format: `ISO8601`
7. Enjoy and build your dashboards 🚀


----------

## Compose sample application
### Elasticsearch, Logstash, and Kibana (ELK) in single-node

Project structure:
```
.
└── compose.yaml
```

[_compose.yaml_](compose.yaml)
```
services:
  elasticsearch:
    image: elasticsearch:7.8.0
    ...
  logstash:
    image: logstash:7.8.0
    ...
  kibana:
    image: kibana:7.8.0
    ...
```

## Deploy with docker compose

```
$ docker compose up -d
Creating network "elasticsearch-logstash-kibana_elastic" with driver "bridge"
Creating es ... done
Creating log ... done
Creating kib ... done
```

## Expected result

Listing containers must show three containers running and the port mapping as below:
```
$ docker ps
CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS                    PORTS                                                                                            NAMES
173f0634ed33        logstash:7.8.0        "/usr/local/bin/dock…"   43 seconds ago      Up 41 seconds             0.0.0.0:5000->5000/tcp, 0.0.0.0:5044->5044/tcp, 0.0.0.0:9600->9600/tcp, 0.0.0.0:5000->5000/udp   log
b448fd3e9b30        kibana:7.8.0          "/usr/local/bin/dumb…"   43 seconds ago      Up 42 seconds             0.0.0.0:5601->5601/tcp                                                                           kib
366d358fb03d        elasticsearch:7.8.0   "/tini -- /usr/local…"   43 seconds ago      Up 42 seconds (healthy)   0.0.0.0:9200->9200/tcp, 0.0.0.0:9300->9300/tcp                                                   es
```

After the application starts, navigate to below links in your web browser:

* Elasticsearch: [`http://localhost:9200`](http://localhost:9200)
* Logstash: [`http://localhost:9600`](http://localhost:9600)
* Kibana: [`http://localhost:5601/api/status`](http://localhost:5601/api/status)

Stop and remove the containers
```
$ docker compose down
```

## Attribution

The [example Nginx logs](https://github.com/docker/awesome-compose/tree/master/elasticsearch-logstash-kibana/logstash/nginx.log) are copied from [here](https://github.com/elastic/examples/blob/master/Common%20Data%20Formats/nginx_json_logs/nginx_json_logs).

