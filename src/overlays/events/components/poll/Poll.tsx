import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectEvent, selectPoll } from '@/state/selectors';
import { Choice, EventStatus } from '@/types/eventsub';
import { EventType } from '@server/types';

import Event from '../Event';
import Option from './Option';

const Poll = () => {
  const topic = useSelector(selectEvent);
  const { choices } = useSelector(selectPoll);

  const eventStatus = topic.replace(/.+\./, '') as EventStatus;

  const totalVotes = choices.reduce((total, choice) => total + (choice.votes || 0), 0);

  const isWinner = (option: Choice<any>) =>
    eventStatus === EventStatus.END &&
    'votes' in option &&
    choices.reduce(
      (winner, choice) => (choice.votes > winner.votes ? choice : winner),
      option,
    ).votes === option.votes;

  return (
    <Event type={EventType.POLL}>
      <div className="content">
        {choices.map((choice) => (
          <Option
            key={choice.id}
            data={choice}
            totalVotes={totalVotes}
            isWinner={isWinner(choice)}
          />
        ))}
      </div>
    </Event>
  );
};

export default Poll;
