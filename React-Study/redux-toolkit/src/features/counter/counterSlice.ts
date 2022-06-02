import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // initialState의 타입을 정의했기 때문에 리듀서 함수의 state 인자의 타입을 인지한다.
    increment: (state) => { 
      // immerjs의 produce를 내부적으로 사용하고 있어서, mutating 로직을 작성하면 알아서 immutable하게 업데이트한다.
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
})

/* 
  createSlice 내부에 정의한 reducer에 맞춰 Action creators가 만들어 진다.
  반환값은 마찬가지로 reducer 인자에 정의한 action 타입인 PayloadAction<T>를 반환한다. action 안썼으면 PayloadAction<undefined>
*/
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
