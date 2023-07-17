import { MessageBody } from '@/util/types';

export const selectMessage = (state: MessageBody) => state;
export const selectPayload = (state: MessageBody) => state.payload.payload;
