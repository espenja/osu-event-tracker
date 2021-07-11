export const medalUnlockedPattern = /^.*?<a href='(\/users\/(\d+))'>(.*?)<\/a>.*?unlocked the.*?<b>(.*?)<\/b>.*?medal!$/

export const rankedPlayPattern = /^.*?<img src='\/\/s.ppy.sh\/images\/(\w+)_.*?<b><a href='(\/u\/(\d+))'>(.*?)<\/a>.*?achieved.*?rank #(\d+).*?on\s+<a href='(\/b\/(\d+)\?m=(\d))'>(.*?)<\/a>\s+(\(.*?\))$/

export const beatmapNewPattern = /^.*?<a href='(\/u\/(\d+))'>(.*?)<\/a>.*?has submitted a new beatmap.*?<a href='(\/s\/(\d+))'>(.*?)<\/a>.*?$/
export const beatmapRankedPattern = /^.*?<a href='(\/beatmapsets\/(\d+))'>(.*?)<\/a> by .*?<a href='(\/users\/(\d+))'>(.*?)<\/a>.*?has just been ranked!.*?$/
export const beatmapDeletedPattern = /^.*?<a href='(\/beatmapsets\/(\d+))'>(.*?)<\/a> has been deleted\..*?$/
export const beatmapUpdatedPattern = /^.*?<b><a href='(\/u\/(\d+))'>(.*?)<\/a>.*?has updated the beatmap.*?<a href='(\/s\/(\d+))'>(.*?)<\/a.*?$/
export const beatmapRevivedPattern = /.*?^<a href='(\/s\/(\d+))'>(.*?)<\/a>.*?has been revived from eternal slumber.*?<a href='(\/u\/(\d+))'>(.*?)<\/a>.*?$/
export const beatmapPlayedXTimesPattern = /.*?^<a href='(\/b\/(\d+))'>(.*?)<\/a>.*?has been played\s+(.*?)\s+times!$/
export const beatmapSetQualifiedPattern = /^.*?<a href='(\/beatmapsets\/(\d+))'>(.*?)<\/a> by.*?<a href='(\/users\/(\d+))'>(.*?)<\/a>.*? has just been qualified.*?$/

export const osuSupporterNewPattern = /^.*?<a href='(\/users\/(\d+))'>(.*?)<\/a>.*?has become an osu! supporter.*?$/
export const osuSupporterGiftedPattern = /^.*?<a href='(\/users\/(\d+))'>(.*?)<\/a>.*?has received the gift of osu! supporter!.*?$/
export const osuSupporterReturningPattern = /^.*?<a href='(\/users\/(\d+))'>(.*?)<\/a>.*?has once again chosen to support.*?$/

export const firstPlaceLostPattern = /^.*?<a href='(\/u\/(\d+))'>(.*?)<\/a>.*?has lost first place on.*?<a href='(\/b\/(\d+)\?m=(\d+))'>(.*?)<\/a>.*?(\(.*?\)).*?$/
export const usernameChangedPattern = /^.*?<a href='(\/users\/(\d+))'>(.*?)<\/a>.*?has changed their username to (.*?)!$/
