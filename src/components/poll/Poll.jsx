import { useCallback } from 'react';

import Event from '../Event';
import Option from './Option';

const Poll = ({ data }) => {
  const totalVotes = data?.payload.choices.reduce(
    (total, choice) => total + choice.votes,
    0
  );

  const isWinner = useCallback(
    (option) =>
      data.status !== 'open' &&
      data.payload.choices.reduce(
        (winner, choice) => (choice.votes > winner.votes ? choice : winner),
        option
      ).votes === option.votes,
    [data?.status, data?.payload.choices]
  );

  return (
    <Event type="poll" data={data}>
      <div className="content">
        {data?.payload.choices.map((data) => (
          <Option
            key={data.id}
            data={data}
            totalVotes={totalVotes}
            isWinner={isWinner(data)}
          />
        ))}
      </div>
    </Event>
  );
};

export default Poll;
