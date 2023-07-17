import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPayload } from '@/state/selectors';
import { getOutcomeText } from '../../util/marqueeText';

type Outcome = {
  id: string;
};

type Predictor = {
  channel_points_won: number;
  channel_points_used: number;
};

const OutcomeText = () => {
  const payload = useSelector(selectPayload);
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const winningOutcome = payload?.outcomes.find(
      (x: Outcome) => x.id === payload?.winning_outcome_id,
    );
    const losingOutcome = payload?.outcomes.find(
      (x: Outcome) => x.id !== payload?.winning_outcome_id,
    );

    const biggestWinner =
      winningOutcome?.top_predictors?.sort(
        (a: Predictor, b: Predictor) => a.channel_points_won < b.channel_points_won,
      )[0] || {};
    const biggestLoser =
      losingOutcome?.top_predictors?.sort(
        (a: Predictor, b: Predictor) => a.channel_points_used < b.channel_points_used,
      )[0] || {};

    setText(
      getOutcomeText(
        biggestWinner.user_name,
        biggestWinner.channel_points_won,
        biggestLoser.user_name,
        biggestLoser.channel_points_used,
      ),
    );
  }, [payload]);

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
