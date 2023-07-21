import type { MessageState } from './slices';
import type { OverlayPayload } from '@server/types';
import type { PredictionEvent, PredictionEndEvent } from '@/types/eventsub';

const selectGuaranteedPayload = (state: MessageState) => state as OverlayPayload;

export const selectEventType = (state: MessageState) =>
  selectGuaranteedPayload(state).eventType;
export const selectEvent = (state: MessageState) => selectGuaranteedPayload(state).event;
export const selectOffset = (state: MessageState) =>
  selectGuaranteedPayload(state).offset;
export const selectFormat = (state: MessageState) =>
  selectGuaranteedPayload(state).format;
export const selectEventPayload = (state: MessageState) =>
  selectGuaranteedPayload(state).payload;

export const selectPrediction = (state: MessageState) => {
  const overlayPayload = selectGuaranteedPayload(state);
  const twitchPayload = overlayPayload.payload as PredictionEvent;
  return twitchPayload;
};

export const selectPredictionEnd = (state: MessageState) => {
  const overlayPayload = selectGuaranteedPayload(state);
  const twitchPayload = overlayPayload.payload as PredictionEndEvent;
  return twitchPayload;
};
