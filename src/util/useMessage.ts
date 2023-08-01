import { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useDispatch } from '@/state/store';
import { setMessage } from '@/state/slices';
import { MessageCode, type WebSocketMessage } from '@server/types';

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;
const websocketOptions = {
  shouldReconnect: () => true,
};

export default function useMessage(): boolean {
  const dispatch = useDispatch();
  const { lastMessage, readyState } = useWebSocket(WEBSOCKET_URL, websocketOptions);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('WebSocket connection opened');
    }

    if (readyState === ReadyState.CLOSED) {
      console.log('WebSocket connection closed');
      dispatch(setMessage({}));
      return;
    }
  }, [readyState]);

  useEffect(() => {
    if (lastMessage) {
      const { mc, d }: WebSocketMessage = JSON.parse(lastMessage.data);

      if (mc === MessageCode.DISPATCH && typeof d !== 'string') {
        console.log(`NEW MESSAGE [${d.event}]`, d);
        dispatch(setMessage(d));
      }
    }
  }, [lastMessage]);

  const connected = readyState === ReadyState.OPEN;
  return connected;
}
