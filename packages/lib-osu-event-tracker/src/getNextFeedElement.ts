import got from "got"
import { decode } from "html-entities"
import { version as libVersion, name as libName } from "../package.json"

import {
	beatmapDeletedPattern,
	beatmapPlayedXTimesPattern,
	beatmapRankedPattern,
	beatmapRevivedPattern,
	beatmapSetQualifiedPattern,
	firstPlaceLostPattern,
	medalUnlockedPattern,
	beatmapNewPattern,
	osuSupporterNewPattern,
	osuSupporterGiftedPattern,
	rankedPlayPattern,
	osuSupporterReturningPattern,
	beatmapUpdatedPattern,
	usernameChangedPattern
} from "./types/EventMatchers"

import {
	FeedEvent,
	FeedEventBeatmapDeleted,
	FeedEventBeatmapNew,
	FeedEventBeatmapPlayedTimes,
	FeedEventBeatmapRanked,
	FeedEventBeatmapRevivedUpdate,
	FeedEventBeatmapSetQualified,
	FeedEventBeatmapUpdate,
	FeedEventLostFirstPlace,
	FeedEventMedalAchieved,
	FeedEventOsuSupporterGifted,
	FeedEventOsuSupporterNew,
	FeedEventOsuSupporterReturning,
	FeedEventRankedPlay,
	FeedEventUnknown,
	FeedEventUsernameChange
} from "./types/FeedEvents"

const getFeedUrl = (offset: number) => `https://osu.ppy.sh/pages/include/eventfeed.php?i=${offset}`

