# osu-event-tracker

Tracks events from the osu! event feed and turns the data into usable, typed JSON structures.

## Types

Types for all events are available in `packages/lib-osu-event-tracker/src/types/FeedEvents.ts`

**The different type of events that are available are:**

| Event type              | Description                                                           |
| ----------------------- | --------------------------------------------------------------------- |
| unknown                 | 🤔 Events that are still unknown to the parser                        |
| medal-achieved          | 🏅 Someone achieved a medal                                           |
| ranked-play             | 🎮 Someone has submitted a ranked play                                |
| beatmap-update          | ✏️ A beatmap has been updated                                         |
| beatmap-new             | 🆕 A new beatmap has been submitted                                   |
| beatmap-ranked          | 📈 A beatmap has been ranked                                          |
| beatmapset-qualified    | ✔️ A beatmap has been qualified                                       |
| beatmap-deleted         | 🗑️ A beatmap has been deleted 🙁                                      |
| osu-supporter-new       | 💓 Someone has bought osu!supporter in support of the game            |
| osu-supporter-returning | 💕 Someone has once again bought osu!supporter in support of the game |
| osu-supporter-gifted    | 💘 Someone has received the gift of osu!supporter                     |
| lost-first-place        | 🙁 Someone lost their #1 rank                                         |
| beatmap-revived         | 🧟 A beatmap has returned from the dead and received an update        |
| username-changed        | 👩 A user has changed their username                                  |
| beatmap-played-x-times  | ✨ A beatmap has been played an incredible amount of times            |

# Building

- Install [Node.js](https://nodejs.org/en/)
- Install [yarn package manager](https://yarnpkg.com/getting-started/install)

Go to root directory of the project and type this command to install the necessary node modules

    > yarn

# Running

    > yarn start

works from `packages\event-receiver\` and `packages\worker-osu-event-tracker\`
