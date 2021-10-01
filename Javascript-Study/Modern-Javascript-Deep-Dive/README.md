# 모던 자바스크립트 Deep Dive
![표지](https://wikibook.co.kr/images/cover/m/9791158392239.png)

## 1.~3. 
교양으로 정리하지 않음

<br><br>

## 4. 변수
---
<br>

### 4.1 변수란 무엇이고 왜 필요한가?
- 자바스크립트 엔진이 코드를 평가하기 위해서는 내용을 파싱해서 기억(메모리 저장)해야한다.
- 메모리는 셀단위로 이루어져있고, 각 셀은 8비트의 저장공간을 가진다.
- 변수는 하나의 값을 저장하기 위해 확보한 메모리 공간 그 자체 혹은 식별을 위해 붙인 이름이다.

### 4.2 식별자
- var result = 1 로 선언시 result는 식별자
- 식별자는 메모리 주소를 기억하고 있다.

### 4.3 변수의 선언
- 변수의 선언은 var(ES5), let, const (ES6)키워드를 사용한다
- 변수의 선언은 변수의 이름을 등록해서 js 엔진에 변수의 존재를 할리는 **선언단계**와 메모리 공간을 확보하고 undefined 값을 할당하는 **초기화단계**로 구성된다.
- 메모리에는 이전에 사용하고 지워지지 않은 값이 있을 수 있으므로 초기화 단계는 필수적이다.
- 선언되지 않은 변수를 참조하면 ReferenceError가 발생한다.

### 4.4 변수 선언의 실행 시점과 호이스팅

- js코드는 **인터프리터에** 의해 **한줄씩 순차실행**된다
- 그러나 **변수의 선언은** 한줄씩 순차실행되는 런타임이 아닌 그 이전의 **소스코드의 평가 과정**에서 실행되고, 선언코드는 모두 제외되어 나머지가 인터프리터에 의해 실행된다.
- 따라서 변수의 사용이 변수 선언 이전에 이뤄질 수 있는데, 이처럼 변수 선언이 코드의 최상단으로 끌어올려진 것 처럼 동작하는 js 고유의 특징을 **호이스팅(hoisting)** 이라고 한다.

### 4.5 값의 재할당

- var 키워드로 변수 선언시 값의 재할당이 가능하다. ↔ const
- **값의 재할당은 메모리의 값을 지우고 다시 할당하는게 아닌 새로운 주소에 새로운 값을 적고 변수가 해당 주소를 참조하는 형식이다.**
- 이전값은 더이상 변수가 참조하지 않기때문에 가비지 컬렉터에 의해 제거된다.
- 변수가 초기화(undefined) 후 사용자가 최초로 값을 할당할 때도 위와 같은과정에 의해 재할당이 이뤄진다.

### 4.6 식별자 네이밍 규칙
- 식별자는 다음의 네이밍 규칙을 준수해야 한다.
    - 식별자는 특수문자를 제외한 숫자, 문자(유니코드 포함), '_', '$' 로 이뤄져야 한다.
    - 식별자는 숫자로 시작할 수 없다
    - 예약어는 식별자로 사용할 수 없다.( await, async, try, catch, ...)
- 식별자는 **대소문자를 구분**한다.
- 변수 이름을 선언하는 4가지 유형의 Naming Convention이 존재한다.
    - Camel Case :: myName
    - Snake Case :: my_name
    - Pascal Case :: MyName
    - typeHungarianCase
        - strMyName ( type + identifier )
        - $elm ( DOM )
        - observable ( RxJs )

<br><br>

## 5. 표현식과문
> 자바스크립트 뿐만 아니라 컴퓨터 사이언스 전반에서 사용하는 용어를 정리한다.

---
<br>

### 5.1 값
 - 값은 표현식이 평가되어 생성된 결과를 말한다
 - 10 + 20 -> 값(30)
### 5.2 리터럴
 - 리터럴은 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용해 값을 생성하는 표기법을 말한다.
    ```javascript
    100         // 정수 리터럴
    10.5        // 부동소수점 리터럴
    0b01000001  // 0b로 시작하는 2진수 리터럴
    0o010       // 0o로 시작하는 8진수 리터럴
    0x41        // 0x로 시작하는 16진수 리터럴
    'hello'
    "World"     // 문자열 리터럴
    true
    false       // boolean 리터럴
    [1, 2, 3]   // 배열 리터럴
    { a: 30 }   // 객체 리터럴
    function(){}// 함수 리터럴
    /[A-Z]/     // 정규 표현식 리터럴

    ```

### 5.3 표현식
-  표현식은 값으로 평가될 수 있는 문(statement)이다. 표현식이 평가되면 새로운 값을 생성하거나 기존 값을 참조한다.

    ```javascript
    // 리터럴 표현식
    10
    true

    // 식별자 표현식
    sum 
    person.name
    arr[1]

    // 연산자 표현식
    10 + 20
    10 > 50
    sum != 30

    // 함수/메서드 호출 표현식
    sum()
    person.getName()
    ``` 
- 표현식은 값으로 평가되고, 평가된 값은 표현식과 동치(equals)이다.

### 5.4 문(statement)
- 문은 여러 토큰으로 구성된 프로그램을 구성하는 기본 단위디다.
- 토큰은 더이상 나눌 수 없는 코드의 기본 구성 요소이다.
  ```javascript
  // 변수 선언문
  var x;

  // 할당문
  x = 5;

  // 함수 선언문 
  function() {}

  // 조건문
  if(a > 10){ console.log(a); }

  // 반복문
  for( item of items) { console.log(item); }

  ...
  ```

### 5.5 세미콜론(;)과 세미콜론 자동 삽입 기능(ASI)
- 자바스크립트 엔진은 세미콜론으로 문의 종료를 파악하고 하나의 문씩 순차적으로 실행한다.
- 0개이상의 statement를 묶은 블록( { ... })은 세미콜론으로 끝내지 않는다.
- 세미콜론을 붙이지 않아도 자바스크립트 엔진이 코드의 끝이라고 생각되는 부분에 자동으로 세미콜론을 삽입해준다.(Automatic Semicolon Insertion)
- 세미콜론을 붙이지 않을 경우 예기치 못한 문제가 발생할 수 있다.
```javascript
    function foo() {
        return
        {}
    }
    
    // ASI return; {};
    // 예측 : return {}

    console.log(foo)    // undefined;
```
- eslint에서도 권장하는 만큼 세미콜론은 붙이자.

<br><br>

## 6. 데이터 타입
> 데이터 타입은 값의 종류를 말한다. 자바스크립트의 모든 값은 데이터 타입을 갖는다.
---
<br>

ES6는  아래와 같은 7개의 데이터 타입을 지원한다.
<table style="widh: 80%; text-align: center">
    <thead>
        <th>구분</th>
        <th>데이터타입</th>
        <th>설명</th>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6>primitive type</td>
            <td>number</td>
            <td>숫자, 정수, 실수 구분 업이 하나의 number타입만 존재</td>
        </tr>
        <tr>
            <td>string</td>
            <td>문자열</td>
        </tr>        
        <tr>
            <td>boolean</td>
            <td>논리적 참과 거짓</td>
        </tr>        
        <tr>
            <td>undefined</td>
            <td>var 키워드로 선언된 변수에 암묵적으로 할당되는 값</td>
        </tr>        
        <tr>
            <td>null</td>
            <td>값이 없다는 것을 의도적으로 명시할 때 사용하는 값</td>
        </tr>        
        <tr>
            <td>symbol</td>
            <td>ES6에서 추가된 7번째 타입</td>
        </tr>                            
        <tr>
            <td colspan=2>객체 타입</td>
            <td>객체, 함수, 배열 등</td>
        </tr>                                                
    </tbody>
</table>

### 6.1 number 타입
- ECMAScript사양에 따르면 숫자 타입의 값은 배정밀도 __64비트 부동소수점 형식__ 을 따른다. 즉 모든 수를 실수로 처리한다. 

- 정수, 실수, 2진수, 8진수, 16진수 리터럴은 모두 메모리에 배정밀도 64비트 부동소수점 형식의 2진수로 저장된다. 따라서 이 값을 참조하면 모두 10진수로 해석된다.
    ```javascript
        var binary = 0b01000001; //2진,  65
        var octal = 0o101;       //8진,  65
        var hex = 0x41;          //16진, 65

        console.log(binary === octal) // true (65 === 65)
        console.log(binary === hex)   // true (65 === 65)

        console.log(1 === 1.0)        // true
    ```
- 숫자 타입은 아래와 같은 특별한 값을 가진다.(__대소문자 구분__)
    - Infinity: 양의무한대
    - -Infinity: 음의무한대
    - NaN: 산술 연산 불가(not-a-number)

### 6.2 string 타입
- string은 0개 이상의 16비트 유니코드 문자(UTF-18)의 집합으로 대부분의 문자를 표현할 수 있다.
- 큰따음표, 작은따음표, 백틱(``) 으로 표현할 수 있다. 백틱으로 감싸는것은 템플릿 리터럴이라 부른다.
- 일반 문자열은 개행 등의 공백을 표현하려면 Escape Sequence를 사용해야 한다.
    - \0 : Null
    - \b : 백스페이스
    - \n : 개행
    - \t : 탭
    - \' , \" : 작은따음표, 큰따음표
    
    ...

### 6.3 템플릿 리터럴
- ES6부터 도입된 문자열 표기법으로 백틱을 사용한다.
- 템플릿 리터럴 내에서는 Escape Sequence 없이 개행, 공백등이 그대로 적용된다.
- 아래와 같은 방법으로 표현식 삽입도 가능하다.
    
    ```javascript
        console.log(`1 + 2 is ${1 + 2}`); // 1 + 2 is 3
    ```

### 6.4 undefined
 - var 키워드로 선언한 변수는 암묵적으로 undefined로 초기화 된다. 이를 통해 선언 이후 값이 할당된 적 없는 변수라는것을 확인할 수 있다.
 - 따라서 개발자가 undefined를 할당하는것은 자제해야하고, 의도적으로 값이 없음을 나타내려면 null을 할당해야 한다.


### 6.5 null
 - 프로그래밍 언어세어 null은 변수에 값이 없다는 것을 의도적으로 명시할 때 사용한다.
 - 변수에 null을 할당하면 이전 값을 더이상 참조하지 않겠다는 의미이고, 자바스크립트 엔진은 해당 메모리 공간에 가비지 콜렉션을 수행한다.

### 6.6 symbol
- symbol은 ES6에 추가된 primitive 타입의 값으로, 다른 값과 중복되지 않는 유일무이한 값이다. 
- 따라서 이름이 충돌할 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용한다.
- 심벌은 리터럴이 아닌 Symbol 함수로 호출한다.
    ```javascript
    var key = Symbol('key')
    console.log(typeof key)     // symbol

    var obj = {};

    // 이름이 충돌할 위험이 없는 유일무이한 값인 심벌을 프로퍼티 키로 사용
    obj[key] = 'value';
    console.log(obj[key])       // value
    ```

### 6.7 __데이터 타입의 필요성__
 - __데이터 타입에 의한 메모리 공간의 확보와 참조__
    - 값은 메모리에 저장하고 참조되는데, 메모리에 저장하기 위해 확보해야할 메모리 공간의 크기를 결정해야 한다. 이 때 변수에 할당되는 값의 데이터 타입에 따라 메모리 크기가 결정된다.

    - 예를 들어 number는 64비트 부동소수점 형식이므로 8바이트의 공간을 차지한다.
    - ECMAScript 사양에 따르면 number, string 이외의 데이터 타입의 크기를 명시적으로 규정하지 않으므로, js 엔진 제조사에 따라 할당되는 메모리 크기는 다양하다.
 - __데이터 타입에 의한 값의 해석__
    - 변수의 값을 메모리에 저장했고, 이를 참조해서 읽는다 했을 때 값은 기본적으로 0,1로 이뤄진 2진수 값이다.
    - 이를 해석하는 방법은 다양한데, 01000001 은 숫자 65이고 문자로는 'A'이다.
    - 이런 경우 데이터 타입을 이용해 2진수 값의 해석 방법을 결정한다.

### 6.8 동적 타이핑
 - 자바스크립트는 변수 선언시 타입을 선언하지 않는다(동적 타입 언어)
 - 반대로 JAVA, C 등의 언어는 변수 선언시 타입을 선언한다(정적 타입 언어)
 - __자바스크립트의 변수는 선언이 아닌 할당에 의해 타입이 결정(type Inference)된다. 그리고 재할당에 의해 변수의 타입은 언제든지 동적으로 변할 수 있다. 이러한 특징을 동적 타입핑이라고 한다.__

<br><br>

## 7. 연산자
---
<br>

### 7.3 비교 연산자
> 비교연산자는 피연산자를 비교한 다음 결과를 boolean으로 반환하며, 부수효과를 가지지 않는다

동등/일치 비교 연산자 

== 는 피연산자의 값을 암묵적 타입 변환하여 값을 비교(동등 비교)하고, === 는 값의 타입까지 비교(일치 비교)한다.

| 비교 연산자 | 의미 | 설명 | 부수효과 | 
|---|:---:|---:|---:| 
| `==` | 동등비교 | 값이 같음 | X |
| `===` | 일치비교 | 값과 타입이 같음 | X |
| `!=` | 부동등 비교 | 값이 다름 | X |
| `!==` | 불일치 비교 | 값과 티입이 다름 | X |

동등/일치 비교 연산자의 사례를 보자.

```js
5 == 5;     // true
5 == '5';   // true

// 동등 비교, 결과가 직관적이지 않고 예측하기 어렵다
'0' == '';          // false
0 == '';            // true !?
0 == '0';           // true
false == 'false';   // false ?!?
false == '0';       // true !?
false == null;      // false
false == undefined  // false
```

위와같이 동등비교 연산자는 예측하기 어려운 결과를 내므로 일치 비교 연산자를 사용하도록 하자.
다만 일치비교 연산자에도 주의할 사례가 있다.

```js
NaN === NaN;    // false
+0 === -0       // true
```

NaN은 **자신과 일치하지 않는 유일한 값이다.** 따라서 값이 NaN인지 조사하려면 빌트인함수 isNaN()을 사용한다.

```js
isNaN(NaN);             // true
isNaN(5)                // false
isNaN(1 + undefiened);  // true
```

+0, -0의 사례는 좀 더 정확한 비교를 할 수 있는 ES6 Object.is() 메서드를 사용하자. 가장 예측 가능한 정확한 비교 결과를 뱐환한다.

```js
-0 === +0;              // true
Object.is(-0, +0);      // false
NaN === NaN;            // false
Object.is(NaN, NaN);    // true
```

### 7.8 typeof 연산자
typeof연산자는 피연산자의 데이터 타입을 **문자열**로 반환한다. **"null"은 반환하지 않으며**, "string", "number", "boolean", "undefined", "object", "function"중 하나를 반환한다.

typeof연산자는 아래와 케이스의 주의점이 있다.

```js
var foo = null;

typeof foo;             // object
typeof undefined        // undefined
typeof undeclared;      // -> ReferenceError

```
- **null을 typeof로 연산하면 obejct가 나온다.** js의 버그중 하나인데, 기존 코드에 영향을 줄 수 있기 때문에 아직까지 수정되지 못하고 있다.
- 선언되지 않은 식별자를 typeof로 연산하면 ReferenceError가 발생한다.

### 7.10 그 외의 연산자
| 연산자 | 개요 |
|---|:---:|
| `?.` | 옵셔널 체이닝 연산자 | 
| `??` | null 병합 연산자 |
| `delete` | 프로퍼티 삭제 |
| `new` | 생성자 함수를 호출할 때 사용하여 인스턴스를 생성 |
| `instanceof` | 좌변의 객체가 우변의 생성자 함수와 연결된 인스턴스인지 판별 |
| `in` | 프로퍼티의 존재 확인 |

### 7.11 연산자의 부수 효과
연산자중 부수효과가 있는 연산자는 아래와 같다
- 할당연산자(=)
- 증가/감소 연산자(++, --)
- delete 연산자

부수효과가 있는 연산자는 항상 주의해서 사용해야 한다.


<br><br>

## 8. 제어문
--- 
<br>

### 8.3 반복문
다향한 for문
- 배열순회 : Array.prototype.forEach()
- 객체의 프로퍼티를 열거할 때 사용하는 for ...in 문
- ES6에서 도입된 Iterable을 순회할 수 있는 for ...of문

### 8.4 break문
break문은 **코드 블록을 탈출**하는데 쓰인다. 좀 더 정확히 표현하면, 레이블문, 반복문, 또는 switch문의 코드 블록을 탈출한다.
이 외의 코드 블록에서 break를 사용하면 SyntaxError가 발생한다.

```js
if(true) {
    break;      // Uncaught SyntaxError: Illegal break statement
}
```

레이블 문(label statement)은 식별자가 붙은 문을 말한다.
```js
// foo라는 레이블 식별자가 붙은 레이블문
foo: console.log('foo');
```

레이블 문은 프로그램의 실행 순서를 제어하는데 사용한다. 사실 swtich문의 case와 default도 레이블문이다. 레이블 문을 탈출하려면 **break문에 레이블 식별자를 지정한다.**

```js
foo: {
    console.log(1);
    break foo;
    console.log(2);
}
```

레이블 문을 사용하면 break를 이용해 중첩 for문을 한번에 탈출하는것이 가능하다.

```js
outer: for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 3; j++) {
        // i+j === 3이면 outer라는 식별자가 붙은 레이블문(for 문)을 탈출한다.
        if( i + j === 3) break outer;
        cosnole.log(`i : ${i}, j : ${j}`);
    }
}
```

label문은 유용해 보이지만 일반적으로 권장하지 않는다. label문이 사용되면 프로그램의 흐름이 복잡해져서 가독성이 나빠지고 오류를 발생시킬 가능성이 높아지기 때문이다.

<br><br>

## 9. 타입 변환과 단축 평가
---
<br>



<!-- 전부정리 ./. -->

<br><br>

## 10. 객체 리터럴
---
<br>

10.3프로퍼티
 - 객체의 프로퍼티 key는 공백을 포함하는 문자열, symbol간으. value는 모든 타입의 값 가능
 - key는 가급적 식별자 네이밍 규칙을 따라야한다. 안따르면 'key-1' 과 같은 형태로 따음표류로 감싸줘야하니 왠만하면 따르자.
 - 특이하게 숫자로 된거는 따음표로 안감싸도된단다..
 - key에 숫자 등을 쓰면 암묵적 타입 변환이 일어나 내부적으로 string으로 변환해서 갖고있는다.
 - var, async 같은 예약어도 가능한데 권장치 않음
 - 같은key는 나중꺼로 덮어씀

10.8 프로퍼티 삭제
delete person.name 과 같은 형태로 'delete연산자'를 이용해 지운닷

10.9.2 계산된 프로퍼티 이름 -> es5와 es6에서의 차이가 꽤나 크다
 <br><br>

## 11. 원시 값과 객체의 비교
---
<br>

### 11.1 원시값
값을 변경할 수 없다 -> 변수가 아닌 값에 대한 이야기
원시 값의 불변성 -> 변수가 참조하는 메모리에 저장된 값을 변경하는것이 아닌 메모리 공간의 주소를 변경
불변성을 갖는 원시값은 재할당 이외에 값을 변경할 수 있는 방법이 없다. 
const는 재할당이 금지된다. but const로 선언된 객체는 값 변경 가능

### 11.1.2 문자열과 불변성
문자1개는 2바이트, 문자열은 문자 갯수에 따라 필요한 메모리 공간이 다르다
그래서 C는 문자열을 문자의 배열로, java는 객체로 처리한다.
자바스크립트는 원시타입인 문자열 타입을 제공한다. 장점이란다.
문자열은 유사 배열 객체이며 이터러블, 배열과 유사하게 각 문자에 접근가능
 - 원시 값을 객체처럼 ㅅ가용하면 원시값을 감싸는 래퍼 객체로 자동변환된다. 21장에서 다룰예정
str[0] = 'S' 같은 형태로 일부 변경하는건 반영되지않는다. immutable이기때문이다.

### 11.1.3 값에 의한 전달
변수에 변수를 할당했을 때 무엇이 어떻게 전달되는가!?
값을전달하는 방식의 그림은 js엔진 제조사 마다 차이가 있을 수 있다. 값이 실제 다른 메모리에 복사될 수 도 있고, 같은 메모리를 참조하다가 원래 변수가 재할당이 이뤄지면 다른 메모리로 가는 형식일 수도 있다.
근데 값에의한 전달이라는 말은 틀리단다. 실제로는 값이 저장된 메모리 주소를 전달한다는데?? 주소를 전달받으면 주소를 통해 메모리에 저장된 값을 가져오는방식
중요한건 변수에 변수를 할당할 때 둘다 immutable이면 한쪽이 재할당해도 간섭할 수 없다(두개가 독립적이다) 이다.

### 11.2 객체
객체..는 약간 해시테이블 같지만 해시테이블보다 나은 방법으로 구현되어있따.(빠르게)
자바스크립트 객체는 java, c++에서와 같이 사전정의된 클래스같은게 없기때문에 생성과 프로퍼티 접근에 비용이 많이든다. 이를 위해 dynamic lookup대신 히든클래스라는 방식을 사용해 성능을 높였다. 히든클래스는 자바 클래스와 유사하게 작동한다.
### 11.2.1 변경 가능한 값
객체는 mutable한 값이다. 객체를 할당한 변수는 객체의 주소 참조값을 가지고 있다.
메모리에 저장된 객체를 직접 수정해도 객체를 할당한 변수의 참조 값은 변하지 않는다. 신뢰도가 낮아짐에도 이렇게 하는 이유는 객체를 생성,관리,접근하는 비용은 매우 크기 때문이다.
부작용: 여러개의 식별자가 하나의 객체를 공유할 수 있다
- shallow copy, deep copy
 - 정리 ㄱ ㄱ 
### 11.2.2 참조에 의한 전달
객체를 가리키는 변수를 다른 변수에 할당하면 원본의 참조값이 복사되어 전달된다. --> 두개의 식별자가 동일한 객체를 가리킨다!?
copy === person // true (제일 얕은 복사)

<br><br>

## 12. 함수
---
<br>

### 12.1 함수란?

함수는 일련의 과정을 statement로 구현하고 코드블록으로 감싸서 하나의 실행 단위로 정의한 것이다.

함수는 정의(definition) 하고 argument를 전달해 호출(call/invoke)하면 실행된다.

 함수는 객체타입의 값이기 때문에 식별자를 붙일수 있고 식별자는 함수 내부 코드를 이해하지 않아도 함수의 역할을 파악할 수 있어 코드의 가독성을 높인다.


### 12.3 함수 리터럴

함수는 객체타입의 값이므로 리터럴로 생성할 수 있다. 함수 리터럴은 function키워드, 함수이름, 매개변수 목록, 함수 몸체로 구성된다.

특징
- 함수 이름
  - 함수 이름은 시별자이므로 식별자 네이밍 규칙을 준수해야한다.
  - 함수 이름은 함수 몸체 내에서만 참조할 수 있는 식별자다.
  - 함수는 이름이 생략될 수 있다. 이름이 있는 함수를 named function, 없는 함수를 anonymous function이라고 한다.

### 12.4 함수 정의

함수 정의는 4가지 방법이 있다. 정의된 함수는 자바스크립트 엔진에 의해 평가되어 **함수 객체**가된다.

```js
// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 표현식
var add = function(x,y) {
  return x + y;
}

// Function 생성자 함수
var add = new Function('x', 'y', 'return x + y;');

// 화살표 함수(ES6)
var add = (x,y) => x + y;
```

### 12.4.1 함수 선언문
함수 선언문은 언뜻 보면 함수 리터럴과 비슷해보인다. 하지만 함수 리터럴과 달리 함수 선언문은 이름을 생략할 수 없다.
```js
// 함수 선언문
function add(x,y) {
  return x + y;
}

// 함수 선언문은 함수 리터럴과 달리 이름을 생략할 수 없다.
function (x, y) {
  return x + y;
}
// SyntaxError: Function statements require a function name
```

함수 선언문은 표현식이 아닌 문(Statement)이다. 크롬 콘솔에서 함수 선언문을 작성하고 엔터를 치면 undefined가 뜬다. statement는 변수에 할당할 수 업식 때문이다. 그런데 아래와 같이 함수 선언문이 변수에 할당되는 것 처럼 보이기도 한다.

```js
// statement가 어떻게 변수에 할당되는가?
var add = function add(x, y) {
  return x + y;
}
console.log(add(1, 2 ));  // 3
```

이렇게 동작하는 이유는 **자바스크립트 엔진이 코드의 문맥에 따라 동일한 함수 리터럴을 표현식이 아닌 문(statement)인 함수 선언문으로 해석하는 경우와 표현식인 문인 함수 리터럴 표현식으로 해석하는 경우가 있기 때문이다.** 말이 어렵다.  한마디로 함수 이름이 있는 기명 함수 리터럴은 함수 선언문 또는 함수 리터럴 표현식으로 해석될 수 있다는 말이다.

다른 예로 {}가있다. {}는 코드블록일수도, 객체 리터럴일 수도 있다. 문맥에 따라 다르게 해석한다. {}가 단독으로 있으면 자바스크립트 엔진은 블록문으로 해석한다. 하지만 {} 이 값으로 평가되어야 할 문맥에서 피연산자로 사용되면 객체 리터럴로 해석한다.(중의적 코드이다.)

기명 함수 리터럴도 중의적 코드다. 따라서 문맥에 따라 단순히 선언문으로 해석할지, 표현식으로 해석할지 결정하고, 함수 생성의 내부 동작은 달라진다.
브라우저의 콘솔에 아래와 같이 입력해보자.

```js
function foo(x, y) { return x + y; }
// undefined

console.log(foo(1,2));
// 3

(function bar(x, y) { return x + y; })
// ƒ bar(x,y) { return x+y; }

console.log(bar(1,2));
// Uncaught ReferenceError: bar is not defined
```
위 예제이서 함수 생성에 따라 콘솔에서 출력 결과가 다르다. **단독으로 사용된 함수 리터럴(foo)는 함수 선언문으로 해석된다.** 하지만 그룹연산자 () 내에 있는 함수 리터럴(bar)는 함수 리터럴 **표현식**으로 해석된다. 
**그룹 연산자의 피연산자는 값으로 평가될 수 있는 표현식이어야하기 때문이다.**

**_함수 이름은 함수 몸체 내에서만 참조할 수 있는 식별자다._** 따라서 외부에서는 함수의 이름을 참조할 수 없다. 또한 () 내부는 값으로 해석되는 표현식이고, 이것이 식별자에 할당되지 않았기 때문에 호출이 불가능하게된다.

그런데, foo()역시 이름은 함수 몸체 내부에서만 참조할 수 있고, 함수 객체를 가리키는 식별자도 선언하지 않았다. 어떻게 호출이 가능할까?

이유는 **_자바스크립트 엔진이 foo라는 식별자를 암묵적으로 생성했기 때문이다._** 즉 자바스크립트 엔진은 함수 선언문을 함수 표현식으로 함수 객체를 생성하여 함수 이름과 동일한 식별자에 객체 참조를 할당한다.


### 12.4.2 함수 표현식
함수는 객체 타입의 값으로, 변수에 할당할 수도, 프로퍼티 값이 될 수도, 배열의 요소가 될 수도 있다. 이처럼 값의 성질을 갖는 객체를 **_일급객체_** 라 한다. 일급객체는 값처럼 자유롭게 쓸 수 있다.
함수 리터럴에서 함수 표현식에서는 함수 이름을 생략하는게 일반적인데, 이름을 선언했다고 해도, 호출은 식별자로만 가능하다.
```js
// 기명 함수 표현식 add: 식별자, foo: 함수이름
var add = function foo(x, y) {
  return x + y;
}

// 함수 객체를 가리키는 식별자로 호출
console.log(add(2,5));

// 함수 이름으로 호출하면 ReferencError 발생
console.log(foo(2,5)) // ReferenceError: foo is not defined

```

함수 선언문과 표현식은, 선언문은 암묵적으로 함수이름과 동일한 식별자가 선언된다는데 있어 같아 보인다. 하지만 차이가 있다.

### 12.4.3 함수 생성 시점과 함수 호이스팅

아래 예제를 보자.

```js
console.dir(add); // f add(x, y)
console.dir(sub); // undefined

console.log(add(2,5));  // 7
console.log(sub(2,5));  // TypeError : sub is not a function

// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 표현식
var sub = function (x, y) {
  return x + y;
}
```

함수 선언문과 함수 표현식이 어떻게 다르게 작동했기에 위와같은 결과가 나온것일까? 

**함수 선언문은 모든 선언문과 동일하게, 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행된다. 그리고 마치 함수 선언문이 코드의 선두로 끌어올려진 것 처럼 동작하는데, 이를 함수 호이스팅이라고 한다.**

함수 호이스팅과 변수 호이스팅은 다르게 작동한다. 변수 호이스팅은 var키워드를 사용한 변수 선언문이 undefined로 초기화되는것이고, 함수 호이스팅은 함수 선언문으로 생성된 식별자가 함수 객체로 초기화된다. 즉 호출이 이미 가능하다.

**함수 표현식**으로 함수를 정의하면 변수가 선언되고 할당되는데, **이는 함수 호이스팅이 아닌 변수 호이스팅으로 작용하여, 런타임에 변수 할당문이 실행되기 전까지는 식별자는 undefined로 평가된다.** 선언문, 표현식 말이 햇갈리지만 집중하면 쉽게 이해되는 내용이다.

함수 선언문은 함수 호이스팅으로 인해 예측과 다르게 작동할 여지가 있으니 **함수 생성은 _함수 표현식_** 을 이용하도록 하자.


### 12.4.4 Function 생성자 함수

아래와 같은 형태로 add 함수를 선언한다.
```js
var add = new Function('x', 'y', 'return x+y;');
```
Function 생성자 함수로 함수를 선언하는것은 바람직하지 않은 방법이다. Function 생성자 함수로 생성하는 함수는 클로저를 생성하지 않는 등 함수 선언문이나 함수 표현식으로 생성한 함수와 다르게 동작한다.

### 12.4.5 화살표 함수
ES6에서 도입된 화살표 함수는 function 키워드 대신 =>를 사용해 좀 더 간략한 방법으로 함수를 선언할 수 있다. 화살표 함수는 항상 **익명 함수**로 정의한다.

```js
const add = (x, y) => x + y;
console.log(add(2, 5));
```
화살표 함수는 기존의 함수보다 표현만 간략한 것이 나니라 내부 동작 또한 간략화 되어있다.

화살표 함수는 생성자 함수로 사용할 수 없으며, 기존 함수와 this 바인딩 방식이 다르고 prototype 프로퍼티가 없고, arguments 객체를 생성하지 않는다.

### 12.5 함수 호출
함수는 함수를 가리키는 **식별자**와 한 쌍의 소괄호인 **함수 호출 연산자**로 호출한다. 함수를 호출하면 현재의 실행 흐름을 중단하고, 호출된 함수로 실행 흐름을 옮긴다.

### 12.5.1 매개변수(parameter)와 인수(argument)

함수 호출 시, 매개변수를 통해 인수를 전달한다. 인수는 값으로 평가될 수 있는 표현식이어야 하며, 개수와 타입에는 제한이 없다.

```js
function add(x, y) {
    return x + y;
}
// 인수 1, 2가 x, y에 순서대로 할당되고 함수 몸체의 문들이 실행된다.
var result = add(1,2);
```
매개변수는 함수를 정의할 때 선언하고, 함수 내부에서 변수와 동일하게 취급된다. 즉 함수 호출 시, 암묵적으로 함수 몸체 내에 매개변수가 생성되고, 일변 변수와 마찬가지로 **undefined로 초기화**된 이후 인수가 순서대로 할당된다.

매개변수는 함수 내부에서만 참조할 수 있고 외부에서는 불가능하다. 즉 **매개변수의 스코프틑 함수 내부다.**

함수는 매개변수의 개수와 인수의 개수가 일치하는지 체크하지 않는다. 달라도 에러가 발생하지 않는다. 인수가 부족하면 남은 매개변수는 초기값인 undefined로, 인수가 많으면 암묵적으로 **arguments 객체의 프로퍼티로** 보관된다.

```js
function add(x, y) {
    console.log(arguments)
    return x + y;
}

console.log(add(2)); // NaN, 단축평가
add(2,5,10);    // Arguments(3) [2, 5, 10, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

### 12.5.2 인수 확인
```js
function add(x, y) {
    return x + y;
}
```
위 함수의 의도는 숫자 x,y를 받아 합계를 반환하려는 것이다. 하지만 코드상으로 인수의 타입과, 반환값의 타입이 명확하지 않아 아래와 같이 호출될 수 있다.

```js
...

add(2)        // NaN
add('a','b'); // 'ab'
```

위와같은 문제가 발생하는 이유는 아래와 같다.
 - 자바스크립트 함수는 매개변수와 인수의 개수가 일치하는지 확인하지 않는다.
 - 자바스크립트는 동적 타입 언어로 매개변수의 타입을 사전지정할 수 없다.

<br>

함수를 정의할 때 아래와 같이 적절한 타입의 인수가 전달되는지 확인할 수 있다. 

<br>

```js
function add(x, y){
    if(typeof x !== 'number' || typeof y !== 'number') {
        throw new TypeError('인수는 모두 숫자 값이어야 합니다.');
    }
    return x + y;
}
console.log(add(2));            // TypeError: 인수는 모두 숫자 값이어야 합니다.
console.log(add('a', 'b'));     // TypeError: 인수는 모두 숫자 값이어야 합니다.
```

또한 ES6에 도입된 매개변수 기본값을 사용해 인수가 전달되 않은 경우 초기값을 할당할 수 있다.

```js
function add(x = 0, y = 0) {
    return x + y;
}

console.log(add(2));    // 2
```

### 12.5.3 매개변수의 최대 개수
ECMAScript 사양에서는 매개변수의 최대 개수를 명시적으로 제한하지 않는다. 하지만 매개변수의 개수는 적을수록 좋고, 가급적 3개를 넘기지 않기를 권장한다.

매개변수의 순서에는 의미가 있고, 함수 호출 시 이를 고려해야한다. 매개변수가 많아질수록 함수의 사용법을 이해하기 어렵게 만들고 실수를 발생시킬 가능성을 높인다. 

매개변수가 많을수록 함수는 많은 일을 한다는 것을 의미한다. 하나의 함수는 한가지 일만 하는것이 바람직하다.

그런데, **객체를 인수로 사용하는 경우, 프로퍼티 키만 정확히 지정하면 매개변수의 순서를 신경쓰지 않아도 된다.** 또한 명시적으로 인수의 의미를 설명하는 프로퍼티 키를 사용하게 되므로 코드의 가독성도 좋아지고 실수도 줄어드는 효과가 있다. 하지만 주의할 점은 매개변수로 전달된 객체를 함수 내부에서 변경하면 함수 외부의 객체가 변경되는 **부수효과**가 발생한다 것이다.

```js
// jQuery ajax메소드, 객체를 인수로 전달한다.

$.ajax({
    method: 'POST',
    url : '/user',
    data: { id: 1, name: 'Lee' },
    cache: false
})
```

### 12.5.4 

함수는 return키워드와 표현식으로 이뤄진 반환문을 사용해 실행 결과를 함수 외부로 반환한다.

**함수 호출은 값으로 평가될 수 있는 _표현식_** 이다.

반환문은 두 가지 역할을 한다.
- 함수 실행을 중단하고 함수 몸체를 빠져나간다.
- return키워드 뒤의 표현식을 평가해 반환한다. 명시적으로 표현식을 지정하지 않으면 **undefined가** 반환된다.

참고로 return 키워드 자체를 생략해도 undefined를 반환한다.

<br>

### 12.6 참조에 의한 전달과 외부 상태의 변경
11.장 "원시값과 객체의 비교"에서 살펴본 바와 같이 원시값은 값에 의한 전달, 객체는 참조에 읜한 전달 방식으로 동작한다. 함수의 매개변수도 동일한 방식을 따른다.

```js
// prim은 primitive타입 값, obj는 객체를 전달받는다.
function changeVal(prim, obj) {
    prim += 100;
    obj.name = 'Kim';
}

// 외부 상태
var num = 100;
var person = { name: 'Lee' };

changeVal(num, pesron);

// 원시값은 원본이 훼손되지 않ㄴ드다.
console.log(num);   // 100;

// 객체는 원본이 훼손된다.
console.log(person);    // {name: 'Kim'}
```

위 함수에서 changeVal은 매개변수 obj의 원본객체ㅡㄹ 변경하는 부수효과가 발생한다. 이러한 부수효과는 상태변화를 추적하기 어려워지고, 코드의 복잡성을 증가시키며, 가독성을 해친다.
언제나 그렇듯 **논리가 간단해야 버그가 숨어들지 못한다.**

이러한 문제의 해결법 중 하나는 객체를 **불변객체(immutable object)** 로 만들어 사용하는것이다. 객체의 복사본을 생성하는 비용은 들지만, 객체를 원시갑처럼 변경 불가능한 값으로 동작하게 하는것이다.

changeVal()과 반대로 외부 상태를 변경하지 않고, 외부 상태에 의존하지도 않는 함수를 **순수함수라고 한다.** **_순수 함수를 통해 부수 효과를 최대한 억제하며 오류를 피하고 프로그램의 안정성을 높이려는 프로그래밍 패러다임을 함수형 프로그래밍이라고 한다._**

<br>

### 12.7 다양한 함수의 형태
### 12.7.1 즉시 실행 함수
함수 정의와 동시에 즉시 실행되는 함수를 즉시 실행 함수(IIFE, Immediately Invoked Function Expression)이라고 한다.

```js
(function() {
  var a = 3;
  var b = 5;
  return a * b;
}());
```

즉시실행함수는 반드시 그룹연산자 '()'로 감싸야한다. 그렇지 않으면 에러가 발생한다.
우선 익명함수로 실행해본다.
```js
function (){}(); // SyntaxError: Function statements require a function name
```
에러 발생 원인은 함수 선언문의 형식에 맞지 않아서다. 함수 선언문은 함수 이름을 생략할 수 없다. 다음은 기명함수로 실행해본다.

```js
function add(){}(); // SyntaxError: Unexpected token ')'
```
위 예제 에러의 원인은 자바스크립트 엔진이 암묵적으로 함수 선언문이 끝나는 위치에 ;를 추가하기 때문이다. 
```js
function add(){}

(); // SyntaxError: Unexpected token ')' 
```
위와같이 '()'가 함수 호출 연산자가 아닌 그룹 연산자로 해석되고, 그룹연산자에 피연산자가 없기때문에 발생하는 에러이다.

그룹 연산자로 함수를 묶은 이유는 먼저 함수 리터럴을 평가해서 함수 객체를 생성하기 위해서다.

```js
console.log(typeof (function f(){}))    // function
console.log(typeof (function (){}));    // function
```

 **먼저 함수 리터럴을 평가해서 함수 객체를 생성할 수 있다면 그룹 연산자 외의 다른 연산자도 사용할 수 있다.**

```js
// 전부 즉시실행한다.

(function(){}());
(function(){})();
!function(){}();
+function(){}();
```

즉시 실행 함수도 일반 함수처럼 값을 반환할 수 있고 인수를 전달할 수 있다.

```js
// 즉시 실행 함수도 값을 반환할 수 있다..
var res = (function () {
  var a = 5;
  var b = 3;
  return a * b;
}());

console.log(typeof res) // number
console.log(res)        // 15

// 즉시 실행 함수도 인수를 전달할 수 있다.
res = (function(a, b) {
  return a * b;
}(3, 5));

console.log(res);       // 15
```

### 12.7.2 재귀(Recursive) 함수
재귀 함수는 자기 자신을 호출하는 함수를 말한다. 다음은 재귀 방식으로 팩토리얼을 구현하는 함수이다.
```js
var factorial = function foo(n) {
  // 탈출조건: n이 1 이하일 때
  if(n <= 1 ) return 1;
  // 함수 이름은 함수 몸체 내부에서 참조 가능하다.
  return n * foo(n -1);
}

console.log(factorial(5));  // 120
```

재귀 함수를 만들 때, 함수 내부에서 자신을 호출하는데, 이 때 식별자로 호출할 수도 있고, 함수 몸체 내부에서 참조 가능한 함수의 이름으로 호출할 수도 있다.

재귀함수를 만들 때 주의할점은 탈출 조건을 잘 구현해야한다는 것이다. 그렇지 않으면 StackOverflow에러가 발생할 수 있다.

재귀함수의 대부분은 반복문으로 구현이 가능하므로, 재귀함수로 구현하는 것이 반복문을 사용하는 것 보다 더 직관적으로 이해하기 쉬울때만 사용하도록 한다.

### 12.7.3 중첩(Nested) 함수
함수 내부에 정의된 함수를 중첩(Nested Function)함수 혹은 내부 함수(Inner Function)라고 한다. 중첩 함수를 포함하는 함수는 외부 함수(Outer Function)라고 한다.

일반적으로 중첩 함수는 자신을 포함하는 외부 함수를 돕는 헬퍼 함수 역할을 한다.

### 12.7.4 콜백 함수

함수의 매개변수를 통해 다른 함수 내부로 전달되는 함수를 **콜백 함수**라고 한다.
매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수를 **고차 함수(Higher-Order Function, HOF)** 라고 한다. 또한, 함수형 프로그래밍에서는 함수를 반환하는 함수 역시 고차 함수라 한다.

콜백함수는 여러 함수에서 공통 로직을 미리 정의해두고 경우에 따라 변경되는 로직을 추상화 해서 함수 외부에서 내부로 전달하는것이다.

콜백 함수가 고차 함수 내부에서만 호출된다면, 콜백 함수를 익명 함수 리터럴로 정의하면서 곧바로 고차 함수에 전달하는게 일반적이다.

```js
repeat(5, function (i) {
  console.log(i);
});

repeat(5, (i) => {
  console.log(i);
})
```

이 때, 콜백 함수로서 전달된 함수 리터럴은 **고차 함수가 호출될 때마다 평가되어 함수 객체를 생성한다.**
따라서, 콜백 함수를 다른곳에서도 호출할 필요가 있거나, 콜백 함수를 전달받는 함수가 자주 호출된다면 **함수 외부에서 콜백 함수를 정의한 후 함수 참조를 고차 함수에 전달하는 편이 효율적이다.**

### 12.7.5 순수 함수와 비순수 함수
함수형 프로그래밍에서 어떤 외부 상태에 의존하지도 않고 변경하지도 않는, 즉 부수 효과가 없는 함수를 순수 함수(pure function) 이라고 하고, 외부 상태에 의존하거나 외부 상태를 변경하는, 즉 부수 효과가 있는 함수를 비순수 함수(impure function)이라고 한다. 

순수 함수는 동일한 인수가 전달되면 언제나 동일한 값을 반환한다. 비순수는 당연히 반대다.

```js
var count = 0;
// 순수함수
function pureIncrease(n) {
  return ++n;
}

increase(count);
console.log(count); // 0

function impureIncrease() {
  return ++count; // 외부 상태에 읜존하여 상태를 변경한다.
}



console.log(impureIncrease());  //2 
console.log(count); // 1

console.log(impureIncrease());  //2
console.log(count); // 2

```

함수가 외부 상태를 변경하면 상태 변화를 추적하기 어려워진다. 따라서 **_함수 외부 상태의 변경을 지양하는 순수 함수를 사용하는 것이 좋다._**

**함수형 프로그래밍**은 순수 함수와 보조 함수의 조합을 통해 외부 상태를 변경하는 부수 효과를 최소화해서 불변성(immutablity)를 지향하는 프로그래밍 패러다임이다. 로직 내에 존재하는 조건문과 반복문을 제거해서 복잡성을 해결하며, 변수 사용을 억제하거나 생명주기를 최소화해서 상태 변경을 피해 오류를 최소화 하는 것을 목표로한다.

<br><br>

## 13. 스코프
---
<br>

### 13.1 스코프란?

스코프란 **_모든 식별자(변수 이름, 함수 이름, 클래스 이름 등)는 자신이 선언된 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효범위가 결정되는것_** 을 말한다.


식별자 결정(identifier resolution)이란 **_코드에서 이름이 같은 변수가 선언되어 있고, 해당 변수를 참조할 때 자바스크립트 엔진이 어떤 변수를 참조할 것인지 결정하는 것_** 을 말한다. 
따라서 스콜프란 자바스크립트 엔진이 **식별자를 검색할 때 사용하는 규칙**이라고도 할 수 있다.

```js
var x = 'global';

function foo() {
  var x = 'local';
  console.log(x); // local
}

foo();

console.log(x); // global
```

식별자는 어떤 값을 구별하여 식별해낼 수 있는 고유한 이름이다. 따라서 unique해야하고 중복되면 안된다. 즉, 하나의 값은 유일한 식별자에 연결(name binding)되어야 한다.
하지만 위와같이 x라는 동일한 식별자가 존재할 수 있는 이유는 스코프 때문이다. 프로그래밍 언어에서는 **스코프(유효범위)를 통해 식별자인 변수 이름의 충돌을 방지하여 같은 이름의 변수를 사용할 수 있게 한다.** 
스코프 내에서 식별자는 유일해야 하지만 다른 스코프에서는 같은 이름의 식별자를 사용할 수 이싿. **_즉 스코프는 네임스페이스다._**

> ❗️ var키워드로 선언된 변수는 같은 스코프 내에서 중복 선언이 허용된다. 이는 의도치 않게 변수값이 재할당되어 변경되는 부작용을 발생시킨다.

<br>

### 13.2 스코프의 종류

코드는 전역(global)과 지역(local)로 구분할 수 있다.
- 전역 : 코드의 가장 바깥 영역
  - 전역변수 : 어디서든지 참조할 수 있다.
- 지역 : 함수 몸체 내부
  - 지역변수 : 자신의 지역 스코프와 하위 지역 스코프에서 유효하다.

<br>

### 13.3 스코프 체인

지역변수는 하위 지역스코프에서 유효한데, 이 말은 중첩함수에서 외부 함수의 변수를 공유한다는 말이다. 이는 **스코프가 함수의 중첩에 의해 계층적 구조를 갖는다**는 의미다. 이 때, 외부 함수의 스코프를 상위 스코프라고 한다.

모든 지역 스코프의 최상위 스코프는 전역 스코프이고 이렇게 스코프가 계층적으로 연결되는것을 **_스코프 체인_** 이라고 한다.

**_변수를 참조할 때 자바스크립트 엔진은 스코프 체인을 통해 변수를 참조하는 코드의 스코프에서 시작하여 상위 스코프 방향으로 이동하며 선언된 변수를 검색(Identifier resolution)한다._** 전역, 지역변수로 x를 선언하고 지역에서 x를 참조하면 지역변수가 참조되는 이유는 하위 -> 상위 스코프로 검색을 실행하기 때문이다!


스코프 체인은 물리적인 실체의 자료구조로 존재한다(Lexical Enviroment). 변수 선언이 실행되면 변수 식별자가 이 자료구조에 key로 등록되고, 변수 할당이 일어나면 이 자료구의 변수 식별자에 해당하는 값을 변경한다.

<br>

### 13.4함수 레벨 스코프

**지역 스코프는 코드 블록이 아닌 함수에 의해서 생성된다.** 이는 C나 Java와 다른 특징으로, C/Java와 같이 함수 몸체 뿐만 아니라 if, for while문 등에서 만들어지는 지역 스코프를 **블록 레벨 스코프** 라고 한다. 
자바스크립트에서 var 키워드로 선언된 변수는 오로지 함수의 코드 블록만을 지역스코프로 인정한다. 이런 특징을 **함수 레벨 스코프(function level scope)** 라고 한다.

**함수 레벨 스코프로 인해, 코드블록 내에서 전역 변수와 같은 이름의 변수가 선언되면 전역변수가 재할당되어 예기치 못한 문제가 발생하게된다.**

ES6에서 도입된 let, const 키워드는 블록 레벨 스코프를 지원한다. 추후 할아보자.

<br>

### 13.5 렉시컬 스코프

다음코드의 결과는 어떻게될까?
```js
var x = 5;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo();    // 1.
bar();    // 2. 
```

위 문제의 답은 bar()함수의 상위 스코프가 전역 / foo() 인지에 따라 결정된다. 상위 스코프를 결정하는 패턴은 두가지가 있다.
  1. 함수를 어디서 호출했느지에 따라 함수의 상위 스코프를 결정한다.
  2. **_함수를 어디서 정의했는지에 따라 함수의 상위 스코프를 결정한다._**

**1.** 의 방식을 동적 스코프(dynamic scope)라고 한다. 함수를 정의하는 시점에서는 호출 지점을 모르므로 상위 스코프가 동적으로 생성되기에 붙는 이름이다.

**2. 의 방식을 렉시컬 스코프(lexical scope)라고 한다.** 함수 정의가 실행될 때 함수의 상위 스코프가 static하게 결정된다. 자바스크립트를 비롯한 대부분의 언어는 렉시컬 스코프를 따른다. **bar()함수는 global에서 정의되었으므로 어디에서 실행되던, 전역 스코프를 참조**하고, 두 함수의 실행 결과로 1이 출력된다.

렉시컬 스코프는 클로저와 깊은 관련이 있다. 24장에서 알아보자.

<br><br>

## 14. 전역 변수의 문제점
---
<br>

### 14.1 변수의 생명 주기

### 14.1.1 지역 변수
지역 변수는 함수가 호출되어 실행될 때 가장 먼저 undefined로 초기화된다(지역 변수의 호이스팅). 그리고 함수가 종료되고 참조가 사라질 때 함수와 함께 가비지 컬랙터에 의해 사라진다.

아래의 코드는 지역변수의 호이스팅의 예시다.
```js
var x = 'global';

function foo() {
  console.log(x);   // undefined 
  var x = 'local';  // foo()호출 시 호이스팅 되어 undefined로 초기화
}

foo();
```

### 14.1.2 전역 변수
전역 변수는 코드가 로드되어 런타임에서 한줄씩 순차실행되기 전에 undefined로 초기화된다.(전역 변수의 호이스팅).

따라서 전역 변수는 애플리케이션이 종료되는 시점(마지막 문이 실행되어 더이상 실행할 문이 없을 때)까지 계속 메모리에 남아있게된다.

이는 **전역 변수의 생명 주기는 전역객체와 일치한다는 것을 의미한다.** 
> ❗️ 전역 객체란 코드가 실행되기 전 자바스크립트 엔진에서 가장먼저 생성하는 특수한 객체. 브라우저에서는 window, node에서는 global 등이 있다.

예를 들어 **브라우저 환경에서 var키워드로 선언한 변수는 전역 객체 windowd의 프로퍼티가 된다.**

<br>

### 14.2 전역 변수의 문제점
#### 🥨 암묵적 결합
- 전역 변수는 모든 코드가 참조하고 변경할 수 있는 암묵적 결함(implicit coupling)을 허용한다. 변수의 유효범위가 클수록 코드의 가독성은 나빠지고 의도치 않은 상태변경을 유발한다.

#### 🥕 긴 생명 주기
- 전역 변수는 애플리케이션 종료 시점까지 생존한다. 이는 기본적으로 메모리의 낭비로 이어지고, 코드 실행 중 의도치않은 재할당 등으로 인한 오류를 발생시킬 수 있다.

#### 🍙 스코프 체인 상에서 종점에 존재
- 전역 변수는 전역 스코프의 최상단에 위치한다. 이는 전역 변수의 검색 속도가 가장 느리다는것을 의미한다. 

#### 🥃 네임스페이스 오염
- 자바스크립트는 다른 파일이라도 하나의 전역 스코프를 공유한다. 즉 어디선가 의도치않게 전역변수의 이름으로 재할당이 일어날 수 있다는것을 의미한다.

<br>

### 14. 전역 변수의 사용을 억제하는 방법
**변수의 스코프는 좁을수록 좋다.** 꼭 필요한게 아니라면 전역변수는 사용하지 않는다.

### 14.3.1 즉시 실행 함수
즉시실행함수는 함수 정의와 동시에 단 한번만 실행된다. **모든 코드를 즉시실행 함수로 감싸면 모든 변수는 즉시 실행 함수의 지역 변수가 되어 실행후 사라진다.** 이 방법은 전역 변수를 생성하지 않으므로 라이브러리 등에서 자주 사용된다.

```js
(function () {
  var foo = 10;
  ...
})
console.log(foo); // ReferenceError
```

### 14.3.2 네임스페이스 객체
유용하지 않은 방법이므로 넘어간다.

### 14.3.3 모듈 패턴
**모듈 패턴은 변수와 함수를 모아 즉시 실행 함수로 감싸 하나의 모듈을 만든다.** 모듈 패턴은 자바스크립트의 강력한 기능인 **_클로저를_** 기반으로 동작한다.

**캡슐화는 _객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조/조작할 수 있는 동작인 메서드를 하나로 묶는것을 말한다._** 캡슐화는 객체의 특정 프로퍼티, 메소드를 감출 목적으로도 사용하는데, 이를 정보은닉이라고 한다.

```js
var Counter = (function() {
  // private member, 공개하지 않는다
  var count = 0;
  // public member
  return {
    increase() {
      return ++count;
    },
    decrease() {
      return --count;
    }
  }
}())

console.log(Counter.increase());  // 1
console.log(Counter.increase());  // 2
console.log(Counter.decrease());  // 1
console.log(Counter.count);       // undefined
```

### 14.3.4 ES6 모듈
ES6모듈은 파일 자체의 독자적인 모듈 스코프를 제공하기 때문에, 전역변수를 사용할 수 없다. 

script태그에 type="module" 을 추가하면 로드된 자바스크립트 파일은 ES6모듈로서 작동한다. 모듈의 파일 확장자는 mjs를 권장한다.

```js
<script type="module" src="lib.mjs"></script>
<script type="module" src="app.mjs"></script>
```
ES6 모듈은 IE를 포함한 구형 브라우저에서는 동작하지 않고, 브라우저의 ES6 모듈 기능을 사용하더라도, 트랜스파일링이나 번들링이 필요하기 때문에 **_아직까지는 브라우저가 지원하는 ES6 모듈 기능보다는 Webpack 등의 모듈 번들러를 사용하는것이 일반적이다._**

<br><br>

## 15. let, const 키워드와 블록 레벨 스코프
---
<br>

### 15.1 var 키워드로 선언한 변수의 문제점
- 변수 중복 선언 허용
  - var키워드는 중복선언이 가능하다. 이로 인해 의도치않은 재할당이 발생한다.
- 함수 레벨 스코프
  - var키워드는 블록 레벨 스코프를 지원하지 않는다. 함수 몸체 외 코드블럭에서 변수 선언 시 전역변수가 선언된다.
- 변수 호이스팅
  - var 키워드로 선언된 변수는 변수 선언+초기화의 호이스팅이 일어난다. 이는 프로그램의 흐름과 맞지 않고 가독성을 떨어뜨리고 오류를 발생시킬 여지를 남긴다.

<br>

### 15.2 let키워드
- 변수 중복 선언 금지
  - let 키워드로 선언된 변수를 중복 선언시 SyntaxError가 발생한다.
- 블록 레벨 스코프
  - let키워드는 함수를 포함해, if/for/while/try/catch문 등의 코드 블록을 지역스코프로 인정하는 블록 레벨 스코프를 지원한다.
- 변수 호이스팅
  - let키워드는 변수 호이스팅이 조금 다르다.

  ```js
  try{
    console.log(y); // Error발생
  } catch(e) {
    console.error(e); // ReferenceError: Cannot access 'y' before initialization
  }

  let y;            

  console.log(y);   // undefined

  y = 10;

  console.log(y);  // 10
  ```

  - 위 코드에서 보는것처럼, let키워드로 변수를 선언하기 전에 참조할경우 Reference Error가 발생하는데, 내용이 변수가 초기화 되지 않았다는것이다.
  - let 키워드로 변수 선언시, 런타임 전 **_변수 선언 까지만 완료하고 undefined로 초기화 하지는 않는다._** 변수 초기화는 변수 선언문에 도달해서, 값의 할당은 할당문에 도달해야 일어난다. 즉, **선언 계와 초기화 단계가 분리되어 진행된다.**
  - 따라서, let키워드로 선언한 변수는 변수 선언문 전까지 변수를 참조할 수 없는 구간이 생기는데, 이를 일시적 사각지대(Temporal Dead Zone : TDZ)라고 한다.

- 전역 객체와 let
  - var키워드로 선언한 함수는 전역 객체(window, global..)의 프로퍼티가 된다. 전역객체 키워드는 생략하고 참조할 수 있다.
  - let 키워드로 선언한 변수는 전역 객체의 프로퍼티가 아니고, '보이지 않는 개념적인 블록'내에 존재하게 된다.

<br>

### 15.3 const키워드
const는 상수를 선언하기 위해 사용한다. const의 기본 특징은 let과 비슷하고, 다른점만 설명해본다.

- 선언과 초기화
  - const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야한다.
- 재할당 금지
  - const 키워드로 선언한 변수는 재할당이 금지된다.
- 상수
  - const 키워드는 재할당이 불가능하므로, const키워드로 선언한 원시값은 변경 불가능한 상수값이된다.
- const 키워드와 객체
  - const 키워드로 선언된 변수에 객체를 할당한 경우 값을 변경할 수 있다. 재할당 없이 객체의 property는 변경 가능하기 때문이다.
  - **_const 키워드는 재할당을 금지할 뿐 불변(immutablity)를 의미하지 않는다_**
  - 즉, 객체값이 변경되더라도 변수에 할당된 참조값은 변경되지 않는다.


### 15.4 var vs let vs const
아래는 권장 사항이다.
- ES6를 사용한다면 var 키워드는 사용하지 않는다.
- 재할당이 필요한 경웨 한정해 let키워드를 사용한다. 이 때 변수의 스코프는 최대한 좁게 만든다.
- 변경이 발생하지 않고 읽기 전용으로 사용하는(재할당이 필요 없는 상수)원시 값과 객체에는 const를 사용한다. 재할당이 안되므로 변경에서 안전하다.

<br><br>

## 16. 프로퍼티 어트리뷰트
--- 
<br>
<!-- 정리 필요. 이 장부터 완전정리해야할듯  -->

### 16.1 내부 슬롯(internal slot)과 내부 메소드(internal method)

- 내부 슬록과 내부 메소드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 pseudo property와 peseudo method이다. 
- ECMAScript 사양에서 이중 대괄호( [[]] )로 감싼 이름들이다.
- 자바스크립트 엔진 내부 로직이므로 원칙적으로는 개발자가 접근 불가능.
- 일부 내부 슬롯과 내부 메소드는 접근 가능한데, 예로, 모든 객체는 [[Prototpy]]이라는 내부 슬롯을 갖고, __ proto __ 로 간접적으로 접근 가능하다.
```js 
  const o = {};
  o.[[Prototype]] // Uncaught SyntaxError: Unexpected token '['
  o.__poroto__    // {constructor: ƒ, __defineGetter__: ƒ,... }
```

<br>

### 16.2 프로퍼티 어트리뷰트와(PropertyAttribute) 프로터피 디스크립터(PropertyDescriptor) 객체

- `자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.`

- 프로퍼티의 상태 4가지
  - value
  - writable(값의 갱신 가능 여부)
  - enumerable(열거 가능 여부)
  - configurable(재정의 가능 여부)

- _Property Attribute_ 는 자바스크립트 엔진이 관리하는 내부 상태 값(meta-property)의 **내부슬롯** 이다. 따라서 직접 접근은 불가능하고, **Object.getOwnPropertyDescriptor()** 로 간접 접근할 수 있다.
  - [[Value]]
  - [[Wriatble]]
  - [[Enumerable]]
  - [[Configurable]]
```js
const person = {name: 'motiveko'};

// param1 : 객체의 참조, param2 : property key
Object.getOwnPropertyDescriptor(person, 'name');
// {value: 'motiveko', writable: true, enumerable: true, configurable: true}
```

- Object.getOwnPropertyDescriptor() 메소드가 반환하는 객체가 **Property Discriptor**이다. 
- Object.getOwnPropertyDescriptors()는 객체의 모든 프로퍼티의 property discriptor를 반환한다.

<br>

### 16.3 데이터 프로퍼티(data property)와 접근자 프로퍼티(accessor property)

- **프로퍼티는 data property, accessor property로 구분된다.**
- data property
  - 키와 값으로 구성된 일반적인 프로퍼티
- accessor property
  - 자체적으로 값을 갖지 않고, 다른 프로퍼티의 값을 읽거나 저장할 때 호출되는 accessor function으로 구성된 프로퍼티

### 16.3.1 data property
data property는 다음과 같은 property attribute를 갖는다. 이는 프로퍼티를 생성할 때 js 엔진이 자동정의한다.

| property attribute | property descriptor | 설명 |
|:---|:---|:---|
| `[[Value]]` | value | 프로퍼티의 값 |
| `[[Writable]]` | writable | 값은 변경여부, boolean, <br>false이면 읽기 전용 프로퍼티이다.|
| `[[Enumerable]]` | enumerable | prorperty의 열거 가능여부, boolean <br/> false인 경우 for ... in이나 Object.keys 메소드로 열거가 불가능 |
| `[[Configurable]]` | configurable | 프로퍼티의 재정의 가능 여부, boolean <br> **false인경우 프로퍼티의 삭제, 어트리뷰트 값 변경이 불가능**<br> 단 [[Writable]]이 true면 값의 변경과, [[Writable]]을 false로 변경 가능 |

- writable, enumerable, configurable의 기본값은 모두 true

### 16.3.2 Accessor Property
accessor property는 자체적인 값이 없고 accessor function으로 구성된 프로퍼티다.
| property attribute | property descriptor | 설명 |
|:---|:---|:---|
|`[[Get]]` | get | 값이 접근하는 getter |
|`[[Set]]` | set | 값을 저장하는 setter  |
|`[[Enumerable]]` | enumerable | dataproperty와 동일 |
|`[[Configurable]]` | configurable | dataproperty와 동일 |

```js
const person = {
  firstName: 'donggi',
  lastName: 'Ko',

  // fullName은 accessor function으로 구성된 accessor property이다.
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(name) {
    // 배열 디스트럭처링 할당
    [this.firstName, this.lastName] = name.split(' ');
  }
};

// accessor property를 통한 value 저장
person.fullName = 'mac mini';
console.log(person);  // {firstName: 'mac', lastName: 'mini'}

console.log(person.fullName) // mac mini

// data property
console.log(Object.getOwnPropertyDescriptor(person, 'firstName'));
// {value: 'mac', writable: true, enumerable: true, configurable: true}

// accessor property
console.log(Object.getOwnPropertyDescriptor(person, 'fullName'));
// {enumerable: true, configurable: true, get: ƒ, set: ƒ}
```

- accessor property fullName으로 값에 접근시 내부적으로 getter가 호출되어 다음과 같이 동작한다.
  1. property key가 유효한지 확인. key는 string/symbol 이어야하고, fullName은 string으로 유효
  2. **prototype chain**에서 프로퍼티 검색, person에 fullName이란 프로퍼티가 존재한다.
  3. fullName이 data/accessor property인지를 확인한다. 여기선 accessor property
  4. fullName의 property attribute [[Get]]의 값, 즉 getter 함수를 호출하여 결과를 반환한다.

<br>

### 16.4 프로퍼티 정의

Object.defineProperty() 메소드를 사용해 property attribute를 직접 정의할 수 있다. 

```js
const person = {};
// Data Property의 정의
// p1: 객체 참조, p2: key, p3: property descriptor 객체
Object.defineProperty(person, 'firstName', {
  value: 'donggi',
  writable, false,
  enumerable: false,
  configurable: false
})

person.lastName = 'Ko';

console.log(Object.getOwnPropertyDescriptor(person, 'firstName'));
// {value: 'donggi', writable: false, enumerable: false, configurable: false}

// firstName은 enumerable: false로 key값 열거 불가
console.log(Object.keys(person)) // ['lastName']

// configurable : false이면 프로퍼티 삭제불가, 에러는 나지 않는다.
delete person.firstName;

console.log(Object.getOwnPropertyDescriptor(person, 'firstName'));
// {value: 'donggi', writable: false, enumerable: false, configurable: false}

// Accessor Property의 정의
Object.defineProperty(person, 'fullName', {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
  eumerable: true,
  configurable: true
})
```

- Obejct.defineProperty()로 property정의 시, property descriptor를 일부 생략할 경우 아래와 같은 기본값이 적용된다.

| property descriptor의 <br> property | 생략시 기본값 |
|:---:|:---|
| value | undefined |
| get | undefined |
| set | undefined |
| writable | false |
| enumerable | false |
| configurable | false |

- Obejct.defineProperties() 메소드로 한번에 여러개의 property 정의 가능

<br>

### 16.5 객체 변경 방지

자바스크립튼 객체의 변경을 방지하는 다양한 메소드를 제공한다. 각 객체 변경 방지 메서드들의 금지 장도는 다르다.

| 구분 | 메서드 | (프로퍼티) 추가 | 삭제 | 값 읽기 | 값 쓰기 | 어트리뷰트 재정의 |
|:---|:---|:---:|:---:|:---:|:---:|:---:|
| 객체 확장 금지 | **Object.preventExtensions** | X | O | O | O | O |
| 객체 밀봉 | **Object.seal** | X | X | O | O | X |
| 객체 동결 | **Object.freeze** | X | X | O | X | X |

### 16.5.1 객체 확장 금지
- 객체 확장 금지란 **프로퍼티 추가의 금지**를 의미한다. person.newAttr = 'some' 과 같은 프로퍼티 동적 추가와 Obejct.defineProperty() 메서드로의 추가 모두 금지된다.
- 프로퍼티 추가시 기본적으로 에러없이 무시되나, _strict mode에서는 에러가 발생한다._

### 16.5.2 객체 밀봉
- 객체 밀봉이란 객체의 **읽기,쓰기만 가능한 금지**를 의미한다.
- 역시 금지된 행위는 기본적으로 에러없이 무시되나, _strict mode에서는 에러가 발생한다._

### 16.5.3 객체 동결
- 객체 동결이란 프로퍼티의 추가, 삭제 및 프로퍼티 어트리뷰트 재정의 금지, 값 갱신 금지를 의미한다. ___즉 동결된 객체는 읽기만 가능하다.___

### 16.5.4 불변 객체
- js에서 제공하는 객체 변경 방지 메소드들은 shallow only로 중첩 객체에는 영향을 주지 못한다. 중첩 객체까지 변경금지 하기 위해서는 recursive function을 사용해야한다.

```js
// 중첩 객체까지 동결
function deepFreeze(target) {
  if(target && typeof target === 'object' && !Object.isFrozen(target)) {
    Obejct.freeze(target);

    Object.keys(target).forEach(key => deepFreeze(target[key]));
  }
  return target;
}

const person = {
  name: 'motiveko',
  address: { city: 'Seoul' }
};

// 깊은 객체 동결
deepFreeze(person);

console.log(Object.isFrozen(person)); // true

console.log(Object.isFrozen(person.address)); // true
```

<br><br>

## 17. 생성자 함수에 의한 객체 생성
---
<br>
객체를 생성하는 방법에는 객체 리터럴 외에도 다양한 방법이 있다. 그 중 생성자 함수 방식을 알아본다.

### 17.1 Object 생성자 함수
- '**생성자 함수**'란 `new` 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말한다.
- 자바스크립트는 Object, String, Number, Boolean, Function, Array, Date, RegExp, Promise 등의 built-in 생성자 함수를 제공한다.

```js
const obj = new Object();
obj.name = 'motiveko';
obj.helloWorld = function() {
  console.log('hello World!');
}

typeof obj; // 'object'
```
- Object 등의 built-in 생성자 함수보다 객체 리터럴이 훨씬 편해보인다.

<br>

### 17.2 생성자 함수
### 17.2.1 객체 리터럴에 의한 객체 생성 방식의 문제점
- 객체 리터럴은 편하지만 프로퍼티 구조가 동일한 객체를 여러개 생성할 때 노가다가 심하다.

### 17.2.2 생성자 함수에 의한 객체 생성 방식의 장점
- 생성자 함수에 의한 객체 생성 방식은 템플릿처럼 프로퍼티 구조가 같은 객체를 여러개를 간편히 생성 가능하다.

```js
function Circle(radius) {
  // 생성자 함수 내부 this는 생성자 함수가 생성할 인스턴스를 가르킨다!
  this.radius = radius;
  this.getDiameter = function() {
    return 2 * this.radius;
  }
}
// 생성자 함수
const circleObj = new Circle(5);

console.log(circleObj);
// Circle {radius: 5, getDiameter: ƒ}


// 일반 함수, Circle()은 반환문이 없으므로 undefined가 반환된다.
const circle = Circle(5);

console.log(circle);  // undefined

```
- 생성자 함수는 형식이 정해져 있지 않고, **`new 연산자와 함계 호출하면 해당 함수는 생성자 함수로 동작한다.` new가 없으면 일반 함수로 동작한다.**

### 17.2.3 생성자 함수의 인스턴스 생성 과정
1. 인스턴스 생성과 this 바인딩
    - 생성자 함수가 암묵적으로 빈 객체를 생성하고 이 인스턴스를 this에 바인딩한다.
    - 이 과정은 함수의 몸체 코드가 실행되는 런타임 이전에 실행된다.
2. 인스턴스 초기화
    - this에 바인딩 되어 있는 인스턴스 프로퍼티에 값을 할당하여 초기화한다.
    - 이 과정은 개발자가 직접 기술하는 부분.
3. 인스턴스 반환
    - 생성자 함수 내부 처리가 모두 끝나면 완성된 인스턴스가 바인딩된 this가 **암묵적으로 반환된다.**
    - **return문을 통해 객체를 명시적으로 반환**하면, this가 아닌 **반환문 객체가 반환된다.** 원시값을 반환하면 이는 무시되고 this가 반환된다.

```js
function Circle(radius) {

  // 1. 암묵적 인스턴스 생성 및 this에 바인딩
  console.log(this); // Circle {}

  // 2. 인스턴스 초기화
  this.radius = radius;
  this.getDiameter = function() {
    return 2 * this.radius;
  }

  // 3. 암묵적인 this 인스턴스 반환
};
```

### 17.2.4 내부 메서드 [[Call]]과 [[Constructor]]
- 함수는 객체지만, 일반 객체와 다르게 **함수는 호출할 수 있다.**
- 함수는 일반 객체가 가지는 내부 슬롯,메소드는 물론 함수 객체만을 위한 [[Enviroment]], [[FormalParameters]] 등의 내부 슬롯과, [[Call]], [[Construct]] 같은 내부 메서드를 추가로 가지고 있다.
- 일반 함수로서 호출시 내부메소드 [[Call]], new와 함께 생성자 함수로서 호출시 [[Construct]]가 호출된다.

```js
function foo() {}
// 일반적인 함수로서 호출, [[Call]] 호출
foo();

// 생성자 함수로서 호출, [[Construct]] 호출
new foo();
```
- [[Call]]을 갖는 객체를 callable, [[Construct]]를 갖는 객체를 constructor라고 한다.
- 함수는 callable인 객체를 의미하고, non-constructor일 수도 있다.

### 17.2.5 constructor와 non-constructor의 구분
- 함수의 constructor 여부는 **`함수의 정의 방식`** 에 따라 아래와 같이 구분된다.
  - constructor: 함수 선언문, 함수 표현식, 클래스(클래스도 함수다)
  - non-constructor: 메서드(ES6 메서드 축약 표현만), 화살표 함수
- `ECMAScript 사양에서 메서드란` 일반적인 메서드와 달리 `ES6 축약 표현만을 의미`한다.

```js
// 함수 선언문
function foo() {} 
// 함수 표현식
const bar = function() {};
// 프로퍼티 x에 할당된 일반함수, 메소드로 인정되지 않는다.
const baz = {
  x: function() {}
}
// ES6 메서드 축약표현으로 정의된 x, 메소드로 인정
const obj = {
  x(){}
};
// 화살표 함수
const arrow = () => {};

// constructor
new foo();    // foo {}
new bar();    // bar {}
new baz.x();  // x {}

// non-constructor
new obj.x();  // TypeError: obj.x is not a constructor
new arrow();  // TypeError: arrow is not a constructor   
```

### 17.2.6 new 연산자
- 생성자 함수를 일반 함수처럼 호출하면 문제가 될 수 있다.
```js
function Circle(r) {
  this.r = r;
}

const c = Circle(10);
```
- 위와 같은 함수에서 일반 함수 호출시 Circle 내부 this는 window객체다.
- 따라서 window에 r이라는 프로퍼티가 생성되고 값으로 10이 할당되는 문제 발생
- 일반적으로 생성자 함수는 대문자로 시작하는 파스칼 케이스로 구분해 생성자 함수로 실행될 수 있도록 한다.

### 17.2.7 new.target
- 생성자 함수가 일반 함수로 호출되는것을 방지해야한다.
- ES6에서 지원하는 new.target은 함수 내부에서 함수가 new 연산자로 실행되었는지 확인할 수 있다.
- new.target은 생정자 함수로 호출시 함수 자신을, 일반적인 함수 호출시 undefined이다.
```js
function Circle(radius) {
  if(!new.target) {
    return new Circle(radius);
  }

  ...
}
```
- IE에서는 new.target을 지원하지 않으므로 스코프 세이프 생성자 패턴(scope-safe constructor)을 사용할 수 있다.
```js 
function Circle() {
  // 일반함수로 호출시 this는 window객체를 가르킨다.
  if(!(this instanceof Circle)) {
    return new Circle(radius);
  }

  ...
}
```

- 대부분의 빌트인 함수는 new 연산자와 함계 호출되었는지를 확인한 후 적절한 값을 반환한다.
  - Object, Function 는 new없이 호출해도 new와 호출한 것과 같은 결과가 나온다.
  - String, Number, Boolean 생성자 함수는
    - 생성자 함수로 호출 : String, Number, Boolean 객체 반환
    - 일반 함수로 호출 : string, number, boolean 값 반환

<br><br>

## 18. 함수와 일급 객체
---
<br>

### 18.1 일급 객체
**`❗️일급 객체`** 란 다음 조건을 만족하는 객체를 말한다.
1. **무명의 리터럴로 생성할 수 있다. 즉 런타임에 생성 가능하다.**
2. 변수나 자료구조에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

함수는 일급 객체로 위 조건을 모두 만족한다. 함수가 일급 객체라는 의미는 **`함수를 객체와 동일하게 취급할 수 있다는 의미`** 이다.

<br>

### 18.2 함수 객체의 프로퍼티
함수에는 __arguments, caller, length, name, prototype__ 프로퍼티가 있다.\_\_prototype__ 는 accessor property이고, 이는 Object.prototype 객체의 프로퍼티를 상속받은것이다.

```js
function sq(){}

console.log(Object.getOwnPropertyDescriptors(sq));

/*
arguments: {value: null, writable: false, enumerable: false, configurable: false}
caller: {value: null, writable: false, enumerable: false, configurable: false}
length: {value: 0, writable: false, enumerable: false, configurable: true}
name: {value: 'sq', writable: false, enumerable: false, configurable: true}
prototype: {value: {…}, writable: true, enumerable: false, configurable: false}
[[Prototype]]: Object
*/
```

### 18.2.1 arguments 프로퍼티
- arguments 프로퍼티는 함수 호출 시 전달된 인수(argument)들의 정보를 잠고있는 arguments 객체다.
- iterable한 유사 배열 객체
- ES3부타 표준에서 폐지되어, Function.arguments와 같은 사용법은 권장하지 않는다.
- **함수 내부에서 지역변수처럼 사용**할 수 있다.
```js
function multiply(x, y) {
  console.log(arguments);
  return x * y;
}

console.log(multiply());  // NaN
/** 
callee: ƒ multiply(x, y)
length: 0
Symbol(Symbol.iterator): ƒ values()
[[Prototype]]: Object
*/
console.log(multiply(1)); // NaN

console.log(multiply(1,2)); // 2

console.log(multiply(1,2,3)); // NaN
/**
0: 1
1: 2
2: 3
callee: ƒ multiply(x, y)
length: 3
Symbol(Symbol.iterator): ƒ values()
...
*/
```
- 출력 결과의 의미는 각각 이래와 같다.
  - 0,1,2... : 사용한 argument값
  - length :  호출시 사용한 arguments
  - callee: 함수 자신을 가르킴
  - Symbol : arguments 객체를 순회 가능한 iterable로 만들기 위한 프로퍼티, 아래와 같이 사용한다.
  ```js
  function multiply(x, y){
    const iterator = arguments[Symbol.iterator]();
    console.log(iterator.next()); // {value: 1, done: false}
    console.log(iterator.next()); // {value: 2, done: false}
    console.log(iterator.next()); // {value: 3, done: false}
    console.log(iterator.next()); // {value: undefined, done: true}
  }
  multiply(1,2,3);
  ```
- arguments 객체로 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 쓸 수 있다.
- 그러나 ES6의 Rest 파라미터로 해결 가능한다.(...args)

### 18.2.2 caller 프로퍼티
  - 함수 자신을 호출한 함수를 의미한다. ECMAScript 사양에 포함되지 않는 비표준으로 몰라도 된다.

### 18.2.3 length 프로퍼티
  - 함수를 정의할 때 선언한 매개변수(parameter)의 개수
  - arguments의 length와 의미가 다르다.

### 18.2.4 name 프로퍼티
  - 함수의 이름, ES6부터 표준으로 자리잡음
  - 익명 함수에 대해 ES6+ 는 anonymousFunc를, 그 이전은 공백의 값을 가진다.

### 18.2.5 \_\_prototype__ 접근자 프로퍼티
  - 모든 객체가 갖는 [[Prototype]]이라는 내부 슬롯에 접근하기 위한 프로퍼티.
  - \_\_prototype__프로퍼티는 Object.property의 프로퍼티를 상속받아 생긴것으로 함수 자신의것은 아니다.
  ```js
  function x() {}
  console.log(x.hasOwnProperty(__proto__)); // false
  ```

### 18.2.6 prototype 프로퍼티
  - prototype 프로퍼티는 생성자 함수로 호출할 수 있는 함수 객체, 즉 **constructor만이 소유하는 프로퍼티다.**
  - **함수가 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.**
  ```js
  (function () {}).hasOwnProperty('prototype'); // true
  ({}).hasOwnProperty('prototype'); // false
  ```

<br><br>

## 19. 프로토타입
---
<br>

- 자바스크립트는 명령형(imperative), 함수형, 프로토타입기반, 객체지향 프로그래밍을 지원하는 멀티 패러다임 언어이다.
- 자바스크립트는 **프로토타입 기반의 객체지향 프로그래밍 언어**이다.

<br>

### 19.1 객체지향 프로그래밍

- 객체지향 프로그래밍은 상태(state)를 나타내는 데이터와 상태 데이터를 조작할 수 있는 동작(behavior)을 하나의 논리적인 단위로 묶어 생각한다.
- 상태와 동작을 각각 property와 method라 부른다.

<br>

### 19.2 상속과 프로토타입
- 상속은 불필요한 코드 중복을 줄일 수 있는, OOP의 핵심 개념이다.
- 17.의 생성자 함수 방식의 문제점을 살펴보자.
```js
function Circle(radius) {
  this.radius = radius;
  this.getArea = function() {
    return Math.PI * this.radius ** 2;
  };
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea) // false
```
- 생성자 함수 방식으로 객체 생성시, 내부 메소드가 매번 새로 생성되어 메모리에 새로운 참조를 가진다. 객체 10개를 만들면 똑같은 메소드 10개가 생기는 것. 코드중복은 해결되었지만 메모리가 문제다.
- 위 방식의 문제를 **prototype 기반의 상속으로 해결 가능하다.**
```js
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.getArea = function() {
  return Math.PI * this.radius ** 2;
};


const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea) // true
```
- **circle1과 circle2는 Circle.prototype(Circle의 프로토타입 객체)를 상속해 같은 getArea 메소드를 공유하게 된다. 메모리에는 Circle.prototype.getArea 한 개의 메소드만 존재한다. 자신의 상태를 나타내는 radius만 개별소유.**

<br>

### 19.3 프로토타입 객체

- 프로토타입은 어떤 객체의 상위 객체 역할을 하는 객체로, 공유 프로퍼티를 제공해 상속을 구현한다.
- 모든 객체는 [[Prototype]]이라는 내부 슬롯을 가지고, 이 내부슬롯의 값이 프로토타입의 참조다.
- 모든 객체는 **하나의 프로토타입을 가지고 있고, 모든 프로토타입은 생성자 함수와 연결되어 있다.**

### 19.3.1 \_\_proto__ 접근자 프로퍼티
- **`모든 객체는 접근자 프로퍼티 \_\_proto__로 [[Prototype]]에 접근할 수 있다.`**
- \_\_proto__는 접근자 프로퍼티로, 직접 값을 가지지 않고 gettter/setter로 접근한다.
- \_\_proto__는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티다.(Object.prototype은 프로토타입 체인의 최상위 객체이다)
- 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다.(순환참조를 허용하지 않는다.)
- **\_\_proto__ 를 코드 내에서 직접 사용하는것은 권장하지 않는다.**
  - Object.getPrototypeOf() / Object.setPrototypeOf()를 사용한다.
```js
const obj = {};
const parent = {x: 1};

