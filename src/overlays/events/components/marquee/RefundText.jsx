import { getRefundText } from '../../util/marqueeText';

const RefundText = ({ data }) => {
  const total = data?.outcomes.reduce((sum, option) => sum + option.channel_points, 0);

  return getRefundText(total);
};

export default RefundText;
