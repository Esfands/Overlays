import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import useEvent from '../util/hooks/useEvent';
import { selectMessage } from '@/state/selectors';

type Props = React.PropsWithChildren & {
  type: 'poll' | 'prediction';
};

const Event = ({ type, children }: Props) => {
  const { topic, payload } = useSelector(selectMessage);
  const [visible, timer] = useEvent({ topic, payload });

  const eventClasses = classNames('event position-relative', type, {
    [payload.format]: payload.format === 'compact',
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
            <span className="top-tag event-type">{payload.eventType.toUpperCase()}</span>
          </div>
          <div className="text-wrap">
            <span className="top-tag time-left">{timer}</span>
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