Object.getPrototypeOf(obj); // == obj.__prototype__;
Object.setPrototypeOf(obj, parent)  // obj.__prototype__ = parent;

console.log(obj.x); // 1
```
```js
// 직접 실험해본 내용
// case1
const obj1 = new Object();
obj1.__proto__ === Object.prototype;  // true
// Object.prototype 이 통째로 바뀐다.
obj1.__proto__.val = 1;              
const obj2 = new Object();

obj2.__proto__.val // 1
obj1.__proto__ === Object.prototype;  // true



// case 2
const obj1 = new Object();
// obj1의 프로토타입을 바꾼다. Object.prototype에는 영향 x
Object.setPrototypeOf(obj, {val: 1});
obj1.__proto__ === Object.prototype;  // false

const obj2 = new Object9);
obj2.__proto__.val; // undefined

```
- \_\_proto__ 로 접근해서 프로토타입을 수정하는것과 Object.setPrototypeOf()로 프로토타입을 수정하는것은 매우 큰 차이가있다!

### 19.3.2 함수 객체의 prototype 프로퍼티
- **`prototype 프로퍼티는 함수 객체만이 소유하는, 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.`**
- 즉, 생성자 함수가 아닌 arrow function이나, ES6 메서드 축약표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며, 프로토타입을 생성하지도 않는다.
- 모든 객체가 가지고 있는(Object.prototype으로부터 상속받은) \_\_prototype__ 프로퍼티와 생성자 함수 객체만이 가지는 prototype 프로퍼티는 **결국 동일한 프로토타입을 가리킨다.**
```js
// 생성자 함수
function Person (name) {
  this.name = name;
}
const me = Person('motiveko');
// Person.prototype과 me.__proto__는 결국 동일한 프로토타입을 가리킨다.
console.log(Person.prototype === me.__proto__); // true
```

### 19.3.3 프로토타입의 constructor 프로퍼티와 생성자 함수
- 모든 프로토타입은 constructor 프로퍼티를 갖는데, **constructor는** prototype 프로터피로, **자신을 참조하고 있는 생성자 함수**를 가리킨다. 이해가 안되면 책에 다이어그램을 보면 바로 이해될것이다.

```js
// 생성자 함수
const Person () {}

