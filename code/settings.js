"use strict";

import * as fs from 'node:fs';
import { deepFreeze } from './utils.js';

const host = "aerodatabox.p.rapidapi.com"

const settings_setup = {
    api: {
        host: host,
        endpoint: "https://" + host,
        key: null
    },
    server: {
        host: "0.0.0.0",
        port: process.env.PORT,
        trailingSlashNormalization: true,
        aerodataboxWebhookEndpoint: "/adb/api"
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
