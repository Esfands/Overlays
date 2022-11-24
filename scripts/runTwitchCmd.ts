import { exec } from 'child_process';
import * as dotenv from 'dotenv';
dotenv.config();

const args = process.argv.slice(2);

const isProgressEvent = args[0]?.endsWith('progress');
const eventTypes = [
  'poll-begin',
  'poll-end',
  'poll-progress',
  'prediction-begin',
  'prediction-end',
  'prediction-lock',
  'prediction-progress',
];

if (args.length === 0 || !eventTypes.includes(args[0])) {
  console.error(
    'Twitch event type argument invalid or missing.\nAccepted values:',
    eventTypes.join(', ')
  );

  process.exit(0);
}

const command = [
  `twitch event trigger ${args[0]}`,
  `-c ${isProgressEvent && args[1] ? args[1] : 1}`,
  `-F http://localhost:8000/eventsub`,
  '-t 38746172',
  `-s ${process.env.TWITCH_EVENTSUB_SECRET}`,
].join(' ');

exec(command, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(command);
  }
});
