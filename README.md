# EsfandsEvents

A stream overlay that displays friendly little live-updating popups about interactive events like Predictions and Polls.

## Development

### Local setup

1. Install the [Twitch CLI](https://dev.twitch.tv/docs/cli).
1. Add the Twitch CLI to your `path` environment variable.
1. Clone the repository.
1. Run `npm i` in the root directory. This will install packages for the app as well as the development server.

### Workflow

1. Run `npm start` to start the app for live development.
1. Run `npm run server:start` to start the server so you can receive test data from Twitch.
1. Open/refresh the browser page so the client connects to the server.
1. Run `npm run server:trigger [event type]` to request test data for a specific event and send it to the app in real time.
    - prediction-begin
    - prediction-progress
    - prediction-lock
    - prediction-end
    - poll-begin
    - poll-lock
    - poll-end

### Notes

When triggering events, be sure to trigger them in the correct order. For example, trigger "prediction-begin" before any other "prediction" event.
