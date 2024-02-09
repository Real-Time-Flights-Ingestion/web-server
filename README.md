# RTFI web server

This Node project contains various utility functions to interact with the [AeroDataBox API](https://aerodatabox.com/) focusing on the webhook functionality. The application exposes a simple endpoint to receive the webhook calls, forwarding all the incoming data to Kafka.

## Usage

### Setup

#### Get the API key

The AeroDataBox API is exposed with [RapidApi](https://rapidapi.com/aedbx-aedbx/api/aerodatabox), then an [AeroDataBox RapidApi subscription](https://rapidapi.com/aedbx-aedbx/api/aerodatabox/pricing) must be active.
Since this is a university project about real time data, we used the free [student plan](https://aerodatabox.com/students/).

The api key must be copied (no newline) in a plain text file named `api_key` (without extension) in the root folder. It will be considered a Docker secret.

#### Create a webhook subscription

To create the subscription to an airport run the function `printSubscribeToAirport` available inside `aerodatabox.js` one time. Here is the general API [subscription documentation](https://doc.aerodatabox.com/#tag/Flight-Alert-API/operation/SubscribeWebhook).

### Run

We use Docker to run the project:

```shell
docker compose down && docker compose up --build -d
```

### Interaction

The server uses the port 49153 to receive webhook calls; if you need to change it consider the webhook guidelines.

To check that everything is working we used [provectuslabs/kafka-ui](https://github.com/provectus/kafka-ui), exposing a Kafka user interface on port 8080.

## Implementation

---

Special thanks to [AeroDataBox](https://aerodatabox.com/)
