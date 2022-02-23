import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { formatCurrency } from '../util/formatters';

const Marquee = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const textRef = useRef();

  useEffect(() => {
    if (data?.eventType === 'prediction') {
      if (data.event.endsWith('begin')) {
        textRef.current.classList.remove('scroll-text');
      } else if (data.event.endsWith('end')) {
        textRef.current.classList.add('scroll-text');
        setVisible(true);
        setTimeout(() => setVisible(false), 15000);
      }
    }
  }, [data]);

  const winningOutcome = data?.payload.outcomes.find(
    (x) => x.id === data.payload.winning_outcome_id
  );
  const losingOutcome = data?.payload.outcomes.find(
    (x) => x.id !== data.payload.winning_outcome_id
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
    <CSSTransition in={visible} timeout={250} classNames="marquee">
      <div id="marquee" className="d-flex w-100">
        <div className="left-box">
          <span>BREAKING NEWS</span>
        </div>
        <div className="position-relative w-100">
          <span
            className="marquee-text position-absolute text-nowrap"
            ref={textRef}
          >
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
          </span>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Marquee;
