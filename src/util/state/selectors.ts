import { MessageBody } from '../types';

export const selectMessage = (state: MessageBody) => state;
export const selectTopic = (state: MessageBody) => state.topic;
export const selectPayload = (state: MessageBody) => state.payload;
