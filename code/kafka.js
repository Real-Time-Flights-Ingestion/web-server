"use strict"

import kafka from 'kafkajs'
import settings from './settings.js'

export const kafkaClient = new kafka.Kafka({
    clientId: settings.kafka.clientId,
    brokers: settings.kafka.brokers
})

export const kafkaProducer = kafkaClient.producer({
    createPartitioner: kafka.Partitioners.LegacyPartitioner
})

export function airportIcaoToTopic(icao) {
    return settings.kafka.topicPrefix + "airport." + icao.toLowerCase()
}

export function flightsToKafkaFlights(flights, subscriptionId) {
    var kafkaFlights = []
    for (let flight of flights) {
        console.log("[kafka] sending to Kafka flight", flight.number)
        kafkaFlights.push({
            key: flight.number,
            value: JSON.stringify(flight),
            headers: {
                "source": settings.api.endpoint,
                "receiver": "rtfi/web-server",
                "receiver_url": settings.server.webhookUrl,
                "subscription_id": subscriptionId,
                "ingestion_timestamp": (new Date(Date.now())).toISOString(),
            }
        })
    }
    return kafkaFlights
}

export function sendFlights(icao, flights, subscriptionId) {
    return kafkaProducer.send({
        topic: airportIcaoToTopic(icao),
        messages: flightsToKafkaFlights(flights, subscriptionId),
    })
}

export default kafkaProducer
