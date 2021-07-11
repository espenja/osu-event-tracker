import { ProcessErrorArgs, ServiceBusClient, ServiceBusReceivedMessage, ServiceBusReceiver } from "@azure/service-bus"

type SBClientReceiverOptions = {
	connectionString: string
	topic: string
	subscription: string
	messageHandler: (message: ServiceBusReceivedMessage) => Promise<void>
	errorHandler: (error: ProcessErrorArgs) => Promise<void>
}

type SBClientSenderOptions = {
	connectionString: string
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

export class SBClientSender {
	private client: ServiceBusClient

	public constructor(options: SBClientSenderOptions) {
		this.client = new ServiceBusClient(options.connectionString)
	}

	public async send(message: any, topic: string) {
		await this.client.createSender(topic).sendMessages({
			body: message
		})
	}
}