const p = new Person();
// p.constructor는 p.__prototype__.constructor라고 할 수 있다.
console.log(p.constructor === Person);  // true
```

<br>

### 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

- 객체를 리터럴로 생성하는것과 생성자 함수를 사용하는 것은 내부적인 과정과 스코프, 클로저 등에 약간의 차이는 있으나 객체의 특성은 같다.
- 따라서 리터럴 표기법으로 생성한 객체의 prototype.constructor가 생성자 함수라고 생각해도 큰 무리는 없다.

| 리터럴 표기법 | 생성자 함수 | 프로토타입 |
|:---|:---|:---|
| 객체 | Object | Object.prototype |
| 함수 | Function | Function.prototype |
| 배열 | Array | Array.prototype |
| 정규표현식 | RegExp | RegExp.prototype |

<br>

### 19.5 프로토타입의 생성 시점
- **프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.**

### 19.5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점
- constructor 함수의 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 생성된다.
- 함수 선언문의 경우 런타임 이전 평가되어 객체생성하므로(함수 호이스팅) 런타임 이전에 생성됨

### 19.5.2 빌트인 생성자 함수와 프로토타입 생성 시점
- 모든 빌트인 생성자 함수는 전역 객체(window / global)가 생성되는 시점에 생성된다. 이 때 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩된다.

<br>

### 19.6 객체 생성 방식과 프로토타입의 결정
- 객체 생성에는 여러가지 방식이 있는데, 내부의 세부적인 방식에는 차이가 있지만 결국 모두 추상연산 OrdinaryObjectCreate에 의해 성성된다는 공통점이 있다.
- OrdinaryObjectCreate는 필수적으로 **자신이 생성할 객체의 프로토타입을 인수로 받는데,** 여기서 생성될 객체의 프로토타입이 결정된다.
- 객체 생성 방식별 프로토타입은 아래와 같다.
  1. 객체 리터럴
      - Object.prototype
      - 프로퍼티를 객체 리터럴 내부에서 추가 가능
  2. Object 생성자 함수
      - Object.prototype
      - 빈 객체 생성 후 프로퍼티 추가 가능
  3. 생성자 함수
      - **생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체**
      - 생성자 함수의 prototype에 프로퍼티를 추가해 상속을 구현할 수 있다.
      ```js
      function Person(name) {
        this.name = name;
      }
      // 프로토타입 메소드
      Person.prototype.sayHello = function() {
        console.log(`Hi! My name is ${this.name}`);
      }
      ```
  4. [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 메서드
      - 책에는 안나온다.
      - Objcet.create(proto, propertiesObject?)로 첫번째 인자에 프로토타입 객체를 받는다. 따라서 **프로토타입 객체는 함수 호출시 동적으로 할당된다.**
  5. 클래스(ES6)
      - 이것도 책에 안나온다.
      - 직접 해본 결과 생성자 함수와 동일하게 class의 prototype 프로퍼티에 바인딩된 객체를 프로토타입으로 가진다.
      ```js
      class M {}

      const m = new M();

      m.__proto__ === M.prototype; // true
      ``` 

<br>

### 19.7 프로토타입 체인
- 프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘이다.
- 스코프 체인은 식별자 검색을 위한 메커니즘이다.
- 객체의 메소드 호출시, 프로토타입 체인은 해당 객체에서, 프로토타입 체인의 종점인 Object.prototype까지 순서대로 해당 프로퍼티가 존재하는지 검색한다. 
```js
  me.hasOwnProperty('name');
  // Object.prototype에서 hasOwnProperty를 발견하고 call() 메서드를 이용해 호출한다.
  Object.prototype.hasOwnProperty.call(me, 'name');  
