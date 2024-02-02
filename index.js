"use strict"

import settings from './code/settings.js'
import server from './code/server.js'
import kafkaProducer from './code/kafka.js'

console.log("[startup] settings:", settings)

kafkaProducer.connect().then(() => {
    console.log("[startup] Kafka connection successful")
    server.listen(
        settings.server.port,
        settings.server.host,
        () => console.log(`[startup] server started on ${settings.server.host}:${settings.server.port}`)
    )
    server.on("close", async () => {
        console.log("[shutdown] Server closed")
        await kafkaProducer.disconnect()
        console.log("[shutdown] Kafka disconnected")
    })
}).catch((error) => {
    console.error("[error] Kafka connection error:", error)
})

process.on("[shutdown] SIGTERM", () => {
    console.log("[shutdown] SIGTERM received")
    server.close(() => process.exit())
})
