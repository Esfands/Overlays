export type WebSocketHook = [EventData, boolean];

export type EventData = Record<any, any> | null;
export type EventDates = {
  started: Date;
  ends: Date;
};
