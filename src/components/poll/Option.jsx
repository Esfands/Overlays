const Option = ({ data, totalVotes, isWinner }) => {
  const percentage = Math.round((data.votes / totalVotes) * 100);

  return (
    <div className="option position-relative">
      <div
        className="option-fill position-absolute"
        style={{ width: `${percentage}%` }}
      />
      <div className="option-text position-relative d-flex justify-content-between">
        <span className="w-75 text-truncate">{data.title}</span>
        <span>
          {`${percentage}%`} ({data.votes})
        </span>
      </div>
    </div>
  );
};

export default Option;
