import type { PredictionEvent, PollEvent } from '@/types/eventsub';

export enum Header {
  TWITCH_MESSAGE_ID = 'twitch-eventsub-message-id',
  TWITCH_MESSAGE_TIMESTAMP = 'twitch-eventsub-message-timestamp',
  TWITCH_MESSAGE_SIGNATURE = 'twitch-eventsub-message-signature',
  MESSAGE_TYPE = 'twitch-eventsub-message-type',
}

export enum MessageType {
  VERIFICATION = 'webhook_callback_verification',
  NOTIFICATION = 'notification',
  REVOCATION = 'revocation',
}

export type WebSocketMessage = {
  mc: MessageCode;
  d: OverlayPayload | string;
};

export enum MessageCode {
  DISPATCH = 0,
  CLOSE = 1,
  EOF = 2,
}

export type OverlayPayload = {
  eventType: EventType;
  event: EventTopic;
  format: OverlayLayout;
  offset: 'top' | 'middle' | number;
  payload: PredictionEvent | PollEvent;
};

export enum EventType {
  PREDICTION = 'prediction',
  POLL = 'poll',
}

export enum EventTopic {
  PREDICTION_BEGIN = 'channel.prediction.begin',
  PREDICTION_PROGRESS = 'channel.prediction.progress',
  PREDICTION_LOCK = 'channel.prediction.lock',
  PREDICTION_END = 'channel.prediction.end',
  POLL_BEGIN = 'channel.poll.begin',
  POLL_PROGRESS = 'channel.poll.progress',
  POLL_END = 'channel.poll.end',
}

export enum OverlayLayout {
  REGULAR = 'regular',
  COMPACT = 'compact',
}
