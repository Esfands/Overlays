const fs = require('fs');
const path = require('path');

const contents = 'TWITCH_EVENTSUB_SECRET=';

fs.writeFile(path.resolve(__dirname, '../.env'), contents, (err) => {
  if (err) {
    console.error('Error creating .env for server:', err);
  } else {
    console.log(
      'File "/test/server/.env" created successfully. Add your Twitch EventSub secret to it.'
    );
  }
});
