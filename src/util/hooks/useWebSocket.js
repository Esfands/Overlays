import { useState, useEffect } from 'react';

const SERVER_TIMEOUT_HOURS = 23;
const WEBSOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? 'wss://api.retpaladinbot.com/esfandevents'
    : 'ws://localhost:8080/eventsub';

const useWebSocket = () => {
  const [event, setEvent] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

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
      setConnected(false);
    };

    // Handle page reload/close
    window.onbeforeunload = () => {
      ws.onclose = null;
      ws.close(1000);
    };

    const keepAlive = setInterval(() => {
      console.log('Sending keepalive request');
      ws.send('keepalive');
    }, SERVER_TIMEOUT_HOURS * 60 * 60 * 1000);

    return () => clearInterval(keepAlive);
  }, []);

  return [event, connected];
};

export default useWebSocket;