```

<br>

### 19.8 오버라이딩과 프로퍼티 섀도잉
- ___프로퍼티 섀도잉___ 이란 프로토타입에 정의된 프로퍼와 같은 이름의 인스턴스 프로퍼티가 존재해, 프로토타입 프로퍼티가 오버라이딩 된 것 처럼 보이는 현상이다.

```js
// 생성자 함수
const Person = (function () {
  function Person(name) {
    this.name = name;
  }
  // prototype 프로퍼티 sayHello
  Person.prototype.sayHello = function () {
    console.log(`[Proto] : Hi! I'm ${this.name}`);
  }
  return Person;
}())

const motiveko = new Person('motiveko');
motiveko.sayHello = function() {
  console.log(`[Motiveko] : Hi! I'm ${this.name}`);
}

// 프로퍼티 섀도잉이 일어났다
motiveko.sayHello();  // [Motiveko] : Hi! I'm motiveko

// __proto__로 호출 가능, 그러나 name 프로퍼티가 Prototype에는 없으므로 undefined
motiveko.__proto__.sayHello();  // [Proto] : Hi! I'm undefined

```
- 위와 같이 motiveko.sayHello()는 인스턴스 프로퍼티 메소드를 호출한다.
- 프로퍼티 섀도잉은 덮어쓰기가 아니므로 아래와 같이 instance property를 지워도 prototype property는 여전히 호출할 수 있다.
```js
delete motiveko.sayHello;
motiveko.sayHello();  // [Proto] : Hi! I'm motiveko

