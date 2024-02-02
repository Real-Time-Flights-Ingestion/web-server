"use strict";

import kafka from 'kafkajs'
import settings from './settings.js';

export const kafkaClient = new kafka.Kafka({
    clientId: settings.kafka.clientId,
    brokers: settings.kafka.brokers
})

export const kafkaProducer = kafkaClient.producer({
    createPartitioner: kafka.Partitioners.LegacyPartitioner
})

export default kafkaProducer
