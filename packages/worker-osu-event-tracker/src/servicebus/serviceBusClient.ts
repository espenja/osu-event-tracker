import {
	ProcessErrorArgs,
	ServiceBusClient,
	ServiceBusReceivedMessage,
	ServiceBusReceiver,
	ServiceBusSender
} from "@azure/service-bus"
import { FeedType } from "lib-osu-event-tracker/src/types/FeedEvents"

type SBClientReceiverOptions = {
	connectionString: string
	topic: string
	subscription: string
	messageHandler: (message: ServiceBusReceivedMessage) => Promise<void>
	errorHandler: (error: ProcessErrorArgs) => Promise<void>
}

type SBClientSenderOptions = {
	connectionString: string
	topics: FeedType[]
}

export class SBClientReceiver {
	private client: ServiceBusClient
	private topic: string
	private subscription: string
	private receiver: ServiceBusReceiver

	public constructor(options: SBClientReceiverOptions) {
		this.client = new ServiceBusClient(options.connectionString)
		this.topic = options.topic
		this.subscription = options.subscription

		this.receiver = this.client.createReceiver(this.topic, this.subscription)
		this.receiver.subscribe({
			processError: options.errorHandler,
			processMessage: options.messageHandler
		})
	}
}

type RecordOfTopicsSender = {
	[key in FeedType]: ServiceBusSender
}

export class SBClientSender {
	private client: ServiceBusClient
	private topics: RecordOfTopicsSender

	public constructor(options: SBClientSenderOptions) {
		this.client = new ServiceBusClient(options.connectionString)
		this.topics = options.topics.reduce<RecordOfTopicsSender>((topics, topic) => {
			topics[topic] = this.client.createSender(topic)
			return topics
		}, {} as any)
	}

	public async send(message: any, topic: FeedType) {
		await this.topics[topic].sendMessages({
			body: message
		})
	}
}
