# worker-osu-event-tracker

An infinite loop that used `lib-osu-event-tracker` to request osu! feed events, puts all the events in a Azure Cosmos DB Container, and publishes the events on several Azure Service Bus Topics according to type of event.
