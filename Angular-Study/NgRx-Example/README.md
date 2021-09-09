# NgRx Study
> NgRx 공식 문서 따라하기

<br><br>

## @ngrx/store

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
정리필요
selector는 pure function인데 이게 약간 값을 캐싱하는거같은 기능이 있다는거같다? -> memoized value가 있다(MemoizedSelector)
...  createSelector()는 굉장히 다양한 파라미터로 overloading 되어있다.
parameter로 ...Selector, Projector가 받아지는데, ...Selector 에 각각의 return값을 Projector가 parameter로 받아서 하나의 값을 return하게 하는 형태.

Resetting Memoized Selectors
 - selector는 인자가 같으면 기존 memory에 memoized된 값을 그대로 리턴한다(로직수행 x)
 - 초기값 null임
 - memozied 된 값은 계속 남아있는데, 안쓸거면 selector.release()로 제거 가능
 - release()는 recursive하게 상위 selector까지 죄다 release시킨다.

 Using Store Without Type Generic 부터 보자


