import { useEffect, useState } from 'react';
import { getDates } from '../dates';
import useTimer from './useTimer';
import { EventTopic } from '@server/types';
import {
  EventStatus,
  PredictionEndStatus,
  PollEndStatus,
  type PredictionEvent,
  type PollEvent,
  type PredictionEndEvent,
  type PollEndEvent,
} from '@/types/eventsub';

const HIDE_DELAY_MS = 10000;

const useEvent = (topic: EventTopic, payload: PredictionEvent | PollEvent) => {
  const [visible, setVisible] = useState(false);
  const [timer, setTimerDates] = useTimer();

  const eventStatus = topic.replace(/.+\./, '') as EventStatus;

  useEffect(() => {
    switch (eventStatus) {
      case EventStatus.BEGIN:
        setTimerDates(getDates(payload));
        setVisible(true);
        break;
      case EventStatus.LOCK:
        setTimeout(() => setVisible(false), HIDE_DELAY_MS);
        break;
      case EventStatus.END:
        setVisible(true);
        setTimeout(() => setVisible(false), HIDE_DELAY_MS);
        break;
    }
  }, [topic]);

  let timerText = timer;

  if (eventStatus === EventStatus.END) {
    const endPayload = payload as PredictionEndEvent | PollEndEvent;

    switch (endPayload.status) {
      case PredictionEndStatus.RESOLVED:
      case PollEndStatus.COMPLETED:
        timerText = 'RESULT';
        break;
      case PredictionEndStatus.CANCELED:
        timerText = 'REFUNDED';
    }
  } else if (eventStatus === EventStatus.LOCK) {
    timerText = 'LOCKED';
  }

  return [visible, timerText] as const;
};

export default useEvent;
