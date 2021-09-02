# NgRx Study
> NgRx 공식 문서 따라하기

<br><br>

## @ngrx/store
---
## Action
> action은 어플리케이션에서 일어나는 이벤트들을 표현하는 단위이다.

### Action Interface
```
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
  ```
  {
    type: '[Login Page] Login',
    username: string;
    password: string;
  }
  ```
- 이 액션은 로그인 페이지에서 username, password로 로그인을 시도했음을 의미한다.

### Action 작성 원칙

- Upfront
  
  액션을 작성하고 해당 액션을 구현한다. 그렇게하므로써 구현해야 할 내용에 대한 내용에 대한 이해를 공유할 수 있다.

- Divide

  이벤트 소스에 따라 액션을 분리작성한다.
- Many

  액션은 POJO기때문에 작성에 비용이 거의 들지 않는다. 많이 쪼개어 작성하므로서 어플리케이션의 Flow를 자세히 설명할 수 있다. 
- Event-Driven

  ~~해석 안됨.~~
- Descriptive

  Dev tool로 디버깅하는 데 사용할 수 있는 보다 자세한 정보와 함께 고유한 이벤트를 대상으로 하는 컨텍스트를 제공합니다.
<>

### createAction, props, dispatch

아래의 login은 createAction() 함수이다.

```
export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);
```

props메서드는 action 처리에 필요한 추가 메타데이터를 정의하는 데 사용된다. <br>
props는 인자로 {username, password} 형태의 object를 받는다. <br>
login은 component에서 아래와 같은 형태로 dispatch된다.

```
onSubmit(username: string, password: string) {
  store.dispatch(login({ username: username, password: password }));
}
```

 dispatch되면서 아래와 같은 Action구현체를 반환한다.
```
{
  type: '[Login Page] Login',
  username: string;
  password: string;
}
```

[createAction이 나오기 이전 NgRx 7버전에서는 class형태로 Action을 선언해서 class의 constructor로 Action객체를 생성했었다.](https://v7.ngrx.io/guide/store/actions)

<br><br>

## Reducer
정리필요
Featured State 파트 헷갈림
하위모듈에서 StoreModule.forFeature({ some.key : some.value}) 형태로 등록하고 이 모듈을 상위 모듈에 import하는 방식인데 정확한 의미 파익이 필요할듯

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
