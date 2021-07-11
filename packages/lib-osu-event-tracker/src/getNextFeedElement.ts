import got from "got"
import { decode } from "html-entities"
import { version as libVersion, name as libName } from "../package.json"

import { pickFromObject as pick, defaultFormatters, RequiredHandler } from "utilities/src/pickFromObject"

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
	FeedEventUsernameChange,
	Map,
	User
} from "./types/FeedEvents"

const getMap = (req: RequiredHandler): Map => {
	return {
		mapId: req("mapId", defaultFormatters.toInt),
		mapLink: req("mapLink", decodeURI),
		mapName: req("mapName", decode)
	}
}

const getUser = (req: RequiredHandler): User => {
	return {
		userId: req("userId", defaultFormatters.toInt),
		userLink: req("userLink", decodeURI),
		username: req("username", decode)
	}
}

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

	const medalMatch = medalUnlockedPattern.exec(event)
	if (medalMatch) {
		const medalAchieved = pick<FeedEventMedalAchieved>(medalMatch.groups!, (req) => ({
			feedIndex: currentEvent,
			type: "medal-achieved",
			medalName: req("medalName", decode),
			...getUser(req)
		}))

		return medalAchieved
	}

	const rankedPlayMatch = rankedPlayPattern.exec(event)
	if (rankedPlayMatch) {
		const rankedPlay = pick<FeedEventRankedPlay>(rankedPlayMatch.groups!, (req) => ({
			feedIndex: currentEvent,
			type: "ranked-play",
			gameMode: req("gameMode", defaultFormatters.toInt),
			gameModeName: req("gameModeName"),
			...getMap(req),
			globalRank: req("globalRank", defaultFormatters.toInt),
			rating: req("rating"),
			...getUser(req)
		}))

		return rankedPlay
	}

	const updatedBeatmapMatch = beatmapUpdatedPattern.exec(event)
	if (updatedBeatmapMatch) {
		const beatmapUpdate = pick<FeedEventBeatmapUpdate>(updatedBeatmapMatch.groups!, (req) => ({
			feedIndex: currentEvent,
			type: "beatmap-update",
			...getMap(req),
			...getUser(req)
		}))

		return beatmapUpdate
	}

	const newBeatmapMatch = beatmapNewPattern.exec(event)
	if (newBeatmapMatch) {
		const newBeatmap = pick<FeedEventBeatmapNew>(newBeatmapMatch.groups!, (req) => ({
			feedIndex: currentEvent,
			type: "beatmap-new",
			...getMap(req),
			...getUser(req)
		}))

		return newBeatmap
	}

	const osuSupporterNewMatch = osuSupporterNewPattern.exec(event)
	if (osuSupporterNewMatch) {
		const osuSupporterNew = pick<FeedEventOsuSupporterNew>(osuSupporterNewMatch.groups!, (req) => ({
			feedIndex: currentEvent,
			type: "osu-supporter-new",
			...getUser(req)
		}))

		return osuSupporterNew
	}

	const osuSupporterReturningMatch = osuSupporterReturningPattern.exec(event)
	if (osuSupporterReturningMatch) {
		const osuSupporterReturning = pick<FeedEventOsuSupporterReturning>(osuSupporterReturningMatch.groups!, (req) => ({
			feedIndex: currentEvent,
			type: "osu-supporter-returning",
			...getUser(req)
		}))

		return osuSupporterReturning
	}

	const lostFirstPlaceMatch = firstPlaceLostPattern.exec(event)
	if (lostFirstPlaceMatch) {
		const lostFirstPlace = pick<FeedEventLostFirstPlace>(lostFirstPlaceMatch.groups!, (req) => ({
			feedIndex: currentEvent,
			type: "lost-first-place",
			gameMode: req("gameMode", defaultFormatters.toInt),
			gameModeName: req("gameModeName"),
			...getMap(req),
			...getUser(req)
		}))

		return lostFirstPlace
	}

	const beatmapRevivedUpdateMatch = beatmapRevivedPattern.exec(event)
	if (beatmapRevivedUpdateMatch) {
		const beatmapRevivedUpdate = pick<FeedEventBeatmapRevivedUpdate>(beatmapRevivedUpdateMatch.groups!, (req) => ({
			feedIndex: currentEvent,
			type: "beatmap-revived",
			...getMap(req),
			...getUser(req)
		}))

		return beatmapRevivedUpdate
	}

	const usernameChangeMatch = usernameChangedPattern.exec(event)
	if (usernameChangeMatch) {
		const usernameChange = pick<FeedEventUsernameChange>(usernameChangeMatch.groups!, (req) => ({
			feedIndex: currentEvent,
			type: "username-changed",
			oldUsername: req("oldUsername", decode),
			...getUser(req)
		}))

		return usernameChange
	}

	const osuSupporterGiftedMatch = osuSupporterGiftedPattern.exec(event)
	if (osuSupporterGiftedMatch) {
		const osuSupporterGifted = pick<FeedEventOsuSupporterGifted>(osuSupporterGiftedMatch!, (req) => ({
			feedIndex: currentEvent,
			type: "osu-supporter-gifted",
			...getUser(req)
		}))

		return osuSupporterGifted
	}

	const beatmapSetQualifiedMatch = beatmapSetQualifiedPattern.exec(event)
	if (beatmapSetQualifiedMatch) {
		const beatmapSetQualified = pick<FeedEventBeatmapSetQualified>(beatmapSetQualifiedMatch!, (req) => ({
			feedIndex: currentEvent,
			type: "beatmapset-qualified",
			...getMap(req),
			...getUser(req)
		}))

		return beatmapSetQualified
	}

	const beatmapDeletedMatch = beatmapDeletedPattern.exec(event)
	if (beatmapDeletedMatch) {
		const beatmapDeleted = pick<FeedEventBeatmapDeleted>(beatmapDeletedMatch!, (req) => ({
			feedIndex: currentEvent,
			type: "beatmap-deleted",
			...getMap(req)
		}))

		return beatmapDeleted
	}

	const beatmapRankedMatch = beatmapRankedPattern.exec(event)
	if (beatmapRankedMatch) {
		const beatmapRanked = pick<FeedEventBeatmapRanked>(beatmapRankedMatch!, (req) => ({
			feedIndex: currentEvent,
			type: "beatmap-ranked",
			...getMap(req),
			...getUser(req)
		}))

		return beatmapRanked
	}

	const beatmapPlayedTimesMatch = beatmapPlayedXTimesPattern.exec(event)
	if (beatmapPlayedTimesMatch) {
		const number = beatmapPlayedTimesMatch[4].replace(/[,\.]/g, "").trim()

		const beatmapPlayedTimes = pick<FeedEventBeatmapPlayedTimes>(beatmapPlayedTimesMatch.groups!, (req) => ({
			feedIndex: currentEvent,
			type: "beatmap-played-x-times",
			...getMap(req),
			number: parseInt(number)
		}))

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

const getFeedUrl = (offset: number) => `https://osu.ppy.sh/pages/include/eventfeed.php?i=${offset}`

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
