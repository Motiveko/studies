/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionCreator, createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export const initialState = 0;

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  on(reset, (state) => 0)
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function counterReducer(state: any, action: ActionCreator): number {
  return _counterReducer(state, action);
}
