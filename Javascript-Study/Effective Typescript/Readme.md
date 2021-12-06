# 이펙티브 타입스크립트 학습하기 프로젝트

![img ](https://image.aladin.co.kr/product/27319/31/cover500/8966263135_1.jpg)

<br>

## 목차
---
<!-- 마크다운 목록에서 1. 한글 과 같이 한글로 시작하면 이동이 안먹는다. 5.any같이 영어는 먹는다. 해결책으로 한글로 시작하는 목록은 -1 suffix를 붙인다. -->
## [1장 타입스크립트 알아보기 ](#1장-타입스크립트-알아보기)
### [1. 타입스크립트와 자바스크립트의 관계 이해하기 ](#1-타입스크립트와-자바스크립트의-관계-이해하기)
### [2. 타입스크립트 설정 이해하기 ](#2-타입스크립트-설정-이해하기)
### [3. 코드 생성과 타입이 관계없음을 이해하기 ](#3-코드-생성과-타입이-관계없음을-이해하기)
### [4. 구조적 타이핑에 익숙해지기 ](#4-구조적-타이핑에-익숙해지기)
### [5. any 타입 지양하기 ](#5-any-타입-지양하기)

<br>

## [2장 타입스크립트의 타입 시스템 ](#2장-타입스크립트의-타입-시스템)
### [6. 편집기를 사용하여 타입 시스템 탐색하기 ](#6-편집기를-사용하여-타입-시스템-탐색하기)
### [7. 타입이 값들의 집합이라고 생각하기 ](#7-타입이-값들의-집합이라고-생각하기)
### [8. 타입 공간과 값 공간의 심벌 구분하기 ](#8-타입-공간과-값-공간의-심벌-구분하기)
### [9. 타입 단언보다는 타입 선언을 사용하기 ](#9-타입-단언보다는-타입-선언을-사용하기)
### [10. 객체 래퍼 타입 피하기 ](#10-객체-래퍼-타입-피하기)
### [11. 잉여 속성 체크의 한계 인지하기 ](#11-잉여-속성-체크의-한계-인지하기)
### [12. 함수 표현식에 타입 적용하기 ](#12-함수-표현식에-타입-적용하기)
### [13. 타입과 인터페이스의 차이점 알기 ](#13-타입과-인터페이스의-차이점-알기)
### [14. 타입 연산과 제너릭 사용으로 반복 줄이기 ](#14-타입-연산과-제너릭-사용으로-반복-줄이기)
### [15. 동적 데이터에 인덱스 시그니처 사용하기 ](#15-동적-데이터에-인덱스-시그니처-사용하기)
### [16. number 인덱스 시그니처보다는 Array, 튜플, ArrayLike를 사용하기 ](#16-number-인덱스-시그니처보다는-array-튜플-arraylike를-사용하기)
### [17. 변경 관련된 오류 방지를 위해 readonly 사용하기 ](#17-변경-관련된-오류-방지를-위해-readonly-사용하기)
### [18. 매핑된 타입을 사용하여 값을 동기화하기 ](#18-매핑된-타입을-사용하여-값을-동기화하기)

## [3장. 타입 추론 ](#3장-타입-추론)
### [19. 추론 가능한 타입을 사용해 장황한 코드 방지하기 ](#19-추론-가능한-타입을-사용해-장황한-코드-방지하기)
### [20. 다른 타입에는 다른 변수 사용하기 ](#20-다른-타입에는-다른-변수-사용하기)
### [21. 타입 넓히기 ](#21-타입-넓히기)
### [22. 타입 좁히기 ](#22-타입-좁히기)
### [23. 한꺼번에 객체 생성하기 ](#23-한꺼번에-객체-생성하기)
### [24. 일관성 있는 별칭 사용하기 ](#24-일관성-있는-별칭-사용하기)
### [25. 비동기 코드에서는 콜백 대신 async 함수 사용하기 ](#25-비동기-코드에서는-콜백-대신-async-함수-사용하기)
### [26. 타입 추론에 문맥이 어떻게 사용되는지 이해하기 ](#26-타입-추론에-문맥이-어떻게-사용되는지-이해하기)
### [27. 함수형 기법과 라이브러리로 타입 흐름 유지하기 ](#27-함수형-기법과-라이브러리로-타입-흐름-유지하기)

## [4장. 타입 설계 ](#4장-타입-설계)
### [28. 유효한 상태만 표현하는 타입을 지향하기 ](#28-유효한-상태만-표현하는-타입을-지향하기)
### [29. 사용할 때는 너그럽게, 생성할 때는 엄격하게 ](#29-사용할-때는-너그럽게-생성할-때는-엄격하게)
### [30. 문서에 타입 정보를 쓰지 않기 ](#30-문서에-타입-정보를-쓰지-않기)
### [31. 타입 주변에 null값 배치하기 ](#31-타입-주변에-null값-배치하기)
### [32. 유니온의 인터페이스보다는 인터페이스의 유니온을 사용하기 ](#32-유니온의-인터페이스보다는-인터페이스의-유니온을-사용하기)
### [33. string 타입보다 더 구체적인 타입 사용하기 ](#33-string-타입보다-더-구체적인-타입-사용하기)
### [34. 부정확한 타입보다는 미완성 타입을 사용하기 ](#34-부정확한-타입보다는-미완성-타입을-사용하기)
### [35. 데이터가 아닌, API와 명세를 보고 타입 만들기 ](#35-데이터가-아닌-api와-명세를-보고-타입-만들기)
### [36. 해당 분야의 용어로 타입 이름 짓기 ](#36-해당-분야의-용어로-타입-이름-짓기)
### [37. 공식 명칭에는 상표를 붙이기 ](#37-공식-명칭에는-상표를-붙이기)

## [5장. any 다루기 ](#5장-any-다루기)
### [38. any 타입은 가능한 한 좁은 범위에서만 사용하기 ](#38-any-타입은-가능한-한-좁은-범위에서만-사용하기)
### [39. any를 구체적으로 변형해서 사용하기 ](#39-any를-구체적으로-변형해서-사용하기)
### [40. 함수 안으로 타입 단언문 감추기 ](#40-함수-안으로-타입-단언문-감추기)
### [41. any의 진화를 이해하기 ](#41-any의-진화를-이해하기)
### [42. 모르는 타입의 값에는 any 대신 unknown 사용하기 ](#42-모르는-타입의-값에는-any-대신-unknown-사용하기)
### [43-몽키-패치보다는-안전한-타입을-사용하기 ](#43-몽키-패치보다는-안전한-타입을-사용하기)
### [44. 타입 커버리지를 추적하여 타입 안정성 유지하기 ](#44-타입-커버리지를-추적하여-타입-안정성-유지하기)

## [6장. 타입 선언과 @types ](#6장-타입-선언과-types)
### [45-devdependencies에-typscript와-types-추가하기 ](#45-devdependencies에-typscript와-types-추가하기)
### [46. 타입 선언과 관련된 세 가지 버전 이해하기 ](#46-타입-선언과-관련된-세-가지-버전-이해하기)
### [47. 공개 API에 등장하는 모든 타입을 익스포트하기 ](#47-공개-api에-등장하는-모든-타입을-익스포트하기)
### [48. API 주석에 TSDoc 사용하기 ](#48-api-주석에-tsdoc-사용하기)
### [49. 콜백에서 this에 대한 타입 제공하기 ](#49-콜백에서-this에-대한-타입-제공하기)
### [50. 오버로딩 타입보다는 조건부 타입을 사용하기 ](#50-오버로딩-타입보다는-조건부-타입을-사용하기)
### [51. 의존성 분리를 위해 미러 타입 사용하기 ](#51-의존성-분리를-위해-미러-타입-사용하기)
### [52. 테스팅 타입의 함정에 주의하기 ](#52-테스팅-타입의-함정에-주의하기)

## [7장. 코드를 작성하고 실행하기 ](#7장-코드를-작성하고-실행하기)
### [53. 타입스크립트 기능보다는 ECMAScript 기능을 사용하기 ](#53-타입스크립트-기능보다는-ecmascript-기능을-사용하기)
### [54. 객체를 순회하는 노하우 ](#54-객체를-순회하는-노하우)
### [55. DOM 계층 구조 이해하기 ](#55-dom-계층-구조-이해하기)
### [56. 정보를 감추는 목적으로 private 사용하지 않기 ](#56-정보를-감추는-목적으로-private-사용하지-않기)
### [57. 소스맵을 사용하여 타입스크립트 디버깅하기 ](#57-소스맵을-사용하여-타입스크립트-디버깅하기)

## [8장. 타입스크립트로 마이그레이션하기 ](#8장-타입스크립트로-마이그레이션하기)
### [58. 모던 자바스크립트로 작성하기 ](#58-모던-자바스크립트로-작성하기)



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

## 8. 타입 공간과 값 공간의 심벌 구분하기
타입스크립트의 심벌(symbol)은 타입 공간이나 값 공간 중 한 곳에 존재한다. 아래 처럼 이름이 같지만 다른 공간에 속할수도 있다.
```ts
// 타입
interface Cylinder {
  radius: number;
  height: number;
}
// 값
const Cylinder = (radius: number, height: number) => ({radius, height});
```
선언되는 위치에 따라서, 일반적으로 `type`, `interface` 다음에 오는 심벌은 `타입`이고, `const`나 `let`선언에 쓰이는 것은 `값`이다. 타입은 타입스크립트에만 존재하기 때문에, 컴파일 후에는 모두 사라지고 값은 남아있다.

사용되는 위치에 따라서는 일반적으로 타입 선언(`:`) 혹은 타입 단언문(`as`) 다음에 나오는 심벌은 타입, `=` 다음에 나오는 심벌은 값이다.

***`class`와 `enum`은 상황에 따라 타입과 값 두 가지 모두 가능한 예약어이다.*** 아래의 경우 `Cylinder`는 `값`으로 쓰인다.

```ts
class Cylinder {
  radius = 1;
  height = 1;
}
function calculateVolume(shape: unkown) {
  if( shape instanceof Cylinder) {  // instanceof 연산자는 자바스크립트 연산자로, Cylinder는 값으로 쓰인다.
    shape         // 타입은 Cylinder
    shape.radius  // 타입은 number
  }
}
```
***클래스가 타입으로 쓰이면 형태(속성, 메서드)가 사용되고, 값으로 쓰이면 생성자가 사용된다.*** 생성자가 사용된다는게 무슨말일까?

```ts
type t = typeof Cylinder;   // 타입이 typeof Cylinder
```
t는 `typeof Cylinder`이다.  Cylinder는 인스턴스타입이 아니다. 이는 `new`키워드를 사용할 때 볼수 있는 **생성자 함수**타입인 것이다. 우리가 갖고 싶은 인스턴스 타입 `Cylinder`는 유틸리티 타입 `InstanceType`을 사용해서 얻는다.

```ts
type C = InstanceType<typeof Cylinder>; // 타입이 Cylinder
```

한편, `typeof` 연산자와 같이 타입에서 쓰일때와 값에서 쓰일 때 다른 기능을 하는 것들이 있다. 아래와 같이 다르다.
  1. 타입에 관점에서 `typeof`는 **타입스크립트의 타입을 반환**한다. 
  2. 값의 관점에서 `typeof`는 **자바스크립트 런타임의 typeof 연산자**가 된다. 이는 런타임 타입을 가리키는 문자열을 반환하게된다.

아래의 경우 typeof는 const로 선언된 변수에 값을 할당하는데 사용되어, 값의 관점에서 사용되었다.
```ts
type v = typeof Cylinder;   // 값이 "function"
type t = typeof Cylinder;   // 타입이 typeof Cylinder
```

<br>

속성 접근자 `[]`는 **타입으로 쓰일때와 값으로 쓰일때 모두 동일하게 동작한다.**
```ts
const first: Person['first']  // 타입
  = p['first']                // 값

type Tuple = [string, number, Date];  
type TupleEl = [number];  // string | number | Date
```

타입스크립트 코드가 잘 작동하지 않는다면 타입 공간과 값 공간을 혼동해서 잘못 작성했는지 한번 생각해봐야한다. 아래의 경우, 디스트럭처링 할당과 관련한 타입스크립트 오류다.

```ts
function email(options: {person: Person, subject: string, body: string}) {}

// 자바스크립트에서는 아래와 같은 디스트럭처링이 가능하다.
function email({person, subject, body}) {}

// 타입스크립트에서는 오류가 발생한다.
function email({
  person: Person,   // 바인딩된 요소 'Person'에 암시적으로 any 형식이 있습니다.
  subject: string,  // 바인딩된 요소 'string'에 암시적으로 any 형식이 있습니다.
  body: string      // 바인딩된 요소 'string'에 암시적으로 any 형식이 있습니다.
})
```
이는 ***값의 관점에서 Person과 string이 해석되었기 때문이다.*** 코드 에디터의 색깔만 봐도 값으로 사용될때와 타입으로 사용될때 색깔이 다르다. Vscode는 매우 똑똑하다.

따라서 이를 해결하려면 타입과 값을 구분해서 아래와 같이 사용해야한다. 사실 좀 번거롭다.

```ts
function email (
  {person, subject, body}: {person: Person, subject: string, body: string}
){}
```

<br><br>


## 9. 타입 단언보다는 타입 선언을 사용하기
타입스크립트에서 변수에 타입슬 부여하는 방법은 `타입 선언`과 `타입 단언` 두가지가 있다.
```ts
interface Person {
  name: string
};

const alice: Person = { name: 'Alice' };  // 타입 선언
const bob = { name: 'Bob' } as Person;    // 타입 단언
```
둘은 비슷한듯 보여도 다른데, 문제는 아래와 같이 타입 단언에 있다.
```ts
const alice: Person = {};  // 'name' 속성이 '{}' 형식에 없지만 'Person' 형식에서 필수입니다.
const bob = {} as Person; // 오류 없음

const alice: Person = {
  name: 'alice',
  foo: 'bar' // { name: string; foo: string; }' 형식은 'Person' 형식에 할당할 수 없습니다...
}
const bob = {
  name: 'bob',
  foo: 'bar'
} as Person;
```
`타입 선언`의 경우 할당되는 값이 인터페이스를 만족하는지 `잉여 속성 체크`를 수행하고, 만족하지 않으면 에러를 반환하지만, 타입 단언은 강제로 타입을 지정해 타입 체커에게 오류를 무시하도록 한다.

> 종종 보이는 `const bob = <Person>{}` 과 같은 형태의 문법은 `{} as Person`과 동일한 옛날 단언문법이다. tsx에서 해당 문법이 다른 의미로 사용돼, 잘 사용하지 않는다고 함

<br>

`화살표 함수`에도 타입 선언을 사용해야 한다. 아래 코드처럼 `화살표 함수` 사용시 추론된 타입이 원하는데로 동작하지 않는 경우가 있다. 
```ts
const people = ['motiveko', 'doggiko'].map(name => ({name})); // 타입은 Person[]이 아닌 { name: string }[]
```
이를 타입 단언을 사용해 `(name => ({name} as Person))`으로 해결하고 싶을 수도 있으나, 역시 name에 문제가 생겨도 타입은 `Person`이 되어 에러를 무시하게 되므로 좋지못한 해결책이다. 아래와 같이 해결하자.

```ts
const people = ['motiveko', 'doggiko'].map(
  (name): Person => ({name})
);  // 타입은 Person[]
```
`(name): Person`은 반환타입이 `Person`인 화살표 함수를 명시하는것이다. 이를 `(name: Person)`으로 쓰면 화살표 함수에 반환 타입을 지정하지 않은것이 되어 오류가 발생하므로 주의하자.

<br>

타입 선언을 가급적 사용하되, **타입 단언이 꼭 필요한 경우**가 있다. 대표적인것은 **DOM 엘리먼트**에 대한 내용이다.

```ts
document.querySelector('#myButton').addEventListener('click', e => {
  e.currentTarget;  // 타입은 Event Target
  const button = e.currentTarget as HTMLButtonElement;
  button; // 타입은 HTMLButtonElement
})
```
위와 같이 DOM 관련해서는 `EventTarget`이나 `HTMLElement`와 같이 상위 객체가 반환되는 경우가 많다. 타입 스크립트는 DOM에 직접 접근하는것이 아니기때문에 구체적인 객체를 알 수 없기 때문이다. 사용자는 해당 객체를 상속하는 하위 객체의 고유한 속성(예를들면 `input.value`)을 사용해야 하는 경우가 많은데, 이 때 단언문을 사용해야 한다.

또 접미사에 `!`를 이용하여 null이 아님을 단언하는 경우가 있다. 접미사 `!`는 ***null이 아님을 확신할 때에만 사용하자***.
```ts
const elNull = document.getElementById('id'); // HTMLElement | null
const el = document.getElementById('id')!;    // HTMLElement
```

<br>

***타입 단언문으로 임의의 타입 간에 변환을 할 수는 없다. A와 B가 부분집합 관계인 경우에만 사용 가능하다.***
`HTMLElement`는 `HTMLElement | null`의 서브타입이고, `Person`은 `{}`의 서브타입 이기 때문에 단언이 가능했다. `Person`과 `HTMLElement`는 서브타입 관계가 아니기 때문에 단언이 불가능하다.

``` ts
interface Person { name: string };
const body = document.body;
const el = body as Person;
/* 
'HTMLElement' 형식을 'Person' 형식으로 변환한 작업은 실수일 수 있습니다. 두 형식이 서로 충분히 겹치지 않기 때문입니다. 의도적으로 변환한 경우에는 먼저 'unknown'으로 식을 변환합니다.
'name' 속성이 'HTMLElement' 형식에 없지만 'Person' 형식에서 필수입니다.
*/
```

이 오류는 `unkmown`을 사용해 해결 가능하다. 모든 타입은 `unknown`의 서브타입이기 때문이다.

```ts
const person = document.body as unkonw as Person
```

<br><br>

## 10. 객체 래퍼 타입 피하기
자바스크립트에는 7가지 원시타입(`stirng`, `number`, `boolean`, `symbol`, `bigint`, `null`, `undefined`)이 있고 이중 앞의 5개는 래퍼 객체(Wrapper Object)가 존재한다.

래퍼객체는 `string`과 같은 원시타입의 값에 대해 **객체처럼 접근하면 생성되는 임시 객체**를 말한다. 래퍼 객체의 동작은 prototype 프로퍼티를 다음과 같이 몽키 패치하면 관찰해볼 수 있다.

```js
const originalCharAt = String.prototype.charAt;
String.prototype.charAt = function(pos) {
  console.log(this, typeof this, pos);
  return originalCharAt.call(this, pos);
};
console.log('primitive'.charAt(3));
// [String : 'primitive'] 'object' 3
m
```
원시값은 래퍼 객체에 의해 객체처럼 동작할 수 있지만 원시값과 래퍼 객체는 동일하지 않다.
```js
const x = 'test';
String.prototype.checkEq = function() { return this === x;}
x.checkEq();  // false
```

래퍼 객체 타입 값에는 원시값을 할당할 수 있으나, 원시값 타입에는 래퍼 객체 타입 값을 할당할 수 없다.
```ts
const test1: String = 's';             // 정상
const test2: string = new String('s'); // 'String' 형식은 'string' 형식에 할당할 수 없습니다.
```
이런 점들은 헷갈리기 쉽기 때문에 원시타입으로 통일해서 쓰는것이 바람직하다.

<br>

## 11. 잉여 속성 체크의 한계 인지하기
타입 체크에는 구조적 타이핑에 의한 검사 외에 `잉여 속성 체크`가 있다. 잉여 속성 체크란 타입이 명시된 변수에 ***객체 리터럴을 할당할 때 객체에 해당 타입의 속성이 있는지, 그리고 그 외의 속성은 없는지 확인하는 작업이다.***

```ts
interface Person {
  name: string;
  age: number;
}

const p: Person = {
  name: 'motiveko',
  age: 31,
  foo: 'bar'  
    // '{ name: string; age: number; foo: string; }' 형식은 'Person' 형식에 할당할 수 없습니다.
    // 개체 리터럴은 알려진 속성만 지정할 수 있으며 'Person' 형식에 'foo'이(가) 없습니다.
}
```
구조적 타이핑은 부분 집합을 할당 가능한 타입으로 보지만, 잉여 속성에서는 그렇지 않다. 왜 이런걸 도입한걸까? 이유는 당연히 여러가지 오류를 방지하기 위해서다! 아래 경우를 보자.
```ts
interface Options { 
  title: string;
  darkMode?: boolean
}

function createWindow(options: Options) {
  if(options.darkMode) {
    setDarkMod();
  }
  // ..
}
createWindow({
  title: 'title',
  darkmode: true
    // '{ title: string; darkmode: boolean; }' 형식의 인수는 'Options' 형식의 매개 변수에 할당될 수 없습니다.
    // 개체 리터럴은 알려진 속성만 지정할 수 있지만 'Options' 형식에 'darkmode'이(가) 없습니다. 'darkMode'을(를) 쓰려고 했습니까?
})
```
`Options`타입의 속성`darkMode`를 `darkmode`로 잘못 작성했고, 잉여 속성 체크는 오류 메시지를 보여준다. 구조적 타이핑이었다면 `darkMode`는 선택적 속성이기때문에 해당 속성이 없어도 에러가 발생하지 않았을 것이고, 이는 결국 런타임에서 잘못된 동작을 하는 코드가 되었을 것이다. `Options`와 같은 선택적 속성을 포함하는 타입은 그 범위가 매우 넓기때문에(`title: string`만 포함하면 뭐든 된다.), 원치 않는 할당이 이뤄질 수 있고, 이를 검사하기 위해 잉여 속성 체크가 있는것. 잉여 속성 체크는 `엄격한 객체 리터럴 체크`라고도 불린다.

<br>

하지만 잉여속성체크를 하지 않고 구조적 타이핑을 하길 원할 수도 있다. 이럴 땐 `임시 변수`나 `타입 단언문`을 사용하자.
```ts
const intermediate = { darkmode: true, title: 'Skii' }; // 임시 변수
const o: Options = intermediate;                        // 정상. 임시변수는 객체 리터럴이 아니다.

const o = { darkmode: true, title: 'Skii' } as Options; // 정상. 타입 단언문은 잉여속성체크 하지 않는다.
```
`인덱스 시그니처`를 사용해서 타입스크립트가 추가적인 속성을 예상하도록 해 잉여속성체크를 통과시킬수도 있다.
```ts
interface Options {
  darkMode?: booleanl;
  [otherOptions: string]: unknown;
}
const o: Options = { darkmode: true };  // 정상
```
이런 방법으로 데이터를 모델링 하는것이 반드시 적합한 것은 아니다. 아이템 15에서 다룰 예정.

<br>

선택적 속성만 가지는 `약한(weak)타입`에는 `공통 속성 체크`라는 약간 다른 타입체크가 적용된다.
```ts
interface XYZ {
  x?: string;
  y?: number;
  z?: boolean;
}

const tmp = { k: 'k' }; 
const fail: XYZ = tmp;            // '{ k: string; }' 유형에 'XYZ' 유형과 공통적인 속성이 없습니다.ts(2559)
const success: XYZ = tmp as XYZ;  // 정상수
```
`공통 속성 체크`는 할당시 공통 속성이 한개라도 존재하는지 여부를 체크한다. 임시 변수나 객체 리터럴에 모두 적용되고, ***타입 단언문에는 적용되지 않는다.***

<br>

잉여 속성 체크는 선택적 필드를 포함하는 `Options`같은 타입에 매우 유용하지만, 객체리터럴 할당시에만 적용된다는 특성이 있기 때문에 이런 특성을 잘 이해하고 사용한다면 오류를 많이 잡을 수 있을것이다.

<br><br>


## 12. 함수 표현식에 타입 적용하기
자바스크립트 함수 정의 방식에는 `함수 선언문(statement)`방식과 `함수 표현식(expression)`방식이 있다. ***가급적 함수 선언문보다 함수 표현식을 쓰자.***

함수 표현식을 사용하면 함수 전체 시그니처를 ***하나의 함수 타입으로 선언***하여 함수 표현식에 재사용 가능하다는 장점이 있다.
```ts
// 함수 선언문
function rollDiceStmnt(sides: number): number { /*...*/ };

// 함수 표현식
type DiceRollFn = (sides: number) => number;
const rollDice: DiceRollFn = sides => { /*...*/ };
```

함수 타입을 선언하면 시그니처가 동일한 여러개의 함수 타입을 통합하여 불필요한 코드 반복을 줄일 수 있다.

```ts
function add1(a: number, b: number) { return a + b };
function sub1(a: number, b: number) { return a - b };
// ...

// 함수 타입 선언으로 코드 간소화
type BinaryFn = (a: number, b: number) => number;
const add2: BinaryFn = (a, b) => a + b;
const sub2: BinaryFn = (a, b) => a - b;
// ...
```
함수 타입 선언으로 여러 함수의 매개변수와 반환 타입을 따로 작성하지 않아도 타입스크립트 타입 체크 시스템이 알아서 추론할 수 있게 되었다.
여러 타입 제공 라이브러리들은 공통 함수 시그니처를 타입으로 제공한다. 만약 내가 라이브러리를 만들면 ***공통 함수의 시그니처를 타입으로 정의하려고 노력해야한다.***

<br>

시그니처가 일치하는 다른 함수가 있을 때도, 함수 표현식에 타입을 적용하면 좋다. 이건 고민을 해야 적용할 수 있는건데, 아래예제는 `fetch`를 사용해 HTTP 요청을 날려 response body를 json으로 받아오는 예제다.

```ts
async function getQuote() {
  const resposeP = await fetch('/quote?by=Mark+Twain'); // 타입 : Prmoise<Response>
  const quote = await response.json();
  return quote;
}
```

이 함수에는 버그가 있는데, **fetch 실패에 대한 고려**가 없는것이다. 예를들어 `fetch`가 호출한 주소가 존재하지 않으면, `response.json()`은 `Rejected Promise`를 반환할 것이고, 이는 예상한 getQuote 함수가 예상하는 반환값이 아니다. 

우선 fetch 함수의 정의는 아래와 같다. fetch함수 자체에도 딱히 에러처리가 없다.

```ts
declare function fetch(input: RequrestInfo, init?: RequestInit): Promise<Response>;
```

위 버그를 고려하여 `fetch`가 정상응답이 아닐 경우 에러를 던지고, 정상 응답인 경우 json body를 돌려주는 함수를 작성해본다.

```ts
async function checkedFetch(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if(!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }
  return response;
}
```
`checkedFetch()`를 잘 생각해보면 `fetch()` 함수와 시그니쳐가 같다는 것을 알 수 있다. 여기서 `checkedFetch`를 개선할 수 있는 여지가 생긴다. `checkedFetch` 아래와 같이 함수 표현식으로 정의할 수 있다.

```ts
const checkedFetch: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  if(!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }
  return response;
}
```
나는 솔직히 위에 `async`가 붙어서 뭔가 타입이 다르다고 생각이 들었다. `async`-`await`에 대한 이해가 낮아서 그런 생각이 들었다. 그래서 그런 바보들을 위해 아래와 같이 async를 쓰지 않는 방식으로 함수를 정의할 수도 있겠다.
```ts
const checkedFetch: typeof fetch = (input, init) => {
  return fetch(input, init)
    .then((response) => response.json())
    .catch((err) => new Error(err.status));
};
```
'(input, init)' 앞에 `async`가 붙지 않아 `fetch`와 비슷하게 생겨졌다. `Promise`의 `then`이나 `catch`를 쓰는것보다 `async`, `await`을 쓰는것이 권장된다는것은 알고 있어야 한다.

어쨋든 위와 같이 다른 함수의 시그니처를 참조하려면 `typeof fn`을 사용하면 된다. 함수 내부에 로직 구현에 문제가 있을 때 타입 시스템이 에러를 알려줄 가능성이 커져 한층 안전한 코딩이 가능해진다.

<br><br>

## 13. 타입과 인터페이스의 차이점 알기
타입스크립트에서 명명된 타입(named type)을 정의하는 방법은 `interface`와 `type` 두가지가 있다. `class`도 가능하지만, 이는 값으로도 쓰이기 때문에 다루지 않는다.
```ts
type TState = {
  name: string;
  capital: string;
};

interface IState {
  name: string;
  capital: string;
}
```
대부분의 경우 타입과 인터페이스 어떤걸 써도 무방하다. 둘 다 같은 방법으로 타입 체크 시스템이 작동하고, 제너릭도 적용 가능하다. 클래스 구현시 타입, 인터페이스 모두 구현 가능하다. 또한 인터페이스는 타입을 확장할 수 있고 타입은 인터페이스를 확장할 수 있다.
```ts
// 인터페이스의 타입 확장 : extends
interface IStateWithPop extends TState {
  population: number;
}
// 타입의 인터페이스 확장 : &
type TStateWithPop = IState & { population: number };
```

그럼 둘 사이에 어떤 차이점이 있을까?

**1. 인터페이스는 유니온 타입 같은 복잡한 타입을 확장하지 못한다.**
타입을 정의하다 보면 유니온 타입을 확장해야하는 경우가 발생하는데, 인터페이스로는 불가능하다. 
```ts
// 불가능하다
interface IAB extends (A | B) {/* ... */}
// 인터페이스는 선택적 형식 인수가 포함된 식별자/정규화된 이름만 확장할 수 있습니다.ts(2499)
type TAB = (A | B) & {/* ... */}
```
아래 예제는 `Input`과 `Output`이라는 두가지 타입의 `Union Type`을 확장하는 타입을 변수명으로 매핑하는 `NamedVariableMap` 타입을 정의한다.
```ts
type Input = { /*...*/ }
type Output = { /*...*/ }
type NamedVariable = (Input | Output) & { name: string }
interface NamedVariableMap {
  [name: string]: NamedVariable
}
```
<br>

**2. 튜플과 배열 타입은 `type`을 이용하는게 훨씬 낫다.**
튜플, 배열타입은 아래와같이 type으로 만드는게 낫다.
```ts
type Pair = [number, number];
type StringList = string[];
type NamedNums = [string, ...number[]];
```
튜플을 인터페이스로 아래와 같이 구현할 수 있기도 하다.(유사배열객체)
```ts
interface Tuple {
  0: number;
  1: number;
  length: 2;
}
const t: Tuple = [1,2];
```
책에서는 이렇게 하면 배열의 프로토타입 메서드를 쓸 수 없다는 단점이 있다고 한다. 하지만 나는 방법을 찾았다. `Array`를 확장하면 간단히 해결된다. 
```ts
interface Tuple extends Array<number | string> {
  0: string;
  1: number;
  length: 2;
}
const t: Tuple = ['1', 2];
t.forEach((val) => console.log(val)); // '1' 2
```
책을 맹신하진 말자.

<br>

**3. 인터페이스에는 보강(augment)기법을 사용할 수 있다.**
인터페이스는 보강 기법을 이용해 속성을 확장할 수 있는데 이런 방식을 `선언 병합`(declaration merging)이라고 한다.
```ts
interface IState {
  name: string;
  capital: string;
}
interface IState {
  population: number;
}
const Korea = {
    name: 'korea',
    capital: 'Seoul',
    population: 50_000_000
};  // 정상
```

타입스크립트의 라이브러리나 기본 타입들은 많은 곳에서 선언 병합을 사용한다. 예를들어 `Array`인터페이스는 기본적으로 `lib.es5.d.ts`에 정의되어 있는걸 사용하는데 만약 `tsconfig.target` ES2015을 추가하면 `lib.es2015.d.ts`에 선언된 인터페이스를 병합한다. 

```ts
// lib.es2015.core.d.ts
interface Array<T> {
  find<S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined;
  find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;
  findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;
  fill(value: T, start?: number, end?: number): this;
  copyWithin(target: number, start: number, end?: number): this;
}
```
인터페이스를 병합했기 때문에 `find`, `findIndex`등의 메소드를 사용할 수 있게 되는것이다.

<br>

타입 선언에는 사용자가 채워야 하는 빈틈이 있을 수 있는데, 이 때 보강을 사용할 수 있도록 `인터페이스`로 타입을 선언하면 좋다. 그런데 API를 공개하는것이 아닌 프로젝트 내부적으로 선언되는 타입에 대해 선언 병합이 발생하는 것은 잘못된 설계다. 이럴땐 내가 타입을 잘 선언한게 맞는지 다시한번 생각해보고 `type`을 사용하도록 하자.

<br><br>

## 14. 타입 연산과 제너릭 사용으로 반복 줄이기
소프트웨어 개발 원칙중에 코드(함수, 상수, 루프)의 반복을 줄여 코드를 개선하는 DRY(don't repeat yourself)원칙이 있다. 이는 타입에도 적용할 수 있는 원칙이다. 타입이 중복되어 사용되는 몇가지 케이스를 살펴보고 이를 개선한다.


1. 함수 시그니처를 `명명된 타입`으로 분리해 중복 제거

함수에서 반복된 시그니처가 발생하고 있지 않는지 항상 살펴보고 이를 개선해야 한다. 예를들어 아래와 같이 몇몇 함수가 같은 타입 시그니처를 공유하고 있다고 해보자
```ts
function get(url: string, opts: Options): Promise<Response>{/* ... */}
function post(url: string, opts: Options): Promise<Response>{/* ... */}
```

함수 시그니처를 아래와 같이 명명된 타입으로 분리할 수 있다.
```ts
type HttpFunction = (url: string, opts: Options): Promise<Response>
const get: HttpFunction = (url, opts) => {/* ... */}
const post: HttpFunction = (url, opts) => {/* ... */}
```

<br>

2. 타입 확장을 통한 중복 제거

선언된 타입/인터페이스에도 중복이 없는지, 상속관계가 없는지 살펴봐야 한다. 아래의 타입은 중복이 존재한다.
```ts
interface Person {
  firstName: string;
  lastName: string;
}
interface PersonWithBirthDate {
  firstName: string;
  lastName: string;
  birth: Date;
}
```
`PersonWithBirthDate`가 `Person`을 상속(확장)하도록 해서 중복을 피하고, `Person`타입이 변할 때 내용이 자동으로 싱크되어 `PersonWithBirthDate`에 반영되도록 할 수 있다. 물론 **둘이 전혀 다른 독립된 타입이라면**(싱크할 필요가 없다면) 이런 방법은 옳지 않을것이다.

```ts
interface PersonWithBirthDate extends Person {
  birth: Date;
}

// or

type PersonWithBirthDate = Person & { birth: Date };
```

<br>

3. 어떤 타입의 부분집합 정의

아래는 `State`와 이것의 일부분을 표현하는 `TopNavState` 두개의 타입을 정의한 예시다.
```ts
interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}
interface TopNavState {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
}
```
`TopNavState`는 여러가지 방법으로 안정적으로(싱크되게) 정의 할 수 있는데, 우선 `State`를 인덱싱 하여 속성의 타입에서 중복 제거가 가능하다.
```ts
type TopNaveState = {
  userId: State['userId'];
  pageTitle: State['pageTitle'];
  recentFiles: State['recentFiles'];
}
```
하지만 여전히 코드의 반복이 있고, `TopNavState`의 프로퍼티 명을 잘못 입력하는 경우도 있을 수 있다. `매핑된 타입`을 이용하면 좀 더 개선시킬 수 있다.
```ts
type TopNaveState = {
  [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k];
};
```
많이 개선되었다. userId를 userid라고 잘못쓰면 타입 시스템이 에러를 발생시킬것이다. `매핑된 타입`은 굉장히 많으 쓰이고, 표준 라이브러리에서도 찾을 수 있는데, `Pick`이라고 한다.
```ts
// lib.es5.d.ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```
`Pick`을 이용해 `TopNavState`를 아래와 같이 정의할 수 있다.
```ts
type TopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles' >;
```
`Pick`은 제너릭 타입으로, `Pick`을 사용하는것은 ***타입에 대해 함수를 호출하는 것과 같다.***

<br>

4. 태그된 유니온(Tagged Union)에서 중복 제거

아래와 같이 태그된 유니온에서도 중복이 많이 발생한다.
```ts

interface SaveAction{
  type: 'save'
  // ...
}
interface LoadAction {
  type: 'load';
  // ...
}

type Action = SaveAction | LoadAction;
type ActionType = 'save' | 'load';
```
위의 방식은 `ActionType`에 type 프로퍼티 값을 다시 써주는 중복이 발생한다. `Action`을 `인덱싱`하면 이를 개선할 수 있다.
```ts
type ActionType = Action['type'];
```
`ActionType`은 `Pick<Action, 'type'>`과 다르다는것을 명심하자.

<br>


5. 어떤 타입의 약한 타입(weak type)의 중복제거

약한 타입이란 선택적 속성만 가지는 타입을 말한다. 예를들어, 클래스의 생성시 속성을 모두 채우고 상태를 업데이트 하는 `update()` 함수를 정의한다고 할 때, 클래스의 속성들의 약한 타입을 인자로 받을것이다.
```ts
interface Options {
  width: number;
  heigth: number;
  color: string;
}
interface OptionsUpdate {
  width?: number;
  heigth?: numer;
  color?: string;
}
class UIWidget {
  constructor(init: Options) {/**/}
  update(options: OptionsUpdate) {/**/}
}
```
딱봐도 중복이 너무 많다. 우선 `매핑된 타입`과 `keyof`를 사용해 `Options`로부터 `OptionsUpdate`를 만들 수 있다. ***`keyof`는 타입을 받아서 속성 타입의 유니온을 반환한다.***

```ts
type OptionsUpdate  = {
  [k in keyof Options]: Options[k]
}
```
이러한 패턴 역시 아주 자주 쓰여 표준 라이브러리에 `Partial`로 정의되어 있다.
```ts
class UIWidget {
  constructor(init: Options) {/**/}
  update(options: Partial<Options>) {/**/}
}
```

<br>

6. 값의 형태에 해당하는 타입을 정의할 때 중복제거

어떤 값이 이미 존재할 때, 해당 값의 형테에 해당하는 타입을 정의하고 싶을 수 있다. `typeof`연산자를 사용하자.
```ts
const INIT_OPTIONS = {
  width: 640,
  heigth: 480,
  color: '#ababab',
}
type Options = typeof INIT_OPTIONS;
/*
type Options = {
    width: number;
    heigth: number;
    color: string;
}
*/
```

<br>

7. 함수나 메서드의 반환 값에 명명된 타입을 만들 경우

제목그대로, 함수의 반환타입을 타입으로 정의하고 싶은 경우 유틸리티 타입 `ReturnType`을 사용하면 된다.
```ts
function getUserInfo(userId: string) {
  // ...
  return {
    userId, name, age, height, weight
  };
}

type UserInfo = ReturnType<typeof getUserInfo>;
```

---
`제너릭 타입`은 ***타입을 위한 함수***와 같다고 했다. 함수에서 일반적으로 매개변수로 매핑할 수 있는 값을 타입 시스템을 이용해 제한하는 것 처럼, ***제너릭 타입에도 매개변수를 제한***해야 한다. 이 때 `extends`를 사용하여 제너릭 매개변수가 특정 타입을 확장한다고 정의할 수 있다.

```ts
interface Name {
  first: string;
  last: string;
}

// 제너릭 타입 DancingDuo
type DancingDuo<T extends Name> = [T, T]; 

const couple1: DancingDuo<Name> = [
  {first: 'f1', last: 'l1'},
  {first: 'f2', last: 'l2'}
];  // ok

const couple2: DancingDuo<{first: string}> = [  // Name 타입에 필요한 'last' 속성이 없습니다.
  {first: 'f1'},
  {first: 'f2'}
]
```
`{first: string}`이 `Name`을 확장하지 않았기 때문에 오류가 발생하였다. 

제너릭 타입 사용시 항상 매개변수를 작성해야한다. `DancingDuo<Name>`는 작동하지만 `DancingDuo`는 동작하지 않는다. 타입스크립트가 제너릭 매개변수의 타입을 추론하게 하기 위해, 함수를 작성할 때는 신중하게 타입을 고려하도록 하자.

<br><br>

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
## 30. 문서에 타입 정보를 쓰지 않기 
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
