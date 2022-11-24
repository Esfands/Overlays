export type WebSocketMessage = {
  d: any;
  mc: MessageCode;
  t: number;
}

export type MessageBody = {
  topic: MessageTopic;
  payload: Record<string, any>;
}

export enum MessageCode {
  DISPATCH = 1,
  HELLO = 2,
  HEARTBEAT = 3,
  RECONNECT = 4,
  ACKNOWLEDGE = 5,
  ENDOFSTREAM = 9,
  ERROR = 10,
  AUTHENTICATE = 25,
  RESUME = 26,
  SUBSCRIBE = 27,
  UNSUBSCRIBE = 28,
}

export type MessageTopic =
  | 'quest.*'
  | 'quest.created'
  | 'quest.deleted'
  | 'quest.updated'
  | 'channel.poll.begin'
  | 'channel.poll.progress'
  | 'channel.poll.end'
  | 'channel.prediction.begin'
  | 'channel.prediction.progress'
  | 'channel.prediction.lock'
  | 'channel.prediction.end'

export type WebSocketHook = [EventData, boolean];
export type MessageCollectionHook = [MessageCollection, boolean];

export type EventData = Record<string, any> | null;

export type MessageCollection = {
  poll: EventData;
  prediction: EventData;
  quests: EventData;
}
