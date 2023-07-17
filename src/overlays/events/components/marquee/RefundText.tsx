import { useSelector } from 'react-redux';
import { selectPayload } from '@/state/selectors';
import { getRefundText } from '../../util/marqueeText';

type Outcome = {
  channel_points: number;
};

const RefundText = () => {
  const payload = useSelector(selectPayload);
  const total = payload?.outcomes.reduce(
    (sum: number, option: Outcome) => sum + option.channel_points,
    0,
  );

  return <>{getRefundText(total)}</>;
};

export default RefundText;
