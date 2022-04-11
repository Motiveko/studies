# Redux-Saga 공식메뉴얼 스터디
- https://redux-saga.js.org/
- 공식메뉴얼을 읽으며 내용을 내방식대로 정리해본다.

## 1. About
About Redux-Saga
- 애플리케이션의 side-effect를 보다 효과적으로, 테스트하기 쉽게 관리하는것을 목표로 하는 라이브러리다. 
- 리덕스 미들웨어로 side-effect를 담당하는 독립적인 스레드다. 애플리케이션의 메인 스레드에 의해 제어될 수 있고, 리덕스에 액션을 Dispatch 할 수 있다.
- ES6 `Generator`를 사용해서 작성되어, 비동기 플로우를 일기 쉽고 테스트하기 쉽게 만들었다.

<br><br>

## 2. Introduction
- 생략한다.

<br>


## 3. Basic Concepts
### 3.1 [Declarative Effects](https://redux-saga.js.org/docs/basics/DeclarativeEffects)
- `Saga`는 제너레이터 함수에 의해 작성된다. Saga함수의 로직은 순수 자바스크립트 객체로 표현되는데, 이를 `Effects`라고 한다.
- `Effects`는 사가 미들웨어에 의해 해석되어 실행된다.

- `Effects`의 형태는 다양할 수 있는데, 아래와 같이 `Promise`도 가능하다.

```js
import { takeEvery } from 'redux-saga/effects'
import Api from './path/to/api'

function* watchFetchProducts() {
  yield takeEvery('PRODUCTS_REQUESTED', fetchProducts)
}

function* fetchProducts() {
  const products = yield Api.fetch('/products')
  console.log(products)
}
```
- `'PRODUCTS_REQUESTED'` 발생시 마다 실행될 `fetchProducts`는 `/producs` Api를 호출하는 함수의 결과인 Promise객체이다. 문제가 없어보인다.
- 하지만 이 사가함수를 테스트 하려고 하면 결국 Api.fetch를 mocking해야만 한다. 반환 결과 `Promise`를 똑같이 만들어야 `(...)equal()` 형태의 테스트를 진행할 수 있다. 

<br>

