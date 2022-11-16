import { open, writeFile } from 'fs';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

const ENV_PATH = resolve(__dirname, '../.env');
const RANDOM_SECRET = randomBytes(50).toString('hex');
const CONTENTS = `TWITCH_EVENTSUB_SECRET=${RANDOM_SECRET}`;

open(ENV_PATH, 'wx', (accessErr) => {
  if (accessErr?.code === 'EEXIST') {
    return;
  }

  writeFile(ENV_PATH, CONTENTS, (writeErr) => {
    if (writeErr) {
      console.error('Error creating .env for test server:', writeErr);
    }
  });
});
