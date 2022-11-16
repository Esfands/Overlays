# Overlays

Stream overlays that display live-updating popups for use with the mod dashboard. Currently includes overlays for predictions/polls and quests.

## Development

### Local setup

1. Install the [Twitch CLI](https://dev.twitch.tv/docs/cli).
1. Add the Twitch CLI to your `path` environment variable.
1. Clone the repository.
1. Run `yarn install` in the root directory. This will install packages for the app as well as the development server.
1. 

### Workflow

1. Run `yarn start` to start the app for live development.
1. Run `yarn server:start` to start the server so you can receive test data from Twitch.
1. Open/refresh the browser page so the client connects to the server.
1. Run `yarn server:trigger [event type] [count]` to request test data for a specific event and send it to the app in real time.
    - prediction-begin
    - prediction-progress
    - prediction-lock
    - prediction-end
    - poll-begin
    - poll-lock
    - poll-end

### Testing in OBS

1. Create an OBS shortcut anywhere on your computer and add `--remote-debugging-port=9222` to its target value.
1. Use this shortcut to open OBS and create a browser source with the remote URL `http://localhost:3000`.
1. Open `http://localhost:9222` in your browser and click on the name of the new browser source.

### Notes

When triggering events, be sure to trigger them in the correct order. For example, trigger "prediction-begin" before any other "prediction" event.
