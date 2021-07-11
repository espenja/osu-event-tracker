# lib-osu-event-tracker

The library that actually sends a request to the feed event page and parses the different events.  
This library can sadly never be better than the data that is provided via the official osu! feed events page.

## Types

Types for all events are available in `src/types/FeedEvents.ts`

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
