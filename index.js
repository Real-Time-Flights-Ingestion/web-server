"use strict";

import settings from './code/settings.js';
import server from './code/server.js';
import kafkaProducer from './code/kafka.js';

console.log("settings:", settings)

kafkaProducer.connect().then(() => {
    console.log("Kafka connection successful")
    server.listen(
        settings.server.port,
        settings.server.host,
        () => console.log(`server started on ${settings.server.host}:${settings.server.port}`)
    )
    server.on("close", async () => {
        console.log("Server closed")
        await kafkaProducer.disconnect()
        console.log("Kafka disconnected")
    })
}).catch((error) => {
    console.error("Kafka connection error:", error)
})
