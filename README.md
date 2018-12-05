# API Summit 2018

## Events abonnieren

```shell
$ curl -i http://localhost:3000/events
```

## Commands schicken

### open

```shell
$ curl -i \
    -X POST \
    -H "content-type:application/json" \
    -d '{"aggregateId":"ee9d0440-d6be-409d-b68b-19246fc66a88"}' \
    http://localhost:3000/open
```

### guess

```shell
$ curl -i \
    -X POST \
    -H "content-type:application/json" \
    -d '{"aggregateId":"ee9d0440-d6be-409d-b68b-19246fc66a88","guess":"B"}' \
    http://localhost:3000/guess
```

## Projektionen abrufen

### games

```shell
$ curl -i http://localhost:3000/games
```

### statistics

```shell
$ curl -i http://localhost:3000/statistics
```
