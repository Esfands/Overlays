import { formatPercentage } from '@events/util/formatters';
import { Choice } from '@/types/eventsub';

import { CSSTransition } from 'react-transition-group';
import Icons from '../Icons';

type Props = {
  data: Choice<any>;
  totalVotes: number;
  isWinner: boolean;
};

const Option = ({ data, totalVotes, isWinner }: Props) => {
  const percentage = 'votes' in data ? formatPercentage(data.votes, totalVotes) : '0%';
  const votes = 'votes' in data ? data.votes : 0;

  return (
    <div className="option position-relative">
      <CSSTransition appear in={isWinner} timeout={500} classNames="poll-trophy">
        <Icons.Trophy className="position-absolute" />
      </CSSTransition>
      <div className="option-content position-relative">
        <div className="option-fill position-absolute" style={{ width: percentage }} />
        <div className="option-text position-relative d-flex justify-content-between">
          <span className="w-75 text-truncate">{data.title}</span>
          <span>
            {percentage} ({votes})
          </span>
        </div>
      </div>
    </div>
  );
};

export default Option;
