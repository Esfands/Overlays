import crypto from 'crypto';
import { Header } from "./types";
import type { Request } from 'express';

export const getHmacMessage = (request: Request) => (
  (request.headers[Header.TWITCH_MESSAGE_ID] as string) +
  (request.headers[Header.TWITCH_MESSAGE_TIMESTAMP] as string) +
  request.body
);

export const getHmac = (secret: string, message: string) => (
  crypto.createHmac('sha256', secret).update(message).digest('hex')
);

export const verifyMessage = (hmac: string, verifySignature: string) => (
  crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(verifySignature)
  )
);

export const formatEvent = (notification: Record<any, any>) => {
  const [, type, status] = notification.subscription.type.split('.');

  return {
    eventType: type,
    event: notification.subscription.type,
    status: status === 'begin' || status === 'progress' ? 'open' : 'closed',
    format: true ? 'regular' : 'compact',
    offset: 'top',
    id: notification.event.id,
    title: notification.event.title,
    payload:
      type === 'prediction'
        ? {
            outcomes: notification.event.outcomes,
            winning_outcome_id: notification.event.winning_outcome_id,
            status: notification.event.status,
          }
        : {
            choices: notification.event.choices,
            bits: notification.event.bits_voting,
            points: notification.event.channel_points_voting,
          },
    dates: {
      started: notification.event.started_at,
      ends:
        type === 'prediction'
          ? status === 'begin' || status === 'progress'
            ? notification.event.locks_at
            : notification.event.locked_at
          : notification.event.ends_at,
    },
  };
};
