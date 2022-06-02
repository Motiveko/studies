# Learning JavaScript Design Patterns

> The classic JavaScript design patterns book, updated to ES2015+ syntax.

- 자료: https://www.patterns.dev/posts/classic-design-patterns/

## 목차

- ### [Introduction](#Introduction-1)
- ### [Anti-Patterns](#Anti-Patterns-1)
- ### [Categories Of Design Pattern](#Categories-Of-Design-Pattern-1)
- ### [JavaScript Design Patterns](JavaScript-Design-Patterns-1)
  - ### [Constructor Pattern](#Constructor-Pattern-1)
  - ### [Module Pattern](#Module-Pattern-1)
  - ### [Revealing Module Pattern](#Revealing-Module-Pattern-1)
  - ### [Singleton Pattern](#Singleton-Pattern-1)
  - ### [Observer Pattern](#Observer-Pattern-1)
  - ### [Mediator Pattern](#Mediator-Pattern-1)
  - ### [Prototype Pattern](#Prototype-Pattern-1)
  - ### [Command Pattern](#Command-Pattern-1)
  - ### [Facade Pattern](#Facade-Pattern-1)
  - ### [Factory Pattern](#Factory-Pattern-1)
  - ### [Mixin Pattern](#Mixin-Pattern-1)
  - ### [Decorator Pattern](#Decorator-Pattern-1)
  - ### [Flyweight Pattern](#Flyweight-Pattern-1)
- ### [JavaScript MV\* Patterns](#JavaScript-MV*-Patterns-1)
  - ### [MVC Pattern](#MVC-Pattern-1)
  - ### [MVP Pattern](#MVP-Pattern-1)
  - ### [MVVM Pattern](#MVVM-Pattern-1)
- ### [Modular Design Patterns for Classic JavaScript](#Modular-Design-Patterns-for-Classic-JavaScript-1)
  - ### [AMD](#AMD-1)
  - ### [CommonJS](#CommonJS-1)
  - ### [UMD](#UMD-1)
- ### [Design Patterns In jQuery](#Design-Patterns-In-jQuery-1)
  - ### [Composite Pattern](#Composite-Pattern-1)
  - ### [Adapter Pattern](#Adapter-Pattern-1)
  - ### [Facade Pattern](#Facade-Pattern-1)
  - ### [Observer Pattern](#Observer-Pattern-1)
  - ### [Iterator Pattern](#Iterator-Pattern-1)
  - ### [Lazy Initialization Pattern](#Lazy-Initialization-Pattern-1)
  - ### [Proxy Pattern](#Proxy-Pattern-1)
  - ### [Builder Pattern](#Builder-Pattern-1)
- ### [jQuery Plugin Design Patterns](#jQuery-Plugin-Design-Patterns-1)
- ### [JavaScript Namespacing Patterns](#JavaScript-Namespacing-Patterns-1)
- ### [Conclusions](#Conclusions-1)
- ### [References](#References-1)

<br><br>

## Introduction

- 디자인 패턴은 Christopher Alexander라는 건축가가 자신의 건축 경험에서 어떤 패턴을 반복할 때 최적의 효과를 이끌어 낸다는 사실을 발견한데서 시작됨
- 1995년 출간된 'Design Patterns: Elements Of Reusable Object-Oriented Software' 라는 책은 대표적인 디자인 패턴 책, Gang of Four(GoF)라는 4명의 엔지니어가 썼다.
- 이 책에는 자주 쓰이는 23가지 핵심 객체 지향 디자인 패턴 외의 여러가지 개발 기술과 함정을 알려준다.

<br>

## Anti-Patterns

