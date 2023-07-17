import { useSelector } from 'react-redux';
import { selectMessage } from '@/state/selectors';
import classNames from 'classnames';
import Prediction from './prediction/Prediction';
import Poll from './poll/Poll';
import Marquee from './marquee/Marquee';
import { EventType } from '@/util/types';

const Overlay = () => {
  const { topic, payload } = useSelector(selectMessage);

  const isPoll = topic.includes(EventType.POLL);
  const isPrediction = topic.includes(EventType.PREDICTION);

  const offset = payload.offset;

  const eventListClasses = classNames({
    'no-event': !isPoll && !isPrediction,
    'position-absolute': typeof offset === 'number' && offset > 0,
  });

  const eventListStyle = {
    top: typeof offset === 'number' ? `${offset}px` : 'unset',
  };

  return (
    <div className="d-flex flex-column justify-content-end align-items-end">
      <Marquee />
      <div id="events" className={eventListClasses} style={eventListStyle}>
        <Prediction />
        <Poll />
      </div>
    </div>
  );
};

export default Overlay;
