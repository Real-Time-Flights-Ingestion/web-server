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

export function flightsToKafkaFlights(flights) {
    var kafkaFlights = []
    for (let flight of flights) {
        console.log("[kafka] sending to Kafka flight", flight.number)
        kafkaFlights.push({
            key: flight.number,
            value: JSON.stringify(flight)
        })
    }
    return kafkaFlights
}

export function sendFlights(icao, flights) {
    return kafkaProducer.send({
        topic: airportIcaoToTopic(icao),
        messages: flightsToKafkaFlights(flights),
    })
}

export default kafkaProducer
