import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import useEvent from '../util/hooks/useEvent';
import type { MessageBody } from 'src/util/types';

type Props = React.PropsWithChildren & {
  type: 'poll' | 'prediction';
  data: Partial<MessageBody>;
};

const Event = ({ type, data, children }: Props) => {
  const [visible, timer] = useEvent(data);

  if (!data.payload) {
    return;
  }

  const eventClasses = classNames('event position-relative', type, {
    [data.payload.format]: data.payload.format === 'compact',
  });

  return (
    <CSSTransition
      appear
      in={visible}
      timeout={4500}
      mountOnEnter
      unmountOnExit
      classNames="event"
    >
      <div className={eventClasses}>
        <div className="event-head position-absolute d-flex justify-content-between">
          <div className="text-wrap">
            <span className="top-tag event-type">
              {data.payload.eventType.toUpperCase()}
            </span>
          </div>
          <div className="text-wrap">
            <span className="top-tag time-left">{timer}</span>
          </div>
        </div>
        <div className="event-body">
          <h1 className="title">{data.payload.title}</h1>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Event;
