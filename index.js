"use strict";

function deepFreeze(object) {
    const propNames = Reflect.ownKeys(object)
    // Freeze properties before freezing self
    for (const name of propNames) {
        const value = object[name];
        if ((value && typeof value === "object") || typeof value === "function") {
            deepFreeze(value);
        }
    }
    return Object.freeze(object);
}

const airports = deepFreeze({
    luxembourg: {
        icao: "ELLX",
        iata: "LUX",
        shortName: "-Findel",
        fullName: "Luxembourg -Findel",
        municipalityName: "Luxembourg",
        location: {
            lat: 49.6266,
            lon: 6.21152
        },
        elevation: {
            meter: 376.12,
            km: 0.38,
            mile: 0.23,
            nm: 0.2,
            feet: 1234
        },
        country: {
            code: "LU",
            name: "Luxembourg"
        },
        continent: {
            code: "EU",
            name: "Europe"
        },
        timeZone: "Europe/Luxembourg",
        urls: {
            webSite: "https://www.lux-airport.lu/",
            wikipedia: "https://en.wikipedia.org/wiki/Luxembourg-Findel_International_Airport",
            twitter: "http://twitter.com/luxairport",
            googleMaps: "https://www.google.com/maps/@49.626598,6.211520,14z",
            flightRadar: "https://www.flightradar24.com/49.63,6.21/14"
        }
    },
    fiumicino: {
        icao: "LIRF",
        iata: "FCO",
        shortName: "Leonardo da Vinci-Fiumicino",
        fullName: "Rome Leonardo da Vinci-Fiumicino",
        municipalityName: "Rome",
        location: {
            lat: 41.8045,
            lon: 12.2508
        },
        elevation: {
            meter: 4.57,
            km: 0,
            mile: 0,
            nm: 0,
            feet: 15
        },
        country: {
            code: "IT",
            name: "Italy"
        },
        continent: {
            code: "EU",
            name: "Europe"
        },
        timeZone: "Europe/Rome",
        urls: {
            webSite: "http://www.adr.it/web/aeroporti-di-roma-en-",
            wikipedia: "https://en.wikipedia.org/wiki/Leonardo_da_Vinci%E2%80%93Fiumicino_Airport",
            twitter: "http://twitter.com/AeroportidiRoma",
            googleMaps: "https://www.google.com/maps/@41.804500,12.250800,14z",
            flightRadar: "https://www.flightradar24.com/41.80,12.25/14"
        }
    },
    atalanta: {
        icao: "KATL"
    }
})

const host = "aerodatabox.p.rapidapi.com"
var settings_setup = {
    api: {
        host: host,
        endpoint: "https://" + host,
        key: null
    }
}

const fs = require('node:fs')
try {
    settings_setup.api.key = fs.readFileSync("/run/secrets/api_key", "utf8")
} catch (err) {
    console.error(err)
    process.exit(1)
}

const settings = deepFreeze(settings_setup)

console.log("settings", settings)

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
