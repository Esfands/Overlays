import { useState, useEffect, createRef } from 'react';
import { useSelector } from 'react-redux';
import { selectPayload } from '@/state/selectors';
import { CSSTransition } from 'react-transition-group';

import OutcomeText from './OutcomeText';
import RefundText from './RefundText';

const Marquee = () => {
  const payload = useSelector(selectPayload);
  const [visible, setVisible] = useState(false);
  const textRef = createRef<HTMLSpanElement>();

  useEffect(() => {
    if (payload?.eventType === 'prediction') {
      if (payload.event.endsWith('begin')) {
        textRef.current?.classList.remove('scroll-text');
      } else if (payload.event.endsWith('end')) {
        textRef.current?.classList.add('scroll-text');
        setVisible(true);
        setTimeout(() => setVisible(false), 15000);
      }
    }
  }, [payload]);

  let text = null;

  if (payload?.status === 'resolved') {
    text = <OutcomeText />;
  } else if (payload?.status === 'canceled') {
    text = <RefundText />;
  }

  return (
    <CSSTransition in={visible} timeout={250} classNames="marquee">
      <div id="marquee" className="d-flex w-100">
        <div className="left-box">
          <span>BREAKING NEWS</span>
        </div>
        <div className="position-relative w-100">
          <span className="marquee-text position-absolute text-nowrap" ref={textRef}>
            {text}
          </span>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Marquee;
