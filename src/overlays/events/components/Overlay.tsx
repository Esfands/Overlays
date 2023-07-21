import { useSelector } from 'react-redux';
import { selectEvent, selectEventType, selectOffset } from '@/state/selectors';
import { EventTopic, EventType } from '@server/types';

import Prediction from './prediction/Prediction';
import Poll from './poll/Poll';
import Marquee from './marquee/Marquee';

const Overlay = () => {
  const eventType = useSelector(selectEventType);
  const event = useSelector(selectEvent);
  const offset = useSelector(selectOffset);

  const isPoll = eventType === EventType.POLL;
  const isPrediction = eventType === EventType.PREDICTION;
  const isPredictionEnd = event === EventTopic.PREDICTION_END;

  const eventListStyle = {
    top: typeof offset === 'number' ? `${offset}px` : '100px',
  };

  return (
    <div className="d-flex flex-column justify-content-end align-items-end">
      {isPrediction && isPredictionEnd && <Marquee />}
      <div id="events" className="position-absolute" style={eventListStyle}>
        {isPrediction && <Prediction />}
        {isPoll && <Poll />}
      </div>
    </div>
  );
};

export default Overlay;
