# Redux-Saga 발표 유투부 정리
[링크] https://www.youtube.com/watch?v=UxpREAHZ7Ck&t=1209

<br>

## 1. Effect
- `effect`는 자바스크립트 객체로서, redux-saga의 동작을 정의해놓았다. [`Effect creator`](https://redux-saga.js.org/docs/api#effect-creators)에 의해 만들어지고, Middleware에서 읽어서 부수효과 처리 동작을 수행하게 된다.

- Effect를 yield하면 Middleware에서 처리가 끝날때까지 기다려야 할까?
  - saga에서는 [effect 생성 함수를 `Blocking`과 `Non-blocking`으로 나누는데](https://redux-saga.js.org/docs/api/#blocking--non-blocking) blocking이면 미들웨어에서 처리가 끝날 때 까지 기다리고, non-blocking이면 기다리지 않는다.
  - 아래는 `blocking` - `non-blocking` effect 생성 함수에 대한 간단한 예다.
```js
function* saga() {
  yield take(ACTION); // blocking, 원하는 액션이 발생할 때 까지 기다린다.
  yield call(ApiFn, ...args); // blocking, Api 처리 완료까지 기다린다.
  
  yield put(action);  // Non-blocking, 액션을 발생시킨다.
  const task = yield fork(otherSaga, ...args);  // Non-blocking, 다른 사가의 동작을 기다리지 않는다.

  yield cancel(task); // Non-blocking, 즉시 태스크를 중지시키고 넘어간다. 

  yield join(task); // Blocking: 테스크 종료를 기다린다.
}

```

<br>

## 2. 채널
- Websocket과 같은 `외부 이벤트`를 어떻게 saga에 연결시킬 것인가?
  - Websocket/Event : `Push`방식
  - Saga(take) : `Pull`방식
![saga-channel-concept-1](https://velog.velcdn.com/images/motiveko/post/4e6c9d6d-d8f1-4f6a-aa93-bd8e102e06a2/image.png)
![saga-channel-concept-2](https://velog.velcdn.com/images/motiveko/post/1de40762-a87f-488e-ae1a-fd994a0b5690/image.png)

![saga-channel-concept-3](https://velog.velcdn.com/images/motiveko/post/63da9516-72ab-4f89-934b-4485eddac93d/image.png)
- 액션이 `put`을 통해 채널에 액션을 전달한다.
- 실질적인 처리를 하는 사가 함수(process)는 `take`를 통해 데이터를 가져와 effect를 생성한다.
- 참고로 Redux의 액션도 Saga내부의 채널을 통해 전달한다.
```js
function sagaMiddleware({getState, dispatch}) {
  return next => action => {
    // 1. 액션을 리듀서로 먼저 보낸다. (아마 무시된다.)
    const result = next(action);

    // 2. saga에 액션이 Dispatch 됐음을 알린다.
    sagaStdChannel.put(action);
    return result;
  }
}
```

- 사가 사용 이유 -> 여러가지 경우에 사용할 수 있는 Effect 생성 함수를 제공한다.
  - case1: 두가지 메뉴를 빠르게 번갈아가며 클릭할 때 한개만 존재하는 컨텐츠 컴포넌트에 올바른 메뉴의 리스트가 나올것을 확신할 수 있는가? -> 구현이 꽤 복잡하다.
    - `takeLatest` 사용시 최신의 작업에 대한 결과만 사용하고 나머지 앞선 결과는 모두 cancel한다.(ABAB... 아무리 눌러도 마지막에 누른것만 가져온다.)
  - case2: 파일 업로드 프로그레스 바(이벤트 핸들러와 채널의 통신, 추후 파악)
  - case3: 3개의 워커를 이용한 통신(`takeEvery`로 액션 발생만큼 무한정 요청을 날리는 게 아닌 3개의 워커스레드만 만들어서 최대 3개까지만 통신하도록 구현, 각 스레드가 경쟁적으로 요청 날리므로 Promise.all을 이용한 처리보다 빠르다.) 
![구현코드](https://velog.velcdn.com/images/motiveko/post/3c3fc447-3255-4e43-a709-0c1f4f054c25/image.png)

<br>

## 3. 테스팅
- [`redux-saga-test-plan`](https://www.npmjs.com/package/redux-saga-test-plan)이라는 사가 테스트용 패키지가 있다. redux-saga-testing-util보다 일단 관리는 잘 되고 있는모양이니 한번 써보자.