- 안티 패턴은 **_어떤 문제에 대한 잘못된 해결책_**을 의미한다.
- 개발하다보면 나도모르게 안티패턴으로 개발하게 되는데, 앱의 수명이 길면 이 안티패턴을 계속해서 반복하게 된다.
- 대표적인 안티패턴을 잘 알고있어야 실수를 방지하고, 안티패턴을 발견했을 때 리팩터링을 할 수 있따.
- JS에서 대표적인 안티패턴은 아래와 같다.
  1. 전역 컨텍스트에 많은 변수 선언으로 전역 네임스페이스 오염
  2. `setTimeout`, `setInterval`에 콜백 함수가 아닌 string같은걸 전달하면 내부적으로 `eval()`을 사용한다.
  3. **`Object` 클래스의 프로토타입 수정**
  4. Using JavaScript in an inline form as this is inflexible
  5. `document.createElement`같은 DOM 생성 요소를 안쓰고 `document.write`를 쓰는 [케이스](http://jsfiddle.net/addyosmani/6T9vX/)

<br>

## Categories Of Design Pattern

각각의 디자인 패턴은 특정한 **객체 지향 디자인**에 집중하는 경향이 있는데, 이를 통해서 몇가지 카테고리로 나눌 수 있다.

### 1. Creational Pattern

- 특정 상황에서의 객체의 생성 방법에 대한 디자인 패턴

| Name               | Class/Obj | Desc |
| ------------------ | --------- | ---- |
| `Factory Method`   | `Class`   | TODO |
| `Abstract Factory` | `Object`  | TODO |
| `Builder`          | `Object`  | TODO |
| `Prototype`        | `Object`  | TODO |
| `Singleton`        | `Object`  | TODO |

<br>

### 2. Structural Design Patterns

- 객체의 합성이나 다른 객체와의 관계를 알기 쉽게 만드는 방법에 대한 패턴
- 시스템의 특정 부분이 바뀌어도 전체 시스템이 똑같이 변해야 하지 않도록 해준다.

| Name        | Class/Obj        | Desc |
| ----------- | ---------------- | ---- |
| `Adapter`   | `Class` `Object` | TODO |
| `Bridge`    | `Object`         | TODO |
| `Composite` | `Object`         | TODO |
| `Decorator` | `Object`         | TODO |
| `Facade`    | `Object`         | TODO |
| `Flyweight` | `Object`         | TODO |
| `Proxy`     | `Object`         | TODO |

<br>

### 3. Behavioral Design Patterns

- 여러 객체간의 커뮤니케이션을 개선하는 방식에 대한 패턴

| Name                      | Class/Obj | Desc |
| ------------------------- | --------- | ---- |
| `Interpreter`             | `Class`   | TODO |
| `Template Method`         | `Class`   | TODO |
| `Chain of Responsibility` | `Object`  | TODO |
| `Command`                 | `Object`  | TODO |
| `Iterator`                | `Object`  | TODO |
| `Mediator`                | `Object`  | TODO |
| `Memento`                 | `Object`  | TODO |
| `Observer`                | `Object`  | TODO |
| `State`                   | `Object`  | TODO |
| `Strategy`                | `Object`  | TODO |
| `Visitor`                 | `Object`  | TODO |

> TODO : 표의 Desc를 지금 정리해봐야 의미 없는거같다. 하나씩 학습할때마다 스스로 정리하자.

<br>

## JavaScript Design Patterns

### Constructor Pattern

- `Constructor`는 객체를 초기화하고 생성해 메모리 위에 올리는걸 말한다. 이 때 객체의 여러 상태값들을 정의해 **특정한 타입의 객체를 만들 수 있게 하는 패턴**이다.

> 자바스크립트에서 [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)는 객체의 prototype 기반 상속의 `문법적 설탕`이다.

<br>

1. `Object Creation`

- ES2015+ 에서 `Constructor 패턴` 없이 객체를 생성하는 방법은 3가지가 있다.

```js
// 1
const newObject = {};

// 2
const newObject = Object.create(Object.prototype);

// 3. Object constructor. 특정 타입의 객체를 만드는게 아니라서 Constructor패턴이 아니다.
const newObject = new Object();
```

- 이렇게 만든 객체는 빈 객체다. 특정 타입의 객체를 만들기 위해서는 상태(프로퍼티)가 필요한데, ES2015+에서 객체에 프로퍼티를 할당하는 방법은 대략 4가지가 존재한다.

```js
// 1. Dot
newObject.someKey = "value";

// 2. Square bracket
newObject["Some Key"] = "value";

// 3. Object.defineProperty
Object.defineProperty(newObject, "someKey", {
  value: "value",
  writable: true,
  enumerable: true,
  configurable: true,
});

// 4. Object.defineProperties
Object.defineProperties(newObject, {
  someKey: {
    value: "some value",
    writable: true,
  },
  anotherKey: {
    value: "another value",
    writable: false,
  },
});
```

- `객체의 템플릿`을 만들어 위의 객체 생성 + 속성 할당을 한번에 할 수 있게 하는 패턴을 Constructor Pattern(생성자 패턴)이라고 한다.

<br>

2. Basic Constructors

- ES2015+ 에서는 class의 constructor를 이용해 `객체의 템플릿`을 정의할 수 있다.

```js
class Car {
  constructor(model, year, miles) {
    this.model = model;
    this.yaer = year;
    this.miles = miles;
  }

  toString() {
    return `${this.model} has done ${this.miles} miles`;
  }
}

let civic = new Car("Honda Civic", 2009, 20000);
let mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());
```

- 참고로 class의 메서드는 클래스의 프로토타입에 존재하는 속성이라 모든 인스턴스가 하나의 메서드를 공유한다.
- ES2015이전에는 `생성사 함수`를 이용해 객체의 템플릿을 만들었다.

```js
function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;

  this.toString = function () {
    return this.model + " has done " + this.miles + " miles";
  };
}

let civic = new Car("Honda Civic", 2009, 20000);
console.log(mondeo.toString());
```

- 생성자 함수 this는 인스턴스이기 때문에 `toString`은 인스턴스 자체의 속성으로 여러 인스턴스간에 공유되지 않는다(상속x). 아래와 메서드 선언을 아래와 같이 생성자 함수의 prototype에다가 넣어줘야 공유된다.

```js
Car.prototype.toString = function () {};
```

<br>

## Module Pattern

- `모듈 패턴`은 기본적으로 `public`, `private` 접근자를 제공해 객체의 캡슐화를 이루는걸 말한다.
- **_자바스크립트는 private 접근자의 개념이 없기 때문에 `클로저`개념을 사용해서 써서 캡슐화를 구현한다._**
- ES6+ 에서는 import/export 문법이 나와서 쉽게 구현 가능하다. ES5 이전에는 `즉시실행함수`를 이용해 캡슐화를 구현했다.

### 1. ES6+

- `private`으로 사용할 값은 `export` 하지 않고 모듈 내에서 선언해서 사용하기만 한다.
- `public`으로 사용할 값은 `export` 키워드로 모듈 밖으로 공개한다.

```js
// Module Pattern 1
let counter = 0;
const testModule = {
  incrementCounter() {
    return counter++;
  },
  resetCounter() {
    console.log(`counter value prior to reset: ${counter}`);
    counter = 0;
  },
};

export default testModule;
```

```js
// Usage
import testModule from "./testModule";

testModule.incrementCounter();
testModule.resetCounter();
```

- Module에서 선언한 `counter`는 private으로써 모듈 밖에서 직접 참조가 불가능하고, `public method`인 `incrementCounter`나 `resetCounter`를 통해서만 접근 가능하다.

```js
// Module Pattern 2
const userApi = () => {

  // private property
  const users = [];

  const addUser = (name) => {
    users.push(name);
    return users.slice(-1)[0];
  }

  const getAllUsers = () => {
    return users;
  }

  const deleteUser = (name) => {
    const userIndex = users.indexOf(name);
    if(userIndex < 0) {
      throw new Error('User not found');
    }

    users.splice(userIndex, 1);
  }

  const updateUser = (name, newName) => {
    const userIndex = users.indexOf(name);
    if(userIndex < 0) {
      throw new Error('User not found');
    }
    users[userIndex] = newName;
  }

  // public method
  return {
    addUser,
    getAllUsers,
    deleteUser,
    updateUser
  }
}

// Usage
const api = userApi();
...
```

- 패턴 예시 2는 여기[https://dev.to/twinfred/design-patterns-in-javascript-1l2l]를 참고하였다

> 공부하다보니 다음장의 `Revaeling Module Pattern` 이 2번의 예제다. 모듈 패턴을 세부적으로 나누자면 이렇게 나눈다고 하는듯..

<br>

### 2. ES5

- ES5는 ESM이 존재하지 않는다. `즉시 실행 함수`와 클로저를 이용해서 모듈 패턴을 구현한다.

```js
// Module Pattern
var testModule = (function () {
  var counter = 0;

  return {
    incrementCounter: function () {
      return counter++;
    },
    resetCounter: function () {
      console.log("counter value prior to reset: " + counter);
      counter = 0;
    },
  };
})();

// Usage
testModule.incrementCounter();
// Check the counter value and reset // Outputs: counter value prior to reset: 1
testModule.resetCounter();
```

<br>

### Module Pattern Variation

> 여러개 있는데 솔직히 한개도 제대로 이해 안된다. 나중에 다시 보도록 하자.

1. Import mixins

- jquery, underscore 같은 모듈을 import해서 private method로 alias 할 수 있다.

```js
// Module Pattern
import $ from "jquery";
import _ from "underscore";

const privateMethod1 = () => {
  $(".container").html("test");
};

const privateMethod2 = () => {
  console.log(_.min([10, 5, 100, 2, 1000]));
};

const myModule = {
  publicMethod1() {
    privateMethod1();
  },
  publicMethod2() {
    privateMethod2();
  },
};

// Default export module, without name
export default myModule;

// Usage
// Import module from path
import myModule from "./MyModule";

myModule.publicMethod1();
```

2. Exports

- global 변수를 네임스페이스를 소비하지 않고 선언한다.

```js
// Module object
const module = {};
const privateVariable = "Hello World";

const privateMethod = () => {
  // ...
};

module.publicProperty = "Foobar";
module.publicMethod = () => {
  console.log(privateVariable);
};

// Default export module, without name
export default module;
```

3. Modern Module Pattern with [WeakMap](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

- `WeakMap`객체는 key값으로 객체를 사용하고 key에 대한 약한 참조를 가지는 Map이다.
  - key가 원시값이 아닌 객체이기 때문에 약한 참조를 가진다고 표현한다. WeakMap 밖에서 key에 대한 참조가 사라지면 해당 key는 가비지 컬렉션 대상이 되어 키 참조가 사라진다. 키가 제거되면 값도 당연히 가비지 컬렉션 대상이 된다.
  - `WeakMap`의 키는 약한 참조로 인해서 열거(순회)할 수 없다. 순회 할 수 있다면 강하게 참조하고 있는것이다.
- WeakMap 객체를 이용해서 모듈패턴을 구현할 수 있다.

```js
// Module Pattern 1
let _counter = new WeakMap();

class Module {
  constructor() {
    _counter.set(this, 0); // key가 Module클래스 인스턴스다
  }

  incrementeCounter() {
    let counter = _counter.get(this);
    counter++;
    _counter.set(this, counter);

    return _couter.get(this);
  }
  resetCounter() {
    console.log(`counter value prior to reset: ${_counter.get(this)}`);
    _counter.set(this, 0);
  }
}

// Usage
const testModule = new Module();

testModule.incrementCounter();
testModule.resetCounter();
```

```js
// Module Pattern 2: Namespaces with Public/Private variables
const myPrivateVar = new WeakMap();
const myPrivateMethod = new WeakMap();

class MyNamespace {
  constructor() {
    // private property,method
    myPriavteVar.set(this, 0);
    myPrivateMethod.set(this, (foo) => console.log(foo));

    // public property
    this.myPublicVar = "foo";
  }
  // public 메서드
  myPublicFunction(bar) {
    let privateVar = myPrivateVar.get(this);
    const privateMethod = myPrivateMethod.get(this);

    privateVar++;
    myPrivateVar.set(this, privateVar);

    privateMethod(bar);
  }
}
```

<br>

## [Revealing Module Pattern](https://www.patterns.dev/posts/classic-design-patterns/#revealingmodulepatternjavascript)

- `Revealing Module Pattern`은 `private`/`public` 프로퍼티를 모두 private scope에 정의한 후 public으로 쓸 것만 객체 리터럴로 묶어서 export 하는 패턴을 말한다. 모듈 패턴 안에서 세부적인 방식을 나누면 이렇게 나누는 것 같다.

<br>

### ES6+

```js
// Revealing Module Pattern
let privateVar = "Ben Cherry";
const publicVar = "Hey there!";

const privateFunction = () => {
  console.log(`Name:${privateVar}`);
};

const publicSetName = (strName) => {
  privateVar = strName;
};

const publicGetName = () => {
  privateFunction();
};

// 공개할 것만 객체 리터럴로 묶어서 내보낸다.
const myRevealingModule = {
  setName: publicSetName,
  greeting: publicVar,
  getName: publicGetName,
};

export default myRevealingModule;
```

- 위의 예처럼 객체 리터럴로 묶을때 프로퍼티 명을 바꾸고 싶으면 리터럴에서 바꾸면 된다.

<br>

### ES5

```js
// Revealing Module Pattern
var myRevealingModule = (function () {
  var privateVar = "Ben Cherry",
    publicVar = "Hey there!";
  function privateFunction() {
    console.log("Name:" + privateVar);
  }

  function publicSetName(strName) {
    privateVar = strName;
  }

  function publicGetName() {
    privateFunction();
  }

  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName,
  };
})();
```

- ES5 에서는 역시 `즉시실행함수`를 이용하여 모듈을 구현할 수 있다.
- `Revealing Module Pattern`의 단점은, 만약 private 함수가 public 함수를 참조(사용)하고 있을 경우 public 함수를 오버라이딩 할 수 없다는 것이다. private도 public도 전부 private scope에 정의되어 있기 때문에 public을 오버라이딩 한다고 한들 private은 이전 public 함수를 참조하고 있을 것이기 때문이다. 따라서 RevealingMoudle 패턴은 기본 Module 패턴으로 생성된 모듈보다 취약할 수 있다.

<br>

## Singleton Pattern

- `Singleton`은 애플리케이션 전역에 특정 클래스의 인스턴스가 한개만 존재해야할 때 쓸 수 있는 패턴이다.
- `Singleton`과 `Static Instance`의 차이는 싱글톤은 지연 생성(lazily constructed)가 가능하다는 것이다.

<br>

### ES6

```js
// Pattern 1
let instance;

// Private methods and variables
const privateMethod = () => {
  console.log("private method");
};
const privateVariable = "private variable";

class MySingleton {
  constructor() {
    if (!instance) {
      // Public property
      this.publicProperty = "I am also public";
      instance = this;
    }

    return instance;
  }
  publicMethod() {
    console.log("public method use private method");
    privateMethod();
  }

  getPrivateVaribale() {
    return privateVariable;
  }
}
export default MySingleton;
```

- `MySingleton`은 매번 `new MySingleton()`으로 생성해도 반환되는 인스턴스는 똑같다.
- 생성자를 아래와 같이 작성하면 Singleton이 아니게 되니 주의해야한다.

```js
// Bad Pattern
let instance;
class BadSingleton {
  constructor {
    this.publicProperty = 'public';
    instance = this;  // 여기서 매번 새로운 인스턴스가 할당되게 된다.
    return instance;
  }
}
```

- 보통 다른 언어에서는 class의 `static method`로 `getInstance()`같은걸 만들어서 한개의 인스턴스만 반환하도록 구현한다. 자바스크립트에는 `static`이 없기때문에 아래와 같이 흉내낼 수 있다.

```js
// Pattern 2
class Singleton {
  constructor(options = {}) {
    this.options = options;
  }
}

let instance;

const SingletonWrapper = {
  getInstance(options) {
    if (instance === undefined) {
      instance = new Singleton(options);
    }
    return instance;
  },
};

export default SingletonWrapper;

// Usage
const instance = SingletonWrapper.getInstance();
```

<br>

### ES5

```js
var mySingleton = (function () {
  // Instance stores a reference to the Singleton
  var instance;
  function init() {
    function privateMethod() {
      console.log("call privateMethod");
    }

    var privateVariable = "private variable";

    return {
      publicMethod: function () {
        console.log("publicMethod will call privateMethod");
      },
      publicProperty: "I am also public",
    };
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }

      return instance;
    },
  };
})();
```

- https://www.patterns.dev/posts/singleton-pattern/
- 싱글톤 패턴은 자바스크립트에서는 `안티패턴`으로 취급되며, 싱글톤 패턴을 쓰지 않을 수 있는 여러가지 방법이 존재한다.

<br>

## Observer Pattern
- [자료1(기본)](https://www.patterns.dev/posts/observer-pattern/), [자료2(심화)](https://www.patterns.dev/posts/classic-design-patterns/#observerpatternjavascript)
- 옵저버 패턴은 **옵저버블 객체가 변경 발생시 모든 옵저에게 변경을 알려주는 패턴이다. 이 때 옵저버블은 자신이 의존하는 옵저버에 대해 몰라도 된다.**
- 옵저버블 객체(`Subject`)는 아래의 요소로 이뤄진다.
  - `observers`: 옵저버블 객체의 상태변화 등의 이벤트 발생시 알림받을 옵저버들
  - `subscribe()`: 옵저버 리스트에 옵저버를 추가하는 함수
  - `unsubscribe()`: 옵저버 리스트에서 옵저버를 제거하는 함수
  - `notify()`: 옵저버들에게 이벤트를 알려주는 함수

<br>

### Observer Pattern 기본

- 아래는 가장 간단한 형태의 옵저버블이다
```js
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter(observer => observer !== func);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

export default new Observable();
```
- 이걸 이용해서 버튼/토글 클릭시 toast를 띄우는 예제를 만들어 본다. 기본 마크업(react)는 아래와 같이 구성된다.

```jsx
// ...
import observable from './Observable'

function handleClick() {
  observable.notify("User clicked button!");
}

function handleToggle() {
  observable.notify('User toggled switch');
}


function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function toastify(data) {
  // ..toast 표시
}

export default function App() {

  useEffect(() => {
    observable.subscribe(logger);
    observable.subscribe(toastify);
    return () => {
      observable.unsubscribe(logger);
      observable.unsubscribe(toastify);
    }
  }, []);

  return 
    <div className="App">
      <Button onClick={handleClick} >Click me!</Button>
      <FormControlLabel control={<Switch onChange={handleToggle}/>} />
      <ToastContainer />
    </div>
}
```
- 리액트 기준으로 구현하였다. 주의할점은 옵저버블에 옵저버를 추가하고 나서 안쓰게 될 때 반드시 `unsubscribe()`로 참조를 제거해줘야 메모리 누수가 없다는 것이다.
- 옵저버 패턴은 비동기, 이벤트 기반 데이터를 다룰 때 매우 유용하다. 다운로드 등이 완료되었을 때 이벤트를 전달하거나 메시지 등을 주고받을 때 사용할 수 있다. 대표적으로 `RxJS`가 옵저버 패턴 기반으로 이뤄져있다. ***`RxJS`는 옵저버 패턴 + 이터레이터 패턴 + 함수형 프로그래밍을 이용해서 이벤트 시퀀스를 처리한다.***
- 옵저버 패턴을 잘쓰면 객체 지향에서의 관심사의 분리(Seperation of concerns)와 단일 책임 원칙(Single Responsibility Principle)을 잘 구현할 수 있게 된다.

<br>

### Observer Pattern 심화
- 기본에서는 옵저버는 단순한 함수로, 옵저버블은 subscribe/unsubscribe/notify의 기본 메서드만 존재했었다. 이걸 상속/확장해서 더 다양한 형태의 옵저버블 패턴을 구현할 수 있다.
- 대표적으로 RxJS에서 기본적으로 옵저버는 `[next, error, complete]`형태의 3개의 함수를 가진 배열 형태의 객체가 된다. 옵저버블(서브젝트)는 훨씬 복잡한 다양한 형태로 구성된다.
- 이걸 정리하면 아래 4개의 컴포넌트로 옵저버 패턴을 사용하게 된다.
  - `Subject`: 옵저버블
  - `Observer`: 기본 옵저버
  - `ConcreteSubject`: Subect를 상속해서 필요한 기능을 구현한 옵저버블
  - `ConcreteObserver`: 기본 옵저버를 상속해서 확장한 옵저버
- [Observable Pattern 디렉토리]('/Observable_ Pattern')에 자세하게 구현되어 있다. 설명은 아래와 같다.
  - `#mainCheckbox`은 `ConcreteSubject`로 래핑되어 자신의 checked 상태를 옵저버들에게 전파한다.
  - add 버튼 클릭시 `input type='checkbox'`을 DOM에 추가한다. 이 객체는 `ConcreteObserver`로 래핑되고 `ConcreteSubject`객체에 옵저버로 등록된다.
  - 참고로, es5에서 `ConcreteSubject`, `ConcreteObserver`구현시 상속을 구현해야하는데, 아래와 같은 함수로 구현할 수 있다.
  ```js
  function extend(obj, extension) {
    // for in으로 프로토타입 프로터티까지 스캔할 수 있다!
    for (var key in extension) {
      obj[key] = extension[key];
    }
  }

  // Usage
  var controlCheckbox = document.getElementById("mainCheckbox");
  // controlCheckbox은 옵저버블(subject)가 되었다. 상속 이후 오버라이딩 등은 그냥 프로퍼티에다가 새로운 함수를 할당하는 형태로 하면 된다.
  extend(controlCheckbox, new Subject()); 
  controlCheckbox.onclick = function(){
    controlCheckbox.notify( controlCheckbox.checked );
  };
  ```
 <!-- TODO : Publish/Subscribe 패턴과의 차이는 너무 길어서 생략 -->

## Mediator Pattern
- [자료1(기본)](https://www.patterns.dev/posts/mediator-pattern/), [자료2(심화)](https://refactoring.guru/design-patterns/mediator), [자료3(typescript)](https://refactoring.guru/design-patterns/mediator/typescript/example#lang-features)
- 여러 컴포넌트간의 직접적인 통신을 중앙화 하는 패턴이다. 대표적으로 공항 관제탑을 생각하면 된다. 비행기는 이/착륙 관련한 통신을 관제탑과 하지 다른 비행기와 직접 하지 않는다.
- Mediator Pattern과 비슷한걸로 `DOM 이벤트 버블링과 이벤트 위임`이 있다. 각 노드에 직접 이벤트 바인딩 하지 않고 상위 노드에서 묶어서 처리한다.
- 대표적으로 UI에서 복잡한 폼 역시 Mediator Pattern이라고 할 수 있다. 개별 요소의 validation, 이벤트 핸들링 등은 Form(Container)에서 작성되는데, 이 폼이 Mediator이다.

<br>

### Mediator Pattern 기본
- 여러 유저들이 대화하는 채팅방 역시 `Mediator Pattern`의 일종이라고 할 수 있다. 유저는 채팅방과 대화하지 다른 유저와 직접적으로 대화하지 않는다.
- 여기서 다수 존재하는 ***`User`컴포넌트는 `Mediator`인 `ChatRoom` 객체에만 의존한다.*** 여러 컴포넌트들과의 의존성이 제거된 것이다!

```js
class ChatRoom {
  logMessage(user, message) {
    const time = new Date();
    const sender = user.getName();

    console.log(`${time} [${sender}]: ${message}`);
  }
}

class User {
  constructor(name, chatRoom) {
    this.name = name;
    this.chatRoom = chatRoom;
  }

  getName() {
    return this.name;
  }

  send(message) {
    this.chatRoom.logMessage(this, message);
  }
}
const chatroom = new ChatRoom();

const user1 = new User('고동기', chatroom);
const user2 = new User('김동기', chatroom);

user1.send("Hi there!");
user2.send("Hey!");
```

<br>

### Mediator Pattern 심화
- Mediator 패턴의 구현은 상당히 다양할 수 있다. 기본예제처럼 한가지 종류의 컴포넌트만 의존하는 경우도 있고, 다양한 형태의 컴포넌트가 의존하는 케이스도 있다. 이런걸 표준화 한 다이어그램은 아래와 같을거다.
![그림](https://refactoring.guru/images/patterns/diagrams/mediator/structure-2x.png?id=5191daa1c9d4caa36e38af3c5b7d1522)

- 위 다이어그램에 따라 간단한 예를 구현해보자. 특별하게 무슨 기능을 정의하는건 아니고 flow만 보면 된다.
```ts
// 기본적으로 Mediator는 notify 메서드 하나로 이뤄진다. 인자로 전달되는 sender, event 따른 동작을 정의하면 된다.
interface Mediator {
  notify(sender: object, event: string): void;
}

class ConcreteMediator implements Mediator {
  // 기본예제처럼 컴포넌트 형태가 아주 단순하다면 좀 더 간소화 할 수도 있다.
  private component1: Component1;
  private component2: Component2;

  constructor(component1: Component1, component2: Component2) {
    this.component1 = component1;
    this.component1.setMediator(this);
    this.component2 = component2;
    this.component2.setMediator(this);
  }

  notify(sender: object, event: string) {
    // 핵심이다. 의존하는 컴포넌트들이 notify를 호출하는것에 따라서 이어지는 로직을 여기다 정의한다. 코드를 분석하는 사람은 여기만 잘보면 되는것
    if(event === 'A') {
      this.component2.doC();
    }
    if(event === 'D') {
      this.component1.doB();
      this.component2.doC();
    }
  }
}

class BaseComponent {
  protected mediator: Mediator;

  constructor(mediator?: Mediator) {
    this.mediator = mediator;
  }

  setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

class Component1 extends BaseComponent {
  public doA(): void {
    // do something A...
    this.mediator.notify(this, 'A');
  }

  public doB: void {
    // do someting B...
  }
}

class Component2 extends BaseComponent {
  public doC(): void {
    // do something C...
  }

  public doD(): void {
    // do somethig D...
    this.mediator.notify(this, 'D');
  }
}

/**
 * The client code.
 */
const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);
```
- Mediator 패턴 자체는 기능을 하는거라기 보단 ***컴포넌트간 의존성을 제거하고 코드 flow를 보기쉽게 한데 모으는 방법이라고 할 수 있겠다.***

<br>
