import { useEffect, useState } from 'react';
import './App.css';

interface Prediction {
  event: string;
  id: string;
  outcome: object;
  status: string;
  title: string;
}

function App() {
  const [event, setEvent] = useState<Prediction | undefined>(undefined);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:5555");
    ws.onopen = () => {
      console.log("WS Connected");
    }

    ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      setEvent(data);
    }

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Title: {(event) ? event.title : ""}</p>
        <p>Status: {(event) ? event.status : ""}</p>
      </header>
    </div>
  );
}

export default App;
