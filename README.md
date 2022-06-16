# Create kafka topic javascript action

This action creates a kafka topic in the desired kafka cluster, authenticating with client certificate.

## Inputs

## `KAFKA_BROKER_URL`

**Required** URL to the kafka broker.

## `KAFKA_SSL_CA`

**Required** Kafka certificate authority.

## `KAFKA_SSL_KEY`

**Required** Private certificate key.

## `KAFKA_SSL_CERT`

**Required** Client certificate.

## `TOPIC`

**Required** Topic to create.

## `REPLICATION_FACTOR`

Kafka topic replication factor. Default `"2"`.

## `NUM_PARTITIONS`

Kafka topic number of partitions. Default `"3"`.

## `CLEANUP_POLICY`

Kafka topic cleanup policy. Default `"delete"`.

## Outputs

Nothing...

## Example usage
```
    uses: actions/create-kafka-topic@v1.1
    with:
    KAFKA_BROKER_URL: 'http://localhost:8080'
    KAFKA_SSL_CA: 'begin_certificate...end_certificate'
    KAFKA_SSL_KEY: 'begin_private_key...end_private_key'
    KAFKA_SSL_CERT: 'begin_certificate...end_certificate'
    TOPIC: 'my-topic.v1'
    REPLICATION_FACTOR: '3'
    NUM_PARTITIONS: '6'
    CLEANUP_POLICY: 'compact'
```

## Publish a new version

Install vercel to compile project
```
    npm i -g @vercel/ncc
```

Build file with accompanying licences to the packages
```
    ncc build index.js --license licenses.txt
```

Check in changes
```
git commit . -m "commit message"
git tag -a -m "My first action release" v1.1
git push --follow-tags
```