// 하위 객체에서 프로토타입에 get은 엑세스 가능하나 set 엑세스는 허용되지 않는다.
delete motiveko.sayHello;
motiveko.sayHello();  // [Proto] : Hi! I'm motiveko
```

<br>

### 19.9 프로토타입의 교체
- 자바스크립트에서 프로토타입은 임의의 객체로 변경할 수 있다(동적으로 변경 가능)

### 19.9.1 생성자 함수에 의한 프로토타입의 교체
```js
const Person = (function () {
  function Person(name) {
    this.name = name;
  }
  Person.prototype = {
    sayHello() {
      console.log(`Hi! I'm ${this.name}`);
    }
  }
  return Person;
}())

const a = new Person('a');

console.log(a.constructor); // Object
```
- 위와 같이 생성자 함수 내에서 prototype을 객체 리터럴로 교체할 수 있다
- 그러나 생성된 인스턴스의 constructor는 최상위 프로토타입의 프로퍼티인 Object.prototype.constructor(=Object)를 가리킨다.
- 아래와 같은 형식으로 교체하면 일반적인 생성자 함수처럼 constructor가 생성자 함수를 가리키게 할 수 있다.
```js
...

  Person.prototype = {
    constructor : Person,
    sayHello() {
      console.log(`Hi! I'm ${this.name}`);
    }
  }

