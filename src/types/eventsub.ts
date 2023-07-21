interface BaseEvent {
  id: string;
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  title: string;
  started_at: string;
}

export enum EventStatus {
  BEGIN = 'begin',
  PROGRESS = 'progress',
  LOCK = 'lock',
  END = 'end',
}

interface Predictor<T extends EventStatus> {
  user_id: string;
  user_login: string;
  user_name: string;
  channel_points_won: T extends EventStatus.END ? number : null;
  channel_points_used: number;
}

interface BaseOutcome {
  id: string;
  title: string;
  color: 'pink' | 'blue';
  users: number;
  channel_points: number;
}

export type Outcome<T extends EventStatus> = BaseOutcome &
  (T extends Omit<EventStatus, EventStatus.BEGIN>
    ? { top_predictors: Predictor<T>[] }
    : {});

interface BasePredictionEvent<T extends EventStatus> extends BaseEvent {
  outcomes: Outcome<T>[];
}

export interface PredictionBeginEvent extends BasePredictionEvent<EventStatus.BEGIN> {
  locks_at: string;
}

export interface PredictionProgressEvent
  extends BasePredictionEvent<EventStatus.PROGRESS> {
  locks_at: string;
}

export interface PredictionLockEvent extends BasePredictionEvent<EventStatus.LOCK> {
  locked_at: string;
}

export enum PredictionEndStatus {
  RESOLVED = 'resolved',
  CANCELED = 'canceled',
}

export interface PredictionEndEvent extends BasePredictionEvent<EventStatus.END> {
  winning_outcome_id: string;
  status: PredictionEndStatus;
  ended_at: string;
}

export type PredictionEvent =
  | PredictionBeginEvent
  | PredictionProgressEvent
  | PredictionLockEvent
  | PredictionEndEvent;

interface BasePollEvent extends BaseEvent {
  choices: {
    id: string;
    title: string;
    channel_points_votes: number;
    votes: number;
  }[];
  channel_points_voting: {
    is_enabled: boolean;
    amount_per_vote: number;
  };
}

export interface PollBeginEvent extends BasePollEvent {
  ends_at: string;
}

export interface PollProgressEvent extends BasePollEvent {
  ends_at: string;
}

export enum PollEndStatus {
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
  TERMINATED = 'terminated',
}

export interface PollEndEvent extends BasePollEvent {
  status: PollEndStatus;
  ended_at: string;
}

export type PollEvent = PollBeginEvent | PollProgressEvent | PollEndEvent;
