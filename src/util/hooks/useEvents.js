import { useState, useEffect } from 'react';
import useWebSocket from './useWebSocket';

const initialEvents = {
  prediction: null,
  poll: null,
};

const useEvents = () => {
  const [msg, connected] = useWebSocket();
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    if (msg) {
      setEvents((_events) =>
        Object.assign({}, _events, { [msg.eventType]: msg })
      );
    }
  }, [msg]);

  return [events, connected];
};

export default useEvents;
