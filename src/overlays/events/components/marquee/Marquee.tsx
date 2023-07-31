import { useState, useEffect, createRef } from 'react';
import { useSelector } from 'react-redux';
import { selectEvent, selectEventType, selectPrediction } from '@/state/selectors';
import { PredictionEndStatus } from '@/types/eventsub';

import { CSSTransition } from 'react-transition-group';
import OutcomeText from './OutcomeText';
import RefundText from './RefundText';

const Marquee = () => {
  const eventType = useSelector(selectEventType);
  const event = useSelector(selectEvent);
  const prediction = useSelector(selectPrediction);

  const [visible, setVisible] = useState(false);

  const textRef = createRef<HTMLSpanElement>();

  useEffect(() => {
    if (eventType === 'prediction') {
      if (event.endsWith('begin')) {
        textRef.current?.classList.remove('scroll-text');
      } else if (event.endsWith('end')) {
        textRef.current?.classList.add('scroll-text');
        setVisible(true);
        setTimeout(() => setVisible(false), 15000);
      }
    }
  }, [eventType, event]);

  let text = null;

  if ('status' in prediction) {
    if (prediction.status === PredictionEndStatus.RESOLVED) {
      text = <OutcomeText />;
    } else if (prediction.status === PredictionEndStatus.CANCELED) {
      text = <RefundText />;
    }
  }

  return (
    <CSSTransition in={visible} timeout={250} classNames="marquee">
      <div id="marquee" className="d-flex w-100">
        <div className="marquee-title">
          <span>BREAKING NEWS</span>
        </div>
        <div className="marquee-content">
          <span className="marquee-text" ref={textRef}>
            {text}
          </span>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Marquee;
