import { getNextFeedEvent } from "lib-osu-event-tracker/src/getNextFeedElement"
import { getContainer } from "worker-osu-event-tracker/src/database/Repository"
import { SBClientSender } from "worker-osu-event-tracker/src/servicebus/serviceBusClient"

import { getConfig } from "./getConfig"
import { now } from "./global"

require("dotenv").config()

function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

const start = async () => {
	const config = getConfig()
	const container = await getContainer(config)

	const sbSender = new SBClientSender({
		connectionString: config.serviceBus.connectionString
	})

	let currentIndex = 0

	while (true) {
		try {
			const { responseBody, event } = await getNextFeedEvent(currentIndex)

			if (config.dev) {
				console.log(`${now()}: ${responseBody.replace(/\n/g, ", ")}`)
			}

			if (event) {
				currentIndex = event.feedIndex
			}

			// No new events were returned, wait a little bit before querying again
			if (event?.type === "none") {
				await sleep(500)
			}

			// Put it in Cosmos
			container.items.create({
				...event,
				raw: responseBody,
				pk: event.type
			})

			// Ship event with ServiceBus
			sbSender.send(event, event.type)
		} catch (error) {
			console.error(error)
			container.items.create({
				type: "error",
				error: error
			})
		}
	}
}

start().catch((error) => {
	console.error(error)
})
