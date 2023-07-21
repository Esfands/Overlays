import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { OverlayPayload } from '@server/types';

export type MessageState = OverlayPayload | {};

export const messageSlice = createSlice({
  name: 'message',
  initialState: {} as MessageState,
  reducers: {
    set: (state, action: PayloadAction<MessageState>) => action.payload,
  },
});

export const { set: setMessage } = messageSlice.actions;
