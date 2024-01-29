"use strict";

import airports from './code/airports.js';

import settings from './code/settings.js';

console.log("settings:", settings)
process.exit()

const url = settings.api.endpoint + "/airports/icao/" + airports.atalanta.icao
const options = {
    headers: {
        "X-RapidAPI-Key": settings.api.key,
        "X-RapidAPI-Host": settings.api.host
    }
}

async function test() {
    const response = await fetch(url, options)
    const result = await response.json()
    return result
}

test().then((result) =>
    console.log(JSON.stringify(result, null, 4))
).catch((error) =>
    console.error(error)
)
