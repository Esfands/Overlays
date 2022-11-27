Overlay for predictions and polls.

### Local setup

1. Install the [Twitch CLI](https://dev.twitch.tv/docs/cli).
1. Add the Twitch CLI to your `path` environment variable.

### Workflow

1. Run `yarn server:trigger [event type] [count]` to trigger a Twitch event with test data in real time.
    - prediction-begin
    - prediction-progress
    - prediction-lock
    - prediction-end
    - poll-begin
    - poll-lock
    - poll-end

### Notes

When triggering events, be sure to trigger them in the correct order. For example, trigger "prediction-begin" before any other "prediction" event.
