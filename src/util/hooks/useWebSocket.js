import { useState, useEffect } from 'react';

let retries = 0;
const MAX_RETRIES = 3;

const WEBSOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? 'wss://api.retpaladinbot.com/esfandevents'
    : 'ws://localhost:8080/eventsub';

const useWebSocket = () => {
  const [event, setEvent] = useState(null);
  const [ws, setWebSocket] = useState(new WebSocket(WEBSOCKET_URL));
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    ws.onopen = (event) => {
      console.log('WebSocket connected', event);
      retries = 0;
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
      if (retries < MAX_RETRIES) {
        retries++;
        console.log(`Attempting to reconnect (${retries}/${MAX_RETRIES})`);
        setWebSocket(new WebSocket(WEBSOCKET_URL));
      }

      setConnected(false);
    };

    // Handle page reload/close
    window.onbeforeunload = () => {
      ws.onclose = null;
      ws.close(1000);
    };
  }, [ws]);

  return [event, connected];
};

export default useWebSocket;
