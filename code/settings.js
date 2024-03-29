"use strict"

import * as fs from 'node:fs'
import { deepFreeze } from './utils.js'

const apiHost = "aerodatabox.p.rapidapi.com"
const domain = "rtfi.servehttp.com"
const aerodataboxWebhookEndpoint = "/adb/api"

const settings_setup = {
    api: {
        host: apiHost,
        endpoint: "https://" + apiHost,
        key: null
    },
    server: {
        host: "0.0.0.0",
        domain: domain,
        port: process.env.PORT,
        trailingSlashNormalization: true,
        aerodataboxWebhookEndpoint: aerodataboxWebhookEndpoint,
        webhookUrl: "http://" + domain + ":" + process.env.PORT + aerodataboxWebhookEndpoint
    },
    kafka: {
        clientId: "web-server",
        brokers: ["kafka-0:9092", "kafka-1:9092", "kafka-2:9092"],
        topicPrefix: "rtfi."
    }
}

try {
    settings_setup.api.key = fs.readFileSync("/run/secrets/api_key", "utf8")
} catch (err) {
    console.error("[error] Api key read error:", err)
    process.exit(1)
}

const settings = deepFreeze(settings_setup)

export default settings
