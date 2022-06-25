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


- [Redux - Hot Reloading](https://ko.redux.js.org/usage/configuring-your-store/#hot-reloading): 리듀서 변경시 보통 webpack등의 번들러에 의해 앱 전체가 리로딩 되고 저장되어 있던 상태값은 모두 날아간다. Hot Reloading 설정을 해주면 리듀서 변경시 웹팩등 번들러에 앱 전체를 변경하지 않도록 알려줘 리듀서 부분만 업데이트 되어 스토어에 저장된 상태값은 그대로 남아있게 해 개발하기 편해진다. 신기한기능.

- [`createSlice`]()는 리덕스의 덕 패턴을 구현한것 과 같다. `createAction()`, `createReducer()`함수를 합친거라고 보면 된다.
```js
const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    createPost(state, action) {},
    updatePost(state, action) {},
    deletePost(state, action) {},
  },
})

const { actions, reducer } = postsSlice

// action creator 함수들 posts/createPost 같은 형태의 액션타입을 가진다.
export const { createPost, updatePost, deletePost } = actions

export default reducer
```
- 이렇게 만든 slice의 `action creator`들은 각각 `{SLICE_NAME}/{ACTION_TYPE}`의 타입을 가지는 액션을 만든다. 이렇게 만들면 state의 slice는 해당 액션에만 반응하게 된다.
- 그런데 로그아웃시 상태 제거와 같이 외부 액션에 대해서도 리듀서가 상태를 변경해야 할 때도 있다. 이 때 `createSlice`의 [`extraReducers`](https://redux-toolkit.js.org/api/createSlice#the-extrareducers-builder-callback-notation)를 사용해서 외부 액션에도 반응하게 할 수 있다.