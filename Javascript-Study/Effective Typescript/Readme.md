# 이펙티브 타입스크립트 학습하기 프로젝트

![img](https://image.aladin.co.kr/product/27319/31/cover500/8966263135_1.jpg)

<br>

## 목차
---
<!-- 마크다운 목록에서 1. 한글 과 같이 한글로 시작하면 이동이 안먹는다. 5.any같이 영어는 먹는다. 해결책으로 한글로 시작하는 목록은 -1 suffix를 붙인다. -->
## [1장 타입스크립트 알아보기](#1장-타입스크립트-알아보기-1)
### [1. 타입스크립트와 자바스크립트의 관계 이해하기](#1-타입스크립트와-자바스크립트의-관계-이해하기-1)
### [2. 타입스크립트 설정 이해하기](#2-타입스크립트-설정-이해하기-1)
### [3. 코드 생성과 타입이 관계없음을 이해하기](#3-코드-생성과-타입이-관계없음을-이해하기-1)
### [4. 구조적 타이핑에 익숙해지기](#4-구조적-타이핑에-익숙해지기-1)
### [5. any 타입 지양하기 ](#5-any-타입-지양하기)

<br>

## [2장 타입스크립트의 타입 시스템](#2장-타입스크립트의-타입-시스템-1)
### [6. 편집기를 사용하여 타입 시스템 탐색하기](#6-편집기를-사용하여-타입-시스템-탐색하기-1)
### [7. 타입이 값들의 집합이라고 생각하기](#7-타입이-값들의-집합이라고-생각하기-1)
### [8. 타입 공간과 값 공간의 심벌 구분하기](#8-타입-공간과-값-공간의-심벌-구분하기-1)
### [9. 타입 단언보다는 타입 선언을 사용하기](#9-타입-단언보다는-타입-선언을-사용하기-1)
### [10. 객체 래퍼 타입 피하기](#10-객체-래퍼-타입-피하기-1)
### [11. 잉여 속성 체크의 한계 인지하기](#11-잉여-속성-체크의-한계-인지하기-1)

<br><br>

# 1장. 타입스크립트 알아보기
## 1. 타입스크립트와 자바스크립트의 관계 이해하기
- 타입스크립트는 자바스크립트의 상위집합(superset)으로, 모든 유효한 자바스크립트 프로그램은 타입스크립트 프로그램이다. 그러나 타입스크립트는 자바스크립트에 더해 자체적인 추가 문법을 가지므로 역은 거짓일 수 있다.
- 타입스크립트는 자바스크립트의 런타임 동작을 모델링하는 `정적 타입 시스템`을 가지고, 이를 이용해 런타임에 오류를 발생시키는 코드를 찾아내려고 한다. 그러나 타입 체커를 통과하면서도 런타임에 오류를 내는 코드는 얼마든지 많이 존재한다.
- 타입스크립트 타입 시스템은 자바스크립트 런타임 동작을 모델링하지만, 자바스크립트에서 허용하는 문법이 타입스크립트에서는 허용되지 않는 경우가 있다. 설정에 따라 다른데, 차차 다룬다.

<br>

## 2. 타입스크립트 설정 이해하기
타입스크립트 컴파일러는 거의 100여개에 이르는 설정을 가지고 있다. 설정은 커맨드 라인을 사용하거나 설정 파일을 이용해 적용 가능하다. 설정파일은 `tsc --init`으로 생성할 수 있다. 당연히 설정파일을 사용하는것이 권장된다.

```bash
# tsc --noImplicitAny program.ts
```
```json
// tsconfig.json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```
여러 설정에 대해서는 차차 알아가는데, 대표적인 위의 `noImplicitAny`설정은, 암묵적 any를 불허하는 설정이다. 즉 모든 변수에 타입을 선언하라는 설정인데, 자바스크립트에서 타입스크립트로 마이그레이션 하는것이 아니라면 반드시 사용하는것이 좋다.
또 한가지 대표설정인 `NullChecks`은 `undefined는 객체가 아닙니다.`와 같은 에러를 방지하는데 도움이 되는 설정이다. 앞으로도 계속 다룰 예정이다.

<br>

## 3. 코드 생성과 타입이 관계없음을 이해하기
타입스크립트 컴파일러는 두 가지 역할을 수행한다.
- 타입스크립트/자바스크립트를 브라우저에서 동작가능한 버전의 자바스크립트로 **트랜스파일**
- 코드의 타입 오류를 체크

<br>

중요한점은, 두개의 역할이 완전히 독립적으로 이뤄진다는 것이다. **타입 오류가 있는 코드도 컴파일 가능한데,** 이는 C, JAVA와 비교해보면 황당한 일이다. 단, `tsconfig.json`에 `noEmitOnError`를 설정하거나 빌드 도구에 동일한 설정을 하면 오류가 있을 때 컴파일 하지 않게 할 수 있다.

또한 자바스크립트로 컴파일 되는 과정에서 **타입스크립트의 인터페이스, 타입, 타입구문 등이 모두 제거되므로 런타임에서는 타입 체크가 불가능하다.** 단, 런타임에도 접근 가능한 타입 정보를 저장하는 기법이 있는데, 대표적으로 `태그 기법`이 있다.
```ts
// ts
interface Square {
  kind: "square"; 
  width: number;
}

interface Rectangle {
  kind: "rectangle";
  height: number;
  width: number;
}
// Shape와 같은 형태를 tagged union이라고 한다!
type Shape = Square | Rectangle;

function calculaterArea(shape: Shape) {
  if (shape.kind === "rectangle") {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}
```
```js
// js
function calculaterArea(shape) {
    if (shape.kind === "rectangle") {
        return shape.width * shape.height;
    }
    else {
        return shape.width * shape.width;
    }
}
```

`Squre`와 `Rectangle`을 class로 선언한 후 instanceof를 사용해서 분기처리 할 수도 있다. 
```ts
// ts
class Square {
  constructor(public width: number) {}
}

class Rectangle {
  constructor(public width: number, public height: number) {}
}

type Shape = Square | Rectangle;

function calculaterArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}
```
```js
// js, target: es5
// 클래스는 컴파일되면서 생성자 함수 형태로 변환된다.
var Square = /** @class */ (function () {
    function Square(width) {
        this.width = width;
    }
    return Square;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle(width, height) {
        this.width = width;
        this.height = height;
    }
    return Rectangle;
}());

// instanceof로 생성자 함수의 형태를 확인한다.
function calculaterArea(shape) {
    if (shape instanceof Rectangle) {
        return shape.width * shape.height;
    }
    else {
        return shape.width * shape.width;
    }
}
```
Squqre, Rectangle을 클래스로 선언한 파일을 target = `es5` 설정으로 컴파일한 결과 클래스는 생성자 함수로 바뀌었지만 instanceof로 타입을 검사함을 확인할 수 있다.

`interface`는 타입으로만 사용 가능하지만 `class`는 타입과 값으로 모두 사용 가능하므로 타입 체크시에도, 런타임시에도 오류가 없다. 참고로 `instanceof`는 자바스크립트 연산자로 연산자 뒤에는 인터페이스같은 `타입`이 아닌 `값`이 와야한다.

<br>

런타임에서의 타입은 타입스크립트에서 선언된 타입과 다를 수 있다. 아래와 같은 예를 생각해보자.
```ts
function setLightSwitch(value: boolean) {
  switch(value) {
    case true:
      turnLightOn();
      break;
    case false:
      turnLightOff();
      break;
    default:
      console.log('이게 실행되나?');
  }
}
```
함수의 인자인 value는 boolean 타입이므로 `default`의 `console.log`는 타입스크립트상에서는 실행될 수 없을것으로 판단된다. 하지만 외부 api등을 호출해 결과값을 인자로 `setLightSwitch()`함수를 호출하는 경우와 같이, 런타임에서 예상하지 못한 boolean이 아닌 값이 들어와도 함수 호출을 막을 방법은 없다. 결국 `console.log`는 호출되고 말 것이다. ***선언된 타입이 언제든지 달라질 수 있다는것을 명심하자.***

<br>

**타입스크립트 타입으로는 함수를 오버로드 할 수 없다.** 이유는 타입스크립트에서는 ***타입과 런타임의 동작이 무관하기 때문.*** 따라서 하나의 함수에 대해 여러개의 선언문을 작성할 수 있지만 구현체는 오직 하나뿐이다.
```ts
// ts
function add(a: number, b:number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
  return a+b;
}
```
```ts
// js
function add(a, b) {
    return a + b;
}
```
타입스크립트에서 함수를 두번 선언하고 한번 구현했는데 컴파일 결과 결국 남는건 하나뿐이다.

<br>

**타입스크립트의 타입은 런타임 성능에 영향을 주지 않는다.** 당연하다. 런타임에서는 죄다 사라져버리기 때문이다. 타입스크립트는 런타임 오버헤드가 없는 대신 빌드타임 오버헤드가 있다. 개발자들이 잘만들어서 성능이 참 좋다고 전해진다.

<br><br>

## 4. 구조적 타이핑에 익숙해지기

자바스크립트는 본질적으로 `덕 타이핑`기반이다. 타입스크립트도 이런 ***매개변수 값이 요구사항을 만족한다면 타입이 무엇인지 신경 쓰지 않는 동작***을 그대로 모델링한다. 이를 `구조적 타이핑`이라 하는데, 이를 잘 이해하는것이 매우 중요하다고 할 수 있다.

아래 예제를 보자. `Vector`를 다룬다.
```ts
interface Vector2D {
  x: number
  y: number
}

function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

interface NamedVector {
  name: string
  x: number
  y: number
}
```
`calculateLength`의 인자는 `Vector2D`타입이지만 구조적 타이핑에 의해 `NamedVector`타입의 변수로도 호출 가능하다. x, y 요소가 모두 존재하기 때문이다.
```ts
const v: NamedVector = { x: 3, y: 4, name: 'motiveko'};
calculateLength(v); // 5
```

언뜻보면 편리해 보이기도 하지만 문제가 될 때도 있다. `Vector3D`를 아래와 같이 선언하고 함수를 다시 호출해본다.

```ts
interface Vector3D {
  x: number
  y: number
  z: number
}
const v: Vector3D = { x:3, y: 4, z: 5};
calculateLength(v); // 5
```
사실 3D Vector의 길이는 더 긴데, 2D Vector의 길이를 구하는 방식으로 계산되어버렸다. z 요소가 있음에도 구조적 타이핑에 의해 함수 호출이 가능했기 때문에 발생한 문제다. 이는 타입에 상표를 붙여 해결 가능한데, 37장에서 다룬다.

함수 작성시, 매개변수가 매개변수에 정의된 타입에 선언된 속성만 가질거라 생각하기 쉽다. 이러한 타입을 봉인된(sealed) 타입 혹은 정확한(precise) 타입이라고 하는데, ***타입스크립트에서는 표현 불가능하다*** 타입스크립트의 타입은 모두 열린 타입이다.

<br>

구조적 타이핑은 문제가 될 때도 있지만, 테스트를 작성할 땐 매우 유리해진다. 테스트 작성시, mocking을 하게 되는데, 구조적 타이핑을 활용하면 필요한 부분만 mocking하면 되므로 작성이 간편해진다. 아래 코드는 PostgreDb를 이용해 쿼리를 날려 Author타입의 데이터를 가져오는 메서드다. 이를 테스트한다고 생각해보자.
```ts
interface Author {
  string: string;
  last: string
}

function getAuthors( database: PostgresDB): Author[] {
  const authorRows = databse.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
  return authorRows.map(row => ({first: row[0], last: row[1]}));
}
```

`getAuthor` 함수를 작성했고 인자로 `PostgresDB`를 받고 있다. `PostgresDB`는 여러 프로퍼티를 가질텐데, 여기서 실제로 사용되는건`runQuery`뿐이다. **구조적 타이핑을 활용하면 더 간단하고 구체적인 인터페이스를 정의할 수 있다.**

```ts
interface DB {
  runQuery: (sql: string) => any[];
}
function getAuthors( database: DB): Author[] {
  const authorRows = databse.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
  return authorRows.map(row => ({first: row[0], last: row[1]}));
}
```
이제 테스트를 작성할 때 더 간단한 객체를 매개변수로 사용할 수 있다.

```ts
test('getAuthors', () => {
  // DB를 객체 리터럴로 만들어 함수 호출 인자에 넣어줬다.
  const authors = getAuthors({
    runQuery(sql: string) {
      return [['motive', 'ko'], ['ko', 'donggi']];
    }
  })
  expect(authors).toEqual({
    {first: 'motive', last: 'ko'},
    {first: 'ko', last: 'donggi'},
  })
})
```
테스트 코드에서는 실제 환경의 DB에 대한 정보가 필요하지 않고, mocking 라이브러리도 필요 없다.(java에서는 mockito등을 쓰지 않으면.. 할 수 있나?). 그냥 필요한 속성만 원하는데로 정의하면 된다.

<br><br>

## 5. any 타입 지양하기
타입스크립트 타입 시스템은 점진적이고 선택적으로 타입을 사용할 수 있다. 언제든지 타입 체커를 해제할 수도 있다는 것인데, 이 때 핵심은 `any` 타입이다.

`any` 타입은 모든 타입을 할당받을 수 있고 모든 타입에 할당할 수 있는 타입이다. `any`를 사용하면 실질적으로 타입선언을 사용하지 않는것과 같은 효과를 낸다. any타입을 지양해야 하는 이유는 아래와 같다.
1. any 타입에는 타입 안정성이 없다.
2. any는 함수 시그니처를 무시해버린다.
3. any **타입에는 언어 서비스가 적용되지 않는다.**
  - 자동완성 기능을 사용할 수 없고, Interface에 Rename Symbol을 사용했을 때 any에는 적용되지 않는다.
4. any 타입은 리팩터링 할 때 버그를 감춘다.
  - any로 선언된 타입에는 어떤 값이든 올 수 있기 때문에 결국 리팩터링으로 모든 any를 지우지 않으면 버그가 남을 여지가 크다.
5. any는 타입 설계를 감춰버린다.
6. any는 타입시스템의 신뢰도를 떨어트린다.
  - any는 타입이 없는 것과 마찬가지기 때문에 설계를 알 수 없고, 따라서 타입 시스템 신뢰도가 사자린다.

물론 결국 any타입을 사용해야 하는 경우가 발생한다. 이 때 any를 잘 사용하는 법에 대해서 아이템 38~42에서 다룬다.

<br><br>

# 2장. 타입스크립트의 타입 시스템
## 6. 편집기를 사용하여 타입 시스템 탐색하기
타입스크립트를 설치하면 아래 두 가지를 실행할 수 있다.
1. 타입스크립트 컴파일러(`tsc`)
2. 단독으로 실행할 수 있는 타입스크립트 서버(`tsserver`)

2.의 타입스크립트 서버는 타입스크립트의 편리한 언어 서비스를 제공한다. 코드 자동완성, 명세 검사, 검색, 리팩터링 등이 포함된다. 앞으로 지속적으로 다룰 내용이므로 자세한 설명은 생략한다.

<br>

## 7. 타입이 값들의 집합이라고 생각하기

타입스크립트에서 '**타입은 할당 가능한 값들의 집합(범위)**'이다. 가장 작은 타입 부터 살펴보면 아무 값도 포함하지 않는 공집합인 `never`타입이다. 그 다음으로 작은 집합은 한 가지 값만 포함하는 `유닛(리터럴) 타입`이다. 여러개의 유닛 타입을 묶으려면 `유니온 타입`을 사용한다.
```ts
const x: never = 12;
  // ~ '12' 형식은 'never'에 할당할 수 없습니다.

// unit type
type A = 'A';
type B = 'B';

// union type
type AB = 'A' | 'B';
```

'집합의 관점'에서 타입 체커의 역할은 **하나의 집합이 다른 집합의 부분 집합인지 검사하는 것**이다. 타입스크립트 오류 중 'A형식은 B 형식에 할당할 수 없습니다.'라는 오류를 종종 보게되는데, 이 말은 '**A는 B의 부분집합이 아니다**' 라는 말과 같다.

<br>

아래 코드에서 `&` 연산자는 두 타입의 `인터섹션`(intersection, 교집합)을 계산한다.
```ts
interface Person {
  name: string;
}

interface Lifespan {
  birth: Date;
  death?: Date;
}
type PersonSpan = Person & Span;
```

`Person`과 `Lifespan`은 공통 속성이 없어 교집합이 없을 것 같지만, 타입 연산자는 인터페이스의 속성이 아닌 값의 집합(타입의 범위)에 적용된다. 따라서 Person과 Lifespan을 둘 다 가지는 값은 인터섹션의 타입에 속한다.

```ts
const ps: PersonSpan = {
  name: 'motiveko',
  birth: new Date('1991/12/06'),
  death: new Date('2100/1/1')
}

```
물론 위 세가지 이상의 속성을 가지는 값도 PersonSpan 타입에 속한다(부분집합이다).

> ❗️ 단, 객체 리터럴은 구조적 타이핑이 아닌 잉여 속성 체크(아이템 11)로 타입 체그가 이뤄진다. `PseronSpan`에 name, birth, death 이외의 속성이 들어간 객체를 리터럴로 만들어 즉시 할당하면 잉여 속성 체크에 의해 오류가 발생한다.

<br>

규칙이 속성에 대한 `인터섹션`에 관해서는 맞지만, 두 인터페이스의 `유니온`에서는 그렇지 않다.

```ts
type K = keyof (Person | Lifespan); // 타입이 never
```
`Person | Lifespan` 타입에는 어떠한 공통 키도 없기때문에, 유니온에 대한 keyof는 공집합이다. 이를 표준화 하면 아래와 같이 정의할 수 있다.

```ts
keyof (A&B) = (keyof A) | (keyof B);
keyof (A|B) = (keyof A) & (keyof B);
```

위의 `PersonSpan`같은 인터섹션(부분집합)은 일반적으로 `extends` 키워드를 사용한다. 
이 때 `extends`를 `클래스 상속`의 개념이 아닌 `부분집합`의 개념으로 이해해야 다른 여러곳에 적용된 extends를 이해할 수 있다. 

```ts
interface Person {
  name: string;
}
interface PersonSpan extends Person {
  birth: Date;
  death?: Date;
}
```

`extends` 키워드는 `부분집합`의 개념으로 ***제너릭 타입에서 한정자***로도 사용된다. 아래 타입은 여기저기서 정말 많이 보인다.
```ts
function getKey<K extends string>(val: any, key: K) {
  // ...
}
```
클래스 상속의 개념에서 `K extends string`을 이해하면 소용이 없다. 어차피 K는 string타입의 값일 것이기 때문이다. 실제로 `String` 래퍼객체를 상속해서 구현하는것이 아니다.

그럼 부분집합은 어떻게 구현하면 좋을까? 타입들이 `PersonSpan`의 경우와 같이 엄격하게 상속 관계가 있는게 아니라면, `extends`키워드 보단 집합 스타일을 사용하는게 더 바람직하다. 

<br>

타입이 집합이라는 관점에서 `배열`과 `튜플`의 차이가 명확해진다. 
```ts
const list = [1,2]; // type: number[]
const tuple: [number, number] = list;
  // 'number[]' 타입은 '[number, number]'타입의 0, 1 속성에 없습니다.
```
집합의 관점에서 `number[]`는 `[number, number]`일 수 없다. `[]`, `[1]` 등도 모두 `number[]`타입이기 때문이다. 할당할 수 없다는 것은 `number[]`는 `[number, number]`의 부분집합이 아니다는 말이다.
그럼 트리플(숫자 세개짜리 배열)은 페어(숫자 두개짜리)에 할당할 수 있을까?
```ts
const triple: [number, number, number] = [1,2,3];
const double: [number, number] = triple;
  // ... 'length' 속성의 형식이 호환되지 않습니다.
  // '3'의 형식은 '2'에 할당할 수 없습니다.
```

이런 에러가 뜨는 이유는, 타입스크립트가 튜플을 {0: number, 1: number, length:2} 의 유사배열 형태로 모델링 했기 때문이다. triple은 `length:3`이기때문에 double에 할당 불가능하다. 
이러한 튜플의 모델링 케이스는 `tagged union`과 비슷한 형태의 타입으로 볼 수 있을 것 같다.

<br>

타입스크립트에서는 **타입이 되지 못하는 값의 집합들이 존재한다.** 보통 특정 값의 범위를 지니는 타입에서 특정 요소를 제거한 타입이 불가능한데, 예를들면 `정수에 대한 타입`, `x,y속성만을 가지는 객체 타입`과 같은것이 있다.
유틸리티 타입 중 `Exclude`를 이용하면 구현 가능한 경우도 있는데, **결과가 적절한 타입스크립트 타입일 때만 유효하다.** 

```ts
type T = Exclude<string|Date, string|number>; // type: Date, 유효하다.
type NonZeroNums = Exclude<number, 0>;  // type: number, 0을 제외한 숫자같은 타입은 유효하지 않다.
```

<br><br>


타입이 집합이라는 점에서 배열과 튜플의 관계는 명확하게 갈라진다. 튜플은 유사 배열 객체로 모델링되어 length 값이 마치 태그처럼 작용한다.

한편 타입스크립트 타입이 되지 못하는 값이 있다. 정수타입,  xy만 가지는 타입 등. Exclue는 

타입스크립트 용어와 집합 용어






## 8. 타입 공간과 값 공간의 심벌 구분하기
## 9. 타입 단언보다는 타입 선언을 사용하기
## 10. 객체 래퍼 타입 피하기
## 11. 잉여 속성 체크의 한계 인지하기
## 12. 함수 표현식에 타입 적용하기
## 13. 타입과 인터페이스의 차이점 알기
## 14. 타입 연산과 제너릭 사용으로 반복 줄이기
## 15. 동적 데이터에 인덱스 시그니처 사용하기
## 16. number 인덱스 시그니처보다는 Array, 튜플, ArrayLike를 사용하기
## 17. 변경 관련된 오류 방지를 위해 readonly 사용하기
## 18. 매핑된 타입을 사용하여 값을 동기화하기
 
# 3장. 타입 추론
## 19. 추론 가능한 타입을 사용해 장황한 코드 방지하기
## 20. 다른 타입에는 다른 변수 사용하기
## 21. 타입 넓히기
## 22. 타입 좁히기
## 23. 한꺼번에 객체 생성하기
## 24. 일관성 있는 별칭 사용하기
## 25. 비동기 코드에서는 콜백 대신 async 함수 사용하기
## 26. 타입 추론에 문맥이 어떻게 사용되는지 이해하기
## 27. 함수형 기법과 라이브러리로 타입 흐름 유지하기

# 4장. 타입 설계
## 28. 유효한 상태만 표현하는 타입을 지향하기
## 29. 사용할 때는 너그럽게, 생성할 때는 엄격하게
## 30. 문서에 타입 정보를 쓰지 앟기 
## 31. 타입 주변에 null값 배치하기
## 32. 유니온의 인터페이스보다는 인터페이스의 유니온을 사용하기
## 33. string 타입보다 더 구체적인 타입 사용하기
## 34. 부정확한 타입보다는 미완성 타입을 사용하기
## 35. 데이터가 아닌, API와 명세를 보고 타입 만들기
## 36. 해당 분야의 용어로 타입 이름 짓기
## 37. 공식 명칭에는 상표를 붙이기

# 5장. any 다루기
## 38. any 타입은 가능한 한 좁은 범위에서만 사용하기
## 39. any를 구체적으로 변형해서 사용하기
## 40. 함수 안으로 타입 단언문 감추기
## 41. any의 진화를 이해하기
## 42. 모르는 타입의 값에는 any 대신 unknown 사용하기
## 43. 몽키 패치보다는 안전한 타입을 사용하기
## 44. 타입 커버리지를 추적하여 타입 안정성 유지하기

<!-- 6장은 나의 typescript 레벨이 올라가서 @types를 배포할 때 사용할 만한 내용인듯하다. 너무 완전히 이해못해도 괜찮을듯 -->
# 6장. 타입 선언과 @types
## 45. devDependencies에 typscript와 @types 추가하기
## 46. 타입 선언과 관련된 세 가지 버전 이해하기
## 47. 공개 API에 등장하는 모든 타입을 익스포트하기
## 48. API 주석에 TSDoc 사용하기
## 49. 콜백에서 this에 대한 타입 제공하기
## 50. 오버로딩 타입보다는 조건부 타입을 사용하기
## 51. 의존성 분리를 위해 미러 타입 사용하기
## 52. 테스팅 타입의 함정에 주의하기

# 7장. 코드를 작성하고 실행하기
## 53. 타입스크립트 기능보다는 ECMAScript 기능을 사용하기
## 54. 객체를 순회하는 노하우
## 55. DOM 계층 구조 이해하기
## 56. 정보를 감추는 목적으로 private 사용하지 않기
## 57. 소스맵을 사용하여 타입스크립트 디버깅하기

# 8장. 타입스크립트로 마이그레이션하기
## 58. 모던 자바스크립트로 작성하기
