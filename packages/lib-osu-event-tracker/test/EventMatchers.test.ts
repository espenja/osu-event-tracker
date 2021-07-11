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
} from "../src/types/EventMatchers"

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
	FeedEventUsernameChange
} from "../src/types/FeedEvents"

test("Event pattern: Medal pattern returns correct properties", () => {
	const raw = "<a href='/users/24549820'>v0lzer0n</a></b> unlocked the \"<b>Sweet Rave Party</b>\" medal!"
	const match = medalUnlockedPattern.exec(raw)

	const properties: (keyof Omit<FeedEventMedalAchieved, "type" | "feedIndex">)[] = ["userId", "userLink", "username"]

	properties.forEach((prop) => expect(match.groups).toHaveProperty(prop))
})

test("Event pattern: Ranked Play pattern returns correct properties", () => {
	const raw =
		"<img src='//s.ppy.sh/images/A_small.png'/> <b><a href='/u/2766439'>floppasupporter</a></b> achieved rank #230 on <a href='/b/2810199?m=0'>BEAT CRUSADERS - TONIGHT, TONIGHT, TONIGHT (TV Size) [Oriental's Insane]</a> (osu!)"
	const match = rankedPlayPattern.exec(raw)

	const properties: (keyof Omit<FeedEventRankedPlay, "type" | "feedIndex">)[] = [
		"gameMode",
		"globalRank",
		"mapId",
		"mapLink",
		"mapName",
		"rating",
		"userId",
		"userLink",
		"username"
	]

	properties.forEach((prop) => expect(match.groups).toHaveProperty(prop))
})

test("Event pattern: Beatmap New pattern returns correct properties", () => {
	const raw =
		"<b><a href='/u/10552849'>IsonafShikolake</a></b> has submitted a new beatmap \"<a href='/s/1514711'>Team Grimoire - Jormgand</a>\""
	const match = beatmapNewPattern.exec(raw)

	const properties: (keyof Omit<FeedEventBeatmapNew, "type" | "feedIndex">)[] = [
		"mapId",
		"mapLink",
		"mapName",
		"userId",
		"userLink",
		"username"
	]

	properties.forEach((prop) => expect(match.groups).toHaveProperty(prop))
})

test("Event pattern: Beatmap Ranked pattern returns correct properties", () => {
	const raw =
		"<a href='/beatmapsets/1489522'>Kody Lavigne - need melatonin</a> by <b><a href='/users/14339830'>Mimari</a></b> has just been ranked!"
	const match = beatmapRankedPattern.exec(raw)

	const properties: (keyof Omit<FeedEventBeatmapRanked, "type" | "feedIndex">)[] = [
		"mapId",
		"mapLink",
		"mapName",
		"userId",
		"userLink",
		"username"
	]

	properties.forEach((prop) => expect(match.groups).toHaveProperty(prop))
})

test("Event pattern: Beatmap deleted pattern returns correct properties ", () => {
	const raw = "<a href='/beatmapsets/920821'>Kobaryo - Chocolate Lily</a> has been deleted."
	const match = beatmapDeletedPattern.exec(raw)

	const properties: (keyof Omit<FeedEventBeatmapDeleted, "type" | "feedIndex">)[] = ["mapId", "mapLink", "mapName"]

	properties.forEach((prop) => expect(match.groups).toHaveProperty(prop))
})

test("Event pattern: Beatmap Updated pattern returns correct properties", () => {
	const raw =
		"<b><a href='/u/24506064'>CnnrOnOsu</a></b> has updated the beatmap \"<a href='/s/1514697'>CnnrOnOsu - DREAMIN' ON</a>\""
	const match = beatmapUpdatedPattern.exec(raw)

	const properties: (keyof Omit<FeedEventBeatmapUpdate, "type" | "feedIndex">)[] = [
		"mapId",
		"mapLink",
		"mapName",
		"userId",
		"userLink",
		"username"
	]

	properties.forEach((prop) => expect(match.groups).toHaveProperty(prop))
})

test("Event pattern: Beatmap Revived pattern returns correct properties", () => {
	const raw =
		"<a href='/s/1483371'>Amatsuki - All I Need are Things I Like</a> has been revived from eternal slumber by <b><a href='/u/15366254'>thechubbs</a></b>."
	const match = beatmapRevivedPattern.exec(raw)

	const properties: (keyof Omit<FeedEventBeatmapRevivedUpdate, "type" | "feedIndex">)[] = [
		"mapId",
		"mapLink",
		"mapName",
		"userId",
		"userLink",
		"username"
	]

	properties.forEach((prop) => expect(match.groups).toHaveProperty(prop))
})