...
```

### 19.9.2 인스턴스에 의한 프로토타입의 교체
- 인스턴스에서 직접 프로토타입을 교체할 수 있다.
```js
function Person(name) {
  this.name = name;
}
const a = new Person('a');
// 프로토타입으로 교체할 객체
const parent = {};

Object.setPrototypeOf(a, parent); // -> a.__proto__ = parent;

console.log(Person.prototype === parent) // false
```
- 생성된 인스턴스의 프로토타입을 변경하는것은 생성자 함수와는 별개로 이뤄져, Person.prototype과 생성된 객체의 a.prototype의 불일치가 생긴다.
- 아래와 같이 프로토타입을 교체하면 깔끔하게 교체가 된다. 하지만 좋은 방법은 아니고, 직접 상속하는것이 훨씬 낫다.

```js
function Person(name) {
  this.name = name;
}
const me = new Person('motiveko');

const parent = {
  constructor: Person,
  sayHello() {
    console.log(`Hi! I'm ${this.name}`);
  }
}

Person.prototype = parent;  // Person <-> Person.prototype 사이 순환참조 

Object.setPrototype(me, parent);
```

<br>

### 19.10 instanceof 연산자
- instanceof 연산자는 아래와 같은 형태로, 우변이 생성자 함수가 아니면 TypeError가 발생한다.
```js
객체 instanceof 생성자함수
```
- **`생성자 함수의 prototype에 바인딩된 객체`** 가 **`객체의 프로토타입 체인상에 존재`** 하면 true, 그렇지 않으면 false

```js
function Person(name) {
  this.name = name;
}

