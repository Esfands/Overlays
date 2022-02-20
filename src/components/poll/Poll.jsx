import { useCallback } from 'react';

import Option from './Option';

const Poll = ({ event }) => {
  const totalVotes = event.payload.choices.reduce(
    (total, choice) => total + choice.votes,
    0
  );

  const isWinner = useCallback(
    (option) =>
      event.status !== 'open' &&
      event.payload.choices.reduce(
        (winner, choice) => (choice.votes > winner.votes ? choice : winner),
        option
      ).votes === option.votes,
    [event.status, event.payload.choices]
  );

  return (
    <div>
      <div className="content">
        {event?.payload.choices.map((data) => (
          <Option
            key={data.id}
            data={data}
            totalVotes={totalVotes}
            isWinner={isWinner(data)}
          />
        ))}
      </div>
    </div>
  );
};

export default Poll;
