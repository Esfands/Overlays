import { MessageCode, MessageCollection, WebSocketMessage } from './types';

export function buildMessage(code: MessageCode, data: any): WebSocketMessage {
  return {
    d: data,
    mc: code,
    t: Date.now(),
  };
}

export function mergeMessage(collection: MessageCollection, data: any): MessageCollection {
  let shortTopic: string = data.topic.replace(/\.\w+$/, '');

  if (shortTopic.startsWith('channel')) {
    shortTopic = shortTopic.replace('channel.', '');
  }

  return Object.assign({}, collection, {
    [shortTopic]: data,
  });
}
