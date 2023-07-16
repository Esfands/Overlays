import { useDispatch as useReduxDispatch } from 'react-redux';
import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import { MessageState } from '../types';

const slice = createSlice({
  name: 'message',
  initialState: null as MessageState,
  reducers: {
    set: (state, action: PayloadAction<MessageState>) => action.payload,
  },
});

const store = configureStore({
  reducer: slice.reducer,
});

export const { set: setMessage } = slice.actions;
export const useDispatch: () => typeof store.dispatch = useReduxDispatch;

export default store;
