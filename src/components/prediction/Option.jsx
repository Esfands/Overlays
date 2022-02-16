import { formatDecimal } from '../../util/formatters';

import OptionDetail from './OptionDetail';
import Icons from '../Icons';

const Option = ({ data, totalPts, isWinner, format }) => {
  const percentage = data.channel_points
    ? Math.round(((data.channel_points || 0) / totalPts) * 100)
    : 0;
  const ratio = data.channel_points
    ? `1:${formatDecimal(totalPts / data.channel_points)}`
    : null;

  return (
    <div className="option">
      <div className="option-head d-flex justify-content-between align-items-center mb-2">
        {isWinner && <Icons.Check className="check-mark" />}
        <h3 className="option-title mb-0">{data.title}</h3>
      </div>
      {format === 'regular' && (
        <div className="option-body d-flex justify-content-between align-items-center">
          <div className="details">
            <OptionDetail num={data.channel_points} icon={<Icons.Count />} />
            <OptionDetail num={ratio} icon={<Icons.Trophy />} />
            <OptionDetail num={data.users} icon={<Icons.People />} />
            <OptionDetail
              num={data.top_predictors?.[0]?.channel_points_used}
              icon={<Icons.TopScore />}
            />
          </div>
          <h1 className="percentage">{percentage}%</h1>
        </div>
      )}
    </div>
  );
};

export default Option;
