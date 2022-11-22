import React from 'react';
import ReactDOM from 'react-dom/client';
import Events from '../overlays/events';

import './styles.scss';

const BG_COLOR = process.env.NODE_ENV === 'development' ? 'dark' : 'transparent';

function App() {
  return (
    <div className={`w-100 h-100 bg-${BG_COLOR}`}>
      <Events />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
