import { getNextFeedEvent } from "lib-osu-event-tracker/src/getNextFeedElement"
import { getContainer } from "worker-osu-event-tracker/src/database/Repository"
import { SBClientSender } from "worker-osu-event-tracker/src/servicebus/serviceBusClient"
import { createLogger } from "utilities/src/simpleLogger"

import { getConfig } from "./getConfig"
import { FeedEvent } from "../../lib-osu-event-tracker/src/types/FeedEvents"

require("dotenv").config()

const { log, error } = createLogger("worker-osu-event-tracker", {
	doLog: true,
	useColors: true,
	useTimestamps: true
})

function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

const start = async () => {
	const config = getConfig()
	const container = await getContainer(config)

	const sbSender = new SBClientSender({
		connectionString: config.serviceBus.connectionString,
		topics: [
			"beatmap-deleted",
			"beatmap-new",
			"beatmap-played-x-times",
			"beatmap-ranked",
			"beatmap-revived",
			"beatmap-update",
			"beatmapset-qualified",
			"lost-first-place",
			"medal-achieved",
			"osu-supporter-gifted",
			"osu-supporter-new",
			"osu-supporter-returning",
			"ranked-play",
			"unknown",
			"username-changed"
		]
	})

	let currentIndex = 0

	while (true) {
		try {
			const { responseBody, event } = await getNextFeedEvent(currentIndex)

			if (config.dev) {
				log(`${responseBody.replace(/\n/g, ", ")}`)
				log("", event)
			}

			if (event) {
				currentIndex = event.feedIndex
			}

			// No new events were returned, wait a little bit before querying again
			if (event?.type === "none") {
				await sleep(200)
				continue
			}

			const richEvent: Required<FeedEvent> = {
				...event,
				raw: responseBody
			}

			// Ship event with ServiceBus
			await sbSender.send(richEvent, richEvent.type)

			// Put it in Cosmos
			await container.items.create({
				...richEvent,
				pk: event.type
			})
		} catch (error) {
			console.error(error)
			container.items.create({
				type: "error",
				error: error
			})
		}
	}
}

start().catch((err) => {
	error(err)
})
