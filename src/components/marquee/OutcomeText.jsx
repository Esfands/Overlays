import { formatCurrency } from '../../util/formatters';

const OutcomeText = ({ data }) => {
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

  return (
    <>
      {`Twitch local "${biggestWinner.user_name}" wins ${formatCurrency(
        biggestWinner.channel_points_won
      )} Ret Coin at the tables. Gambling addict "${
        biggestLoser.user_name
      }" absolutely blows it with a loss of ${formatCurrency(
        biggestLoser.channel_points_used
      )} Ret Coin.`}
      <img
        src="https://cdn.betterttv.net/emote/5fa5985842cf82644d86e7b4/1x"
        alt="PepePoint"
      />
    </>
  );
};

export default OutcomeText;
