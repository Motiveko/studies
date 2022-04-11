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