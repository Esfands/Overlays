import classNames from 'classnames';
import useEvents from '../util/hooks/useEvents';

import Prediction from './prediction/Prediction';
import Poll from './poll/Poll';

const App = () => {
  const [events, connected] = useEvents();

  const eventListClasses = classNames('position-absolute top-0 end-0', {
    'no-event': !events.prediction && !events.poll,
  });

  return connected ? (
    <div id="events" className={eventListClasses}>
      <Prediction data={events.prediction} />
      <Poll data={events.poll} />
    </div>
  ) : (
    <div className="no-connection position-absolute text-shadow">
      <h1 className="text-white">Prediction overlay not connected</h1>
    </div>
  );
};

export default App;
