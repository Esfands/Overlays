import { useState, useEffect } from 'react';
import useWebSocket from './useWebSocket';
import type { EventsHook, MultiEventData } from '../types';

const initialEvents: MultiEventData = {
  poll: null,
  prediction: null,
  quests: null,
};

const useEvents = (): EventsHook => {
  const [msg, connected] = useWebSocket();
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    if (msg) {
      setEvents((_events) =>
        Object.assign({}, _events, { [msg.eventType]: msg })
      );
    }
  }, [msg]);

  useEffect(() => {
    setEvents(initialEvents);
  }, [connected]);

  return [events, connected];
};

export default useEvents;
