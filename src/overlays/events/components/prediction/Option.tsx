import { formatDecimal, formatPercentage } from '@events/util/formatters';
import type { Outcome } from '@/types/eventsub';

import OptionDetail from './OptionDetail';
import Icons from '../Icons';

type Props = {
  outcome: Outcome<any>;
  totalPts: number;
  isWinner: boolean;
};

const Option = ({ outcome, totalPts, isWinner }: Props) => {
  const percentage = formatPercentage(outcome.channel_points, totalPts);
  const ratio = outcome.channel_points
    ? `1:${formatDecimal(totalPts / outcome.channel_points)}`
    : undefined;

  const topPredictors =
    'top_predictors' in outcome
      ? outcome.top_predictors[0]?.channel_points_used || undefined
      : undefined;

  return (
    <div className="option d-flex flex-column justify-content-between">
      <div className="option-head d-flex justify-content-between align-items-center">
        {isWinner && <Icons.Check className="check-mark" />}
        <h3 className="option-title mb-0">{outcome.title}</h3>
      </div>
      <div className="option-body d-flex justify-content-between align-items-center">
        <div className="details">
          <OptionDetail value={outcome.channel_points} icon={<Icons.Count />} />
          <OptionDetail value={ratio} icon={<Icons.Trophy />} />
          <OptionDetail value={outcome.users} icon={<Icons.People />} />
          <OptionDetail value={topPredictors} icon={<Icons.TopScore />} />
        </div>
        <h1 className="percentage">{percentage}</h1>
      </div>
    </div>
  );
};

export default Option;
