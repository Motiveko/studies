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
- Mediator Pattern과 비슷한걸로 `DOM 이벤트 이벤트 위임`이 있다. 각 노드에 직접 이벤트 바인딩 하지 않고 상위 노드에서 묶어서 처리한다.
- 대표적으로 UI에서 복잡한 폼 역시 Mediator Pattern이라고 할 수 있다. 개별 요소의 validation, 이벤트 핸들링 등은 Form(Container)에서 작성되는데, 이 폼이 Mediator이다.

- 다른 패턴과의 차이
  - `파사드 패턴` : ***파사드 패턴은 단방향 통신만 가능하지만 중재자 패턴은 양방향 통신을 지원한다.***
  - `옵저버 패턴` : ***옵저버 패턴은 1개의 publisher와 N개의 subscriber가 존재하며, observer가 pulling/push 방식을 통해 통신하지만, 중재자 패턴은 M개의 publisher와 N개의 subscriber 사이에 1개의 Mediator를 통해 통신하는 방식이다.***

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

## Prototype Pattern
### Prototype Pattern Easy
- [참고자료 1](https://www.patterns.dev/posts/prototype-pattern/)
- 자바스크립트에서 Prototype Pattern은 같은 타입의 여러 객체에서 동일한 프로퍼티를 공유하도록 하는 패턴이다. 프로토타입 체인을 이용한다. 이 때 공유하는 프로퍼티들을 가진 객체를 프로토타입 객체라고 한다.
- ES6의 `class`에서 정의한 메서드들은 자동으로 프로토타입 객체의 프로퍼티로 추가된다.(트랜스파일 해보면 알 수 있다.)
```js
// ES6
class Dog {
  name;
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}

// ES2015로 트랜스파일, 메서드를 생성자 함수의 prototype에다가 추가한다.
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.bark = function () {
        return "Woof!";
    };
    return Dog;
}());
```
- `Dog class`의 인스턴스들은 모두 동일한 `Dog.prototype.bark`를 참조한다.(`insance.__proto__.bark`)
- Dog를 상속하는 클래스를 정의하면 해당 class는 Dog.prototype을 공유한다.
```js

class SuperDog extends Dog {
  constructor(name) {
    super(name);
  }

  fly() {
    return "Flying!";
  }
}

const superDog = new SuperDog('sd');
```
- `superDog` -(`__proto__`)> `SuperDog.prototype` -(`__proto__`)> `Dog.prototype`이런 식으로 프로토타입 체인이 구성된다.
- 참고로 `extends`는 트랜스파일 해보면 `Object.setPrototypeOf`메서드를 활용하는걸 알 수 있다.
- prototype은 생성할 인스턴스의 일종의 `blueprint` 역할을 한다.
- [`Object.create`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/create)메서드를 이용해서도 프로토타입 패턴을 구현할 수 있다.
```js
// signature
Object.create(proto[, propertiesObject])

// Usage
const dog = {
  bark() {
    console.log(`Woof!`);
  }
};

const pet1 = Object.create(dog);
console.log(pet1.bark === dog.bark);  // true
```
- 위 예에서 `Object.create(dog)`로 객체 인스턴스 생성시 dog는 생성되는 모든 인스턴스의 프로토타입 객체가 되어 dog의 모든 프로퍼티를 공유하게 된다.

<br>

### Prototype Pattern 심화
- [참고자료](https://refactoring.guru/design-patterns/prototype/typescript/example#example-0)
- ***프로토타입 패턴은 어떤 객체의 `class 타입`을 몰라도 복제할 수 있게 해주는 생성 패턴이다.*** 
- 보통 자바스크립트에서 프로토타입 객체를 이용해서 프로토 타입을 구현하지만, 프로토타입 객체가 없는 다른 언어에서는 특정 객체를 복사할 수 있는 `clone`메서드를 제공하는걸 말한다.(자바에서 `implements Cloneable`)
- 위의 easy 예에서 `Object.create()`형태나 프로토타입 객체를 이용하는건 일종의 얕은 복사다. 복사한 객체가 똑같은 프로토타입 프로퍼티를 참조하는 것. 
- 깊은 복사를 하려면 복사하는 객체의 내부 참조까지 복사해야한다. `clone`메서드로 수행한다.
- 타입스크립트에서 대략 아래와 같은 형태로 구현할 수 있다.
```ts
class Prototype {
  public primitive: any;  // 원시타입 프로퍼티
  public component: object; // 객체타입 프로퍼티
  public circularReference: ComponentWithBackReference; // Prototype과 상호참조하는 프로퍼티(객체)

  public clone(): this {
    // 기본 클론, this를 프로토타입으로 해서 this가 참조하는걸 그대로 참조하는 객체가 만들어진다. 원시값은 상관 없을것이다.
    const clone = Object.create(this);
    
    // 단순 참조하는 객체를 클론한다.
    clone.component = Object.create(this.component);

    // 상호참조(circularReference)는 새로 만드는게 조금 복잡하다. 하지만 스프레드 연산자로 충분히 가능하다. shallow clone이기때문에 중첩된 객체라면 좀 더 복잡한 방법필요
    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this }
    }

    return clone;
  }
}

class ComponentWithBackReference {
    public prototype;

    constructor(prototype: Prototype) {
        this.prototype = prototype;
    }
}

// Usage
const p1 = new Prototype();
p1.primitive = 10;
p1.component = new Date();
p1.circularReference = new ComponentWithBackReference(p1);

const p2 = p1.clone();

// 원하던 진정한 클론
console.log(p1.primitive === p2.primitive)
console.log(p1.component !== p2.component)
console.log(p1.circularReference !== p2.circularReference)
```

<br>

## Command Pattern
- https://refactoring.guru/design-patterns/command
- 커맨드 패턴은 행위(Behavior) 패턴으로, 객체의 메서드와 비즈니스 로직의 결합을 느슨하게 하는데 주 목적을 가진다.
- 예를 들어, **UI 버튼과 비즈니스 로직이 강하게 결합**했다면 어떻게 될까? 비즈니스 로직별로 버튼 구현체를 하나씩 만들어야 할 것이다. 그리고 어떤 버튼의 클릭시 수행 로직은 다른 오브젝트나 이벤트(토글을 누른다거나 x아이콘을 누르거나, 키보드 이벤트)가 수행하는 로직과 똑 같을수 있다. 강하게 결합하면 똑같은 로직을 수행하는 다른 객체들 역시도 전부 따로 만들어 줘야 한다. 

  ![강한결합](https://refactoring.guru/images/patterns/diagrams/command/solution1-en.png?id=ec37db1713fe2c1a9318886590667cfb)

- 커맨드 패턴으로 비즈니스 로직을 추상화 해서 느슨한 결합을 이루면, 이런 중복들을 제거하고 수정에 유연하게 대처할 수 있게 된다. 

  ![느슨한결합](https://refactoring.guru/images/patterns/diagrams/command/solution2-en.png?id=63bcac5cde2ec536c3329eff4c385839)


- 프로토타입 패턴처럼 여러방식의 구현이 있다. 타입스크립트냐 순수 자바스크립트냐에 따라서도 다르다. 공통점은 `execute()`나 `run()`메서드를 가진 Command 객체를 통해 메서드 로직을 추상화 한다는 것이다.
- ***커맨드 패턴이 쓰이는 예***는 아래와 같다.
  - 
  - **operation history를 추적하기 위함**
  - **operation queueing**

> 사실 어찌보면 addEventListener('event', fn) 에서 fn을 전달하는것 자체가 이미 Command 패턴이라고 할 수 있다. 함수는 callee니까 `execute` 하마만 있는 Command객체와 같이 볼 수 있다.

<br>

### Command Pattern Easy1
- [자료 Easy1](https://www.patterns.dev/posts/classic-design-patterns/#commandpatternjavascript)
- 아래와 같이 주문내역을 상태로 가지고, 추가/확인/취소 메서드를 가진 `OrderManager`객체가 있다.
```js
class OrderManager {
  constructor() {
    this.orders = [];
  }

  placeOrder(order, id) {
    this.orders.push({id, order});
    return `You have successfully ordered ${order} (${id})`;
  }

  traceOrder(id){
    return `Your order ${id} will arrive in 20 minutes.`
  }

  cancelOrder(id) {
    this.orders = this.orders.filter(order => order.id !== id);
    return `You have canceled your order ${id}`
  }
}

// Usage
const manager = new OrderManager();

manager.placeOrder("Pad Thai", "1234");
manager.trackOrder("1234");
manager.cancelOrder("1234");
```
- 메서드와 비즈니스 로직이 강하게 결합되어 있다. 이걸 커맨드 패턴으로 추상화 하면 아래와 같이 바꿀 수 있다.
```js
class OrderManager {
  constructor() {
    this.orders = [];
  }

  execute(command, ...args) {
    return command.execute(this.orders, ...args);
  }
}

class Command {
  constructor(execute) {
    this.execute = execute;
  }
}

function PlaceOrderCommand(order, id) {
  return new Command(orders => {
    orders.push({id, order});
    return `You have successfully ordered ${order} (${id})`;
  })
}

function TraceOrderCommand(id) {
  return new Command(() => {
    return `Your order ${id} will arrive in 20 minutes.`;
  })
}

function CancelOrderCommand(id) {
  return new Command((orders) => {
    orders = orders.filter(order => order.id !== id);
    return `You have canceled your order ${id}`;
  })
}

// Usage
const manager = new OrderManager();
manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TraceOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));
```
- 순수 자바스크립트로 구현했는데, 여기서는 비즈니스 로직을 `*Command`함수로 구현했다. 
- `OrderManager`는 `execute`메서드 하나만 가지고, 호출하는 측에서 원하는 로직을 담은 Command를 인자로 넘기기만 하면 된다. OrderManager에서 Command의 제약조건은 `orders` 객체를 인자로 받는다는 점이다.(물론 Trace처럼 안받아도 그만)
- 이렇게 하면 ***`OrderManager`와 기존 비즈니스 로직이 느슨하게 결합되었고, Command에 구현된 로직은 다른 객체에서도 얼마든지 사용할 수 있게 된다.***

> 공부하면서 드는 생각이, 이거 `Function.prototype.call()`아닌가!? 자바스크립트처럼 함수를 일급 객체로 쓸 수 있는 언어는 커맨드 패턴이 필요가 없을지도 모른다!

<br>

### Command Pattern Easy2
- [자료 Easy2](https://www.patterns.dev/posts/command-pattern/)
- Command 인터페이스의 예로 작업과 실행 메서드(`run`, `execute`)를 하나의 객체로 묶는식으로 만들 수 있다. 이렇게 하면 Command 인터페이스를 만족하는 어떤 구현체로든 쉽게 교체할 수 있다고 한다.
- 간단한 자동차 구매 서비스를 구현한다.
```js
const carManager = {
  // request information
  requestInfo(model, id) {
      return `The information for ${model} with ID ${id} is foobar`;
  },

  // purchase the car
  buyVehicle(model, id) {
      return `You have successfully purchased Item ${id}, a ${model}`;
  },

  // arrange a viewing
  arrangeViewing(model, id) {
      return `You have successfully booked a viewing of ${model} ( ${id} ) `;
  },
}
```
- vanilla js에는 interface가 없기 때문에 객체 리터럴로 바로 정의해벌였다.
- `carManager` 객체의 action(Command)들을 정의했다. 호출부는 `execute`메서드로 정의한다.
```js
carManager.execute = function(name) {
  return (
    carManager[name] && 
    carManager[name].apply(carManager, [].slice.call(arguments, 1))
  )
}

// USAGE
carManager.execute('buyVehicle', 'Ford Escort', '453543');
```
- `[].slice.call(arguments, 1)`은 arguments로 아무것도 전달 안했을 때 에러 방지를 위해 쓴 방식인 듯 하다. arguments의 두번째 요소부터 마지막까지 짜른다.

> `apply`는 두번째 인자로 arugmnet를 배열 객체로 받는다. call은 일반 함수 호출시 인자 전달처럼 `,`로 구분해서 전달해야 한다.

<br>






### Command Pattern 심화
- [Command Pattern Typescript](https://refactoring.guru/design-patterns/command/typescript/example#lang-features)
- 위의 Easy들은 사실 너무 간단한 예다. 애초에 인터페이스도 없으니 그럴법하다. 객체지향적으로 Command 패턴을 도식화하면 아래 그림과 같다.
  ![Command Pattern](https://refactoring.guru/images/patterns/diagrams/command/structure-2x.png?id=176b5f4f1939340f44b1fdb2ac6bbfc7)

- 간단한 동작을 수행하는 커맨드 패턴을 구현해본다. `Command`, `Invoker`, `Receiver`로 구성된다. 
  - `Command`는 `execute`를 가지며, 실행 동작을 추상화 하였다.
  - `Receiver`는 필수는 아닌데, 복잡한 Command의 경우 Receiver에 있는 동작을 호출하게 된다.
  - `Invoker`는 `Command`애 대한 의존성을 가진다. 동작을 수행하면 의존하는 필요한 순서대로 Command의 execute 메서드를 호출할것이다.

```ts
interface Command {
  execute(): void;
}

class SimpleCommand implements Command {
  constructor(private payload: string){ }

  public execute(): void {
    console.log(`SimpleCommand.execute(), payload: ${this.payload}`);
  }
}

class ComplexCommand implements Command {
  constructor(
    private receiver: Receiver,
    private a: string,
    private b: string
  ) {}

  public execute(): void {
    console.log('ComplexCommand.execute()');
    receiver.doSomething1(this.a)
    receiver.doSomething2(this.a)
  }
}

class Receiver {
  public doSomething1(a: string): void {
    console.log(`Recevier.doSomething1(${a})`)
  }
  public doSomething2(b: string): void {
    console.log(`Recevier.doSomething2(${b})`)
  }
}

class Invoker {
  private onStart: Command;
  private onFinish: Command;

  public setOnStart(command: Command): void {
    this.onStart = command;
  }
  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }

  public doSomethingImportant(): void {
    console.log('Invoker: 시작')
    if(this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log('Invoker: 중간')
    if(this.isCommand(this.onFinish)) {
      this.onFinish.execute();
    }
  }

  private isCommand(object): object is Command {
    return object.execute !== undefined;
  }
}

// Usage
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand('Say Hi!'));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));
invoker.doSomethingImportant();

// ========== 결과 ==========
// Invoker: 시작
// SimpleCommand.execute(), payload: Say Hi!
// Invoker: 중간
// ComplexCommand.execute()
// Recevier.doSomething1(Send email)
// Recevier.doSomething2(Send email)
```
- 이렇게 구현했을 때 장점은 무엇일까?
- Invoker 입장에서는 `execute`메서드를 가지는 Command 인터페이스 구현체라면 뭐든 교체해서 넣을 수 있다는 것이다. ***Invoker 객체에 어떤 Command 구현체를 넣느냐에 따라 비즈니스 로직을 조정할 수 있어, Invoker를 수정하지 않고 새로운 Command를 만들어 전달하는 형태로 코드를 수정할 수 있게 된다.*** 

> [Design Pattern 커맨드 패턴이란](https://gmlwjd9405.github.io/2018/07/07/command-pattern.html) 포스팅을 참고해보자. Invoker를 건들지 않고도 Invoker의 호출 결과 실행되는 로직을 맘대로 주무를 수 있는 대단한 패턴임을 알 수 있다.

<br>

## Facade Pattern
### Facade Pattern Easy
  - https://jusungpark.tistory.com/23
  - https://gdtbgl93.tistory.com/142
  - https://www.patterns.dev/posts/classic-design-patterns/#facadepatternjavascript

- `파사드 패턴`은 ***어떤 서브시스템의 일련의 인터페이스에 대한 통함된 인터페이스를 제공한다. 파사드에서 고수준 인터페이스를 정의하기 때문에 서브시스템을 더 쉽게 사용할 수 있게 된다.***
- 어떤 로직을 수행하는데 여러 객체의 다양한 메서드를 호출하는 과정이 필요하다고 해보자. 사용자가 해당 기능을 동작하기 위해서는 복잡한 객체들과 그 메서드들, 그리고 호출 순서 등에 대해서 자세히 알아야 한다. 이 때 **파사드 객체에 고수준 인터페이스를 정의해 복잡한 객체들의 로직을 추상화 시키고, 사용자가 파사드에만 접근하도록해 사용성을 높이는게 파사드 패턴이다.** 이렇게 하면 [`최소 지식 원칙`](#추가---디메테르의-법칙the-law-of-demeter최소-지식-원칙)도 자연스럽게 지킬 수 있게 된다.
  
  ![파사드 패턴](https://refactoring.guru/images/patterns/diagrams/facade/structure.png)

- 자바스크립트에서 대표적인 파사드 패턴을 활용한 예는 `jQuery`다. 예를들어 ***Native DOM API로 DOM 이벤트 바인딩을 cross-browser를 고려해서 하는 메서드***를 작성한다고 해보자.
```js
const addMyEvent = (el, ev, fn) => {
  if(el.addEventListener) {
    el.addEventListener(ev, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent(`on${ev}`, fn);
  } else {
    el[`on${ev}`] = fn;
  }
}
```
- 다양한 브라우저에 대응해서 이벤트를 잘 바인딩 하려면 3종류의 이벤트 바인딩 방식을 모두 알고 있어야한다. 잘 모르면 실수할 여지가 충분하다. jQuery가 제공하는 인터페이스는 이를 단순화 시켜준다.
```js
$(selector).on(ev, fn);
```

<br>

- 파사드 패턴은 일반적으로 `모듈 패턴`과 같이 쓰인다. 파사드 패턴으로 공개된 `public 메서드`는 모듈 패턴으로 정의한 `private 메서드`에 대한 접근을 추상화한다.
```js
// module
const _private = {
  i: 5,
  get() {
    console.log(`current value: ${this.i}`);
  },
  set(val) {
    this.i = val;
  },
  run() {
    console.log('running');
  },
  jump() {
    console.log('jumping');
  }
}

const module = {
  facade({ val, run, jump }) {
    _private.set(val);
    _private.get();
    if(run) {
      _private.run();
    }
    if(jump) {
      _private.jump();
    }
  }
}

export default module;


// Usage
import module from './module.js';
module.facade({
  run: true,
  val: 10
})
// Outputs: "current value: 10" and "running"
```
- module의 facade 메서드로 `_private`에 대한 호출을 단순화 했다.

<br>

### Facade Pattern - Typsecript
- https://refactoring.guru/design-patterns/facade/typescript/example#example-0
- 아주 간단한 파사드 패턴을 class를 이용해서 구현한다.
```ts
class Facade {
  protected subsystem1: Subsystem1;
  protected subsystem2: Subsystem2;
  
  constructor(subsystem1: Subsystem1 = null, subsystem2: Subsystem2 = null) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  // 복잡하게 얽힌 서비시스템의 로직을 opersation 메서드로 추상화, 사용자는 이 메서드만 접근한다. -> 최소 짓식 원칙
  public operation(): string {
    let result = 'Facade initializes subsystems:\n';
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += 'Facade orders subsystems to perform the action:\n';
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();

    return result;
  }
}
class Subsystem1 {
    public operation1(): string {
        return 'Subsystem1: Ready!\n';
    }
    public operationN(): string {
        return 'Subsystem1: Go!\n';
    }
}

class Subsystem2 {
    public operation1(): string {
        return 'Subsystem2: Get ready!\n';
    }
    public operationZ(): string {
        return 'Subsystem2: Fire!';
    }
}
function clientCode(facade: Facade) {
    // ...
    console.log(facade.operation());
    // ...
}

const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();

// 이미 client가 subsystem 인스턴스를 가지고 있다면, 이걸 사용한다. 
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
```

- 위 예시에서 만약 ***`Facade`객체가 `Subsystem` 객체에 대한 라이프사이클까지 모두 관리한다면 사용자는 어떤 서브시스템이 존재하는지도 몰라도 된다. 물론 client가 직접 서브시스템 객체를 파사드에 주입하거나 메서드에 전달해야 하는 케이스도 있을것이다.***
- 파사드는 구현에 제약이 없다. 그냥 복잡한 로직을 파사드 하나로 추상화 하는 것 뿐. 파사드 패턴 사용시 고려 사항은, 성능상에 큰 문제는 없는지 정도라고 한다.

<br>

### 추가 - 디메테르의 법칙(The Law of Demeter),최소 지식 원칙
- https://coding-start.tistory.com/264
- 객체 지향 디자인 원칙 중 하나로, **'결합도가 낮은 설계'**를 위한 설계 원칙이다.
- 어떤 메소드에 강한 결합도를 가진 로직이 있으면 하나를 수정할 때 많은 곳에서 수정이 일어나기 때문에 생긴 원칙
- `어떤 객체의 메서드`가 호출할 수 있는 메서드는 아래와 같다.
  1. 객체 자기 자신의 메서드
  2. 메서드에 파라미트러 넘겨진 객체의 메서드
  3. 메서드 또는 인스턴스 변수가 직접 초기화 시킨 객체의 메서드
  4. 객체가 의존하는 인스턴스의 메서드
  5. 전역 객체의 메서드

```java
class Test {
  private A a;

  constructor(A a) {
    this.a = a;
  }

  private int method1() {
  	return 0;
  }
  
  public void example(B b) {
    C c = new C();
    int i = method1();  // 1
    b.getInteger();     // 2
    c.toString();       // 3
    a.getDouble();      // 4
  }

  // 법칙을 어기는 예
  public float getTemp(station) {
    // station의 메서드로 Thermometer 객체 생성 후 그 객체의 메서드 직접호출
    Thermometer thermometer = station.getThermometer(); 
    return thermometer.getTemperature();                        
  }

  // 개선
  public float getTemp(station) {
    // station에 애초에 getTemperature 메서드를 만들어 주는것이 좋다.
    return station.getTemperature();
  }
}
```
- 물론 이런 원칙에 너무 과몰입하면 안되겠다.

<br>

## Factory Pattern
- Factory Method 패턴이라고도 부른다. https://gmlwjd9405.github.io/2018/08/07/factory-method-pattern.html 자료는 자바로 되어있으나 예제가 너무 좋아 이걸로 정리한다. 솔직히 쓰임세가 중요한거지 뭘로 구현하느냐는 별로 안중요한듯.
- 팩토리 메서드 패턴은 ***객체의 생성 처리를 서브클래스로 분리***해서 처리하도록 캡슐화 하는 패턴이다. 캡슐화 한 만큼 ***객체 생성의 변화에 대비하는데 유용***하다.
  ![팩토리 메서드 패턴 다이어그램](https://gmlwjd9405.github.io/images/design-pattern-factory-method/factory-method-pattern.png)
- 각각의 역할은 아래와 같다.
  - `Product`: 팩토리 메서드로 생성될 객체의 인터페이스
  - `ConcreteProduct`: `Product` 구현체
  - `Createor`: `Product` 타입 객체를 반환하는 팩토리 메서드를 갖는 클래스
  - `ConcreteCreator`: Creator 구현체

### 예시 - 여러 가지 방식의 엘리베이터 스케줄링 지원
![예시 다이어그램](https://gmlwjd9405.github.io/images/design-pattern-factory-method/factory-method-example.png)
- 여러대의 엘리베이터가 적절하게 움직이도록 관리하는 기능이다.
  - `ElevatorManager`: `requestElevator()`메서드로 요청이 오면 특정 엘리베이터가 동작하도록 기능수행
  - `ElevatorController`: 엘리베이터라
  - `ThroughputScheduler`: `selectElevator()`메서드로 작업 처리량 최대화 전략으로 움직일 엘리베이터를 스케줄링

```java
public class ElevatorManager {
  private List<ElevatorController> controllers;
  private ThroughputScheduler scheduler;

  public ElevatorManager(int controllerCount) {
    controllers = new ArrayList<ElevatorController>(controllerCount);
    for(int i = 0; i < controllerCount; i++) {
      ElevatorController controller = new ElevatorController(i);
      controllers.add(controller);
    }

    scheduler = new ThroughputScheduler();
  }

  void requestElevator(int destination, Direction direction) {
    // ThroughputScheduler 이용해 d엘리베이터 선택
    int selectedElevator = scheduler.selectElevator(this, destination, direction);
    
    // 선택된 엘리베이터 이동
    controllers.get(selectElevator).gotoFloor(destination);
  }
}
```
```java
public class ElevatorController {
  private int id;
  private int curFloor;
  public ElevatorController(int id) {
    this.id = id;
    curFloor = 1;
  }

  public void gotoFloor(int destination) {
    // 엘베 이동
    System.out.print("Elevator [" + id + "] Floor: " + curFloor);
    curFloor = destination;
    System.out.println(" ==> " + curFloor);
  }
}
```
```java
public class ThroughputScheduler {
  public int selectElevator(ElevatorManager manager, int destination, Direction direction) {
    // 뭔가 적절한 엘베 index 선택해서 반환
    return 0;
  }
}
```

### 문제점 1
1. 다른 스케줄링 전략을 사용하려면?
2. 프로그램을 실행하는 중간에 스케줄링이 동적으로 변해야 한다면?
  - 예를들어 오전에는 **대기 시간 최소화 전략**을 사용하고, 오후에는 기존처럼 **처리량 최대화 전략**을 사용한다면?

- 이 문제는 `Strategy Pattern`을 이용해 스케줄러를 추상화 해서 어느정도 해결 가능하다.
```java
public class ElevatorManager {
  private List<ElevatorController> controllers;
  
  public ElevatorManager(int controllerCount) {
    controllers = new ArrayList<ElevatorController>(controllerCount);
    for (int i=0; i<controllerCount; i++) {
      ElevatorController controller = new ElevatorController(i + 1); // 변경
      controllers.add(controller);
    }
  }

  void requestElevator(int destination, Direction direction) {
    // 스케줄러 인터페이스
    ElevatorScheduler scheduler; 

    // 시간에 따라 동적으로 스케줄링 전략 선택
    int hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
    if(hour < 12) {
      scheduler = new ResponseTimeScheduler();
    } else {
      scheduler = new ThroughputScheduler();
    }
    
    int selectedElevator = scheduler.selectElevator(this, destination, direction);
    
    controllers.get(selectElevator).gotoFloor(destination);
  }
}
```
```java
public interface ElevatorScheduler {
  public int selectElevator(ElevatorManager manager, int destination, Direction direction);
}
public class ResponseTimeScheduler {
  public int selectElevator(ElevatorManager manager, int destination, Direction direction) {
    // 전략 수행하여 index 반환
  }
}
```

- 여전히 문제가 남아있다

<br>

### 문제점 2
- 여기서 엘리베이터 스케줄링 전략이 추가되거나, 스케줄링 방식을 동적으로 선택하도록 변경하려면 ***해당 스케줄링 전략을 지원하는 Scheduler 클래스를 생성***할 뿐 아니라 `requestElevator()`메서드도 수정해야 하는 상황이다.
- ***`requestElevator()`메서드의 책임은 엘베의 선택과 엘베의 이동 뿐인데, 전략에 따라 메서드 코드를 수정해야 하는 상황은 바람직하지 않다.***
- 아래와 같은 기능을 추가하려고 한다.
  1. 새로운 스케줄링 전략 추가
    - 엘리베이터 노후회 최소화 전략
  2. 동적 스케줄링 지원
    - '오전: 대기시간 최소화', '오후: 처리량 최대화' 전략의 시간대를 바꾼다.

<br>

### 문제점 2의 해결
- 문제의 해결을 위해 `requestElevator()` 메서드가 스케줄링 전략 변화에 따라 코드를 수정할 필요가 없도록, 스케줄링 전략 객체 생성 메서드는 분리해낸다.
- 이를 위해 해결하기 위해 `Factory Method 패턴`을 이용해, 적절한 스케줄 전략 객체를 생성하는 팩토리 메서드를 만든다.

  ![해결2 다이어그램](https://gmlwjd9405.github.io/images/design-pattern-factory-method/factory-method-solution2.png)

-  아래와 같이 코드를 수정한다.
```java
enum SchedulingStrategyID {
  RESPONSE_TIME, THROUGHPUT, DYNAMIC 
}

public class SchedulerFactory {
  public static ElevatorScheduler getScheduler(SchedulingStrategyID strategyID) {
    ElevatorScheduler scheduler;
    switch(strategyID) {
      case RESPONSE_TIME:
        scheduler = new ResponseTimeScheduler();
        break;
      case THROUGHPUT:
        scheduler = new ThroughputScheduler();
        break;
      case DYNAMIC:
        int hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
        // 오전: 대기 시간 최소화, 오후: 처리량 최대화
        if (hour < 12)
          scheduler = new ResponseTimeScheduler();
        else
          scheduler = new ThroughputScheduler();
        break;
    }
    return scheduler;
  }
}
```
- `ElevatorManager`에서는 `SchedulerFactory.getScheduler()` 메서드를 호출한다.
```java
public class ElevatorManager {
  private List<ElevatorController> controllers;
  private SchedulingStrategyID strategyID;

  public ElevatorManager(int controllerCount) {
    controllers = new ArrayList<ElevatorController>(controllerCount);
    for(int i = 0; i < controllerCount; i++) {
      ElevatorController controller = new ElevatorController(i);
      controllers.add(controller);
    }
  }

  // 외부에서 동적으로 사용할 스케줄링 전략을 선택할 수 있다.
  public void setStrategyID(SchedulingStrategyID strategyID) {
    this.strategyID = strategyID;
  }

  void requestElevator(int destination, Direction direction) {
    // 주어진 strategyID에 해당되는 ElevatorScheduler를 사용한다. 
    ElevatorScheduler scheduler = SchedulerFactory.getScheduler(this.strategyID);
    int selectedElevator = scheduler.selectElevator(this, destination, direction);
    controllers.get(selectedElevator).gotoFloor(destination);
  }
}
```
- `requestElevator()`메서드는 단순히 스케줄러 팩토리의 `getScheduler()`메서드를 호출하기만 하고, strategyID는 setter에 위임했다.(책임 분리)
- 새로운 스케줄러가 추가되더라도 `ElevatorScheduler` 인터페이스만 따른다면 팩토리에서 알아서 생상할 예정이므로 `requestElevator()`는 고칠 필요가 없어진다.

<br>

- 이걸 좀 더 개선해보자. 동적 스케줄링 방식(DynamicScheduler)라면 매 요청에 스케줄러 객체를 생성한느게 아닌 한번 생성한걸 재활용 하는게 나을것이다. `싱글톤 패턴`을 이용한다.
  ![https://gmlwjd9405.github.io/images/design-pattern-factory-method/factory-method-solution3.png]

- 아래와 같이 코드를 리팩토링한다.
```java
public class SchedulerFactory {
  public static ElevatorScheduler getScheduler(SchedulingStrategyID strategyID) {
    ElevatorScheduler scheduler;
    switch(strategyID) {
      case RESPONSE_TIME:
        scheduler = ResponseTimeScheduler.getInstance();
        break;
      case THROUGHPUT:
        scheduler = ThroughputScheduler.getInstance();
        break;
      case DYNAMIC:
        int hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
        // 오전: 대기 시간 최소화, 오후: 처리량 최대화
        if (hour < 12)
          scheduler = ResponseTimeScheduler.getInstance();
        else
          scheduler = new ThroughputScheduler.getInstance();
        break;
    }
    return scheduler;
  }
}
```
```java
public interface ElevatorScheduler {
  public int selectElevator(ElevatorManager manager, int destination, Direction direction);
}

public class ThroughputScheduler implements ElevatorScheduler {

  private static ElevatorScheduler scheduler;
  private ThroughputScheduler() {}

  public static ThroughputScheduler getInstance() {
    if(this.scheduler == null) {
      scheduler = new ThroughputScheduler();
    }

    return this.scheduler;
  }

  public int selectElevator(ElevatorManager manager, int destination, Direction direction) {
    // ...
  }
}

public class ResponseTimeScheduler implements ElevatorScheduler {
  // ThroughputScheduler 동일
}
```

<br>

### 다른 방법으로 팩토리 메서드 패턴 적용하기
- 상속을 이용한 팩토리 메서드 패턴도 있다. [타입스크립트-Factory Method Pattern](https://refactoring.guru/design-patterns/factory-method/typescript/example#example-0) 자료에서는 이런 형태의 방식을 설명한다.
- 상속을 이용한 구현은 ***스케줄링 전략마다  `ElevatorManager`의 자식 클래스를 만드는 방식으로 구현할 수 있다. 이 방법은 `템플릿 메서드 패턴`을 같이 이용해야 하는 방법이다.***

  ![상속을 이용한 구현](https://gmlwjd9405.github.io/images/design-pattern-factory-method/factory-method-extends1.png)

- 아래와 같이 구현한다.
```java
public abstract class ElevatorManager {
  private List<ElevatorController> controllers;

  public ElevatorManager(int controllerCount) {
    controllers = new ArrayList<ElevatorController>(controllerCount);
    for (int i=0; i<controllerCount; i++) {
      ElevatorController controller = new ElevatorController(i + 1);
      controllers.add(controller);
    }
  }
  // '팩토리 메서드' ===> 스케줄링 전략 객체를 생성하는 기능을 제공한다.
  protected abstract ElevatorScheduler getScheduler();

  // '템플릿 메서드' ===> 요청에 따라 엘베를 선택하고 이동시키는, ElevatorManager의 핵심 로직
  void requestElevator(int destination, Direction direction) {
    ElevatorScheduler scheduler = getScheduler();
    int selectedElevator = scheduler.selectElevator(this, destination, direction);
    controllers.get(selectedElevator).gotoFloor(destination);
  }
}
```
- `ElevatorManager`의 Concrete class들은 아래와 같다.
```java
public ElevatorManagerWithThroughputScheduling extends ElevatorManager {
  public ElevatorManagerWithThroughputScheduling(int controllerCount) {
    super(controllerCount);
  }

  @Override
  protected ElevatorScheduler getScheduler() {
    return ThroughputScheduler.getInstance();
  }
}

public ElevatorManagerWithDynamicScheduling extends ElevatorManager {
  public ElevatorManagerWithDynamicScheduling(int controllerCount) {
    super(controllerCount);
  }

  @Override
  protected ElevatorScheduler getScheduler() {
    ElevatorScheduler scheduler = null;

    // 0..23
    int hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
    // 오전: 대기 시간 최소화, 오후: 처리량 최대화
    if (hour < 12)
      scheduler = ResponseTimeScheduler.getInstance();
    else
      scheduler = ThroughputScheduler.getInstance();

    return scheduler;
  }
}
```
- 이 구현에서 `Product`, `Creator`의 역할은 각각 `ElevatorScheduler`, `ElevatorManager`임을 알 수 있다.

> 이렇게 놓고 보니 실질적으로 팩토리 메서드 패턴은 `상속`과 `템플릿 매서드 패턴`을 이용하는 마지막 예제가 표준인 것 같다는 생각이 든다. 다른 예제에서도 이걸 디폴트로 설명함.

<br>
