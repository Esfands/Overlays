import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MessageState } from '@/util/types';

export const messageSlice = createSlice({
  name: 'message',
  initialState: null as MessageState,
  reducers: {
    setMessage: (state, action: PayloadAction<MessageState>) => action.payload,
  },
});

export const { setMessage } = messageSlice.actions;
