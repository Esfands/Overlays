import React from 'react';
import ReactDOM from 'react-dom/client';
import useMessageCollection from './util/hooks/useMessageCollection';
import Events from './overlays/events';

import './styles/styles.scss';

const BG_COLOR = process.env.NODE_ENV === 'production' ? 'transparent' : 'dark';

function App() {
  const [messages, connected] = useMessageCollection();

  return (
    <div className={`w-100 h-100 bg-${BG_COLOR}`}>
      {connected ? (
        <Events poll={messages.poll} prediction={messages.prediction} />
      ) : (
        <div className="no-connection position-absolute text-shadow">
          <h5 className="text-white">Custom overlay not connected</h5>
        </div>
      )}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
