## @ngrx/store
> ngrx의 store는 redux에서 영감을 받아, global state management를 제공하는 라이브러리다. action, reducer, selector를 이용하여 상태를 관리한다

![ngrx@store flow](https://ngrx.io/generated/images/guide/store/state-management-lifecycle.png)

---
## Action
> action은 어플리케이션에서 일어나는 이벤트들을 표현하는 단위이다.

<br>

### Action Interface
```typescript
interface Action {
  type: string;
}
```

- 액션은 기본적으로 type property 하나만을 가지는 interface이다.
- type은 액션에 대한 설명인데, Ngrx docs에서 제시하는 작성법은 아래와 같다.
  ```
  **[Source] Event 와 같은 형태이다.**
  ```
- [Auth API] Login Success 로 작성하면, 백앤드 Auth API에서 로그인이 성공적으로 일어났음을 의미한다.
- type외에 properties를 추가할 수 있는데 아래와 같은 형태가 된다.
  ```typescript
  {
    type: '[Login Page] Login',
    username: string;
    password: string;
  }
  ```
- 이 액션은 로그인 페이지에서 username, password로 로그인을 시도했음을 의미한다.

<br>

### Action 작성 원칙

- Upfront => 액션을 작성하고 해당 액션을 구현한다. 그렇게하므로써 구현해야 할 내용에 대한 내용에 대한 이해를 공유할 수 있다.
- Divide => 이벤트 소스에 따라 액션을 분리작성한다.
- Many => 액션은 POJO기때문에 작성에 비용이 거의 들지 않는다. 많이 쪼개어 작성하므로서 어플리케이션의 Flow를 자세히 설명할 수 있다. 
- Event-Driven => ~~해석 안됨.~~
- Descriptive => Dev tool로 디버깅하는 데 사용할 수 있는 보다 자세한 정보와 함께 고유한 이벤트를 대상으로 하는 컨텍스트를 제공합니다.

<br>

### createAction, props, dispatch

아래의 login은 createAction() 함수이다.

```typescript
export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);
```

props메서드는 action 처리에 필요한 추가 메타데이터를 정의하는 데 사용된다. <br>
props는 인자로 {username, password} 형태의 object를 받는다. <br>
login은 component에서 아래와 같은 형태로 dispatch된다.

```typescript
onSubmit(username: string, password: string) {
  store.dispatch(login({ username: username, password: password }));
}
```

 dispatch되면서 아래와 같은 Action구현체를 반환한다.
```typescript
{
  type: '[Login Page] Login',
  username: string;
  password: string;
}
```

[createAction이 나오기 이전 NgRx 7버전에서는 class형태로 Action을 선언해서 class의 constructor로 Action객체를 생성했었다.](https://v7.ngrx.io/guide/store/actions)

<br><br>

--- 
<!-- TODO : 잘 이해한건지 모르겠다 써보다 다시 정리해야 할 수 있음 -->
## Reducer
> Reducer는 <u>**dispatch되는 Action의 타입에 따라 State를 조작**</u>한다.

<br>

### 특징
 - <u>**Pure Function**</u> ~~이다.~~ 이어야 한다. -> Input이 같으면 Output이 같고 부수효과가 없다.
 - <u>**Synchronous**</u>하게 동작한다.
 - reducer는 인자로 state와 action을 받는다.

<br>

### 사용하기

Reducer함수 생성 전 필요한 내용
 - state interface
 - initial state
 - actions

 action는 createAction 함수를 이용해 액션의 의도가 잘 드러나게 만든다. 

  ```typescript
    // Action
    import { createAction, props } from '@ngrx/store';

    export const homeScore = createAction('[Scoreboard Page] Home Score');
    export const awayScore = createAction('[Scoreboard Page] Away Score');
    export const resetScore = createAction('[Scoreboard Page] Reset Score');
    export const setScore = createAction('[Scoreboard Page] set Score', props<{game: Game}>);    
  ```
  각각 홈팀 점수 + 1, 원정팀 점수 + 1, 점수 초기화, 홈+원정팀 점수 한번에 셋팅하는 액션이다. <br>
  
  reducer는 action과 비슷하게 createReducer() 함수를 이용해 만들 수 있다.

  ```typescript
  // Reducer

  import { Action, createReducer, on } from '@ngrx/store';
  import * as ScoreboardPageActions from '../actions/scoreboard-page.actions';
  
  export interface State {
    home: number;
    away: number;
  }  

  // Initial State
  export const initialState: State = {
    home: 0,
    away: 0
  }

  const scoreboardReducer = createReducer(
    initialState,
    on(ScoreboardPageActions.homeScore, state => ({...state, home: state.home + 1})),
    on(ScoreboardPageActions.awayScore, state => ({...state, away: state.away + 1})),
    on(ScoreboardPageActions.resetScore, state => initialState,
    on(ScoreboardPageActions.setScore, (state, { game }) => ({home : game.home, away: game.away})),
  )

  export function reducer(state: State | undefiened, action : Action) {
    return scoreboardReducer(state, action);
  }

  ```
  createReducer DOM 이벤트 처리하는 함수와 비슷하게 함수 내에 on()으로 원하는 액션에 대한 state change처리를 정의 할 수 있다. Action의 해석하지 못한 Event-Driven이 이 말이었을까? 암튼 setScore 액션처럼 props로 인자를 넘겨주는 액션을 처리할 수 있다. <br>

  **reducer는 Pure Function이기 때문에 state의 객체를 새로 만드는 방식으로 이뤄진다.**

<br>

### Store 모듈에 등록

StoreModule을 AppModule에 import 할때, StoreModule.forRoot()의 인자로 리듀서를 등록한다.

```typescript
// AppModule

import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromScoreboard from './reducers/scoreboard.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({ game: fromScoreboard.reducer })
  ],
})
export class AppModule {}

```

StoreModule.forRoot()의 첫번째 인자 타입은 reducer로 타입은 ActionReducerMap<T, V> | InjectionToken<ActionReducerMap<T, V>> 이고, 그냥 { key: value } 형태로 넣어주면 된다.<br>
RootModule에 등록하지 않고 feature module로 등록할 수도 있다.


```typescript
// AppModule
...

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    ScoreboardModule,
  ]

...

```

```typescript
//scoreboard reducer
export const scoreboardFeatureKey = 'game';
```

```typescript
// ScoreBoard Module
...
@NgModule({
  imports: [
    StoreModule.forFeature(fromScoreboard.scoreboardFeatureKey, fromScoreboard.reducer)
  ],
...

```

하위 모듈에 등록시 StoreModule.forFeature()로 등록해야한다. 첫벗째 인자는 string 타입의 featureName인데, 추후 호출 등에서도 에러를 방지하기 위해 추상화하는것이 좋다.
두번째 인자는 reducer로 타입은 ActionReducerMap<T, V> | InjectionToken<ActionReducerMap<T, V>> 로 단일/복수의 reducer를 등록할 수 있다. <br>

featureModule로 등록하면 ScoreBoardModule이 로딩될 때 reducer가 로딩되고 game의 state가 {home: 0, away: 0}으로 초기화 될 것이다.<br>
LazyLoading Module에 등록하면 해당 feature Store의 Reducer와 State도 LazyLoading될 것이다.

<br>

### Meta Reducer
> Meta Reducer는 Action - Reducer 사이에서 hook으로 동작하는 Reducer로, Action이 일반 Reducer를 호출하기 전 pre-processing하는데 사용된다.

MetaReducer 타입의 정의는 아래와 같은 형태다
```typescript
export declare type MetaReducer<T = any, V extends Action = Action> = (reducer: ActionReducer<T, V>) => ActionReducer<T, V>;

```
즉 인자로 ActionReducer를 받아 다시 ActionReducer를 반환하는것이다. reducer는 (state, action) => state 형태의 함수고, 따라서 reducer를 받을 때 state의 처리가 가능하다. <br>

MetaReducer의 사용 예를 들자면 아래의 경우를 생각해 볼 수 있다.
- 개발중 편의를 위해 모든 dispatch되는 action과 그 때의 state를 로그에 찍고싶다.
- logout시 전체 state를 undefined로 만들고 싶다.

<br> 

1. 모든 action의 로그를 찍는 meta-reducer

```typescript

// AppModule

... 

// reducer를 받아 로그를 찍고 reducer를 반환하는 MetaReducer를 정의
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
 
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<unknown>[] = [debug];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers })
  ],

...

```

위와 같이 개별 Meta-Reducer를 정의하고, metaReducers라는 MetaReducer의 배열에 넣는다.<br>

StoreModule.forRoot()의 두번째 인자 config에 { metaReducers: metaReducers }로 등록해주면 모든 Action의 로그를 찍는 metaReducer가 등록된다.

<br>

2. logout시 전체 state를 undefined로
```ts
// UserActions

...
// 로그아웃 액션
export const logOut = createAction('[UserPage] LogOut')
...



// AppModule

// reducer를 받아 로그를 찍고 reducer를 반환하는 MetaReducer를 정의
export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    // 액션의 타입이 로그아웃 액션 타입이면 실행한다.
    if(action.type === '[UserPage] LogOut') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<unknown>[] = [clearState];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers })
  ],


```

action.type으로 정의해둔 action type을 검사해 logout 액션에 대해 state를 undefined로 초기화 하는 metaReducer이다. 어려울 건 없다.

참고자료 : https://medium.com/@yeon22/ngrx-meta-reducer-565c1799d5f5 

<br><br>

---

## Selector
> Selector는 Store의 state를 가져오기 위한 Pure Function이다.

NgRx에서 action, reducer로 상태를 변화시켰다면, 결국 그 상태는 가져와서 사용되어져야 한다.<br>
상태를 읽을 때, 상태의 변화를 일으키는 부수효과가 없어야 하는데, 그렇기때문에 pure function인 selector를 사용한다.

Selector는 아래와 같은 특징이 있다. 아래 특징을 점진적으로 다뤄본다.
- Portability
- Memoiztaion 
- Composition
- Testability
- Type Saftey

우선 Selector는 아래와 같이 정의된다.

```ts
export declare type Selector<T, V> = (state: T) => V;
```

즉 state를 받아 state의 조각을 반환하는, 일종의 mapping function이다. 아래와 같이 store의 select()함수의 인자로 사용된다. 

```ts
// book.selector
export const selectBooks = (state: AppState) => state.books;


// Component
import selectBooks from './book.selector'

books$ = this.store.select(selectBooks);

constructor(store: Store) {}

```

selector는 (state: T) => V 를 구현해서 만들었다. <br>
Store는 Observable의 구현체이기도 해서, RxJs의 Observable pipe chaining을 통해 아래와 같은 방법으로도 select를 할 수 있다.


```ts
import { selectBooks } from './book.selector'
import { select } from '@ngrx/store';

books$ = this.store.pipe(
  select(selectBooks)
);

constructor(store: Store) {}

```
select()는 @ngrx/store에서 제동하는 static method인데, rxjs operators의 map()과 같다고 봐도 무방할듯하다.
<br><br>

위 케이스는 단순히 전역 State에서 하나의 property를 가져오는 단순한 경우지만, 일반적으로 애플리케이션의 복잡한 전역 상태에서 원하는 상태를 뽑을 땐 property를 가져와 가공하는 경우가 많을 것이다. 이 과정에 복잡한 연산이 추가될 수도 있다.<br>
이런 복잡한 연산을 위해 MemoizedSelector가 존재하고, action, reducer와 비슷하게 **createSelector()** 함수를 이용해 생성한다.

```ts
export declare function createSelector<State, S1, Result>(s1: Selector<State, S1>, projector: (s1: S1) => Result): MemoizedSelector<State, Result>;

```
위 함수는 각각 1개의 selector와 projector를 인자로 받는 createSelector 함수이다.

createSelector는 여러개의 인자로 최대 8개의 selector를 받고, 이를 <u>**Memoization**</u>을 이용해 체이닝하여 연산하게 한다. Memoiztaion은 Dynamic Programming에 나오는 내용이니 해당 내용을 참고해보자. 


아래 코드를 살펴보자

```ts
import { createSelector } from '@ngrx/store';
 
export interface User {
  id: number;
  name: string;
}
 
export interface Book {
  id: number;
  userId: number;
  name: string;
}
 
export interface AppState {
  selectedUser: User;
  allBooks: Book[];
}
 
export const selectUser = (state: AppState) => state.selectedUser;
export const selectAllBooks = (state: AppState) => state.allBooks;
 
export const selectVisibleBooks = createSelector(
  selectUser,
  selectAllBooks,
  (selectedUser: User, allBooks: Book[]) => {
    if (selectedUser && allBooks) {
      return allBooks.filter((book: Book) => book.userId === selectedUser.id);
    } else {
      return allBooks;
    }
  }
);
```

(전역)State인 AppState는 선택된 user와 전체 책 목록을 가지고 있다. 여기서 선택된 user에 맵핑된 책만 뽑고 싶다면?<br>

1. selecUser Selector로 selectedUser를 가져온다.
2. selectAllBooks Selector로 전체 allBooks를 가져온다.
3. 두 Selector를 인자로 받는 selectVisibleBooks는 allBooks에서 user의 아이디와 맵핑된 책만 filter해서 반환한다. filter함수는 새로운 객체를 생성하므로, Selector는 pure하다.

MemoizedSelector인 selectVisibleBooks는 최종 결과를  **메모리에 저장해놓는다.** 이것이 Memoization이다.
위 코드에서 세번째 인자는 selector와 비슷하지만, projector이다. 두개의 selector와 1개의 projector를 인자로 받는 createSelecor의 정으를 살펴보면

```ts
export declare function createSelector<State, S1, S2, Result>(
  s1: Selector<State, S1>, 
  s2: Selector<State, S2>, 
  projector: (s1: S1, s2: S2) => Result): MemoizedSelector<State, Result>;
```

projector는 첫번째 셀렉터와 두번째 셀렉터의 결과를 받아 마지막에 원하는데로 짬뽕시키는 역할을 하는 것이다.

memoization은 퍼포먼스에 좋은 부분이 있는데, 위에선 selectVisibleBooks 이 때 자신의 호출에 대한 최신 결과값을 기억해놨다가, <u>**같은 인자로 다시 selector가 호출되면 다시 연산하지 않고 memoized된 값을 return한다.**</u>

따라서 select연산이 클수록 memoization의 성능 기여가 클 것이다.

<br>

### Feature Selector

특별한 연산 없이, state에서 특정 key의 state를 select하고 싶을때가 있을것이다. 이 때, createFeatureSelector() 함수를 사용하면 간편하게 만들 수 있다. 아래 코드를 보자.

```ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
 
export const featureKey = 'feature';
 
export interface FeatureState {
  counter: number;
}
 
export interface AppState {
  feature: FeatureState;
}
 
export const selectFeature = createFeatureSelector<AppState, FeatureState>(featureKey);
 
export const selectFeatureCount = createSelector(
  selectFeature,
  (state: FeatureState) => state.counter
);

```
Appstate에 feature란 key로 FeatureState 타입의 partial state가 존재한다. 별다른 연산은 없고 이걸 select하고싶은것이다. 이 때 간편하게 createFeatureSelector()를 사용하게 되는데, 정의를 보자.

```ts
export declare function createFeatureSelector<T, V>(featureName: keyof T): MemoizedSelector<T, V>;
```
T는 Appstate였고, 인자로 넘겨준 featurekey는 Appstate의 key중 하나다. 우리가 얻고싶은 V는 Appstate.feature의 타입인 FeatureState이다. 결과로 createSelector()와 마찬가지로 MemoizedSelector 를 내뱉는다!


### Resetting Memoized Selectors

Selector의 Memoization은 연산한 값을 저장해 재사용할 수 있어 성능상 이점이 있다. 캐시같은 역할이다. 그런데, 이 메모리는 따로 정리하지 않는 한 계속 메모리에 남아 있는다. 수동으로 reset할 수 있는 방법이 있는데 Selector의 release() 함수이다.

앞서 보았듯 selector는 여러 MemoizedSelector를 인자로 받을 수 있는데, 하나하나 reset하는것은 귀찮은일 일 것이다. 그래서인지 NgRx는 하위 셀렉터에서 release()를 호출하면 내부적으로 연관된 상위 MemoizedSelector까지 모두 reset해준다. 아래는 이를 보여주는 코드다.

```ts
export interface State {
  evenNums: number[];
  oddNums: number[];
}
 
export const selectSumEvenNums = createSelector(
  (state: State) => state.evenNums,
  evenNums => evenNums.reduce((prev, curr) => prev + curr)
);
export const selectSumOddNums = createSelector(
  (state: State) => state.oddNums,
  oddNums => oddNums.reduce((prev, curr) => prev + curr)
);

// 최하위 셀렉터
export const selectTotal = createSelector(
  selectSumEvenNums,
  selectSumOddNums,
  (evenSum, oddSum) => evenSum + oddSum
);
 
// selector가 호출되며 연관된 selector들 역시 값을 memoize 한다.
selectTotal({
  evenNums: [2, 4],
  oddNums: [1, 3],
});
 
/**
 * selectTotal.release() 하기 전의 memoized value
 *   selectSumEvenNums  6
 *   selectSumOddNums   4
 *   selectTotal        10
 */
 
selectTotal.release();
 
/**
 *   모두 깔끔하게 정리된다.
 *   selectSumEvenNums  null
 *   selectSumOddNums   null
 *   selectTotal        null
 */

```
<br>

### 응용 - 상태 변화 추적

상태변화를 추적하고 싶을 경우가 있다. 예를들어 특정 이벤트가 발생하여 state가 변경되는 경우, 최근 몇번 전까지의 state를 추적하고 싶은 경우를 생각해보자.

이 때, RxJs의 operator들을 이용해 이를 구현할 수 있다.

```ts

// bookCollection을 조회하는 selector
export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books: Array<Book>, collection: Array<string>) => {
    return collection.map((id) => books.find((book) => book.id === id));
  }
);

// selectBookCollection가 일어날 때, 상태추적 할 수 있는 pipe라인이다.
export const selectLastStateTransitioins = (
  count: number
): OperatorFunction<unknown, unknown> => {
  return pipe(
    select(selectBookCollection), 
    tap((book) => console.log('transition : ', book)),
    // scan연산자는 이전의 상태를 기억할 수 있다.
    scan((acc, curr) => {
      return [curr, ...acc].filter(
        (val, index) => index < count && val !== undefined
      );
    }, [] as Book[]) // scan()의 seed에 type을 정의해줌으로서 type safe 하게 사용할 수 있다.
  );
};
```

위에서 selectLastStateTransitioins는 최근 몇번의 상태변화를 추적할지 count를 인자로 받아 OperatorFunction(pipe의 parameter)을 return하는 함수이다.

```ts
// Component

constructor(private store: Store) {}

this.store
  .pipe(selectLastStateTransitioins(3))
  .pipe(takeUntil(this.unsubscriber))
  .subscribe((res) => console.log(res));

ngOnDestroy(): void {
  this.unsubscriber.next();
  this.unsubscriber.complete();
}  
```
위와 같이 store.pipe()의 인자에 selectLastStateTransitioins(3) 을 넣으면 최근 3개까지의 상태변화를 추적하게된다.<br>
컴포넌트가 제거될 때 unsubscribe할 수 있게 처리한다.

