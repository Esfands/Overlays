import { useSelector } from 'react-redux';
import { selectTopic } from 'src/util/state/selectors';
import classNames from 'classnames';
import Prediction from './prediction/Prediction';
import Poll from './poll/Poll';
import Marquee from './marquee/Marquee';
import type { OverlayOffset } from '../util/types';

const Overlay = () => {
  const topic = useSelector(selectTopic);

  const isPoll = topic.includes('poll');
  const isPrediction = topic.includes('prediction');

  const offset: OverlayOffset = 'top';

  const eventListClasses = classNames({
    'no-event': !isPoll && !isPrediction,
    'position-absolute': typeof offset === 'number' && offset > 0,
  });

  const eventListStyle = {
    top: `${offset}px`,
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