- Redux-Saga에서 제공하는 [`Effect creator`](https://redux-saga.js.org/docs/api/#effect-creators)를 사용해서 사가의 로직을 작성하면 Promise같은 형태가 아닌 `순수 자바스크립트 객체`로 사가 로직을 만들 수 있다.

```js
import { call } from 'redux-saga/effects'

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // ...
}
/*
call(Api.fetch, '/products')의 반환값 : 
{
  CALL: {
    fn: Api.fetch,
    args: ['./products']
  }
}
*/
```
- ***사가함수에서 직접 API호출하는게 아닌 어떤 함수를 어떤 arguments로 호출할 지에 대한 정보를 담은 객체를 반환***하게 된다. 테스트는 아래와 같이 간단해진다.

```js
import { call } from 'redux-saga/effects'
import Api from '...'

const iterator = fetchProducts()

// expects a call instruction
assert.deepEqual(
  iterator.next().value,
  call(Api.fetch, '/products'),
  "fetchProducts should yield an Effect call(Api.fetch, './products')"
)
```
- 테스트는 간단해졌다. 제너레이터는 순수 객체(사가 함수의  로직, Effect)를 반환하므로, 우리는 예상되는 순수 객체를 만들어 순서대로 반환되는지만 테스트하면 된다. 별도의 mocking등이 필요없다!

- 이런식으로 사가에서 제공하는 Effect 생성 함수를 사용해 `Declarative Effects`(선언적 Effect, 사가의 동작을 선언해놓은 것) 사가 로직을 작성하면 테스트가 쉬워진다!

<br><br>

### 3.2 [Dispatching actions to the store](https://redux-saga.js.org/docs/basics/DispatchingActions)
- 3.1 예제에서 API호출 결과를 가지고 Action Dispatch를 수행한다고 해보자. 간단히 아래와 같이 구현할 수 있다.

```js
function* fetchProducts(dispatch) {
  const products = yield call(Api.fetch, '/products')
  dispatch({ type: 'PRODUCTS_RECEIVED', products })
}
```

- 작동은 문제없을것이다. 그러나 이 코드를 테스트하기 위해서는 `dispatch`함수를 mocking하고 호출여부를 테스트해야한다. 하지만 **선언적 방식**으로 사가함수를 작성하면 역시 테스트는 더 간단해진다.
- Action Dispatch는 `put`함수를 사용한다.
```js
import { call, put } from 'redux-saga/effects'
// ...

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // create and yield a dispatch Effect
  yield put({ type: 'PRODUCTS_RECEIVED', products })
}
```
```js
import { call, put } from 'redux-saga/effects'
import Api from '...'

const iterator = fetchProducts()

// expects a call instruction
assert.deepEqual(
  iterator.next().value,
  call(Api.fetch, '/products'),
  "fetchProducts should yield an Effect call(Api.fetch, './products')"
)

// create a fake response
const products = {}

// expects a dispatch instruction
assert.deepEqual(
  iterator.next(products).value,
  put({ type: 'PRODUCTS_RECEIVED', products }),
  "fetchProducts should yield an Effect put({ type: 'PRODUCTS_RECEIVED', products })"
)
```
- `(...)equal()`방식의 테스트를 아주 쉽게 구현할 수 있게 되었다.

<br><br>

### 3.3 [Error Handling](https://redux-saga.js.org/docs/basics/ErrorHandling)
- 제너레이터 함수 내부에는 `try/catch`문을 작성할 수 있다. 이를 이용해서 api 호출 등에서 예외 발생시(Promise rejected) 이를 처리할 수 있다.

- 아래는 api 실패시에는 'PRODUCTS_REQUEST_FAILED' 액션을 Dispatch 하도록 처리된 사가함수다.
```js
function* fetchProducts() {
  try {
    const products = yield call(Api.fetch, '/products')
    yield put({ type: 'PRODUCTS_RECEIVED', products })
  }
  catch(error) {
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
  }
}
```
- 아래와 같이 테스트하면 된다!
```js
const iterator = fetchProducts()

// 1. iterator.next()로 'call' 테스트
// ... 

// create a fake error
const error = {}

// expects a dispatch instruction
assert.deepEqual(
  iterator.throw(error).value,
  put({ type: 'PRODUCTS_REQUEST_FAILED', error }),
  "fetchProducts should yield an Effect put({ type: 'PRODUCTS_REQUEST_FAILED', error })"
)
```

- ***`Api.fetch` 내부에서 이미 예외처리가 되어있는 경우***에는 사가함수를 아래와 같은 형태로 작성하면 되겠다.
```js
import Api from './path/to/api'
import { call, put } from 'redux-saga/effects'

  // 예외처리가 되어있는 함수
function fetchProductsApi() {
  return Api.fetch('/products')
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

function* fetchProducts() {
  const { response, error } = yield call(fetchProductsApi)
  // if/else로 예외 여부를 판단해 나눠 처리한다.
  if (response)
    yield put({ type: 'PRODUCTS_RECEIVED', products: response })
  else
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
}
```

- 사가함수 내부에서 예외 발생시 try/catch 등으로 처리하지 않으면 **버블링되어 root saga에 도달**하게 된다. 이 때 사가전체가 멈춰버리고 이유는 모르게 되는데, [`createSagaMiddleware`시 onError 훅 옵션을 설정](https://redux-saga.js.org/docs/api#error-propagation#createsagamiddlewareoptions)해 에러를 출력하는 등의 처리를 하고 사가가 우아하게 죽게 할 수 있다.


- [`safe wrapper`](https://github.com/redux-saga/redux-saga/issues/1250) 방식도 있다고 한다. call 등의 예외 발생 가능한 함수에 대해 래핑처리를 하는 함수인데, 공식적으로 제공되는 함수는 없고 직접 구현해야 하는듯 하다.

<br><br>

### 3.4 [Using Saga Helpers](https://redux-saga.js.org/docs/basics/UsingSagaHelpers)
- Redux-saga에서는 몇가지 Helper effects를 제공하는데, 이 중 `takeEvery`, `takeLatest`를 알아본다.
- 둘 다 어떤 Action Dispatch에 대해 알맞는 task를 실행시킨다. 중요한건 모두 **`Non-Blocking`방식으로 동작**해, 동시에 여러번의 Action이 발생해도 **모두 병렬로 처리**할 수 있다는 것이다.

- fetchUser를 호출하는 테스크를 아래와 같이 작성한다.
```js
import { call, put } from 'redux-saga/effects'
import Api from './path/to/api'

export function* fetchData(action) {
  try {
    const data = yield call(Api.fetchUser, action.payload.url)
    yield put({ type: 'FETCH_SUCCEEDED', data })
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error })
  }
}
```
- Saga Helper를 `takeEvery` 이용해 watcher를 작성한다.
```js
import { takeEvery } from 'redux-saga/effects'

function* watchFetchData() {
  yield takeEvery('FETCH_REQUESTED', fetchData)
}
```

- `FETCH_REQUESTED`가 발생할 때 마다 fetchData 태스크를 수행하게 된다. 이 과정이 `병렬`로 처리되므로 ***여러개의 fecthData 태스크가 동시에 수행될 수 있다!***

- `takeLatest`는 `takeEvery`와 약간 다르게 가장 생성한 `fetchData` 태스크만만 수행하게 된다. 이전것들은 모두 자동으로 취소되어 무시되어진다!

<br><br>

## 4. Adavanced Concepts
### 4.1 [Channels](https://redux-saga.js.org/docs/advanced/Channels)
- 이전까지는 `take`, `put` 이펙트를 통해 리덕스의 Store와 통신했다. ***`Channel`은 이런 사가 외부의 이벤트와의 통신이나 사나 내부 통신을 일반화(generalize) 할 수 있게 해준다.*** 액션에 대한 queue로도 사용할 수 있다.
- `actionChannel`, `eventChannel`, `channel`에 대해 다룬다.

<br>

### 4.1.1 [Using the `actionChannel` Effect​](https://redux-saga.js.org/docs/advanced/Channels#using-the-actionchannel-effect)
- Redux Action의 부수효과를 처리하는 간단한 사가함수를 살펴본다. `watch-and-fork` 패턴으로 작성되어 액션 발생시 태스크를 실행한다.
```js
import { take, fork, ... } from 'redux-saga/effects'

function* watchRequests() {
  while (true) {
    const {payload} = yield take('REQUEST')
    yield fork(handleRequest, payload)
  }
}

function* handleRequest(payload) { ... }
```
- `watch-and-fork` 패턴은 watcher와 태스크를 나누고, `fork`를 이용해 둘을 연결한다. 액션 발생시 Non-Blocking으로 태스크를 생성해 수행하므로 액션의 유실이 발생하지 않는다.
- 그러나 이런 Non-Blocking 방식은 ***액션 발생 순서대로 태스크를 수행해야 하는 경우 적절하지 않다.*** 이 때 Channel을 이용할 수 있다!

```js
import { take, actionChannel, call, ... } from 'redux-saga/effects'

function* watchRequests() {
  // 1- Create a channel for request actions
  const requestChan = yield actionChannel('REQUEST')
  while (true) {
    // 2- take from the channel
    const {payload} = yield take(requestChan)
    // 3- Note that we're using a blocking call
    yield call(handleRequest, payload)
  }
}

function* handleRequest(payload) { ... }
```

1. `actionChannel(Patterns)`로 특정 액션에 대한 채널(Queue)을 만든다. `take`와 마찬가지로 지정한 Action이 발생하면 이걸 큐에 집어넣는다.
2. `while(true)` 내부에 태스크를 넣는다.
3. `take(requestChan)`은 만든 채널의 큐에 적제된 메시지가 있을 때 해당 메시지를 가져온다. 여기서 메시지는 'REQUEST' 액션이 될 것이다. 큐에 메시지가 없으면 동작하지 않는다.
4. `call`을 이용해 부수효과를 처리한다. 이 기간동안 Saga는 블로킹 된다.
5. 블로킹된동안 새로운 'REQUEST' 액션이 발생해도 이는 큐에 계속 적재된다.(액션의 버퍼)
6. 부수효과 처리가 끝나면 다시 `take`로 돌아온다. 3~5의 작업이 계속 반복된다.

<br>

- 채널은 `queue`로 동작해 FIFO이므로 액션 발생 순서에 맞춰 부수효과를 처리할 수 있게 된다!
- `actionChannel`의 버퍼사이즈는 기본적으로 무제한이다. `actionChannel()`의 두번째 인자에 [`buffers`](https://redux-saga.js.org/docs/api/#buffers) 메서드를 이용해 버퍼의 크기/종류를 지정해 전달할 수 있다.
```js
// 버퍼 적용 예시, 사이즈 5, sliding 방식
import { buffers } from 'redux-saga'
import { actionChannel } from 'redux-saga/effects'

function* watchRequests() {
  const requestChan = yield actionChannel('REQUEST', buffers.sliding(5))
  ...
}
```

<br><br>

### 4.1.2 [Using the eventChannel factory to connect to external events​](https://redux-saga.js.org/docs/advanced/Channels#using-the-eventchannel-factory-to-connect-to-external-events)
- actionChannel이 Redux Store의 Action Dispatch 이벤트에 대한 채널이었다면, `eventChannel`은 그 외의 외부 이벤트에 대한 채널을 만들어 준다.
- 차이점은 ***actionChannel은 Effect 생성 함수***이지만, ***eventChannel은 일반 팩토리 함수라는 점이다.***(saga가 리덕스의 미들웨어로 리덕스의 액션은 이미 채널로 받고 있기 때문으로 생각된다.)

- 간단하게 타이머에 대한 채널과 웹소캣에 대한 채널을 만들어본다.
<br>

1. 타이머 이벤트 채널
- 채널 생성 함수를 아래와 같이 구현할 수 있다.
```js
import { eventChannel, END } from 'redux-saga'

function countdown(secs) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        secs -= 1
        if (secs > 0) {
          emitter(secs)
        } else {
          // END를 방출하면 채널은 닫히게된다. Rxjs Observable의 complete와 유사하다.
          emitter(END)
        }
      }, 1000);
      // Unsubscribe
      return () => {
        clearInterval(iv)
      }
    }
  )
}
```
- 동작은 아래와 같다.
  1. `countdown(secs)` 함수는 secs를 인자로 받았다. 0이 될때까지 매 초마다 1씩 감소시키며 이벤트를 방출한다.
  2. `eventChannel(subscribe)`는 subscribe를 인자로 받는다. ***subscribe는 unsubscribe를 리턴해야 한다.***
  3. secs가 감소하다 0이되면 `emitter(END)`를 호출한다. 이건 채널이 더이상 내보낼 메시지가 없음을 의미하고, 채널은 닫히게된다.(`unsubscribe`)


> ❗️ 이벤트가 null/undefined를 내보내지 않게 하는것을 권장한다고 한다. 따라서 위 예제는 `{ number: secs }`와 같은객체 형태로 만들어 내보내는게 좋다.(structuring)

<br>

- 채널생성함수 `countdown`은 아래와 같이 사용하면 된다.
```js
import { take, put, call } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

// 이벤트 채널 생성 함수
function countdown(seconds) { ... }

export function* saga() {
  const chan = yield call(countdown, value)
  try {    
    while (true) {
      let seconds = yield take(chan)
      console.log(`countdown: ${seconds}`)
    }
  } finally {
    console.log('countdown terminated')
  }
}
```
- 동작은 아래와 같다.
  1. 채널 생성 함수 호출은 `call` Effect를 이용한다. 결과로 채널(chan)이 나온다.
  2. `try/finally`문을 사용한다. ***finally 블록은 emit(END) 호출로 채널이 끝날 때 실행된다.***
  3. `take(chan)`으로 채널에서 발생하는 메시지(이벤트)를 받는다. `emit(secs)`호출 시 실행될것이다. 일단 finally 블록으로 넘어가기 전까지 무제한 실행되어야 하므로 `while(true)` 로 래핑했다.

- 만약 `emit(END)` 호출 이전에도 채널을 종료할 수 있게 만들려면 아래와 같이 `cancelled`를 사용하면 된다.

```js
import { take, put, call, cancelled } from 'redux-saga/effects'

// ...

export function* saga() {
  const chan = yield call(countdown, value)
  try {    
    while (true) {
      let seconds = yield take(chan)
      console.log(`countdown: ${seconds}`)
    }
  } finally {
    // 태스크에 대해 캔슬 호출시 여기로 넘어온다.
    if (yield cancelled()) {
      chan.close()
      console.log('countdown cancelled')
    }    
  }
}
```
<br>

2. 웹소캣 이벤트 채널
- 간단한 웹소캣 이벤트를 처리하는 채널을 구현해본다. `ping`으로 이벤트를 받으면 5초 뒤 `pong`으로 응답하는 웹소캣을 구현한다.
```js
import { take, put, call, apply, delay } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { createWebSocketConnection } from './socketConnection'


function createSocketChannel(socket) {
  return eventChannel(emit => {
    
    // ping 이벤트 발생하면 이벤트의 payload를 방출한다
    const pingHandler = (event) => {
      emit(event.payload)
    }
    
    // error 이벤트 발생시 에러를 방출한다.
    const errorHandler = (errorEvent) => {
      emit(new Error(errorEvent.reason))
    }
    
    // 소켓 이벤트 구독
    socket.on('ping', pingHandler)
    socket.on('error', errorHandler)

    // unsubscribe 함수
    const unsubscribe = () => {
      socket.off('ping', pingHandler)
    }

    return unsubscribe
  })
}

function* pong(socket) {
  yield delay(5000)
  yield apply(socket, socket.emit, ['pong']);
}
export function* watchOnPings() {
  const socket = yield call(createWebSocketConnection)
  const socketChannel = yield call(createSocketChannel, socket)

  while (true) {
    try {
      // 소켓 채널의 메시지가 발생하면 수행된다.
      const payload = yield take(socketChannel)
      yield put({ type: INCOMING_PONG_PAYLOAD, payload })
      yield fork(pong, socket)
    } catch(err) {
      // take의 소켓 채널에서 예외가 발생하면 catch블록으로 넘어온다.
      console.error('socket error:', err);
    }
  }
}
```
- 구현은 아래와 같다.
  1. `createSocketChannel(socket)`은 소캣을 인자로 받아 채널을 만든다.
  2. `pong(socket)`은 소켓을 인자로 받아 ***5초의 딜레이 후 pong 이벤트를 발생시키는 테스크를 만드는 제너레이터 함수다***
  3. `call(createWebSocketConnection)`로 소캣 객체를 만든다.
  4. `call(createSocketChannel, socket)`로 소캣 채널을 만든다.
  5. `while(true)`로 소켓이벤트를 계속 구독한다. 
    - 소캣에서 'ping' 이벤트 발생시 `put()`Effect로 스토어에 해당 내용을 액션으로 전달한다.
    - `fork(pong, socket)`Effect로 5초 딜레이 후 소켓에 pong 이벤트를 발생시킨다. `fork`를 썼으므로 여러번 호출되어도 병렬처리된다.


> `eventChannel()`을 이용해 생성한 채널은 ***기본적으로 발생하는 이벤트를 버퍼하지 않는다.*** `eventChannel(subscriber, buffer)`와 같이 인자로 [buffer](https://redux-saga.js.org/docs/api/#buffers)를 전달해야한다.

<br>

### 4.1.3[Using channels to communicate between Sagas​](https://redux-saga.js.org/docs/advanced/Channels#using-channels-to-communicate-between-sagas)
- Redux-Saga는 기본적으로 `빌트인 채널(channel)`도 재공한다. 기존 `actionChannel`은 Redux Store Action Dispatch를 처리했고, `eventChannel`은 외부 이벤트를 처리했다면, `channel`은 `put(channel, SOMETHING)`으로 발생시키는 이벤트를 처리한다. 이를 통해 사가간 통신을 구현할 수 있다.

<br>

- 간단한 예제로 살펴본다. 기존 watch-and-fork 패턴으로 부수효과를 무제한 병렬 처리 했었다. ***채널을 이용해 액션을 순차처리하는데, 3개의 워커가 병렬로 (순차)처리하도록 구현할 수 있다.*** 엄밀히 말해 3개는 동시에 처리하므로 순서가 보장되지 않는다.
```js
import { channel } from 'redux-saga'
import { take, fork, ... } from 'redux-saga/effects'

function* watchRequests() {
  
  const chan = yield call(channel)

  // create 3 worker 'threads'
  for (var i = 0; i < 3; i++) {
    yield fork(handleRequest, chan)
  }

  while (true) {
    const {payload} = yield take('REQUEST')
    yield put(chan, payload)
  }
}

function* handleRequest(chan) {
  while (true) {
    const payload = yield take(chan)
    // ...
  }
}
```
- 구현은 아래와 같다.
  1. watcher에서 `call(channel)`로 채널을 만든다. channel은 Redux-saga에서 기본제공한다.
  2. `fork(handleRequest, chan)`으로 워커 사가를 3개 만든다. handleRequest 내부는 `while(true)`로 래핑되어 무한반복한다.
  3. 이제 watcher 내부에 while(true)로 래핑하여, `take('REQUEST')`로 액션을 필터링하고 `yield put(chan, payload)`로 채널에 액션의 payload를 메시지로 전달한다. 전달된 메시지는 queue에 인서트되고 처리될때까지 버퍼된다.
  
  > `channel`은 기본적으로 무제한 버퍼다.

  4. 3개의 워커 사가는 ***채널에 들어있는 메시지를 경쟁적으로 처리***하게 될 것이다.

- 이렇게 해서 ***`watcher saga`<-> `worker saga`간에 채널을 통해 메시지 유실 없이 통신하게 된다.***

<br><br>

### 4.2 [Composing Sagas](https://redux-saga.js.org/docs/advanced/Channels)
- 여러개의 사가를 묶는 방법은 여러가지가 있다. `yield* genFunc()`같은걸 쓸 수 있는데, genFunc내부가 순차처리되고 완료까지 블로킹 된다는 단점이 있다.
- [`all`](https://redux-saga.js.org/docs/api/#alleffects---parallel-effects)이펙트를 사용하면 병렬로 Effects를 묶어서 처리할 수 있다. `Promise.all`과 같이 동작한다.
```js
function* mainSaga(getState) {
  const results = yield all([call(task1), call(task2), ...])
  yield put(showResults(results))
}
```
- 위 코드는 task1,2,3.. 등을 모두 병렬 처리하고 완료된 결과를 가지고 `put(showResults(results))`을 수행한다.

<br>

### 4.3[Concurrency](https://redux-saga.js.org/docs/advanced/Concurrency)
- 'Using Saga Helpers'에서 다룬 것 처럼 `takeEvery`, `takeLatest`는 Effect의 동시성을 관리하게 된다. 간단히 각각의 구현을 살펴본다.
1. `takeEvery`
```js
import {fork, take} from "redux-saga/effects"

const takeEvery = (pattern, saga, ...args) => fork(function*() {
  while (true) {
    const action = yield take(pattern)
    yield fork(saga, ...args.concat(action))
  }
})
```
- 필수로 `pattern`과 `saga`를 인자로 받는다. `fork()`를 이용해 논블로킹으로 처리하는데, 내부적으로 watch-and-fork패턴을 사용해서 pattern에 대한 처리를 saga가 non-blocking으로 수행하도록 Effect를 만든다.


<br>

2. `takeLatest​`
```js
import {cancel, fork, take} from "redux-saga/effects"

const takeLatest = (pattern, saga, ...args) => fork(function*() {
  let lastTask
  while (true) {
    const action = yield take(pattern)
    if (lastTask) {
      yield cancel(lastTask) // cancel is no-op if the task has already terminated
    }
    lastTask = yield fork(saga, ...args.concat(action))
  }
})
```
- takeEvery와 비슷한데 차이점은 제너레이터 함수 내부적으로 `lastTask`를 가진다는 것이다. non-blocking Effect를 lastTask에 할당하고, ***액션 발생시 lastTask를 무조건 cancel하고 새로운 태스크(Effect)를 생성***한다. 즉  동시에 태스크가 처리되는걸 허용하지 않는다.