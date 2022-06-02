import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

// createSlice 내부에 정의한 reducer에 맞춰 Action creators가 만들어 진다.
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
