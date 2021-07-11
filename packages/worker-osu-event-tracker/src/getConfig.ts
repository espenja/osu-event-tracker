import { pickFromObject } from "utilities/src/pickFromObject"

const isNot = (not: string) => (value: string) => value !== not
const toInt = (value: string) => parseInt(value)

export const getConfig = () => {
	return pickFromObject(process.env, (required, optional) => {
		return {
			dev: required("NODE_ENV", isNot("production")),
			appInsightsKey: required("APPLICATION_INSIGHTS_INSTRUMENTATION_KEY"),
			cosmosDb: {
				endpoint: required("COSMOS_DB_ENDPOINT"),
				connectionString: required("COSMOS_DB_CONNECTION_STRING"),
				databaseId: required("COSMOS_DB_DATABASE_ID"),
				containerId: required("COSMOS_DB_CONTAINER_ID"),
				maxThroughput: optional("COSMOS_DB_MAX_THROUGHPUT", 4000, toInt)
			},
			serviceBus: {
				connectionString: required("SERVICE_BUS_CONNECTION_STRING")
			}
		}
	})
}

export type Config = ReturnType<typeof getConfig>
