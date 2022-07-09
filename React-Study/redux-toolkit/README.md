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

<br>


### [CreateEntityAdaptor](https://redux-toolkit.js.org/api/createEntityAdapter)
- [`@ngrx/entity`](https://ngrx.io/guide/entity)를 포팅하고 이걸 좀 개조해서 만든거라고 한다. 상태의 CRUD에 대한 boilerplate 코드를 줄이고, 퍼포먼스 향상등을 해준다.
- `Entity` 타입의 데이터 객체 `entity`는 고유한 식별자를 가진다고 가정한다. (예를들어 사용자 데이터를 처리한다고 할 때 한명 한명 데이터 타입 -> User(Entity), 실제 객체는 user(entity) 이런식으로 보면 된다)
- 간단한 사용법은 아래와 같다.
```ts
import { configureStore, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

type Book = {
  bookId: string; // 식별자
  title: string;
}

// 1
const booksAdapter = createEntityAdapter<Book>({
  // 객체에서 어떤 값이 식별자인지 알려준다.
  selectId: (book) => book.bookId,
  // ID 배열이 sortComparer에 따라 정렬된다.
  sortComparer: (a, b) => a.title.localeCompare(b.title)
});

// 2
const bookSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(), // { ids: [], entities: {} }
  reducers: {
    bookAdded: booksAdapter.addOne, // adapter function을 그대로 reducer에 전달하는 케이스
    booksReceived(state, action) {
      // adapter function을 mutating helper로 사용하는 케이스
      booksAdapter.setAll(state, action.payload.books);
    }
  }
});

const store = configureStore({
  reducer: {
    books: bookSlice.reducer
  }
})

type RootState = ReturnType<typeof store.getState>

console.log(store.getState().books);
// { ids: [], entities: {} }

// 3
// Can create a set of memoized selectors based on the location of this entity state
const booksSelectors = booksAdapter.getSelectors<RootState>(
  (state) => state.books
)
```
- 설명은 아래와 같다.
    1. `createEntityAdapter()`메서드를 이용해 `adapter`를 생성한다. 엔티티 타입(Entity)을 제네릭으로 전달하고, 아래 두 개 인자를 전달한다.
        - `selectId` : 해당 객체에서 어떤 값이 식별자인지를 전달하는 함수
        - `sortComparer?`: 상태 결과에 `ids 배열` 생성시, id를 정렬할 기준이 되는 comparator 함수. 전달시 상태에 CRUD를 수행할 때마다 상태의 ids는 이를 기준으로 항상 정렬된다.

    2. `booksAdapter.getInitialState()`로 초기 상태를 가져올 수 있다. 빈 상태로 `{id: string, entities: {}}`이 된다.
    3. adapter 객체는 selector도 제공한다. reselect 처럼 `memoized selector`이다.

<br>

- `createEntityAdapter()`와 반환값인 `adapter`에 대해 좀 더 상세히 알아보자. 전체 타입은 아래와 같다.
```ts
export declare function createEntityAdapter<T>(options?: {
    selectId?: IdSelector<T>;
    sortComparer?: false | Comparer<T>;
}): EntityAdapter<T>;

// =============== adapter ===============
export interface EntityAdapter<T> extends EntityStateAdapter<T> {
    selectId: IdSelector<T>;
    sortComparer: false | Comparer<T>;
    getInitialState(): EntityState<T>;  // 초기값
    getInitialState<S extends object>(state: S): EntityState<T> & S;  // 4
    getSelectors(): EntitySelectors<T, EntityState<T>>;
    getSelectors<V>(selectState: (state: V) => EntityState<T>): EntitySelectors<T, V>;
}

// =============== 1. CRUD ===============
export interface EntityStateAdapter<T> {
    addOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: T): S;
    addOne<S extends EntityState<T>>(state: PreventAny<S, T>, action: PayloadAction<T>): S;
    addMany<S extends EntityState<T>>(state: PreventAny<S, T>, entities: readonly T[] | Record<EntityId, T>): S;
    addMany<S extends EntityState<T>>(state: PreventAny<S, T>, entities: PayloadAction<readonly T[] | Record<EntityId, T>>): S;
    setOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: T): S;
    setOne<S extends EntityState<T>>(state: PreventAny<S, T>, action: PayloadAction<T>): S;
    setMany<S extends EntityState<T>>(state: PreventAny<S, T>, entities: readonly T[] | Record<EntityId, T>): S;
    setMany<S extends EntityState<T>>(state: PreventAny<S, T>, entities: PayloadAction<readonly T[] | Record<EntityId, T>>): S;
    setAll<S extends EntityState<T>>(state: PreventAny<S, T>, entities: readonly T[] | Record<EntityId, T>): S;
    setAll<S extends EntityState<T>>(state: PreventAny<S, T>, entities: PayloadAction<readonly T[] | Record<EntityId, T>>): S;
    removeOne<S extends EntityState<T>>(state: PreventAny<S, T>, key: EntityId): S;
    removeOne<S extends EntityState<T>>(state: PreventAny<S, T>, key: PayloadAction<EntityId>): S;
    removeMany<S extends EntityState<T>>(state: PreventAny<S, T>, keys: readonly EntityId[]): S;
    removeMany<S extends EntityState<T>>(state: PreventAny<S, T>, keys: PayloadAction<readonly EntityId[]>): S;
    removeAll<S extends EntityState<T>>(state: PreventAny<S, T>): S;
    updateOne<S extends EntityState<T>>(state: PreventAny<S, T>, update: Update<T>): S;
    updateOne<S extends EntityState<T>>(state: PreventAny<S, T>, update: PayloadAction<Update<T>>): S;
    updateMany<S extends EntityState<T>>(state: PreventAny<S, T>, updates: ReadonlyArray<Update<T>>): S;
    updateMany<S extends EntityState<T>>(state: PreventAny<S, T>, updates: PayloadAction<ReadonlyArray<Update<T>>>): S;
    upsertOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: T): S;
    upsertOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: PayloadAction<T>): S;
    upsertMany<S extends EntityState<T>>(state: PreventAny<S, T>, entities: readonly T[] | Record<EntityId, T>): S;
    upsertMany<S extends EntityState<T>>(state: PreventAny<S, T>, entities: PayloadAction<readonly T[] | Record<EntityId, T>>): S;
}


// =============== 2. 상태 ===============
export interface EntityState<T> {
    ids: EntityId[];
    entities: Dictionary<T>;
}

export interface Dictionary<T> extends DictionaryNum<T> {
    [id: string]: T | undefined;
}

// =============== 3. 셀렉터 ===============
export interface EntitySelectors<T, V> {
    selectIds: (state: V) => EntityId[];
    selectEntities: (state: V) => Dictionary<T>;
    selectAll: (state: V) => T[];
    selectTotal: (state: V) => number;
    selectById: (state: V, id: EntityId) => T | undefined;
}
```

1. `EntityAdapter`가 상속하는 `EntityStateAdapter`는 리듀서에서 쓸 수 있는 [`CRUD 메서드`](https://redux-toolkit.js.org/api/createEntityAdapter#crud-functions)를 제공한다. 이 메서드를 사용해서 ***리듀서에 CRUD 로직을 작성할 때 발생하는 반복적인 boilerplate를 줄일 수 있다.*** 이름이 직관적인데 좀 햇갈리는건 아래와 같다.
    - `addOne`, `addMany`: 새로운 엔티티를 추가하는데, 추가하는 엔티티에 뭔가 하지 않는다.
    - `setOne`, `setMany`: 예전 엔티티를 새로운 엔티티로 교체한다. ***새 엔티티에 없는 property는 다 지워진다.***
    - `upsertOne`, `upsertMany`: `병합`형태로 새 엔티티를 추가한다. ***새 항목을 다 넣고, 거기에 없는 이전 엔티티의 propery는 `shallow copy`한다.***
<br>

2. 상태값인 `EntityState`는 식별자의 배열인 ids와 entity 객체의 `Dictionary`를 가진다. `Dictionary`는 id를 키로 가지는 객체로 id로 검색할 때 시간복잡도 O(1)로 검색 가능하다.(성능++)

<br>

3. `getSelectors()`는 `EntitySelectors`타입 객체를 반환하고, 간단한 [`Selector Functions`](https://redux-toolkit.js.org/api/createEntityAdapter#selector-functions)들을 제공한다. 내부적으로 `reselct`의 `createSelector()`를 사용하므로, memoization 기능을 제공한다. `getSelectors`함수는 두가지 사용법이 있다.
    ```ts
    // 두가지 타입의 getSelectors
    export interface EntityAdapter<T> extends EntityStateAdapter<T> {
      // ...
      getSelectors(): EntitySelectors<T, EntityState<T>>;
      getSelectors<V>(selectState: (state: V) => EntityState<T>): EntitySelectors<T, V>;
    }
    ```
  - 둘의 사용상 차이는 아래와 같단다.
    ```ts
    const simpleSelectors = booksAdapter.getSelectors();
    const globalizedSelectors = booksAdapter.getSelectors<RootState>(
      (state) => state.books
    )

    // 1. 일반 셀렉터, books reducer 의 상태를 가져오는 방법을 알려줘야한다.
    const ids1 = simpleSelectors.selectIds(store.getState().books);

    /**  
      2. globalizedSeletor, 제네릭으로 rootstate 타입을 전달했고, 컬렉션 가져오는법을 getSelector 인자로 알려줬다.
      rootstate를 인자로 전달하면 알아서 books 컬렉션을 가져온다.
    */
    const ids2 = globalizedSelectors.selectIds(store.getState());
    ```

<br>

4. [`getInitialState()`](https://redux-toolkit.js.org/api/createEntityAdapter#getinitialstate)는 초기 상태값을 반환하기도 하고, 추가 상태를 전달해 상태값을 변경할 수 기도 하다. ***상태값은 단순히 데이터 컬렉션만 있는게 아니라 `isloading`, `isEmpty` 등 다양한 상태값들이 존재할 수 있기 때문이다.***
```ts
const bookSlice = createSlice({
  name: 'books',
  // 제네릭으로 타입을 전달하고, 인자로 초기값을 전달하면 된다. createSlice는 이를 인식해서 state타입에 해당내용을 반영한다.
  initialState: booksAdapter.getInitialState<{isLoading: boolean}>({
    isLoading: true,
  }),
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  }
});
```
