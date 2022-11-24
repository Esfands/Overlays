import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { MessageCollectionHook, MessageCode, MessageCollection } from '../types';
import { buildMessage, mergeMessage } from '../helpers';

const INITIAL_MESSAGES: MessageCollection = {
  poll: null,
  prediction: null,
  quests: null,
};

const TOPICS = [
  'channel.poll.begin',
	'channel.poll.progress',
	'channel.poll.end',
	'channel.prediction.begin',
	'channel.prediction.progress',
	'channel.prediction.lock',
	'channel.prediction.end',
];

const WEBSOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? 'wss://events.omegastream.tv'
    : 'ws://localhost:8000/events';
const WEBSOCKET_OPTIONS = {
  shouldReconnect: () => true,
};

export default function useMessageCollection(): MessageCollectionHook {
  const { sendMessage, lastMessage, readyState } = useWebSocket(WEBSOCKET_URL, WEBSOCKET_OPTIONS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('WebSocket connection opened');
      const message = buildMessage(MessageCode.SUBSCRIBE, { topics: TOPICS });
      sendMessage(JSON.stringify(message));
      return;
    }

    if (readyState === ReadyState.CLOSED) {
      console.log('WebSocket connection closed');
      setMessages(INITIAL_MESSAGES);
      return;
    }
  }, [readyState]);

  useEffect(() => {
    if (lastMessage) {
      const message = JSON.parse(lastMessage.data);
      const { d: data, mc: code } = message;

      if (code === MessageCode.DISPATCH) {
        console.log(`[${data.topic}]`, data.payload);
        setMessages((msgs) => mergeMessage(msgs, data));
      }
    }
  }, [lastMessage]);

  const connected = readyState === ReadyState.OPEN;
  return [messages, connected];
};
