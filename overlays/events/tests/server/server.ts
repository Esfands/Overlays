// Contents derived from
// https://dev.twitch.tv/docs/eventsub/handling-webhook-events#simple-nodejs-example

import crypto from 'crypto';
import express, { Request } from 'express';
import type { WebSocket } from 'ws';
import handleWebsocket from './websocket';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
let connections: WebSocket[] = [];

const PORT = 8080;
const HMAC_PREFIX = 'sha256=';

enum Header {
  TWITCH_MESSAGE_ID = 'twitch-eventsub-message-id',
  TWITCH_MESSAGE_TIMESTAMP = 'twitch-eventsub-message-timestamp',
  TWITCH_MESSAGE_SIGNATURE = 'twitch-eventsub-message-signature',
  MESSAGE_TYPE = 'twitch-eventsub-message-type',
}

enum MessageType {
  VERIFICATION = 'webhook_callback_verification',
  NOTIFICATION = 'notification',
  REVOCATION = 'revocation',
}

app.use(
  express.raw({
    // Need raw message body for signature verification
    type: 'application/json',
  })
);

app.post('/eventsub', (req, res) => {
  const secret = process.env.TWITCH_EVENTSUB_SECRET;
  const message = getHmacMessage(req);
  const hmac = HMAC_PREFIX + getHmac(secret as string, message); // Signature to compare

  if (
    verifyMessage(
      hmac,
      req.headers[Header.TWITCH_MESSAGE_SIGNATURE] as string
    ) === false
  ) {
    console.log('403');
    res.sendStatus(403);
    return;
  }

  const notification = JSON.parse(req.body);

  if (req.headers[Header.MESSAGE_TYPE] === MessageType.NOTIFICATION) {
    console.log(`Event received: ${notification.subscription.type}`);

    const message = JSON.stringify(formatEvent(notification));

    connections.forEach((connection) => {
      connection.send(message);
    });

    res.sendStatus(204);
  } else if (MessageType.VERIFICATION === req.headers[Header.MESSAGE_TYPE]) {
    res.status(200).send(notification.challenge);
  } else if (MessageType.REVOCATION === req.headers[Header.MESSAGE_TYPE]) {
    res.sendStatus(204);

    console.log(`${notification.subscription.type} notifications revoked`);
    console.log(`Reason: ${notification.subscription.status}`);
    console.log(
      `Condition: ${JSON.stringify(
        notification.subscription.condition,
        null,
        4
      )}`
    );
  } else {
    res.sendStatus(204);
    console.log(`Unknown message type: ${req.headers[Header.MESSAGE_TYPE]}`);
  }
});

const expressServer = app.listen(PORT, () => {
  console.log(`Express listening at http://localhost:${PORT}`);
});

handleWebsocket(expressServer, connections);

// =================
// Utility functions
// =================

function getHmacMessage(request: Request) {
  return (
    (request.headers[Header.TWITCH_MESSAGE_ID] as string) +
    (request.headers[Header.TWITCH_MESSAGE_TIMESTAMP] as string) +
    request.body
  );
}

function getHmac(secret: string, message: string) {
  return crypto.createHmac('sha256', secret).update(message).digest('hex');
}

function verifyMessage(hmac: string, verifySignature: string) {
  return crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(verifySignature)
  );
}

function formatEvent(notification: Record<any, any>) {
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
}
