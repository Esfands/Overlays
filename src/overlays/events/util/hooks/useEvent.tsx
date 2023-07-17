import { useEffect, useState } from 'react';
import useTimer from './useTimer';
import type { MessageBody } from '@/util/types';

const HIDE_DELAY_MS = 10000;

const useEvent = ({ topic, payload }: MessageBody): [boolean, string] => {
  const [visible, setVisible] = useState(false);
  const [timer, setTimerDates, setTimerActive] = useTimer(payload.dates);

  let timerText = '';

  useEffect(() => {
    const topicType = topic.replace(/.+\./, '');

    switch (topicType) {
      case 'begin':
        setVisible(true);
        setTimerDates(payload.dates);
        break;

      case 'lock':
        setTimerActive(false);
        setTimeout(() => setVisible(false), HIDE_DELAY_MS);
        break;

      case 'end':
        setTimerActive(false);
        setVisible(true);
        setTimeout(() => setVisible(false), HIDE_DELAY_MS);
        break;
    }
  }, [payload.dates, setTimerActive, setTimerDates]);

  useEffect(() => {
    switch (payload.status) {
      case undefined:
        timerText = timer;
        break;
      case 'resolved':
        timerText = 'RESULT';
        break;
      case 'canceled':
        timerText = 'REFUNDED';
        break;
      default:
        timerText = 'CLOSED';
    }
  }, [visible]);

  return [visible, timerText];
};

export default useEvent;
