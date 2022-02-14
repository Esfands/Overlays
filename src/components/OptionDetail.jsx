import { formatDecimal } from '../util/formatters';

const OptionDetail = ({ num, icon }) => {
  const shortNum = num > 999 ? `${formatDecimal(num / 1000)}K` : num;

  return (
    <div className="detail-item d-flex align-items-center">
      {icon}
      <span className="detail-name mx-1">{shortNum || '--'}</span>
    </div>
  );
};

export default OptionDetail;
