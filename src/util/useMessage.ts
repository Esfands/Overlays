import { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useDispatch } from '@/state/store';
import { setMessage } from '@/state/slices';
import { buildMessage } from './helpers';
import { MessageCode } from './types';

const TOPICS = [
  'channel.poll.begin',
  'channel.poll.progress',
  'channel.poll.end',
  'channel.prediction.begin',
  'channel.prediction.progress',
  'channel.prediction.lock',
  'channel.prediction.end',
];

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;
const websocketOptions = {
  shouldReconnect: () => true,
};

export default function useMessage(): boolean {
  const dispatch = useDispatch();
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    WEBSOCKET_URL,
    websocketOptions,
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('WebSocket connection opened');
      const newMessage = buildMessage(MessageCode.SUBSCRIBE, { topics: TOPICS });
      sendMessage(JSON.stringify(newMessage));
      return;
    }

    if (readyState === ReadyState.CLOSED) {
      console.log('WebSocket connection closed');
      dispatch(setMessage(null));
      return;
    }
  }, [readyState]);

  useEffect(() => {
    if (lastMessage) {
      const { d: data, mc: code } = JSON.parse(lastMessage.data);

      if (code === MessageCode.DISPATCH) {
        console.log(`[${data.topic}]`, data.payload);
        dispatch(data);
      }
    }
  }, [lastMessage]);

  const connected = readyState === ReadyState.OPEN;
  return connected;
}
