import { useCallback } from 'react';

import Option from './Option';

const Poll = ({ event }) => {
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
    <div className="prediction">
      <div className="content d-flex mb-3">
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
            style={{
              width: `${((data.channel_points || 0) / totalPts) * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Poll;
