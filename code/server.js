"use strict"

import * as http from 'node:http'
import settings from './settings.js'
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

function sendToKafka(body) {
    const flights = body["flights"]
    if (flights) {
        const subscription = body["subscription"]
        const icao = subscription["subject"]["id"]
        const id = subscription["id"]
        sendFlights(icao, flights, id)
    }
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
                    console.log("[request] Received:", JSON.stringify(body, null, 4))
                    sendToKafka(body)
                } catch (error) {
                    if (error instanceof SyntaxError) {
                        // JSON parsing error
                        console.error("[error] JSON parsing error:", error, body)
                    } else {
                        console.error("[error] Kafka send error:", error)
                    }
                }
            }
        ).catch((error) => console.error("[error] Request read error:", error))
    }
    res.writeHead(status)
    res.end()
    console.log(`[request] ${ip} ${req.method} ${req.headers.host}${req.url} ${status}`)
}

const server = http.createServer(requestListener)

export default server
