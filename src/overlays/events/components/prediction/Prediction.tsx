import { useCallback } from 'react';
import { formatPercentage } from '../../util/formatters';
import type { MessageBody } from 'src/util/types';
import Event from '../Event';
import Option from './Option';

const Prediction = ({ topic, payload }: MessageBody) => {
  const totalPts = payload.outcomes.reduce((final: number, val: any) => {
    return final + (val.channel_points || 0);
  }, 0);

  const isWinner = (option: any) => topic.endsWith('end') && option.id === payload.winning_outcome_id;

  return (
    <Event type="prediction" data={{ topic, payload }}>
      <div className="content d-flex">
        {payload.outcomes.map((outcome: any) => (
          <Option key={outcome.id} data={outcome} totalPts={totalPts} isWinner={isWinner(outcome)} />
        ))}
      </div>
      <div className="pct-bar d-flex">
        {payload.outcomes.map((outcome: any) => (
          <div
            key={outcome.id}
            className="pct-bar-side"
            style={{ width: formatPercentage(outcome.channel_points, totalPts) }}
          />
        ))}
      </div>
    </Event>
  );
};

export default Prediction;
