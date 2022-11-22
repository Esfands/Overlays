export enum Header {
  TWITCH_MESSAGE_ID        = 'twitch-eventsub-message-id',
  TWITCH_MESSAGE_TIMESTAMP = 'twitch-eventsub-message-timestamp',
  TWITCH_MESSAGE_SIGNATURE = 'twitch-eventsub-message-signature',
  MESSAGE_TYPE             = 'twitch-eventsub-message-type',
};

export enum MessageType {
  VERIFICATION = 'webhook_callback_verification',
  NOTIFICATION = 'notification',
  REVOCATION   = 'revocation',
};
