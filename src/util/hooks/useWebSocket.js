import { useState, useEffect } from 'react';

const SERVER_TIMEOUT_HOURS = 23;
const RETRY_SECONDS = 10;

const WEBSOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? 'wss://api.retpaladinbot.com/esfandevents'
    : 'ws://localhost:8080/eventsub';

const useWebSocket = () => {
  const [event, setEvent] = useState(null);
  const [connected, setConnected] = useState(false);
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    let keepAlive, retry;
    let ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = (event) => {
      console.log('WebSocket connected', event);
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Event received', data);
      setEvent(data);
    };

    ws.onerror = (event) => {
      console.error('WebSocket error', event);
    };

    ws.onclose = (event) => {
      if (event.reason) {
        console.log('WebSocket closed:', event.reason);
      }

      setConnected(false);
      retry = setTimeout(() => setRetries((r) => r + 1), RETRY_SECONDS * 1000);
    };

    // Handle page reload/close
    window.onbeforeunload = () => {
      ws.onclose = null;
      ws.close();
    };

    keepAlive = setInterval(() => {
      console.log('Sending keep-alive request');
      ws.send('keepalive');
    }, SERVER_TIMEOUT_HOURS * 60 * 60 * 1000);

    return () => {
      ws.close();
      clearInterval(keepAlive);
      clearTimeout(retry);
    };
  }, [retries]);

  return [event, connected];
};

export default useWebSocket;
