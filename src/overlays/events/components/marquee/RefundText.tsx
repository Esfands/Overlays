import { useSelector } from 'react-redux';
import { selectPredictionEnd } from '@/state/selectors';
import { getRefundText } from '@events/util/marqueeText';

const RefundText = () => {
  const prediction = useSelector(selectPredictionEnd);
  const total = prediction.outcomes.reduce(
    (sum: number, outcome) => sum + outcome.channel_points,
    0,
  );

  return <>{getRefundText(total)}</>;
};

export default RefundText;
