const { open, writeFile } = require('fs');
const { resolve } = require('path');
const { randomBytes } = require('crypto');

const FILE_PATH = resolve(__dirname, '../.env');
const CONTENTS = `TWITCH_EVENTSUB_SECRET=${randomBytes(50).toString('hex')}`;

open(FILE_PATH, 'wx', (accessErr) => {
  if (accessErr?.code === 'EEXIST') {
    return;
  }

  writeFile(FILE_PATH, CONTENTS, (writeErr) => {
    if (writeErr) {
      console.error('Error creating .env for test server:', writeErr);
    }
  });
});
