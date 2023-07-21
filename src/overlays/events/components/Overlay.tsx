import { useSelector } from 'react-redux';
import { selectEvent, selectOffset } from '@/state/selectors';
import classNames from 'classnames';
import { EventTopic, EventType } from '@server/types';

import Prediction from './prediction/Prediction';
import Poll from './poll/Poll';
import Marquee from './marquee/Marquee';

const Overlay = () => {
  const event = useSelector(selectEvent);
  const offset = useSelector(selectOffset);

  const isPoll = event?.includes(EventType.POLL);
  const isPrediction = event?.includes(EventType.PREDICTION);
  const isPredictionEnd = event === EventTopic.PREDICTION_END;

  const eventListClasses = classNames({
    'no-event': !isPoll && !isPrediction,
    'position-absolute': true,
  });

  const eventListStyle = {
    top: typeof offset === 'number' ? `${offset}px` : '100px',
  };

  return (
    <div className="d-flex flex-column justify-content-end align-items-end">
      {isPrediction && isPredictionEnd && <Marquee />}
      <div id="events" className={eventListClasses} style={eventListStyle}>
        {isPrediction && <Prediction />}
        {isPoll && <Poll />}
      </div>
    </div>
  );
};

export default Overlay;
