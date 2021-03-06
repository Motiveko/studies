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
- 위 코드는 task1,2,3.. 등을 모두 병렬 처리하고 전부 완료되면 결과를 가지고 `put(showResults(results))`을 수행한다.

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
- 필수로 `pattern`과 `saga`를 인자로 받는다. `fork()`를 이용해 새로운 태스크를 만들어 수행하는데, 이 태스크는 내부적으로 watch-and-fork패턴을 사용해서 pattern에 대한 처리를 saga가 non-blocking으로 수행한다. 따라서 동시에 많은 액션이 발생해도 병렬로 모두 처리하게된다.


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

<br><br>

### 4.4[redux-saga's fork model](https://redux-saga.js.org/docs/advanced/ForkModel)
- Redux-Saga에는 ***동적으로 태스크를 fork할 수 있는 두가지 Effect***를 제공한다.
  1. Attatched forks - `fork`
  2. Detached forks - `spawn`

- Attatched/Detached의 차이는 무엇일까? 
- 어떤 사가(제너레이터 함수)가 `완료` 되기 위해서는 두가지 기준을 충족해야한다.
  1. 사가 내부의 모든 명령어를 실행해야한다.
  2. 사가의 모든 `Attatched fork`가 끝나야한다.
- 이런관점에서 Attatched fork는 **부모의 실행 컨텍스트에 존재**한다. Detached fork는 **자신의 고유한 실행 컨텍스트**에 살아있다.

<br>

### 4.4.1 Attached Forks