const me = new Person('motiveko');

console.log(me instanceof Person);  // true

// 객체의 프로토타입 교체
const parent = {};
Object.setPrototypeOf(me, parent);  

// Person.prototype이 가리키는 객체가 me의 프로토타입 체인에 존재하지 않는다.
console.log(me instanceof Person);  // false

// 생성자함수의 prototype 프로퍼티의 객체를 me의 프로토타입으로 변경
Person.prototype = parent;

console.log(me instanceof Person);  // true
```
- 인스턴스의 프로토타입 교체가 아닌 생성자 함수에 의한 프로토타입 교체시 instanceof는 true가 될 것이다
```js
const Person = (function() {
  function Person(name) {
    this.name = name;
  }
  // Person.prototype === 생성될 객체의 prototype
  Person.prototype = {};  
  return Person;
}())

const me = new Person('motiveko');

console.log(me instanceof Person); // true
```

<br>

### 19.11 직접 상속
### 19.11.1 Object.create에 의한 직접 상속
- Object.create는 prototype객체와 propertyDescriptors를 argument로 받아 객체를 생성한다. 정의는 아래와같다.
```ts
/**
 * Creates an object that has the specified prototype, and that optionally contains specified properties.
 * @param o Object to use as a prototype. May be null
 * @param properties JavaScript object that contains one or more property descriptors.
 */
  create(o: object | null, properties: PropertyDescriptorMap & ThisType<any>): any;
