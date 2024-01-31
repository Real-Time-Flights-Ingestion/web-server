"use strict";

import * as http from 'node:http';
import settings from './settings.js';

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

function requestListener(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null
    var status = 404
    if (pathMatches(req.url, settings.server.aerodataboxWebhookEndpoint)) {
        status = 200
    }
    res.writeHead(status)
    res.end()
    console.log(`[request] ${ip} ${req.method} ${req.headers.host}${req.url} ${status}`)
}

const server = http.createServer(requestListener);

export default server
