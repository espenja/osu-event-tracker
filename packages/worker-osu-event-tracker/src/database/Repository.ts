import { CosmosClient } from "@azure/cosmos"
import { Config } from "../getConfig"

export const getContainer = async (config: Config) => {
	const { databaseId, containerId, maxThroughput } = config.cosmosDb

	const client = new CosmosClient(config.cosmosDb.connectionString)

	const partitionKeyDefinition = {
		kind: "Hash",
		paths: ["/pk"]
	}

	console.debug(`Creating database ${databaseId}`)
	await client.databases.createIfNotExists({
		id: databaseId
	})

	console.debug(`Database ${databaseId} created`)
	console.debug(`Creating container ${containerId} with ${maxThroughput}RUs`)

	const { container } = await client.database(databaseId).containers.createIfNotExists({
		id: containerId,
		partitionKey: partitionKeyDefinition,
		conflictResolutionPolicy: {
			mode: "LastWriterWins",
			conflictResolutionPath: "/_ts"
		},
		defaultTtl: 864000, // 10 days
		indexingPolicy: {
			automatic: true,
			indexingMode: "consistent",
			includedPaths: [
				{
					path: "/*"
				}
			],
			excludedPaths: [
				{
					path: '/"_etag"/?'
				}
			]
		},
		maxThroughput: maxThroughput
	})

	console.debug(`Container ${containerId} created`)

	return container
}
