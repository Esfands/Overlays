import classNames from 'classnames';
import useEvents from '../util/hooks/useEvents';

import Prediction from './prediction/Prediction';
import Poll from './poll/Poll';
import Marquee from './marquee/Marquee';

const offsetMap = {
  top: 0,
  middle: 300,
};

const App = () => {
  const [events, connected] = useEvents();

  let offset = events.prediction?.offset || events.poll?.offset || 0;
  if (typeof offset === 'string') {
    offset = offsetMap[offset];
  }

  const eventListClasses = classNames({
    'no-event': !events.prediction && !events.poll,
    'position-absolute': offset > 0,
  });
  const eventListStyle = {
    top: `${offset}px`,
  };

  return connected ? (
    <div className="d-flex flex-column justify-content-end align-items-end">
      <Marquee data={events.prediction} />
      <div id="events" className={eventListClasses} style={eventListStyle}>
        <Prediction data={events.prediction} />
        <Poll data={events.poll} />
      </div>
    </div>
  ) : (
    <div className="no-connection position-absolute text-shadow">
      <h5 className="text-white">Prediction overlay not connected</h5>
    </div>
  );
};

export default App;
