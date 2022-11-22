// Contents derived from
// https://dev.twitch.tv/docs/eventsub/handling-webhook-events#simple-nodejs-example

import express from 'express';
import type { WebSocket } from 'ws';
import handleWebsocket from './websocket';
import { Header, MessageType } from './types';
import { formatEvent, getHmac, getHmacMessage, verifyMessage } from './utils';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
let connections: WebSocket[] = [];

const PORT = 8080;
const HMAC_PREFIX = 'sha256=';

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