test("Event pattern: Beatmap Played X Times pattern returns correct properties", () => {
	const raw =
		"<a href='/b/2217275'>Various Artists - Mizu's Jump Training #2 [Bonus: Bad Apple (Nhato Remix)]</a> has been played 1,000,000 times!"
	const match = beatmapPlayedXTimesPattern.exec(raw)

	const properties: (keyof Required<Omit<FeedEventBeatmapPlayedTimes, "type" | "feedIndex">>)[] = [
		"mapId",
		"mapLink",
		"mapName",
		"number"
	]

	properties.forEach((prop) => expect(match.groups).toHaveProperty(prop))
})

test("Event pattern: Lost First Place pattern returns correct properties", () => {
	const raw =
		"<b><a href='/u/22639550'>xRichard_OP</a></b> has lost first place on <a href='/b/2633477?m=3'>TK from Ling tosite sigure - unravel (TV Size) [nymphe's insane]</a> (osu!mania)"
	const match = firstPlaceLostPattern.exec(raw)

	const properties: (keyof Omit<FeedEventLostFirstPlace, "type" | "feedIndex">)[] = [
		"gameMode",
		"mapId",
		"mapLink",
		"mapName",
		"userId",
		"userLink",
		"username"
	]

	properties.forEach((prop) => expect(match.groups).toHaveProperty(prop))
})

test("Event pattern: Username Changed pattern returns correct properties", () => {
	const raw = "<b><a href='/users/9839988'>BananaRamaCorp</a></b> has changed their username to catterhine!"
	const match = usernameChangedPattern.exec(raw)

	const properties: (keyof Omit<FeedEventUsernameChange, "type" | "feedIndex">)[] = [
		"userId",
		"userLink",
		"username",
		"oldUsername"
	]

	properties.forEach((prop) => expect(match.groups).toHaveProperty(prop))
})

test("Event pattern: Osu! Supporter New pattern returns correct properties", () => {
	const raw =
		"<b><a href='/users/21207211'>macekiller23</a></b> has become an osu! supporter - thanks for your generosity!"
	const match = osuSupporterNewPattern.exec(raw)

	const properties: (keyof Omit<FeedEventOsuSupporterNew, "type" | "feedIndex">)[] = ["userId", "userLink", "username"]

	properties.forEach((prop) => expect(match.groups).toHaveProperty(prop))
})

test("Event pattern: Osu! Supporter Gifted pattern returns correct properties", () => {
	const raw = "<b><a href='/users/13608239'>Snorickk</a></b> has received the gift of osu! supporter!"
	const match = osuSupporterGiftedPattern.exec(raw)

	const properties: (keyof Omit<FeedEventOsuSupporterGifted, "type" | "feedIndex">)[] = [
		"userId",
		"userLink",
		"username"
	]

	properties.forEach((prop) => expect(match.groups).toHaveProperty(prop))
})

test("Event pattern: Osu! Supporter Returning pattern returns correct properties", () => {
	const raw =
		"<b><a href='/users/8346471'>chrispi</a></b> has once again chosen to support osu! - thanks for your generosity!"
	const match = osuSupporterReturningPattern.exec(raw)

	const properties: (keyof Omit<FeedEventOsuSupporterReturning, "type" | "feedIndex">)[] = [
		"userId",
		"userLink",
		"username"
	]

	properties.forEach((prop) => expect(match.groups).toHaveProperty(prop))
})

test("Event pattern: Beatmapset Qualified pattern returns correct properties", () => {
	const raw =
		"<a href='/beatmapsets/1484383'>Zekk - Duplication</a> by <b><a href='/users/6400861'>Elayue</a></b> has just been qualified!"
	const match = beatmapSetQualifiedPattern.exec(raw)

	const properties: (keyof Omit<FeedEventBeatmapSetQualified, "type" | "feedIndex">)[] = [
		"mapId",
		"mapLink",
		"mapName",
		"userId",
		"userLink",
		"username"
	]

	properties.forEach((prop) => expect(match.groups).toHaveProperty(prop))
})
