"use strict";

import * as fs from 'node:fs';
import { deepFreeze } from './utils.js';

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
    }
}

try {
    settings_setup.api.key = fs.readFileSync("/run/secrets/api_key", "utf8")
} catch (err) {
    console.error(err)
    process.exit(1)
}

const settings = deepFreeze(settings_setup)

export default settings
