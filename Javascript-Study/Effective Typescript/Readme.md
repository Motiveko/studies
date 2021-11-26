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
## 5. any 타입 지양하기

# 2장. 타입스크립트의 타입 시스템
## 6. 편집기를 사용하여 타입 시스템 탐색하기
## 7. 타입이 값들의 집합이라고 생각하기
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
