import classNames from 'classnames';
import Prediction from './prediction/Prediction';
import Poll from './poll/Poll';
import Marquee from './marquee/Marquee';
import type { MessageState } from 'src/util/types';

type Props = {
  message: MessageState;
};

const App = ({ message }: Props) => {
  const isPoll = message?.topic.includes('poll');
  const isPrediction = message?.topic.includes('prediction');

  const offset = 'top';

  const eventListClasses = classNames({
    'no-event': !isPoll && !isPrediction,
    'position-absolute': typeof offset === 'number' && offset > 0,
  });

  const eventListStyle = {
    top: `${offset}px`,
  };

  return (
    <div className="d-flex flex-column justify-content-end align-items-end">
      <Marquee message={message} />
      <div id="events" className={eventListClasses} style={eventListStyle}>
        <Prediction message={message} />
        <Poll message={message} />
      </div>
    </div>
  );
};

export default App;
