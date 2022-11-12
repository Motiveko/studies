# 사내 클린 프론트엔드 강좌 학습내용 정리


## 1. 함수형 프로그래밍 이해
### 1.1 JS의 함수형 프로그래밍 요소
- 함수형 프로그래밍을 가능하게 하는것은 js에서 함수가 1급함수이기 때문이다.

### 1.1.1 first class functions
- 1급 함수란, 함수를 값으로 취급하는 것이다. 1급 함수는 다른 함수의 인자로 쓰이기도 하고 반환값으로도 쓰인다. 배열의 원소나 객체의 속성으로도 쓰일 수 있다.
```js
function foo(fn) {
  const val = 10;
  return fn(val);
}

foo((value) => value * 10); // 100
```

<br>

### 1.1.2 Closure
- 클로저를 이용하면 함수를 합성(composition)할 수 있게 된다. `calculate()`는 함수를 인자로 받아 함수를 반환(합성)해준다.
```js
function sum(a, b) {
  return a + b;
}

function divide(a, b) {
  return a / b;
}

function calculate(fn, prev) {
  // fn을 클로저로 참조하기 때문에 반환하는 함수에서도 계속 사용하는게 가능하다.
  return (next) => fn(next, prev);
}

const sum100 = calculate(sum, 100);
const divide100 = calculate(divide, 100);
sum100(20); // 120
divide100(200); // 2
```

<br>

### 1.1.3 Partial application, Currying
- 참고자료 : https://blog.rhostem.com/posts/2017-04-20-curry-and-partial-application
- 둘은 비슷하다. 결국 함수를 합성하는것인데, 이를 통해서 더 작은 함수들을 구현하고, 이를 조합해서 쓸 수 있다.

<br> 

1. Partial application
- 어떤 함수의 **인자의 일부를 미리 전달해둔** `함수`를 생성하는 것. 즉 특정 함수의 여러 인자중 몇개를 고정해 놓는것이다.
```js
// Partial Application
function partial(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  }
}

// 적용예시
function ajax(endPoint = '', search = {}) {
  // ...ajax 요청 날리기
  return Promise.resolve(res);
}

const getUser = partial(ajax, '/user'); // ajax의 endpoint를 고정한다.
getUser({ id: '1' })
  .then((res) => {
    // ....
  })
```
- `getUser()` 함수는 endpoint는 고정되어있고, search 객체만 잘 전달해서 쓰면 되는 함수가 되었다. 

> 해보면서 느끼는건 Partial Application의 구현에는 함수 인자의 순서가 중요하겠다는 것이다. 인자가 여러개일 때 중간이나 뒤의 인자들은 고정이 힘들다.


<br>

2. Currying
- `Partial Application`의 특수한 형태로, `Partial Application`은 미리 전달할 수 있는 인자의 수에 제한이 없는 반면, **`Currying`은 1개로 고정**된다.
- 이를 위해 정의된 함수의 인자의 수(`Function.length`/`Function.arity`)가 모두 전달될 때 까지 ***재귀적으로 Currying 함수를 생성***한다. 

```js
// curry 구현
function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      const args = prevArgs.concat([nextArg]);
      if(args.length >= arity) {
        return fn(...args);
      }

      return nextCurried(args);
    }
  })([])
}
```
- 재귀함수(`nextCurried`), 클로저(`fn`, `arity`), IIFE(즉시실행함수, `nextCurried`)를 사용하여 구현되어있다.
- prevArgs는 최종적으로 fn에 전달하기 위한 인자 배열로, currying함수 호출하면서 받는 nextArg를 계속 쌓아 나간다. 이 인자의 길이가 `airty`에 도달하면 fn을 호출한 값을 반환하는 것이다!
```js
function sumAll(a, b, c, d) {
  return a + b + c + d;
}

curry(summAll)(1)(2)(3);  // function
curry(summAll)(1)(2)(3)(4);  // 10
```
- IIEE를 사용하지 않고 구현할수도 있을것이다.
```js
// [추가] 나의 curry 구현, 클로저를 사용했다. arity는 인자에 넣지 않았다.
function curry(fn) {
  const arity = fn.length;
  let args = [];
  function curried(arg) {
    args = args.concat([arg]);
    if(args.length >= arity) {
      return fn(...args);
    }

    return curried;
  }

  return curried;
}
```

- `currying`은 인자를 1개만 받기 때문에, **인자의 길이 만큼 호출해야 한다는 특징**이 있다. 

<br>

- 둘 다 잘 쓰면 유용하다. `partial application`과 달리 `currying`은 인자가 1개로 고정되어 있다는 일관성이 있기 때문에(Promise의 `resolve`, `reject`가 인자가 1개인 것 처럼) 좀 더 보편적으로 많이 쓰이는 것 같다.(어디서 쓰던 일관적이고 표준적이다)
- redux의 reducer 같은것도 내부적으로 보면 currying을 이용해 `store`, `state`, ...를 순서대로 전달하게 구현되어 있다!
- Currying은 직접 구현할 필요는 없고 [`Ramda`](http://ramdajs.com/), [`lodash/fp`](https://github.com/lodash/lodash/wiki/FP-Guide) 같은 라이브러리를 쓰면 좀 더 편하게 사용 가능하다.

<br>

### 1.1.3 Composition
- 함수 합성은 함수를 연속적으로 연결/조합해서 사용하는 방식이다.
- `chaining`은 동일한 구조의 함수들(`jQuery`내부, `underscore` 내부, `RxJS` 내부..)에서만 사용 가능한 반면 Composition은 input/output이 있으면 다 연결 가능하다.
- 하나의 함수를 가지고 다양한 문제해결을 하려면 결국, 함수를 다양한 방식으로 조립 할 수 있어야 하기 때문에, Composition은 중요하다. 
- Composition 하기 좋은 함수는 함수가
  - 재사용 가능해야 하고(**아주 작은 단위**)
  - 예측 가능해야 한다.(**참조 투명성 보장**)
- 보통 함수 합성에는 `compose()`, `pipe()` 두개가 있는데, 다 똑같고 인자로 전달하는 함수의 호출 순서가 앞->뒤 / 뒤->앞 이냐의 차이 정도가 있다
```js
// pipe의 구현
const pipe = (...fns) => {
  return (...args) => {
    fns.reduce((acc, fn) => fn(acc), ...args)
  }
}

// 합성
const addHello = (str) => str + 'Hello ';
const addWorld = (str) => str + 'World!';
pipe(
  addHello,
  addWorld,
  console.log
)('');
```
- Composition 전략: 함수의 합성을 쉽고 자연스럽게 하기 위해서는 설계를 잘해야한다.
  - 원하는 동작을 **순서대로 설계**한다.
  - 필요한 **작은 함수 단위**를 결정한다.
  - **입력과 출력을 결정**하고, 함수간의 연결을 짓는다.

<br>

## 2. JS의 객체지향

- SOLID 원칙
  - https://dev-momo.tistory.com/entry/SOLID-%EC%9B%90%EC%B9%99
  - 인터페이스 구현 원칙
    - https://blog.itcode.dev/posts/2021/08/16/interface-segregation-principle