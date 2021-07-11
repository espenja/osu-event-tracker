import { pickFromObject, defaultFormatters } from "utilities/src/pickFromObject"

export const getConfig = () => {
	return pickFromObject(process.env, (required, optional) => ({
		dev: required("NODE_ENV", defaultFormatters.isNot("production")),
		appInsightskey: required(["APPLICATION_INSIGHTS_INSTRUMENTATION_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
		serviceBus: {
			connectionString: required("SERVICE_BUS_CONNECTION_STRING"),
			topics: {
				beatmapDeleted: {
					name: required("SERVICE_BUS_TOPIC_BEATMAP_DELETED"),
					key: required(["SERVICE_BUS_TOPIC_BEATMAP_DELETED_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_BEATMAP_DELETED_SUBSCRIPTION")
				},
				beatmapNew: {
					name: required("SERVICE_BUS_TOPIC_BEATMAP_NEW"),
					key: required(["SERVICE_BUS_TOPIC_BEATMAP_NEW_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_BEATMAP_NEW_SUBSCRIPTION")
				},
				beatmapPlayedXTimes: {
					name: required("SERVICE_BUS_TOPIC_BEATMAP_PLAYED_X_TIMES"),
					key: required(["SERVICE_BUS_TOPIC_BEATMAP_PLAYED_X_TIMES_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_BEATMAP_PLAYED_X_TIMES_SUBSCRIPTION")
				},
				beatmapRanked: {
					name: required("SERVICE_BUS_TOPIC_BEATMAP_RANKED"),
					key: required(["SERVICE_BUS_TOPIC_BEATMAP_RANKED_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_BEATMAP_RANKED_SUBSCRIPTION")
				},
				beatmapRevived: {
					name: required("SERVICE_BUS_TOPIC_BEATMAP_REVIVED"),
					key: required(["SERVICE_BUS_TOPIC_BEATMAP_REVIVED_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_BEATMAP_REVIVED_SUBSCRIPTION")
				},
				beatmapUpdate: {
					name: required("SERVICE_BUS_TOPIC_BEATMAP_UPDATE"),
					key: required(["SERVICE_BUS_TOPIC_BEATMAP_UPDATE_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_BEATMAP_UPDATE_SUBSCRIPTION")
				},
				beatmapSetQualified: {
					name: required("SERVICE_BUS_TOPIC_BEATMAPSET_QUALIFIED"),
					key: required(["SERVICE_BUS_TOPIC_BEATMAPSET_QUALIFIED_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_BEATMAPSET_QUALIFIED_SUBSCRIPTION")
				},
				lostFirstPlace: {
					name: required("SERVICE_BUS_TOPIC_LOST_FIRST_PLACE"),
					key: required(["SERVICE_BUS_TOPIC_LOST_FIRST_PLACE_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_LOST_FIRST_PLACE_SUBSCRIPTION")
				},
				medalAchieved: {
					name: required("SERVICE_BUS_TOPIC_MEDAL_ACHIEVED"),
					key: required(["SERVICE_BUS_TOPIC_MEDAL_ACHIEVED_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_MEDAL_ACHIEVED_SUBSCRIPTION")
				},
				osuSupporterGifted: {
					name: required("SERVICE_BUS_TOPIC_OSU_SUPPORTER_GIFTED"),
					key: required(["SERVICE_BUS_TOPIC_OSU_SUPPORTER_GIFTED_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_OSU_SUPPORTER_GIFTED_SUBSCRIPTION")
				},
				osuSupporterNew: {
					name: required("SERVICE_BUS_TOPIC_OSU_SUPPORTER_NEW"),
					key: required(["SERVICE_BUS_TOPIC_OSU_SUPPORTER_NEW_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_OSU_SUPPORTER_NEW_SUBSCRIPTION")
				},
				osuSupporterReturning: {
					name: required("SERVICE_BUS_TOPIC_OSU_SUPPORTER_RETURNING"),
					key: required(["SERVICE_BUS_TOPIC_OSU_SUPPORTER_RETURNING_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_OSU_SUPPORTER_RETURNING_SUBSCRIPTION")
				},
				rankedPlay: {
					name: required("SERVICE_BUS_TOPIC_RANKED_PLAY"),
					key: required(["SERVICE_BUS_TOPIC_RANKED_PLAY_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_RANKED_PLAY_SUBSCRIPTION")
				},
				unknown: {
					name: required("SERVICE_BUS_TOPIC_UNKNOWN"),
					key: required(["SERVICE_BUS_TOPIC_UNKNOWN_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_UNKNOWN_SUBSCRIPTION")
				},
				usernameChanged: {
					name: required("SERVICE_BUS_TOPIC_USERNAME_CHANGED"),
					key: required(["SERVICE_BUS_TOPIC_USERNAME_CHANGED_KEY", "SERVICE_BUS_CONNECTION_STRING"]),
					subscription: required("SERVICE_BUS_TOPIC_USERNAME_CHANGED_SUBSCRIPTION")
				}
			}
		}
	}))
}

export type Config = ReturnType<typeof getConfig>
