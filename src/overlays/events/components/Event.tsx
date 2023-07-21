import { useSelector } from 'react-redux';
import {
  selectEvent,
  selectEventPayload,
  selectEventType,
  selectFormat,
} from '@/state/selectors';
import classNames from 'classnames';
import useEvent from '@events/util/hooks/useEvent';
import type { EventType } from '@server/types';

import { CSSTransition } from 'react-transition-group';
import { createRef } from 'react';

type Props = React.PropsWithChildren & {
  type: EventType;
};

const Event = ({ type, children }: Props) => {
  const eventType = useSelector(selectEventType);
  const event = useSelector(selectEvent);
  const format = useSelector(selectFormat);
  const payload = useSelector(selectEventPayload);

  const [visible, timer] = useEvent(event, payload);
  const contentRef = createRef<HTMLDivElement>();

  const eventClasses = classNames('event position-relative', type, format);

  return (
    <CSSTransition
      nodeRef={contentRef}
      appear
      in={visible}
      timeout={4500}
      classNames="event"
    >
      <div className={eventClasses} ref={contentRef}>
        <div className="event-head position-absolute d-flex justify-content-between">
          <div className="top-tag event-type">
            <span>{eventType.toUpperCase()}</span>
          </div>
          <div className="top-tag event-timer">
            <span>{timer}</span>
          </div>
        </div>
        <div className="event-body">
          <h1 className="title">{payload.title}</h1>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Event;
