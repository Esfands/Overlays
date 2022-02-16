import { useState, useEffect } from 'react';

const WEBSOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? 'wss://api.retpaladinbot.com/esfandevents'
    : 'ws://localhost:8080/eventsub';

const useChatEvent = () => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = (event) => {
      console.log('WebSocket connected', event);
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
      console.log('WebSocket disconnected', event);
    };

    // Handle page reload/close
    window.onbeforeunload = () => {
      ws.onclose = null;
      ws.close(1000);
    };
  }, []);

  return event;
};

export default useChatEvent;