```
- prototype 인자로 null
```js
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null); // ture
// 프로토타입이 null인 객체는 프로토타입 체인의 종점에 위치한다.
console.log(obj.toString());  // TypeError: obj.toString is not a function
```
- prototype 인자로 Object.prototype
```js
// let obj1 = {}; 와 같다
let obj1 = Object.create(Object.prototype); 

// let obj2 = { x:1 }; 과 같다.
let obj2 = Object.create(Object.prototype, {
  x: { value: 1, writable: true, enumerable: true, configurable: true}
});
```

- 임의의 객체를 상속받는다.
```js
// obj -> parent -> Object.prototype -> null
const parent = { x: 10};
let obj = Object.reate(parent);

console.log(obj instanceof Object); // true
```
- prototype으로 생성자함수의 프로토타입을 받는다.
```js
function Person(name) {
  this.name = name;
}
// obj -> Person.prototype -> Object.prototype -> null
let obj = Object.create(Person.prototype);

console.log(obj instanceof Person); // true
console.log(obj instanceof Object); // true
```
- prototype 인자로 null을 인자로 받은 경우 인스턴스는 상위의 프로토타입이 없어, Object.protoype의 빌트인 메소드 사용이 불가능하다.
- 이런이유로 ESlint는 Object.protoype의 빌트인 메소드를 직접호출하기보다 call() 을 이용해간접호출하는것을 권한다. 
```js
let obj = {x : 1};

// Object.protoype의 빌트인 메소드 직접호출
obj.hasOwnProperty('x');

// 간접호출
Object.prototype.hasOwnProperty.call(obj, 'x');
```

### 19.11.2 객체 리터럴 내부에서 \_\_proto__에 읜한 직접 상속
- 이 방법이 훨씬 깔끔하다.
```js
const parent = { x: 10};
const obj = {
  y: 20,
  __proto__: parent
};

console.log(Object.getPrototypeOf(obj) === parent); // ture
```

<br>

### 19.12 정적 프로퍼티/메서드(static property/method)
- `정적 프로퍼티/메서드란` 생성자 함수 객체가 소유한 프로퍼티/메서드를 의미한다.
- 생성자 함수가 생성한 인스턴스는 참조할 수 없다(인스턴스의 프로토타입 체인에 존재하지 않는다).
```js
// create는 Object의 정적 메서드, 인스턴스가 참조 불가능
const obj = Object.create({name : 'Lee'});

// hasOwnProperty는 프로토타입 메서드, 인스턴스가 참조 가능
obj.hasOwnProperty('name'); 
```
- 메서드 내에서 this(== 인스턴스)를 호출하는게 아니라면 정적메서드로 만들어서 쓸 수 있다.
- MDN등의 문서에서는 static <-> prototype 프로퍼티/메서드를 나눠서 설명하고있다.
- 프로토타입 프로퍼티/메서드는 prototype을 #으로 표기하는 경우도 있다. **Object#toString** 같은 형태

<br>

### 19.13 프로퍼티 존재 확인
### 19.13.1 in 연산자
- in 연산자는 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인. 객체 뿐만 아니라 프로토타입 체인 전체를 검사한다.
- ES6에서 도입된 Reflect.has 메서드는 in과 같이 동작한다.
```js
const person = {
  name: 'motiveko';
}

console.log('name' in person);      // true
console.log('toString' in person);  // ture

console.log(Reflect.has(person, 'toString')); // true
```

### 19.13.2 Object.prototype.hasOwnProperty 메서드
- 인스턴스 자체의 프로퍼티 존재 여부만 검사, 프로토타입 체인은 검사하지 않는다.
```js
console.log(person.hasOwnProperty('toString')); // false
```

<br>

### 19.14 프로터피 열거
### 19.14.1 for ... in문
- for(변수선언문 in 객체) {...}
- 객체 인스턴스와 `프로토타입 체인상의 모든 프로퍼티`를 순회한다. 
- 단, `순회 가능한({enumerable : true}) 프로퍼티만` 순회한다.
- 추가로 키가 심벌인 프로퍼티도 열거하지 않는다.
```js
const person = {
  name : 'motiveko',
  age : 13,
  [sym]: 10 // symbol
}
for(const key in person) { 
  console.log(`${key} : ${person[key]}`);
}
// name : motiveko
// age : 13
```
- Object.prototype의 프로퍼티는 모두{ enumerable: false }이므로 열거하지 않는다.
- [sym]은 Symbol이므로 열거하지 않는다.
- 기본적으로 for ... in은 **순서를 보장하지 않으나** 대부분의 모던 브라우저에서는 순서를 보장하고, 숫자인 프로퍼티 키(사실은 문자)에 대해서는 정렬을 실시한다.

- `배열`에는 for ... in문이 아닌 for ... of 혹슨 Array.prototype.forEach를 사용하길 권한다. for ... of는 값을 열거한다.
```js
const arr = [1,2,3];
arr.x = 10;   // 배열도 객체이므로 프로퍼티를 가진다.

for(const i in arr) {
  // 프로퍼티 x도 출력된다.
  console.log(arr[i]);  // 1 2 3 10  
}

arr.forEach(console.log); // 1 2 3
for( const val of arr ){
  console.log(val); // 1 2 3
}
```

### 19.14.2 Object.keys/values/entries 메서드
- `Object.keys`메서드는 객체 자신의 enumerable한 프로퍼티 키를 **`배열로`** 반환한다.
- ES8에서 도입된 `Object.values`메서드는 객체 자신의 enumerable한 프로퍼티 값을 배열로 반환한다.
- ES8에서 도입된 `Object.entries` 메서드는 객체 자신의 enumerable한 프로퍼티 키와 값의 쌍을 배열에 담아 반환한다.( [][] 형태 )

```js

const person = {
  name : 'motiveko',
  age : 13,
  __proto__: {gender: 'male'}
}

console.log(Object.keys(person));     // [ "name", "age" ]
console.log(Object.values(person));   // [ "motiveko", 13 ]
console.log(Object.entries(person));  // [ ["name", "motiveko"], ["age", 13]]
```

<br><br>

## 20. strict mode
---
<br>