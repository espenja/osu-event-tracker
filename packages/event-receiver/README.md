# event-receiver

An example project to show how one can read various events from the different Azure Service Bus Topics

## Topics

**The different topics that are available are:**

| Topic name              | Description                                                           |
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

## Types

Types for all events are available in `packages/lib-osu-event-tracker/src/types/FeedEvents.ts`
