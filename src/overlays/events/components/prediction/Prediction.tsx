import { useSelector } from 'react-redux';
import { selectPrediction } from '@/state/selectors';
import { formatPercentage } from '@events/util/formatters';
import { EventType } from '@server/types';
import type { Outcome } from '@/types/eventsub';

import Event from '../Event';
import Option from './Option';

const Prediction = () => {
  const prediction = useSelector(selectPrediction);
  const outcomes = prediction.outcomes as Outcome<any>[];

  const totalPts: number = outcomes.reduce(
    (final, val) => final + (val.channel_points || 0),
    0,
  );

  const isWinner = (option: Outcome<any>) =>
    'winning_outcome_id' in prediction && option.id === prediction.winning_outcome_id;

  return (
    <Event type={EventType.PREDICTION}>
      <div className="content d-flex">
        {outcomes.map((outcome) => (
          <Option
            key={outcome.id}
            outcome={outcome}
            totalPts={totalPts}
            isWinner={isWinner(outcome)}
          />
        ))}
      </div>
      <div className="pct-bar d-flex">
        {outcomes.map((outcome: any) => (
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
