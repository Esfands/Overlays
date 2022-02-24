import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import OutcomeText from './OutcomeText';
import RefundText from './RefundText';

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

  let text = null;

  if (data?.payload?.status === 'resolved') {
    text = <OutcomeText data={data?.payload} />;
  } else if (data?.payload?.status === 'canceled') {
    text = <RefundText data={data?.payload} />;
  }

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
            {text}
          </span>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Marquee;
