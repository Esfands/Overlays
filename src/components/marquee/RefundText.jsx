import { formatCurrency } from '../../util/formatters';

const RefundText = ({ data }) => {
  const total = data?.outcomes.reduce(
    (sum, option) => sum + option.channel_points,
    0
  );

  return `Up and coming Twitch streamer Esfand "Sukhbeer" TV admits to scamming viewers out of ${formatCurrency(
    total
  )} Ret Coin. Refunds to follow shortly.`;
};

export default RefundText;
