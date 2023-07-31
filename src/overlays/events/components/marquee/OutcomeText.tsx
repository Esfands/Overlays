import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPredictionEnd } from '@/state/selectors';
import {
  getOutcomeText,
  type OutcomeText as TOutcomeText,
} from '@events/util/marqueeText';
import type { EventStatus, Outcome } from '@/types/eventsub';

const OutcomeText = () => {
  const prediction = useSelector(selectPredictionEnd);
  const [text, setText] = useState<TOutcomeText | null>(null);

  useEffect(() => {
    const winningOutcome = prediction.outcomes.find(
      (x) => x.id === prediction.winning_outcome_id,
    ) as Outcome<EventStatus.END>;
    const losingOutcome = prediction.outcomes.find(
      (x) => x.id !== prediction.winning_outcome_id,
    ) as Outcome<EventStatus.END>;

    const topWinners = [...winningOutcome.top_predictors];
    const topLosers = [...losingOutcome.top_predictors];

    const biggestWinner = topWinners.sort(
      (a, b) => a.channel_points_won - b.channel_points_won,
    )[0];
    const biggestLoser = topLosers.sort(
      (a, b) => a.channel_points_used - b.channel_points_used,
    )[0];

    setText(
      getOutcomeText(
        biggestWinner.user_name,
        biggestWinner.channel_points_won,
        biggestLoser.user_name,
        biggestLoser.channel_points_used,
      ),
    );
  }, [prediction]);

  return (
    <>
      {text?.winner}
      <img src="https://cdn.betterttv.net/emote/5cf6a8322316b42d72be7c36/1x.webp" />
      {text?.loser}
      <img src="https://cdn.betterttv.net/emote/5fa5985842cf82644d86e7b4/1x.webp" />
    </>
  );
};

export default OutcomeText;
