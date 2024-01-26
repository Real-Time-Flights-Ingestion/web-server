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
        icao: "LIRF"
    },
    atalanta: {
        icao: "KATL"
    }
})

const apiKey = process.env.API_KEY

const url = "https://aerodatabox.p.rapidapi.com/airports/icao/" + airports.fiumicino.icao
const options = {
    headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com"
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
