import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import useChatEvent from '../util/hooks/useChatEvent';
import useTimer from '../util/hooks/useTimer';

import Prediction from './prediction/Prediction';
import Poll from './poll/Poll';

const App = () => {
  const event = useChatEvent();
  const [isVisible, setVisible] = useState(false);
  const [timer, setTimerDates, setTimerActive] = useTimer(null);

  useEffect(() => {
    if (event?.event.endsWith('begin')) {
      setTimerDates(event.dates);
      setVisible(true);
    } else if (event?.event.endsWith('lock')) {
      setTimerActive(false);
    } else if (event?.event.endsWith('end')) {
      setTimerActive(false);
      setTimeout(() => setVisible(false), 10000);
    }
  }, [event, setTimerActive, setTimerDates]);

  let eventComponent = null;

  if (event) {
    eventComponent =
      event.eventType === 'prediction' ? (
        <Prediction event={event} />
      ) : (
        <Poll event={event} />
      );
  }

  return (
    <CSSTransition appear in={isVisible} timeout={500} classNames="event">
      <div id="event" className="position-absolute">
        <div className="event-head position-absolute d-flex justify-content-between">
          <div className="text-wrap">
            <span className="top-tag event-type">
              {event?.eventType.toUpperCase()}
            </span>
          </div>
          <div className="text-wrap">
            <span className="top-tag time-left">{timer}</span>
          </div>
        </div>
        <div className="event-body">
          <h1 className="title mb-3">{event?.title}</h1>
          {eventComponent}
        </div>
      </div>
    </CSSTransition>
  );
};

export default App;
