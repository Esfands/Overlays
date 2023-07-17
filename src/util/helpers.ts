import type { MessageCode, WebSocketMessage } from './types';

export function buildMessage(code: MessageCode, data: any): WebSocketMessage {
  return {
    d: data,
    mc: code,
    t: Date.now(),
  };
}
