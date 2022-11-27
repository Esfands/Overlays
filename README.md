# Overlays

Stream overlays that display live-updating popups for use with the mod dashboard.

### Local setup

1. Clone this repository.
1. Run `yarn install` in the root directory.
1. Clone the ModDashboardAPI repository and run `docker compose up --build -d` to build and start the API.
1. Run `yarn dev` to start the app.
1. See an individual overlay readme for more instructions.

### Testing in OBS

1. Create an OBS shortcut anywhere on your computer and add `--remote-debugging-port=9222` to its target value.
1. Use this shortcut to open OBS and create a browser source with the remote URL `http://localhost:3000`.
1. Open `http://localhost:9222` in your browser and click on the name of the new browser source.
