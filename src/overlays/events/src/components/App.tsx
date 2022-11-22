import classNames from 'classnames';
import Prediction from './prediction/Prediction';
import Poll from './poll/Poll';
import Marquee from './marquee/Marquee';
import type { MultiEventData,  } from 'src/util/types';
import type { OverlayOffset } from '../util/types';

type Props = Pick<MultiEventData, 'poll' | 'prediction'>;

const offsetMap: Partial<Record<OverlayOffset, number>> = {
  top: 0,
  middle: 300,
};

const App = ({ poll, prediction }: Props) => {
  let offset: OverlayOffset = prediction?.offset || poll?.offset;
  offset = isNaN(Number(offset)) ? offsetMap[offset] || 0 : offset;

  const eventListClasses = classNames({
    'no-event': !prediction && !poll,
    'position-absolute': offset > 0,
  });

  const eventListStyle = {
    top: `${offset}px`,
  };

  return (
    <div className="d-flex flex-column justify-content-end align-items-end">
      <Marquee data={prediction} />
      <div id="events" className={eventListClasses} style={eventListStyle}>
        <Prediction data={prediction} />
        <Poll data={poll} />
      </div>
    </div>
  );
};

export default App;
