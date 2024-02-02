"use strict"

import * as http from 'node:http'
import settings from './settings.js'
import airports from './airports.js'
import { sendFlights } from './kafka.js'

const pathMatches = function () {
    if (settings.server.trailingSlashNormalization) {
        return function(path1, path2) {
            if (path1 === path2) {
                return true
            } else {
                if (path1.endsWith("/")) {
                    return path1 === path2+"/"
                } else {
                    return path1+"/" === path2
                }
            }
        }
    } else {
        return function(path1, path2) {
            return path1 === path2
        }
    }
}()

function requestBody(incomingMessage) {
    return new Promise(function (resolve, reject) {
        var body = ""
        incomingMessage.on("data",
            chunk => body += chunk
        )
        incomingMessage.on("end",
            () => resolve(body)
        )
        incomingMessage.on("error", reject)
    })
}

function isAdbRequest(incomingMessage) {
    return pathMatches(incomingMessage.url, settings.server.aerodataboxWebhookEndpoint) &&
        incomingMessage.method === "POST" &&
        incomingMessage.headers["content-type"] === "application/json"
}

function requestListener(req, res) {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null
    var status = 404
    if (isAdbRequest(req)) {
        status = 200
        requestBody(req).then(
            function (body) {
                try {
                    body = JSON.parse(body)
                    console.log("Received:", JSON.stringify(body, null, 4))
                    var flights = body["flights"]
                    if (flights) {
                        sendFlights(airports.luxembourg.icao, flights)
                    }
                } catch (error) {
                    // error is instance of SyntaxError
                    console.error("JSON parsing error:", error, body)
                }
            }
        ).catch((error) => console.error("Request read error:", error))
    }
    res.writeHead(status)
    res.end()
    console.log(`[request] ${ip} ${req.method} ${req.headers.host}${req.url} ${status}`)
}

const server = http.createServer(requestListener)

export default server
