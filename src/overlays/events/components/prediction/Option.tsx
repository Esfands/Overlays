import { formatDecimal, formatPercentage } from '../../util/formatters';

import OptionDetail from './OptionDetail';
import Icons from '../Icons';

type Props = {
  data: Record<string, any>;
  totalPts: number;
  isWinner: boolean;
}

const Option = ({ data, totalPts, isWinner }: Props) => {
  const percentage = formatPercentage(data.channel_points, totalPts);
  const ratio = data.channel_points ? `1:${formatDecimal(totalPts / data.channel_points)}` : null;

  return (
    <div className="option d-flex flex-column justify-content-between">
      <div className="option-head d-flex justify-content-between align-items-center">
        {isWinner && <Icons.Check className="check-mark" />}
        <h3 className="option-title mb-0">{data.title}</h3>
      </div>
      <div className="option-body d-flex justify-content-between align-items-center">
        <div className="details">
          <OptionDetail value={data.channel_points} icon={<Icons.Count />} />
          <OptionDetail value={ratio} icon={<Icons.Trophy />} />
          <OptionDetail value={data.users} icon={<Icons.People />} />
          <OptionDetail
            value={data.top_predictors?.[0]?.channel_points_used}
            icon={<Icons.TopScore />}
          />
        </div>
        <h1 className="percentage">{percentage}</h1>
      </div>
    </div>
  );
};

export default Option;
