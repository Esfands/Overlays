export type WebSocketHook = [EventData, boolean];
export type EventsHook = [MultiEventData, boolean];

export type EventData = Record<any, any> | null;

export type MultiEventData = {
  poll: EventData;
  prediction: EventData;
  quests: EventData;
};
