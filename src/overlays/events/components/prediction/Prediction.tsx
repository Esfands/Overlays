import { useSelector } from 'react-redux';
import { selectMessage } from '@/state/selectors';
import { formatPercentage } from '../../util/formatters';
import Event from '../Event';
import Option from './Option';
import { EventType } from '@/util/types';

const Prediction = () => {
  const { topic, payload } = useSelector(selectMessage);

  const totalPts: number = payload.payload.outcomes.reduce((final: number, val: any) => {
    return final + (val.channel_points || 0);
  }, 0);

  const isWinner = (option: any) =>
    topic.endsWith('end') && option.id === payload.payload.winning_outcome_id;

  return (
    <Event type={EventType.PREDICTION}>
      <div className="content d-flex">
        {payload.payload.outcomes.map((outcome: any) => (
          <Option
            key={outcome.id}
            data={outcome}
            totalPts={totalPts}
            isWinner={isWinner(outcome)}
          />
        ))}
      </div>
      <div className="pct-bar d-flex">
        {payload.payload.outcomes.map((outcome: any) => (
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
