import { useCallback } from 'react';
import type { MessageBody } from 'src/util/types';
import Event from '../Event';
import Option from './Option';

type Props = Partial<MessageBody>;

const Poll = ({ topic, payload }: Props) => {
  const { choices, status } = payload || {};
  const totalVotes = payload?.choices.reduce(
    (total: number, choice: any) => total + choice.votes,
    0
  );

  const isWinner = useCallback(
    (option: any) =>
      payload?.status !== 'open' &&
      payload?.choices.reduce(
        (winner: any, choice: any) => (choice.votes > winner.votes ? choice : winner),
        option
      ).votes === option.votes,
    [payload?.status, payload?.choices]
  );

  return (
    <Event type="poll" data={{ topic, payload }}>
      <div className="content">
        {payload.choices.map((choice: any) => (
          <Option key={choice.id} data={choice} totalVotes={totalVotes} isWinner={isWinner(choice)} />
        ))}
      </div>
    </Event>
  );
};

export default Poll;
