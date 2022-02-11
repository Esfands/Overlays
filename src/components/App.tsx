import { useEffect, useState } from 'react';
import { Prediction } from '../types';

function App() {
  const [event, setEvent] = useState<Prediction | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://api.retpaladinbot.com/esfandsevents');

    ws.onopen = () => {
      console.log('WS Connected');
    };

    ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      setEvent(data);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Title: {event ? event.title : ''}</p>
        <p>Status: {event ? event.status : ''}</p>
      </header>
    </div>
  );
}

export default App;
