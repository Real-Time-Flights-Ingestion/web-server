"use strict"

import settings from './settings.js'

const headers = {
    "X-RapidAPI-Key": settings.api.key,
    "X-RapidAPI-Host": settings.api.host
}

export async function fetchAirportDetails(icao) {
    const response = await fetch(
        settings.api.endpoint + "/airports/icao/" + icao,
        { headers: headers }
    )
    if (response.ok && response.status !== 204) {
        const result = await response.json()
        return result
    } else {
        try {
            const errorBody = await response.text()
            throw Error("Response not ok", { cause: { response: response, body: errorBody } })
        } catch (error) {
            throw Error("Response not ok", { cause: { response: response } })
        }
    }
}

export async function printAirportDetails(icao) {
    try {
        const result = await fetchAirportDetails(icao)
        console.log("Airport details:", JSON.stringify(result, null, 4))
    } catch (error) {
        if (error instanceof SyntaxError) {
            // JSON parsing error
            console.error("JSON parsing error:", error)
        } else {
            console.error("Fetch error:", error)
        }
    }
}

export async function subscribeToAirport(icao) {
    const response = await fetch(
        settings.api.endpoint + "/subscriptions/webhook/FlightByAirportIcao/" + icao,
        {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json"
            },
            body: `{"url": "${settings.server.webhookUrl}"}`
        }
    )
    if (response.ok && response.status !== 204) {
        const result = await response.json()
        return result
    } else {
        try {
            const errorBody = await response.text()
            throw Error("Response not ok", { cause: { response: response, body: errorBody } })
        } catch (error) {
            throw Error("Response not ok", { cause: { response: response } })
        }
    }
}

export async function printSubscribeToAirport(icao) {
    try {
        const result = subscribeToAirport(icao)
        console.log("Subscription details:", JSON.stringify(result, null, 4))
    } catch (error) {
        if (error instanceof SyntaxError) {
            // JSON parsing error
            console.error("JSON parsing error:", error)
        } else {
            console.error("Fetch error:", error)
        }
    }
}

export default {
    fetchAirportDetails,
    printAirportDetails,
    subscribeToAirport
}
