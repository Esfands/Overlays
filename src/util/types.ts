export type WebSocketMessage = {
  d: MessageBody;
  mc: MessageCode;
  t: number;
};

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

export type MessageBody = {
  topic: MessageTopic;
  payload: MessagePayload;
};

export enum MessageTopic {
  PREDICTION_BEGIN = 'channel.prediction.begin',
  PREDICTION_PROGRESS = 'channel.prediction.progress',
  PREDICTION_LOCK = 'channel.prediction.lock',
  PREDICTION_END = 'channel.prediction.end',
  POLL_BEGIN = 'channel.poll.begin',
  POLL_PROGRESS = 'channel.poll.progress',
  POLL_END = 'channel.poll.end',
  CHANNEL_POINT_UPDATE = 'channel.channel_points_custom_reward_redemption.update',
  CHANNEL_POINT_ADD = 'channel.channel_points_custom_reward_redemption.add',
}

export interface MessagePayload {
  eventType: EventType;
  event: MessageTopic;
  status: EventStatus;
  format: OverlayLayout;
  offset: 'top' | 'middle' | number;
  id: string;
  title: string;
  payload: Record<string, any>;
  dates: object;
}

export enum EventType {
  PREDICTION = 'prediction',
  POLL = 'poll',
  CHANNEL_POINT = 'channel_point_reward_redemption',
}

export enum EventStatus {
  OPEN = 'open',
  LOCKED = 'locked',
  CLOSED = 'closed',
}

export enum OverlayLayout {
  REGULAR = 'regular',
  COMPACT = 'compact',
}

export type MessageState = MessageBody | null;
