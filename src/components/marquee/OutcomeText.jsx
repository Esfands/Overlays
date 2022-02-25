import { useEffect, useState } from 'react';
import { getOutcomeText } from '../../util/marqueeText';

const OutcomeText = ({ data }) => {
  const [text, setText] = useState(null);

  useEffect(() => {
    const winningOutcome = data?.outcomes.find(
      (x) => x.id === data?.winning_outcome_id
    );
    const losingOutcome = data?.outcomes.find(
      (x) => x.id !== data?.winning_outcome_id
    );

    const biggestWinner =
      winningOutcome?.top_predictors?.sort(
        (a, b) => a.channel_points_won < b.channel_points_won
      )[0] || {};
    const biggestLoser =
      losingOutcome?.top_predictors?.sort(
        (a, b) => a.channel_points_used < b.channel_points_used
      )[0] || {};

    setText(
      getOutcomeText(
        biggestWinner.user_name,
        biggestWinner.channel_points_won,
        biggestLoser.user_name,
        biggestLoser.channel_points_used
      )
    );
  }, [data]);

  return (
    <>
      {text}
      <img
        src="https://cdn.betterttv.net/emote/5fa5985842cf82644d86e7b4/1x"
        alt="PepePoint"
      />
    </>
  );
};

export default OutcomeText;
