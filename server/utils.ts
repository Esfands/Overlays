import crypto from 'crypto';
import {
  Header,
  MessageCode,
  OverlayLayout,
  type OverlayPayload,
  type WebSocketMessage,
} from './types';
import type { Request } from 'express';

export const getHmacMessage = (request: Request) =>
  (request.headers[Header.TWITCH_MESSAGE_ID] as string) +
  (request.headers[Header.TWITCH_MESSAGE_TIMESTAMP] as string) +
  request.body;

export const getHmac = (secret: string, message: string) =>
  crypto.createHmac('sha256', secret).update(message).digest('hex');

export const verifyMessage = (hmac: string, verifySignature: string) =>
  crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(verifySignature));

export const formatEvent = (notification: Record<string, any>) => {
  const [, type] = notification.subscription.type.split('.');

  const overlayPayload: OverlayPayload = {
    eventType: type,
    event: notification.subscription.type,
    format: OverlayLayout.REGULAR,
    offset: 'top',
    payload: notification.event,
  };

  const message: WebSocketMessage = {
    mc: MessageCode.DISPATCH,
    d: overlayPayload,
  };

  return message;
};
