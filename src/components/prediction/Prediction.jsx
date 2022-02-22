import { useCallback } from 'react';
import { formatPercentage } from '../../util/formatters';

import Event from '../Event';
import Option from './Option';

const Prediction = ({ data }) => {
  const totalPts = data?.payload.outcomes.reduce((final, val) => {
    return final + (val.channel_points || 0);
  }, 0);

  const isWinner = useCallback(
    (option) =>
      data?.event.endsWith('end') &&
      option.id === data.payload.winning_outcome_id,
    [data]
  );

  return (
    <Event type="prediction" data={data}>
      <div className="content d-flex">
        {data?.payload.outcomes.map((data) => (
          <Option
            key={data.id}
            data={data}
            totalPts={totalPts}
            isWinner={isWinner(data)}
          />
        ))}
      </div>
      <div className="pct-bar d-flex">
        {data?.payload.outcomes.map((data) => (
          <div
            key={data.id}
            className="pct-bar-side"
            style={{ width: formatPercentage(data.channel_points, totalPts) }}
          />
        ))}
      </div>
    </Event>
  );
};

export default Prediction;
