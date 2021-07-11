import { ProcessErrorArgs, ServiceBusReceivedMessage } from "@azure/service-bus"

import { getConfig } from "./getConfig"
import { SBClientReceiver } from "worker-osu-event-tracker/src/servicebus/serviceBusClient"
import { createLogger } from "utilities/src/simpleLogger"

require("dotenv").config()

const { log, error } = createLogger("osu-event-receiver", {
	doLog: true,
	useColors: true,
	useTimestamps: true
})

function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

const sbErrorHandler = (topicName: string) => async (processError: ProcessErrorArgs) => {
	error(topicName, processError)
}

const sbMessageHandler = (topicName: string) => async (message: ServiceBusReceivedMessage) => {
	log(topicName, message.body)
}

const start = async () => {
	log("Started. Loading config.")
	const config = getConfig()

	log("Creating Service Bus Receivers")

	Object.entries(config.serviceBus.topics).map(([key, value]) => {
		new SBClientReceiver({
			connectionString: value.key,
			errorHandler: sbErrorHandler(key),
			messageHandler: sbMessageHandler(key),
			subscription: value.subscription,
			topic: value.name
		})
	})

	while (true) {
		await sleep(5)
	}
}

start().catch((error) => {
	console.error(error)
})
