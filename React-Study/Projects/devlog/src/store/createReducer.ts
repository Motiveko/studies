/* eslint-disable default-param-last */
import produce from "immer";
import { PayloadAction } from ".";

export default function createReducer<T>(
  initialState: T,
  handlerMap: {
    [key: string]: (state: T, action: PayloadAction) => void
  },
) {
  return (state: T = initialState, action: PayloadAction) => produce(state, (draft: T) => {
    const handler = handlerMap[action.type];
    if (handler) {
      handler(draft, action);
    }
  });
}
