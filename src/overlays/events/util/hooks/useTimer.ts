import { useEffect, useState } from 'react';
import { EventDates } from '../dates';
import { formatTimer } from '../formatters';

const useTimer = () => {
  const [dates, setDates] = useState<EventDates>();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (dates) {
      const totalMilliseconds = dates.end.getTime() - dates.start.getTime();
      const totalSeconds = totalMilliseconds / 1000;

      setSeconds(totalSeconds);
    }
  }, [dates]);

  useEffect(() => {
    let ticker: NodeJS.Timeout;

    if (seconds > 0) {
      ticker = setTimeout(() => setSeconds((s) => s - 1), 1000);
    }

    return () => clearTimeout(ticker);
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const formattedTimer = formatTimer(minutes, seconds);

  return [formattedTimer, setDates] as const;
};

export default useTimer;
