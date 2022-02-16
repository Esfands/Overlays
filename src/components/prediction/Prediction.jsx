import { useCallback } from 'react';
import { formatPercentage } from '../../util/formatters';

import Option from './Option';

const Prediction = ({ event }) => {
  const totalPts = event?.payload.outcomes.reduce((final, val) => {
    return final + (val.channel_points || 0);
  }, 0);

  const isWinner = useCallback(
    (option) =>
      event?.event.endsWith('end') &&
      option.id === event.payload.winning_outcome_id,
    [event]
  );

  return (
    <div>
      <div className="content d-flex">
        {event?.payload.outcomes.map((data) => (
          <Option
            key={data.id}
            data={data}
            totalPts={totalPts}
            isWinner={isWinner(data)}
          />
        ))}
      </div>
      <div className="pct-bar d-flex">
        {event?.payload.outcomes.map((data) => (
          <div
            key={data.id}
            className="pct-bar-side"
            style={{ width: formatPercentage(data.channel_points, totalPts) }}
          />
        ))}
      </div>
    </div>
  );
};

export default Prediction;
