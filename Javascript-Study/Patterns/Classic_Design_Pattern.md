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
- ### [JavaScript MV* Patterns](#JavaScript-MV*-Patterns-1)
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
- 안티 패턴은 ***어떤 문제에 대한 잘못된 해결책***을 의미한다. 
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

| Name | Class/Obj | Desc |
|---|---|---|
|`Factory Method`|`Class`| TODO |
|`Abstract Factory`|`Object`| TODO |
|`Builder`|`Object`| TODO |
|`Prototype`|`Object`| TODO |
|`Singleton`|`Object`| TODO |


<br>

### 2. Structural Design Patterns
- 객체의 합성이나 다른 객체와의 관계를 알기 쉽게 만드는 방법에 대한 패턴
- 시스템의 특정 부분이 바뀌어도 전체 시스템이 똑같이 변해야 하지 않도록 해준다.

| Name | Class/Obj | Desc |
|---|---|---|
|`Adapter`|`Class` `Object`| TODO |
|`Bridge` |`Object`| TODO |
| `Composite` |`Object`| TODO |
| `Decorator` |`Object`| TODO |
| `Facade` |`Object`| TODO |
| `Flyweight` |`Object`| TODO |
| `Proxy` |`Object`| TODO |


<br>

### 3. Behavioral Design Patterns
- 여러 객체간의 커뮤니케이션을 개선하는 방식에 대한 패턴

| Name | Class/Obj | Desc |
|---|---|---|
|`Interpreter`|`Class`| TODO |
|`Template Method`|`Class`| TODO |
|`Chain of Responsibility` |`Object`| TODO |
| `Command` |`Object`| TODO |
| `Iterator` |`Object`| TODO |
| `Mediator` |`Object`| TODO |
| `Memento` |`Object`| TODO |
| `Observer` |`Object`| TODO |
| `State` |`Object`| TODO |
| `Strategy` |`Object`| TODO |
| `Visitor` |`Object`| TODO |

> TODO : 표의 Desc를 지금 정리해봐야 의미 없는거같다. 하나씩 학습할때마다 스스로 정리하자.

<br>

## JavaScript Design Patterns
### Constructor Pattern
- `Constructor`는 객체를 초기화하고 생성해 메모리 위에 올리는걸 말한다. 이 때 객체의 여러 상태값들을 정의해 **특정한 타입의 객체를 만들 수 있게 하는 패턴**이다.

> 자바스크립트에서 [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)는 객체의 prototype 기반 상속의 `문법적 설탕`이다.

<br>

1. `Object Creation`
- ES2015+ 에서 `Constructor 패턴` 없이  객체를 생성하는 방법은 3가지가 있다.

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
newObject.someKey = 'value';

// 2. Square bracket
newObject['Some Key'] = 'value';

// 3. Object.defineProperty
Object.defineProperty(newObject, 'someKey', {
  value: 'value',
  writable: true,
  enumerable: true,
  configurable: true
});

// 4. Object.defineProperties
Object.defineProperties(newObject, {
    someKey: {
        value: 'some value',
        writable: true,
    },
    anotherKey: {
        value: 'another value',
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

let civic = new Car('Honda Civic', 2009, 20000);
let mondeo = new Car('Ford Mondeo', 2010, 5000);

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
  }
}

let civic = new Car('Honda Civic', 2009, 20000);
console.log(mondeo.toString());
```
- 생성자 함수 this는 인스턴스이기 때문에 `toString`은 인스턴스 자체의 속성으로 여러 인스턴스간에 공유되지 않는다(상속x). 아래와 메서드 선언을 아래와 같이 생성자 함수의 prototype에다가 넣어줘야 공유된다.
```js
Car.prototype.toString = function() {}
```

<br>
