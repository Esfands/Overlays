// Contents derived from
// https://dev.twitch.tv/docs/eventsub/handling-webhook-events#simple-nodejs-example

require('dotenv').config();
const crypto = require('crypto');
const express = require('express');
const websocketServer = require('./websocket');

const app = express();
let connections = [];

const PORT = 8080;
const HMAC_PREFIX = 'sha256=';

const Header = {
  TWITCH_MESSAGE_ID: 'Twitch-Eventsub-Message-Id'.toLowerCase(),
  TWITCH_MESSAGE_TIMESTAMP: 'Twitch-Eventsub-Message-Timestamp'.toLowerCase(),
  TWITCH_MESSAGE_SIGNATURE: 'Twitch-Eventsub-Message-Signature'.toLowerCase(),
  MESSAGE_TYPE: 'Twitch-Eventsub-Message-Type'.toLowerCase(),
};

const MessageType = {
  VERIFICATION: 'webhook_callback_verification',
  NOTIFICATION: 'notification',
  REVOCATION: 'revocation',
};

app.use(
  express.raw({
    // Need raw message body for signature verification
    type: 'application/json',
  })
);

app.post('/eventsub', (req, res) => {
  const secret = process.env.TWITCH_EVENTSUB_SECRET;
  const message = getHmacMessage(req);
  const hmac = HMAC_PREFIX + getHmac(secret, message); // Signature to compare

  if (
    verifyMessage(hmac, req.headers[Header.TWITCH_MESSAGE_SIGNATURE]) === false
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

websocketServer(expressServer, connections);

// =================
// Utility functions
// =================

function getHmacMessage(request) {
  return (
    request.headers[Header.TWITCH_MESSAGE_ID] +
    request.headers[Header.TWITCH_MESSAGE_TIMESTAMP] +
    request.body
  );
}

function getHmac(secret, message) {
  return crypto.createHmac('sha256', secret).update(message).digest('hex');
}

function verifyMessage(hmac, verifySignature) {
  return crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(verifySignature)
  );
}

function formatEvent(notification) {
  const [, type, status] = notification.subscription.type.split('.');

  return {
    eventType: type,
    event: notification.subscription.type,
    status: status === 'begin' || status === 'progress' ? 'open' : 'closed',
    format: true ? 'regular' : 'compact',
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