const parseFeedEvent = (feedResult: string) => {
	const split = feedResult.split("\n")
	const currentEvent = parseInt(split[0])

	if (split?.length <= 1) {
		return {
			type: "none",
			feedIndex: currentEvent
		} as FeedEvent
	}

	if (split.length !== 3) {
		throw new Error(`Unexpected length of response split: ${feedResult}`)
	}

	const event = split[2]

	const medalMatch = event.match(medalUnlockedPattern)
	if (medalMatch) {
		const medalAchieved: FeedEventMedalAchieved = {
			feedIndex: currentEvent,
			type: "medal-achieved",
			medalName: decode(medalMatch[4]),
			userId: parseInt(medalMatch[2]),
			userLink: decodeURI(medalMatch[1]),
			username: decode(medalMatch[3])
		}

		return medalAchieved
	}

	const rankedPlayMatch = event.match(rankedPlayPattern)
	if (rankedPlayMatch) {
		const rankedPlay: FeedEventRankedPlay = {
			feedIndex: currentEvent,
			type: "ranked-play",
			gameMode: parseInt(rankedPlayMatch[8]),
			mapId: parseInt(rankedPlayMatch[7]),
			mapLink: decodeURI(rankedPlayMatch[6]),
			mapName: decode(rankedPlayMatch[9]),
			globalRank: parseInt(rankedPlayMatch[5]),
			rating: rankedPlayMatch[1],
			userId: parseInt(rankedPlayMatch[3]),
			userLink: decodeURI(rankedPlayMatch[2]),
			username: decode(rankedPlayMatch[4])
		}

		return rankedPlay
	}

	const updatedBeatmapMatch = event.match(beatmapUpdatedPattern)
	if (updatedBeatmapMatch) {
		const beatmapUpdate: FeedEventBeatmapUpdate = {
			feedIndex: currentEvent,
			type: "beatmap-update",
			mapId: parseInt(updatedBeatmapMatch[5]),
			mapLink: decodeURI(updatedBeatmapMatch[4]),
			mapName: decode(updatedBeatmapMatch[6]),
			userId: parseInt(updatedBeatmapMatch[2]),
			userLink: decodeURI(updatedBeatmapMatch[1]),
			username: decode(updatedBeatmapMatch[3])
		}
		return beatmapUpdate
	}

	const newBeatmapMatch = event.match(beatmapNewPattern)
	if (newBeatmapMatch) {
		const newBeatmap: FeedEventBeatmapNew = {
			feedIndex: currentEvent,
			type: "beatmap-new",
			mapId: parseInt(newBeatmapMatch[5]),
			mapLink: decodeURI(newBeatmapMatch[4]),
			mapName: decode(newBeatmapMatch[6]),
			userId: parseInt(newBeatmapMatch[2]),
			userLink: decodeURI(newBeatmapMatch[1]),
			username: decode(newBeatmapMatch[3])
		}

		return newBeatmap
	}

	const osuSupporterNewMatch = event.match(osuSupporterNewPattern)

	if (osuSupporterNewMatch) {
		const osuSupporterNew: FeedEventOsuSupporterNew = {
			feedIndex: currentEvent,
			type: "osu-supporter-new",
			userId: parseInt(osuSupporterNewMatch[2]),
			userLink: decodeURI(osuSupporterNewMatch[1]),
			username: decode(osuSupporterNewMatch[3])
		}

		return osuSupporterNew
	}

	const osuSupporterReturningMatch = event.match(osuSupporterReturningPattern)

	if (osuSupporterReturningMatch) {
		const osuSupporterReturning: FeedEventOsuSupporterReturning = {
			feedIndex: currentEvent,
			type: "osu-supporter-returning",
			userId: parseInt(osuSupporterReturningMatch[2]),
			userLink: decodeURI(osuSupporterReturningMatch[1]),
			username: decode(osuSupporterReturningMatch[3])
		}

		return osuSupporterReturning
	}

	const lostFirstPlaceMatch = event.match(firstPlaceLostPattern)
	if (lostFirstPlaceMatch) {
		const lostFirstPlace: FeedEventLostFirstPlace = {
			feedIndex: currentEvent,
			type: "lost-first-place",
			gameMode: parseInt(lostFirstPlaceMatch[6]),
			mapId: parseInt(lostFirstPlaceMatch[5]),
			mapLink: decodeURI(lostFirstPlaceMatch[4]),
			mapName: decode(lostFirstPlaceMatch[7]),
			userId: parseInt(lostFirstPlaceMatch[2]),
			userLink: decodeURI(lostFirstPlaceMatch[1]),
			username: decode(lostFirstPlaceMatch[3])
		}

		return lostFirstPlace
	}

	const beatmapRevivedUpdateMatch = event.match(beatmapRevivedPattern)

	if (beatmapRevivedUpdateMatch) {
		const beatmapRevivedUpdate: FeedEventBeatmapRevivedUpdate = {
			feedIndex: currentEvent,
			type: "beatmap-revived",
			mapId: parseInt(beatmapRevivedUpdateMatch[2]),
			mapLink: decodeURI(beatmapRevivedUpdateMatch[1]),
			mapName: decode(beatmapRevivedUpdateMatch[3]),
			userId: parseInt(beatmapRevivedUpdateMatch[5]),
			userLink: decodeURI(beatmapRevivedUpdateMatch[4]),
			username: decode(beatmapRevivedUpdateMatch[6])
		}

		return beatmapRevivedUpdate
	}

	const usernameChangeMatch = event.match(usernameChangedPattern)

	if (usernameChangeMatch) {
		const usernameChange: FeedEventUsernameChange = {
			feedIndex: currentEvent,
			type: "username-changed",
			oldUsername: decode(usernameChangeMatch[3]),
			userId: parseInt(usernameChangeMatch[2]),
			userLink: decodeURI(usernameChangeMatch[1]),
			username: decode(usernameChangeMatch[4])
		}

		return usernameChange
	}

	const osuSupporterGiftedMatch = event.match(osuSupporterGiftedPattern)

	if (osuSupporterGiftedMatch) {
		const osuSupporterGifted: FeedEventOsuSupporterGifted = {
			feedIndex: currentEvent,
			type: "osu-supporter-gifted",
			userId: parseInt(osuSupporterGiftedMatch[2]),
			userLink: decodeURI(osuSupporterGiftedMatch[1]),
			username: decode(osuSupporterGiftedMatch[3])
		}

		return osuSupporterGifted
	}

	const beatmapSetQualifiedMatch = event.match(beatmapSetQualifiedPattern)
	if (beatmapSetQualifiedMatch) {
		const beatmapSetQualified: FeedEventBeatmapSetQualified = {
			feedIndex: currentEvent,
			type: "beatmapset-qualified",
			mapId: parseInt(beatmapSetQualifiedMatch[2]),
			mapLink: decodeURI(beatmapSetQualifiedMatch[1]),
			mapName: decode(beatmapSetQualifiedMatch[3]),
			userId: parseInt(beatmapSetQualifiedMatch[5]),
			userLink: decodeURI(beatmapSetQualifiedMatch[4]),
			username: decode(beatmapSetQualifiedMatch[6])
		}

		return beatmapSetQualified
	}

	const beatmapDeletedMatch = event.match(beatmapDeletedPattern)
	if (beatmapDeletedMatch) {
		const beatmapDeleted: FeedEventBeatmapDeleted = {
			feedIndex: currentEvent,
			type: "beatmap-deleted",
			mapId: parseInt(beatmapDeletedMatch[2]),
			mapLink: decodeURI(beatmapDeletedMatch[1]),
			mapName: decode(beatmapDeletedMatch[3])
		}

		return beatmapDeleted
	}

	const beatmapRankedMatch = event.match(beatmapRankedPattern)
	if (beatmapRankedMatch) {
		const beatmapRanked: FeedEventBeatmapRanked = {
			feedIndex: currentEvent,
			type: "beatmap-ranked",
			mapId: parseInt(beatmapRankedMatch[2]),
			mapLink: decodeURI(beatmapRankedMatch[1]),
			mapName: decode(beatmapRankedMatch[3]),
			userId: parseInt(beatmapRankedMatch[5]),
			userLink: decodeURI(beatmapRankedMatch[4]),
			username: decode(beatmapRankedMatch[6])
		}

		return beatmapRanked
	}

	const beatmapPlayedTimesMatch = event.match(beatmapPlayedXTimesPattern)
	if (beatmapPlayedTimesMatch) {
		const number = beatmapPlayedTimesMatch[4].replace(/[,\.]/g, "").trim()

		const beatmapPlayedTimes: FeedEventBeatmapPlayedTimes = {
			feedIndex: currentEvent,
			type: "beatmap-played-x-times",
			mapId: parseInt(beatmapPlayedTimesMatch[2]),
			mapLink: decodeURI(beatmapPlayedTimesMatch[1]),
			mapName: decode(beatmapPlayedTimesMatch[3]),
			number: parseInt(number)
		}

		return beatmapPlayedTimes
	}

	const unknownEvent: FeedEventUnknown = {
		feedIndex: currentEvent,
		type: "unknown"
	}

	return unknownEvent
}

type GetNextFeedEventOptions = {
	logger?: (str?: string, obj?: Record<string, any>) => void
}

export const getNextFeedEvent = async (offset: number, options?: GetNextFeedEventOptions) => {
	const feedEventUrl = getFeedUrl(offset)

	if (options?.logger) {
		options.logger(`Attempting to get ${feedEventUrl}`)
	}

	const response = await got.get(feedEventUrl, {
		headers: {
			"User-Agent": `${libName}@${libVersion}`
		},
		timeout: 5000
	})

	const responseBody = Buffer.from(response.rawBody).toString("utf-8")
	const event = parseFeedEvent(responseBody)
	return { responseBody, event }
}
