import { useEffect, useState } from 'react';
import { formatTimer } from '../formatters';

type TimerHook = [
  string,
  React.Dispatch<React.SetStateAction<EventDates>>,
  React.Dispatch<React.SetStateAction<boolean>>,
];

type EventDates = {
  started: Date;
  ends: Date;
};

const useTimer = (initialDates: EventDates): TimerHook => {
  const [dates, setDates] = useState(initialDates);
  const [active, setActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (dates) {
      const totalMilliseconds =
        new Date(dates.ends).getTime() - new Date(dates.started).getTime();
      const totalSeconds = totalMilliseconds / 1000;

      setActive(true);
      setSeconds(totalSeconds);
    }
  }, [dates]);

  useEffect(() => {
    let ticker: NodeJS.Timeout;

    if (active) {
      if (seconds > 0) {
        ticker = setTimeout(() => setSeconds((s) => s - 1), 1000);
      } else {
        setActive(false);
      }
    }

    return () => clearTimeout(ticker);
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const formattedTimer = formatTimer(minutes, seconds);

  return [formattedTimer, setDates, setActive];
};

export default useTimer;
