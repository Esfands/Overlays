import React from 'react';
import ReactDOM from 'react-dom/client';
import useEvents from './util/hooks/useEvents';
import Events from './overlays/events';

import './styles/styles.scss';

const BG_COLOR = process.env.NODE_ENV === 'production' ? 'transparent' : 'dark';

function App() {
  const [events, connected] = useEvents();

  if (!connected) {
    return (
      <div className="no-connection position-absolute text-shadow">
        <h5 className="text-white">Custom overlay not connected</h5>
      </div>
    );
  }

  return <Events poll={events.poll} prediction={events.prediction} />;
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <div className={`w-100 h-100 bg-${BG_COLOR}`}>
      <App />
    </div>
  </React.StrictMode>
);
