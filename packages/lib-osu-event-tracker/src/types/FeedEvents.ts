export type FeedType =
	| "none"
	| "unknown"
	| "medal-achieved"
	| "ranked-play"
	| "beatmap-update"
	| "beatmap-new"
	| "beatmap-ranked"
	| "beatmapset-qualified"
	| "beatmap-deleted"
	| "osu-supporter-new"
	| "osu-supporter-returning"
	| "osu-supporter-gifted"
	| "lost-first-place"
	| "beatmap-revived"
	| "username-changed"
	| "beatmap-played-x-times"

export type FeedEvent = {
	type: FeedType
	feedIndex: number
	raw?: string
}

export type Map = {
	mapId: number
	mapName: string
	mapLink: string
}

export type User = {
	userId: number
	username: string
	userLink: string
}

export type FeedEventUnknown = FeedEvent
export type FeedUserEvent = FeedEvent & User

export type FeedEventBeatmapUpdate = FeedUserEvent & Map
export type FeedEventBeatmapNew = FeedUserEvent & Map
export type FeedEventBeatmapSetQualified = FeedUserEvent & Map
export type FeedEventBeatmapDeleted = FeedEvent & Map
export type FeedEventBeatmapRevivedUpdate = FeedUserEvent & Map
export type FeedEventBeatmapRanked = FeedUserEvent & Map
export type FeedEventBeatmapPlayedTimes = FeedEvent &
	Map & {
		number: number
	}

export type FeedEventOsuSupporterNew = FeedUserEvent
export type FeedEventOsuSupporterReturning = FeedUserEvent
export type FeedEventOsuSupporterGifted = FeedUserEvent

export type FeedEventLostFirstPlace = FeedUserEvent &
	Map & {
		gameMode: number
		gameModeName: string
	}

export type FeedEventUsernameChange = FeedUserEvent & {
	oldUsername: string
}

export type FeedEventMedalAchieved = FeedUserEvent & {
	medalName: string
}

export type FeedEventRankedPlay = FeedUserEvent &
	Map & {
		gameMode: number
		gameModeName: string
		globalRank: number
		rating: string
	}
