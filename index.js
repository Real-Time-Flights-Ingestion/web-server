"use strict";

import settings from './code/settings.js';
import server from './code/server.js';

console.log("settings:", settings)

server.listen(
    settings.server.port,
    settings.server.host,
    () => console.log(`server started on ${settings.server.host}:${settings.server.port}`)
)
