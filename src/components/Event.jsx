import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import useTimer from '../util/hooks/useTimer';

import classNames from 'classnames';

const Event = ({ type, data, children }) => {
  const [visible, setVisible] = useState(false);
  const [timer, setTimerDates, setTimerActive] = useTimer(null);
  const ref = useRef();

  useEffect(() => {
    if (data?.event.endsWith('begin')) {
      setVisible(true);
      setTimerDates(data.dates);
    } else if (data?.event.endsWith('lock')) {
      setTimerActive(false);
      setTimeout(() => setVisible(false), 10000);
    } else if (data?.event.endsWith('end')) {
      setVisible(true);
      setTimerActive(false);
      setTimeout(() => setVisible(false), 10000);
    }
  }, [data?.event, data?.dates, setTimerActive, setTimerDates]);

  let timerText = null;

  if (data?.status === 'open') {
    timerText = timer;
  } else {
    if (data?.payload.status === 'resolved') {
      timerText = 'RESULT';
    } else if (data?.payload.status === 'canceled') {
      timerText = 'REFUNDED';
    } else {
      timerText = 'CLOSED';
    }
  }

  const eventClasses = classNames('event position-relative', {
    [type]: true,
    [data?.format]: data?.format === 'compact',
  });

  return (
    <CSSTransition in={visible} timeout={4500} classNames="event">
      <div className={eventClasses} ref={ref}>
        <div className="event-head position-absolute d-flex justify-content-between">
          <div className="text-wrap">
            <span className="top-tag event-type">
              {data?.eventType.toUpperCase()}
            </span>
          </div>
          <div className="text-wrap">
            <span className="top-tag time-left">{timerText}</span>
          </div>
        </div>
        <div className="event-body">
          <h1 className="title">{data?.title}</h1>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Event;
