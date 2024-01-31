"use strict";

import * as http from 'node:http';

function requestListener(req, res) {
    console.log(req.url)
    res.setHeader("Content-Type", "application/json")
    res.writeHead(200)
    res.end('{"message": "This is a JSON response"}')
}

const server = http.createServer(requestListener);

export default server
