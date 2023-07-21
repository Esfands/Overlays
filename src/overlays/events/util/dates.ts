import type { PollEvent, PredictionEvent } from '@/types/eventsub';

export type EventDates = {
  start: Date;
  end: Date;
};

export function getDates(payload: PredictionEvent | PollEvent): EventDates {
  let endDate;

  if ('locks_at' in payload) {
    endDate = payload.locks_at;
  } else if ('locked_at' in payload) {
    endDate = payload.locked_at;
  } else if ('ends_at' in payload) {
    endDate = payload.ends_at;
  } else {
    endDate = payload.ended_at;
  }

  return {
    start: new Date(payload.started_at),
    end: new Date(endDate),
  };
}
