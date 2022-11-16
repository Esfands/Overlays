# Overlays

Stream overlays that display live-updating popups for use with the mod dashboard.

### Testing in OBS

1. Create an OBS shortcut anywhere on your computer and add `--remote-debugging-port=9222` to its target value.
1. Use this shortcut to open OBS and create a browser source with the remote URL `http://localhost:3000`.
1. Open `http://localhost:9222` in your browser and click on the name of the new browser source.
