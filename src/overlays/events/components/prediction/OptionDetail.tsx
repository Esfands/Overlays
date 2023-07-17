import { formatShortNumber } from '../../util/formatters';

type Props = {
  value: number;
  icon: JSX.Element;
}

const OptionDetail = ({ value, icon }: Props) => {
  const formattedVal = typeof value === 'number' ? formatShortNumber(value) : value;

  return (
    <div className="detail-item d-flex align-items-center">
      {icon}
      <span className="detail-name mx-1">{formattedVal || '--'}</span>
    </div>
  );
};

export default OptionDetail;
