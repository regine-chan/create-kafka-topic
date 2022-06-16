const core = require('@actions/core');
const {Kafka} = require('kafkajs');

(async () => {
    try {
        const KAFKA_BROKER_URL = core.getInput("KAFKA_BROKER_URL")
        const KAFKA_SSL_CA = core.getInput("KAFKA_SSL_CA")
        const KAFKA_SSL_KEY = core.getInput("KAFKA_SSL_KEY")
        const KAFKA_SSL_CERT = core.getInput("KAFKA_SSL_CERT")
        const TOPIC = core.getInput("TOPIC")
        const REPLICATION_FACTOR = core.getInput("REPLICATION_FACTOR")
        const NUM_PARTITIONS = core.getInput("NUM_PARTITIONS")
        const CLEANUP_POLICY = core.getInput("CLEANUP_POLICY")
    
        createTopic(
            TOPIC,
            kafkaClient(KAFKA_BROKER_URL, KAFKA_SSL_CA, KAFKA_SSL_KEY, KAFKA_SSL_CERT)
        )
    
        const adminClient = new Kafka({
            clientId: 'create-kafka-topic-gha',
            brokers: [KAFKA_BROKER_URL],
            ssl: {
                ca: [KAFKA_SSL_CA],
                key: KAFKA_SSL_KEY,
                cert: KAFKA_SSL_CERT
            }
        }).admin()
        
        await adminClient.connect()
        await adminClient.createTopics({
            topics: [{
                topic: topicName,
                replicationFactor: REPLICATION_FACTOR,
                numPartitions: NUM_PARTITIONS,
                configEntries: [
                    {name: "cleanup.policy", value: CLEANUP_POLICY},
                ],
            }],
        })
        await adminClient.disconnect()
    } catch (e) {
        core.setFailed(e.message)
    }
})()

