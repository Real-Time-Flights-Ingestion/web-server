"use strict";

const host = "aerodatabox.p.rapidapi.com"

const settings_setup = {
    api: {
        host: host,
        endpoint: "https://" + host,
        key: null
    }
}

import * as fs from 'node:fs';
try {
    settings_setup.api.key = fs.readFileSync("/run/secrets/api_key", "utf8")
} catch (err) {
    console.error(err)
    process.exit(1)
}

import { deepFreeze } from './utils.js';
const settings = deepFreeze(settings_setup)

export default settings
