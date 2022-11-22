import { useState, useEffect } from 'react';
import type { WebSocketHook, EventData } from '../types';

const SERVER_TIMEOUT_HOURS = 23;
const RETRY_SECONDS = 15;

const WEBSOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? 'wss://api.retpaladinbot.com/esfandevents'
    : 'ws://localhost:8080/eventsub';

const useWebSocket = (): WebSocketHook => {
  const [event, setEvent] = useState<EventData>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let keepAlive: NodeJS.Timeout;
    let retry: NodeJS.Timeout;
    let ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = (e) => {
      console.log('WebSocket connected', e);
      setConnected(true);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log('Event received', data);
      setEvent(data);
    };

    ws.onerror = (e) => {
      console.error('WebSocket error', e);
    };

    ws.onclose = (e) => {
      console.log('WebSocket closed', e.reason);
      retry = setTimeout(() => window.location.reload(), RETRY_SECONDS * 1000);
    };

    // Handle page reload/close
    window.onbeforeunload = () => {
      clearInterval(keepAlive);
      clearTimeout(retry);
      ws.onclose = null;
      ws.close();
    };

    keepAlive = setInterval(() => {
      console.log('Sending keep-alive request');
      ws.send('keepalive');
    }, SERVER_TIMEOUT_HOURS * 60 * 60 * 1000);

    return () => {
      clearInterval(keepAlive);
      clearTimeout(retry);
      ws.close();
    };
  }, []);

  return [event, connected];
};

export default useWebSocket;
