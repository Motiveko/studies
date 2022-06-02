import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
// thunk 사용시 필요한 내용
// export type AppDispatch = typeof store.dispatch;