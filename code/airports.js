"use strict"

import { deepFreeze } from './utils.js'

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
        icao: "KATL",
        iata: "ATL",
        shortName: "Hartsfield Jackson",
        fullName: "Atlanta Hartsfield Jackson",
        municipalityName: "Atlanta",
        location: {
            lat: 33.6367,
            lon: -84.4281
        },
        elevation: {
            meter: 312.72,
            km: 0.31,
            mile: 0.19,
            nm: 0.17,
            feet: 1026
        },
        country: {
            code: "US",
            name: "United States"
        },
        "continent": {
            code: "NA",
            name: "North America"
        },
        timeZone: "America/New_York",
        urls: {
            webSite: "http://www.atl.com/",
            wikipedia: "https://en.wikipedia.org/wiki/Hartsfield-Jackson_Atlanta_International_Airport",
            twitter: "http://twitter.com/ATLairport",
            googleMaps: "https://www.google.com/maps/@33.636699,-84.428100,14z",
            liveAtc: "http://www.liveatc.net/search/?icao=KATL",
            flightRadar: "https://www.flightradar24.com/33.64,-84.43/14"
        }
    }
})

export default airports
