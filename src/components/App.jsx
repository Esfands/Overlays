import classNames from 'classnames';
import useEvents from '../util/hooks/useEvents';

import Prediction from './prediction/Prediction';
import Poll from './poll/Poll';
import Marquee from './Marquee';

const App = () => {
  const [events, connected] = useEvents();

  const eventListClasses = classNames({
    'no-event': !events.prediction && !events.poll,
  });

  return connected ? (
    <div className="d-flex flex-column justify-content-end align-items-end">
      <Marquee data={events.prediction} />
      <div id="events" className={eventListClasses}>
        <Prediction data={events.prediction} />
        <Poll data={events.poll} />
      </div>
    </div>
  ) : (
    <div className="no-connection position-absolute text-shadow">
      <h1 className="text-white">Prediction overlay not connected</h1>
    </div>
  );
};

export default App;
