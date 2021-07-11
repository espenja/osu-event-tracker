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

test("Event pattern: Medal pattern returns 5 groups", () => {
	const raw = "<a href='/users/24549820'>v0lzer0n</a></b> unlocked the \"<b>Sweet Rave Party</b>\" medal!"
	const match = raw.match(medalUnlockedPattern)

	expect(match?.length).toBe(5)
})

test("Event pattern: Ranked Play pattern returns 11 groups", () => {
	const raw =
		"<img src='//s.ppy.sh/images/A_small.png'/> <b><a href='/u/2766439'>floppasupporter</a></b> achieved rank #230 on <a href='/b/2810199?m=0'>BEAT CRUSADERS - TONIGHT, TONIGHT, TONIGHT (TV Size) [Oriental's Insane]</a> (osu!)"
	const match = raw.match(rankedPlayPattern)

	expect(match?.length).toBe(11)
})

test("Event pattern: Beatmap New pattern returns 7 groups", () => {
	const raw =
		"<b><a href='/u/10552849'>IsonafShikolake</a></b> has submitted a new beatmap \"<a href='/s/1514711'>Team Grimoire - Jormgand</a>\""
	const match = raw.match(beatmapNewPattern)

	expect(match?.length).toBe(7)
})

test("Event pattern: Beatmap Ranked pattern returns 7 groups", () => {
	const raw =
		"<a href='/beatmapsets/1489522'>Kody Lavigne - need melatonin</a> by <b><a href='/users/14339830'>Mimari</a></b> has just been ranked!"
	const match = raw.match(beatmapRankedPattern)
	expect(match?.length).toBe(7)
})

test("Event pattern: Beatmap deleted pattern returns 4 groups ", () => {
	const raw = "<a href='/beatmapsets/920821'>Kobaryo - Chocolate Lily</a> has been deleted."
	const match = raw.match(beatmapDeletedPattern)

	expect(match?.length).toBe(4)
})

test("Event pattern: Beatmap Updated pattern returns 7 groups", () => {
	const raw =
		"<b><a href='/u/24506064'>CnnrOnOsu</a></b> has updated the beatmap \"<a href='/s/1514697'>CnnrOnOsu - DREAMIN' ON</a>\""
	const match = raw.match(beatmapUpdatedPattern)

	expect(match?.length).toBe(7)
})

test("Event pattern: Beatmap Revived pattern returns 7 groups", () => {
	const raw =
		"<a href='/s/1483371'>Amatsuki - All I Need are Things I Like</a> has been revived from eternal slumber by <b><a href='/u/15366254'>thechubbs</a></b>."
	const match = raw.match(beatmapRevivedPattern)

	expect(match?.length).toBe(7)
})

test("Event pattern: Beatmap Played X Times pattern returns 5 groups", () => {
	const raw =
		"<a href='/b/2217275'>Various Artists - Mizu's Jump Training #2 [Bonus: Bad Apple (Nhato Remix)]</a> has been played 1,000,000 times!"
	const match = raw.match(beatmapPlayedXTimesPattern)

	expect(match?.length).toBe(5)
})

test("Event pattern: Lost First Place pattern returns 9 groups", () => {
	const raw =
		"<b><a href='/u/22639550'>xRichard_OP</a></b> has lost first place on <a href='/b/2633477?m=3'>TK from Ling tosite sigure - unravel (TV Size) [nymphe's insane]</a> (osu!mania)"
	const match = raw.match(firstPlaceLostPattern)

	expect(match?.length).toBe(9)
})

test("Event pattern: Username Changed pattern returns 5 groups", () => {
	const raw = "<b><a href='/users/9839988'>BananaRamaCorp</a></b> has changed their username to catterhine!"
	const match = raw.match(usernameChangedPattern)

	expect(match?.length).toBe(5)
})

test("Event pattern: Osu! Supporter New pattern returns 4 groups", () => {
	const raw =
		"<b><a href='/users/21207211'>macekiller23</a></b> has become an osu! supporter - thanks for your generosity!"
	const match = raw.match(osuSupporterNewPattern)

	expect(match?.length).toBe(4)
})

test("Event pattern: Osu! Supporter Gifted pattern returns 4 groups", () => {
	const raw = "<b><a href='/users/13608239'>Snorickk</a></b> has received the gift of osu! supporter!"
	const match = raw.match(osuSupporterGiftedPattern)

	expect(match?.length).toBe(4)
})

test("Event pattern: Osu! Supporter Returning pattern returns 4 groups", () => {
	const raw =
		"<b><a href='/users/8346471'>chrispi</a></b> has once again chosen to support osu! - thanks for your generosity!"
	const match = raw.match(osuSupporterReturningPattern)

	expect(match?.length).toBe(4)
})

test("Event pattern: Beatmapset Qualified pattern returns 7 groups", () => {
	const raw =
		"<a href='/beatmapsets/1484383'>Zekk - Duplication</a> by <b><a href='/users/6400861'>Elayue</a></b> has just been qualified!"
	const match = raw.match(beatmapSetQualifiedPattern)

	expect(match?.length).toBe(7)
})
