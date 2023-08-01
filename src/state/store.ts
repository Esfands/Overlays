import { useDispatch as useReduxDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { messageSlice } from './slices';

const store = configureStore({
  reducer: messageSlice.reducer,
});

export const useDispatch: () => typeof store.dispatch = useReduxDispatch;

export default store;
