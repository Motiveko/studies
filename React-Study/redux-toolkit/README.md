# Redux Toolkit
[Redux Toolkit 공식 튜토리얼](https://redux-toolkit.js.org/tutorials/overview)따라하기

## Quick Start
- API Reference 정리하는걸로 대체

<br>

## Typescript Quick Start
### Define Root State and Dispatch Types
- RootState 타입은 `ReturnType`을 이용해서 동적으로 만들자.
```ts
// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
```


### Define Typed Hooks
- `useSelector`훅의 typed version을 만들면 매 훅마다 `(state: RootState)`를 안써도 된다.(어차피 selector를 reselect를 이용해 재정의 할것이지만 여기서도 루트 셀렉터의 반복을 줄일수있다.)
```ts
// app/hooks.ts
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from './store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```
- `useDispatch`훅도 타입을 만드는데, 이건 `redux-thunk`를 쓸 때 쓰는것인듯하다.

<br>