1. Saga의 완료 시점
아래 코드에서 call(fetchAll)의 블로킹이 끝나는 시점을 생각해보자.
```js
import { fork, call, put, delay } from 'redux-saga/effects'
import api from './somewhere/api' // app specific
import { receiveData } from './somewhere/actions' // app specific

function* fetchAll() {
  const task1 = yield fork(fetchResource, 'users')
  const task2 = yield fork(fetchResource, 'comments')
  yield delay(1000)
}

function* fetchResource(resource) {
  const {data} = yield call(api.fetch, resource)
  yield put(receiveData(data))
}

function* main() {
  yield call(fetchAll)
}
```
- [call](https://redux-saga.js.org/docs/api#callfn-args)은 fetchAll 태스크가 끝날때 까지 블로킹된다. 
- fetchAll은 두번의 fork를 실행해 Effect를 반환하고 `delay`를 만나 1초동안 블로킹된다. fork 자체는 논 블로킹으로 바로 지나간다.
- 시간은 1초가 지났고, fork된 태스크인 `fetchResource`가 종료될 때 까지 아직도 main은 블로킹되어있다. 두개의 태스크가 완료되면 비로소 main 태스크도 끝나게 된다. 
- 위 코드는 아래와 같이 다시 쓸 수 있겠다.
```js
function* fetchAll() {
  yield all([
    call(fetchResource, 'users'),     // task1
    call(fetchResource, 'comments'),  // task2,
    delay(1000)
  ])
}
```
- all 은 병렬로 세개의 effect를 동시에 수행하고, 모두 처리될 때 까지 기다린다. fetchAll의 완료 시점은 위/아래 코드가 모두 같다고 할 수 있다.(fetchAll 컨택스트에 task1, task2가 존재한다.)

<br>

2. 예외 전파
- fetchAll 내부에서 예외 발생시 어떻게될까? fetchAll은 중단되고 예외를 던지게 될 것이다. `main`에서 이걸 이렇게 처리할 수 있다.
```js
function* main() {
  try {
    yield call(fetchAll)
  } catch (e) {
    // handle fetchAll errors
  }
}
```
- 만약 `Detached fork`의 경우라면 부모 컨텍스트에 자식의 fork 수행이 남아있지 않으므로 이런식의 `try/catch` 작성이 불가능할 것이다.(콜백 패턴에서 부모에서 try/catch 불가능한 것과 같다!!)

<br>

3. Cancellation of Saga
사가의 취소는 아래 두가지를 취소하는것을 의미한다.
- 현재 블로킹된 Effect의 메인 태스크를 지우고
- 해당 태스크의 모든 Attached Fork를 취소한다.

<br>

### 4.4.1 Detached Forks
`spawn`을 이용한 Detached Forks는 자신의 고유한 실행 컨텍스트에 존재한다. 따라서,
  1. 부모는 fork 태스크의 완료를 기다리지 않는다.
  2. fork 태스크에서 발생하는 예외는 부모로 전파되지 않는다.
  3. 부모를 취소해도 fork 태스크는 계속된다.
의 특징을 가지게 된다.


<br><br>

### 4.5 [Pulling future actions](https://redux-saga.js.org/docs/advanced/FutureActions)

Redux의 액션을 받아서 처리하는 방식은 두가지가 있다.
  1. takeEvery, takeLatest Effect 이용
  2. take 이용(low-level)

1.의 경우를 push, 2.의 방식을 pull 방식이라고 한다. 아래 코드를 보자.

```js
// 1. push방식
import { select, takeEvery } from 'redux-saga/effects'
function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  })
}

// 2. pull 방식
import { select, take } from 'redux-saga/effects'

function* watchAndLog() {
  while (true) {
    const action = yield take('*')
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  }
}
```
- 1.의 `takeEvery`를 사용한 경우 logger 제너레이터 함수를 action을 인자로 호출하게 한다. ***태스크는 부모요소에서 제어***하고있다.
- 2.의 경우 watchAndLog는 ***내부적으로 스스로 action을 pull해오고 이를 처리***한다. 필요한걸 스스로 요청한다. 제어의 역전(Inversion of Control)이 발생했다. 

- ***PULL 방식이 좀 더 다양하게 액션 처리 flow를 만들 수 있어서 좋다.*** 예를들어 login-logout을 처리하는 플로우를 만들어보자.
```js
function* loginFlow() {
  while (true) {
    yield take('LOGIN')
    // ... perform the login logic
    yield take('LOGOUT')
    // ... perform the logout logic
  }
}
```
- 반드시 LOGIN - LOGOUT의 순서로 인증 로직이 처리되어야 한다는걸 안다. 필요한 액션 두종류를 스스로 pull 해올 수 있으므로 하나의 사가 함수 내부에 LOGIN/LOGOUNT의 순차 처리 flow를 작성할 수 있다. push 방식이었다면 둘을 각각 분리했어야 할 것이다.

<br><br>

### 4.6 [Non-blocking calls](https://redux-saga.js.org/docs/advanced/NonBlockingCalls)
NonBlocking으로 동작하는 사가를 어떤식으로 처리하는게 좋을지 간단한 사례를 들어 설명한다.
- 위에서 `take` Effect로 로그인-로그아웃 플로우를 만들었다. 그걸 간단히 빌드업해보자.

```js
import { take, call, put } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}

function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    const token = yield call(authorize, user, password)
    if (token) {
      yield call(Api.storeItem, {token})
      yield take('LOGOUT')
      yield call(Api.clearItem, 'token')
    }
  }
}
```
- `LOGIN_REQUEST` 액션이 발생하면 authorize 사가 함수를 호출한다. `call`은 Blocking Effect이므로 만약 ***처리가 완료되기 전에 `LOGOUT` 액션이 발생하면 이건 유실된다.***
- Non-Blokcing Effect인 `fork`를 사용해 리팩토링한다. 메뉴얼에는 중간과정이 좀 있는데 생략하고 결과만 보도록 한다.

```js
function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    // call -> fork 사용
    const task = yield fork(authorize, user, password)

    // take에 패턴을 배열로 전달. 둘 다 감시한다.
    const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
    
    // LOGOUT시 task를 캔슬
    if (action.type === 'LOGOUT')
      yield cancel(task)
    
    yield call(Api.clearItem, 'token')
  }
}
```
- 아래와 같이 리팩토링 되었다.
  1. `fork`를 이용해 사가를 호출한다. Non-Blocking이므로 바로 take로 넘어간다.
  2. 로그아웃이 완료되면 `cancel`로 fork한 태스크를 중지한다. 완료된 상태라면 아무것도 발생하지 않는다. 
  3. `authorize` 사가에서 에러가 발생했으면 `LOGIN_ERROR`액션이 발생할 것이고, `take`에서 이걸 받아 Api.clearItem을 호출할것이다.
  4. 중간에 로그아웃을 하건 로그인이 실패하건 `take('LOGIN_REQUEST')`에 다시 돌아가 액션을 기다리게된다.

- fork로 인해 발생하는 동시성을 제어하는 핵심은 [`cancel`](https://redux-saga.js.org/docs/api/index.html#cancel)Effect이다. 태스크를 인자로 받아 태스크를 중지시킨다. ***이걸 하지 않으면 LOGOUT을 중간에 호출하더라고 로그인처리는 끝까지 가고, 토큰은 저장되어 버릴 것이다.***

- 여기서 한단계가 더있다. 만약 로그인 시작시 `isLoginPending`같은 플래그를 설정했다면, 로그인완료/로그인중 로그아웃/로그인에러 세가지 케이스에 모두 대응해서 `isLoginPending`을 되돌릴 수 있는 방법은 뭐가 있을까?

```js
import { take, call, put, cancelled } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
  try {
    // isLoginPending 플래그를 설정하고 시작한다.
    yield put({type: 'SET_LOGIN_PENDING', payload: true })

    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    yield call(Api.storeItem, {token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  } finally {
    // isLoginPending 플래그 리셋
    yield put({type: 'RESET_LOGIN_PENDING'})
  }
}
```
- try/catch의 `finally`블록은 api성공, api 예외발생, task cancel 세가지 모든 경우에 실행된다. 따라서 finally에 작성하면 모든 케이스에 대응하여 `isLoginPending`을 되돌릴 수 있다.

<br>

> ❗️ 참고로 finally 블록에서 task cancel시에만 뭔가 로직을 수행하고 싶다면 finally문에 [`cancelled`](https://redux-saga.js.org/docs/api/index.html#cancelled) Effect를 사용해 아래와 같이 작성하면 된다. 
> ```js
> // ...
> finally {
>   if (yield cancelled()) {
>     // ... cancel시에만 실행도리 로직
>   }
>   // cancel, 성공/실패 모두에 실행되는 로직
> }
> ```

<br><br>

### 4.7 [Racing Effects](https://redux-saga.js.org/docs/advanced/RacingEffects)
- `Promise.race`처럼 여러개의 태스크를 병렬로 실행하고 가장 먼저 완료되는것만 처리하고 싶을 때가 있다. 이를 위해 `race` Effect를 제공한다.
- 아래는 timeout을 1초로 fetchApi를 호출하는 태스크이다.
```js
function* fetchPostsWithTimeout() {

  // fetchApi가 1초내로 완료되지 않으면 timeout이 완료될것이다.
  const {posts, timeout} = yield race({
    posts: call(fetchApi, '/posts'),
    timeout: delay(1000)
  });

  if(posts) {
    yield put({ type: 'POSTS_RECEIVED', posts });
  } else {
    yield put({ type: 'TIMEOUT_ERROR' });
  }
}
```
- 다른 예로 태스크에서 무한루프 내에 `take`로 액션을 받아 어떤 태스크를 역시 무한루프로 실행하는데, 태스크가 실행된 후 ***취소 액션이 발생하면 이 태스크를 취소하도록*** 만들 수 있다.
```js
function* backgroundTask() { 
  // 따로 중지하는기능이 없다.
  while(true) {
    // background task..
  }
}

function* () {
  while(true) {
    yield take('START_BACKGROUND_TASK');
    // backgroundTask 실행 후 'CANCEL_TASK' 액션이 발생하면 나머진 취소한다.
    yield race({
      task: call(backgroundTask),
      cancel: take('CANCEL_TASK')
    })
  }
}
```

<br><br>

### 4.8 [Root Saga](https://redux-saga.js.org/docs/advanced/RootSaga)
- 루트 사가는 여러개의 사가들이 `Saga Middleware`에서 동시에 실행되기 위한 진입점이다.
- 루트 사가를 작성하는 몇가지 패턴에 대해 알아본다.

1. Non-blocking fork effects
- `fork`는 Non-blocking이기 때문에 루트 사가에 다 집어넣으면 된다. 동시에 실행될 것이다.
```js
export default function* rootSaga() {
  yield fork(saga1)
  yield fork(saga2)
  yield fork(saga3)
  // code after fork-effect
}
```

<br>

2. all Effect 중첩 fork
- `all` 은 인자로 받은 전체 태스크를 수행하고 모두 완료되면 결과를 반환한다.
```js
const [task1, task2, task3] = yield all([ fork(saga1), fork(saga2), fork(saga3) ])
```
- 이렇게 하면 내부의 모든 `fork`는 forkQueue에 묶이게 되는데, 만약 ***전부 완료되기 전에 어디선가 catch되지 않은 예외 발생시 전부다 멈춘다는 무서운점이 있다.***

3. spawn을 이용한 태스크의 컨텍스트 분리(Keeping the root alive)
- fork와 다르게 `spawn`은 부모 컨텍스트에 존재하지 않는다. 즉 ***예외가 부모에게 전파되지 않기때문에 부모 태스크에 영향을 끼치지 않는다.***
```js
export default function* rootSaga() {
  yield spawn(saga1)
  yield spawn(saga2)
  yield spawn(saga3)
}
```

4. `spawn + call + all`을 이용해 모든 사가를 계속 살아있게 만들기(Keeping everything alive​)
- 3.에서 spawn을 이용해서 작성한 태스크에서 예외 발생시 다른 태스크에 영향은 없지만 자신은 중지된다. 어떤 태스크든 예외 발생등으로 중지될때마다 태스크를 살리고 싶으면 어떻게 할까?
```js
function* rootSaga () {
  const sagas = [
    saga1,
    saga2,
    saga3,
  ];

  yield all(sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (e) {
          console.log(e)
        }
      }
    }))
  );
}
```
- call은 완료될때까지 블로킹된다. 해당 태스크가 정상적으로 끝내는 경우 break문을 타고 종료되지만, 예외 발생으로 끝나면 `try/catch => while(true)`를 거쳐 재실행되게 된다.
- 이 태스크는 spawn 로 실행되었으므로 논 블로킹이다.

<br>

### 4.9 [Running Tasks In Parallel](https://redux-saga.js.org/docs/advanced/RunningTasksInParallel)
- 여러개의 비동기 동작을 병렬 실행하려면 `all`을 사용하자.
```js
import { all, call } from 'redux-saga/effects'

// 순차실행, users 완료 후 repos 실행한다. 느리다.
const users = yield call(fetch, '/users')
const repos = yield call(fetch, '/repos')

// 병렬실행, 빠르다
const [users, repos] = yield all([
  call(fetch, '/users'),
  call(fetch, '/repos')
])
```
- all의 단점은 한개라도 실패하면 다 실패한것으로 간주한다는 것이다.(Promise.all과 같다!)

<br><br>

### 4.10 [Task Cancellation](https://redux-saga.js.org/docs/advanced/TaskCancellation)
### 4.10.1 Cancellation
- 유저 액션에 의해 백그라운드에서 일정시간마다 정보를 가져와서 갱신하는 task가 있다. 그리고 유저 액션에 의해 task를 취소할 수 있도록 사가를 구성해본다.
```js

function* bgSync() {
  try {
    while(true) {
      yield put(actions.requestStart())
      const result = yield call(someApi);
      yield put(actions.requestSuccess(result));
      yield delay(5000);
    }
  } finally {
    if(cancelled()) {
      yield put(actions.requestFailure('Sync cancelled!'));
    }
  }
}

function* main() {
  while(yield take('START_BACKGROUND_SYNC')) {
    const task = yield fork(bgSync);

    yield take('STOP_BACKGROUND_SYNC');

    yield cancel(task);
  }
}
```
- task는 결국 `제너레이터 객체`이다. ***`cancel(task)`는 `Generator.prototype.return`을 호출해서 제너레이터 객체를 즉시 finally 블럭으로 이동시킨다.***
- task의 취소는 caller(호출자) - callee(task) 중 caller에서 보통 호출하게 된다. 이 때 callee는 또 caller로서 어떤 task를 실행하느라 blocking 상태일 수도 있는데, 이 때 ***모든 블로킹된 하위 태스크를 모두 취소하게 된다.*** 결과 반환이나 예외의 전파와 반대인 `downward propagation`이 일어난다고 할 수 있다.

```js
function* main() {
  const task = yield fork(subtask)
  ...
  // 취소
  yield cancel(task)
}

function* subtask() {
  ...
  yield call(subtask2) // currently blocked on this call
  ...
}

function* subtask2() {
  ...
  yield call(someApi) // currently blocked on this call
  ...
}
```
- 위 코드에서 main -> subtask -> subtask2 순으로 caller->callee 관계가 구성되어 있는데, ***main에서 subtask를 취소하면 subtask를 블로킹하고 있던 subtask2까지 취소 된다는 의미이다.***

<br>

### 4.10.2 Testing generators with fork effects
- `fork`이펙트는 논블로킹으로 백그라운드에서 실행되므로 그냥 지나간다. 이런걸 어떻게 테스트할 수 있을까?
- 권장안은 fork 이펙트의 반환 task를 mock으로 만들어서 테스트하는것이다. [`@redux-saga/testing-utils`](https://www.npmjs.com/package/@redux-saga/testing-utils)의 `createMockTask` 메서드를 이용하면 된다. 위에 `main - bgSync`를 테스트한다.
```js
import { createMockTask } from '@redux-saga/testing-utils';

describe('main', () => {
  const generator = main();
  
  it('waits for start action', () => {
    const expectedYield = take('START_BACKGROUND_SYNC');
    expect(generator.next().value).to.deep.equal(expectedYield);
  });

  it('forks the service', () => {
    const expectedYield = fork(bgSync);
    const mockedAction = { type: 'START_BACKGROUND_SYNC' };
    expect(generator.next(mockedAction).value).to.deep.equal(expectedYield);
  });

  it('waits for stop action and then cancels the service', () => {

    const mockTask = createMockTask();
    const expectedTakeYield = take('STOP_BACKGROUND_SYNC');
    expect(generator.next(mockTask).value).to.deep.equal(expectedYield);

    const expectedCancelYield = cancel(mockTask);
    expect(generator.next().value).to.deep.equal(expectedCancelYield);
  });
})
```
- 이런 방식으로 fork된 task를 mock으로 만들어서 취소호출 동작 등을 테스트 할 수 있다. task도 결국 순수 자바스크립트 객체이기 때문에 이런 방식의 테스트가 유효하다.
- ***굳이 task를 `createMockTask`로 mocking해서 테스트하는 이유는 뭘까? 고민해봐야 할 문제인 것 같은데, mockTask는 `setRunning`, `setResult`, `setError`등으로 task의 상태를 지정할 수 있기 때문으로 생각된다. 여러 상태에 따른 동작 테스트도 필요한 시점이 있을 것 같다.***

<br>

### 4.10.3 Automatic cancellation​
- 다음 두가지 경우에 task가 자동으로 취소된다.
  1. `race`이펙트를 사용한 경우, 최초 완료되는 task 외에 모든 task는 cancel된다.
  2. `all`이펙트를 사용하는 겨웅, 하나라도 실패하면 나머지 모두 cancel된다.

<br><br>

### 4.11 [Testing Sagas](https://redux-saga.js.org/docs/advanced/Testing)
- 사가를 테스트하는데는 두가지 방법이 있다.
  1. 제너레이터 함수를 step-by-step으로 실행하기
  2. 전체 사가를 동작시키고 side-effect에 대해 asserting 하기

<br>

### 4.11.1 Testing the Saga Generator Function​
- 내가 기존에 하던 방식과 다른게 없다. `@redux-saga/testing-utils`의 `cloneableGenerator`함수를 이용하는 방식.

<br>

### 4.11.2 Testing the full Saga​
- [`runSaga`](https://redux-saga.js.org/docs/api#runsagaoptions-saga-args) 메서드를 이용하면 **Redux 미들웨어 밖에서 사가를 실행**할 수 있다. 이 때 필요한 환경들을 외부에서 주입할 수 있는데, 이 ***환경들에 적절한 mock 객채들을 넣어줘서 호출에 대한 assert를 수행하는 방식으로 테스트*** 할 수도 있다.
- store에서 상태를 select하고 이를 이용해 api를 호출하는 간단한 사가함수를 테스트한다.
```js
function* callApi(url) {
  const someValue = yield select(selector);
  try {
    const result = yield call(SOMEAPI, url, someValue);
    yield put(success(result.json()));
  } catch(e) {
    yield put(error(e));
    return -1;
  }
}
```

```js
import sinon from 'sinon';
import * as api from './api';

test('callApi', async (assert) => {
  const dispatched = [];
  sinon.stub(api, 'myApi').callsFake(() => ({
    json: () => ({
      some: 'value'
    })
  }));
  const url = 'http://url';
  const result = await runSaga({
    dispatch: (action) => dispatched.push(action),
    getState: () => ({ state: 'test' }),
  }, callApi, url).toPromise();

  assert.true(myApi.calledWith(url, somethingFromState({ state: 'test' })));
  assert.deepEqual(dispatched, [success({ some: 'value' })]);
});
```
- 예제에서는 `sinon`을 이용해 api 모듈을 mocking했다.
- runSaga는 callApi를 fork와 같이 task 객체를 반환하는데, `.toPromise() + await`을 사용하면 task 실행이 완료될 때 까지 블록할 수 있다.
- runSaga의 옵션중 `dispatch`는 `put` 이펙트를 통해 액션을 dispatch하는걸 재정의 할 수 있고, ₩는 `select` 이펙트가 가져오는 store의 상태를 재정의 할 수 있다. 이건 결국 ***redux store를 mocking하는것과 같다.***
- assert로 api에 대한 호출 테스트와 `put`의 호출에 대해서 `dispatched`배열을 확인하는 방식으로 테스트할 수 있다.

<br>

### 4.11.3 [Testing libraries​](Testing libraries​)
- 여러가지 테스트 관련 라이브러리를 알려주는데, 대부분 관리가 안되고 있다. 그리고 결론은 [`redux-saga-test-plan`](https://github.com/jfairbank/redux-saga-test-plan)이 다른 라이브러리들을 모두 커버할 수 있다고 한다.
- Reducer와 연결해서 테스트하는걸 `integration test`, 그냥 사가만 테스트하는걸 recording side-effects 라고 하는가보다.
- `redux-saga-test-plan`는 호출 순서를 테스트 할 수도 있고, 결과만 테스트 할 수도 있다. integration test도 가능하다. 4.11.2의 `callApi`사가를 테스트 해보자.
```js
import { expectSaga, testSaga } from 'redux-saga-test-plan';

test('exact order with redux-saga-test-plan', () => {
  return testSaga(callApi, 'url')
    .next()
    .select(selectFromState)
    .next()
    .call(myApi, 'url', valueFromSelect);
});
```
- `testSaga`에 테스트할 사가를 넣고 메서드를 체이닝하는 형태로 작성된다. `next`로 사가를 한스탭씩 실행하고 `select`, `call`등 실행되어야 할 Effect를 assert한다. 특이하게 return문에 작성해줘야 하는가보다.
- 다음은 순서를 따지지 않고 원하는 내용만 테스트하는 방식이다.
```js
test('recorded effects with redux-saga-test-plan', () => {
  return expectSaga(callApi, 'url')
    .put(success(value))
    .call(myApi, 'url', value)
    .run();
});

test('test only final effect with .provide()', () => {
  return expectSaga(callApi, 'url')
    .provide([
      [select(selectFromState), selectedValue],
      [call(myApi, 'url', selectedValue), response]
    ])
    .put(success(response))
    .run();
});
```
- 둘 다 expectSaga에 테스트할 사가를 넣고, 메서드 체이닝 하게 된다. 마지막에 `run()`으로 사가를 실행시켜야만 테스트가 동작한다.
- 첫번째는 `put`의 동작을 테스트한다. `call`메서드로 call 이펙트의 반환값을 mocking한다.
- 두번째는 `provide` 메서드로 여러개의 effect의 호출결과 예상되는 값을 mocking할 수 있다.(selector결과, api 호출결과) 그리고 사가의 ***마지막 effect***를 테스트 할 수 있다.

- 다음은 Reducer와 연결하는 Integration Test이다.
```js
test('integration test with withReducer', () => {
  return expectSaga(callApi, 'url')
    .withReducer(myReducer)
    .provide([
      [call(myApi, 'url', value), response]
    ])
    .hasFinalState({
      data: response
    })
    .run();
})
```
- `withReducer`메서드로 실제 리듀서를 연결한다.
- `provide` 메서드로 api를 호출하는 `call` 이펙트의 반환값을 mocking한다.
- `hasFinalState` 메서드로 최종 store의 상태값을 알 수 있다.

### effectMiddlewares​
- 라이브러리 없이 native 방식으로 사가와 리덕스를 연결해서 테스트하는 방식이다. 제대로 된 설명은 없어서 정리하지 않는다.