import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './state/store';
import useMessage from './util/useMessage';
import Events from './overlays/events';

import './styles/styles.scss';

const BG_COLOR = import.meta.env.PROD ? 'transparent' : 'dark';

const App = () => {
  const connected = useMessage();

  return (
    <div className={`w-100 h-100 bg-${BG_COLOR}`}>
      {connected ? (
        <Events />
      ) : (
        <div className="no-connection position-absolute text-shadow">
          <h5 className="text-white">Custom overlay not connected</h5>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
