import { useState, useEffect } from 'react';

const WEBSOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? 'ws://api.retpaladinbot.com:4500/esfandevents'
    : 'ws://localhost:8080/eventsub';

const useChatEvent = () => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Event received', data);
      setEvent(data);
    };

    ws.onerror = (event) => {
      console.error('WebSocket error', event);
    };

    window.onbeforeunload = () => {
      ws.onclose = null;
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, []);

  return event;
};

export default useChatEvent;
