export const medalUnlockedPattern = /^.*?<a href='(?<userLink>\/(?:u|users)\/(?<userId>\d+))'>(?<username>.*?)<\/a>.*?unlocked the.*?<b>(?<medalName>.*?)<\/b>.*?medal!$/

export const rankedPlayPattern = /^.*?<img src='\/\/s.ppy.sh\/images\/(?<rating>\w+)_.*?<b><a href='(?<userLink>\/(?:u|users)\/(?<userId>\d+))'>(?<username>.*?)<\/a>.*?achieved.*?rank #(?<globalRank>\d+).*?on\s+<a href='(?<mapLink>\/(?:b|beatmapsets)\/(?<mapId>\d+)\?m=(?<gameMode>\d))'>(?<mapName>.*?)<\/a>\s+\((?<gameModeName>.*?)\)$/

export const beatmapNewPattern = /^.*?<a href='(?<userLink>\/(?:u|users)\/(?<userId>\d+))'>(?<username>.*?)<\/a>.*?has submitted a new beatmap.*?<a href='(?<mapLink>\/(?:s|beatmapsets)\/(?<mapId>\d+))'>(?<mapName>.*?)<\/a>.*?$/
export const beatmapRankedPattern = /^.*?<a href='(?<mapLink>\/(?:s|beatmapsets)\/(?<mapId>\d+))'>(?<mapName>.*?)<\/a> by .*?<a href='(?<userLink>\/(?:u|users)\/(?<userId>\d+))'>(?<username>.*?)<\/a>.*?has just been ranked!.*?$/
export const beatmapDeletedPattern = /^.*?<a href='(?<mapLink>\/(?:s|beatmapsets)\/(?<mapId>\d+))'>(?<mapName>.*?)<\/a> has been deleted\..*?$/
export const beatmapUpdatedPattern = /^.*?<b><a href='(?<userLink>\/(?:u|users)\/(?<userId>\d+))'>(?<username>.*?)<\/a>.*?has updated the beatmap.*?<a href='(?<mapLink>\/(?:s|beatmapsets)\/(?<mapId>\d+))'>(?<mapName>.*?)<\/a.*?$/
export const beatmapRevivedPattern = /.*?^<a href='(?<mapLink>\/(?:s|beatmapsets)\/(?<mapId>\d+))'>(?<mapName>.*?)<\/a>.*?has been revived from eternal slumber.*?<a href='(?<userLink>\/(?:u|users)\/(?<userId>\d+))'>(?<username>.*?)<\/a>.*?$/
export const beatmapPlayedXTimesPattern = /.*?^<a href='(?<mapLink>\/b\/(?<mapId>\d+))'>(?<mapName>.*?)<\/a>.*?has been played\s+(?<number>.*?)\s+times!$/
export const beatmapSetQualifiedPattern = /^.*?<a href='(?<mapLink>\/(?:s|beatmapsets)\/(?<mapId>\d+))'>(?<mapName>.*?)<\/a> by.*?<a href='(?<userLink>\/(?:u|users)\/(?<userId>\d+))'>(?<username>.*?)<\/a>.*? has just been qualified.*?$/

export const osuSupporterNewPattern = /^.*?<a href='(?<userLink>\/(?:u|users)\/(?<userId>\d+))'>(?<username>.*?)<\/a>.*?has become an osu! supporter.*?$/
export const osuSupporterGiftedPattern = /^.*?<a href='(?<userLink>\/(?:u|users)\/(?<userId>\d+))'>(?<username>.*?)<\/a>.*?has received the gift of osu! supporter!.*?$/
export const osuSupporterReturningPattern = /^.*?<a href='(?<userLink>\/(?:u|users)\/(?<userId>\d+))'>(?<username>.*?)<\/a>.*?has once again chosen to support.*?$/

export const firstPlaceLostPattern = /^.*?<a href='(?<userLink>\/(?:u|users)\/(?<userId>\d+))'>(?<username>.*?)<\/a>.*?has lost first place on.*?<a href='(?<mapLink>\/b\/(?<mapId>\d+)\?m=(?<gameMode>\d+))'>(?<mapName>.*?)<\/a>.*?\((?<gameModeName>.*?)\).*?$/
export const usernameChangedPattern = /^.*?<a href='(?<userLink>\/(?:u|users)\/(?<userId>\d+))'>(?<oldUsername>.*?)<\/a>.*?has changed their username to (?<username>.*?)!$/
