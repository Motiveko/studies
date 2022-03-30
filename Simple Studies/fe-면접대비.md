# 면접 정리

# 여러가지 FE 질문과 이에 대한 정답지

[https://realmojo.tistory.com/300](https://realmojo.tistory.com/300)

- **브라우저 동작 원리**
    - [https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#38-브라우저의-렌더링-과정](https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#38-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%9D%98-%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B3%BC%EC%A0%95)
    - 사용자 인터페이스
        - (주소창, 이전/다음, 북마크...) 페이지 보여주는 창 제외한 대부분
    - 브라우저 엔진
        - 사용자 인터페이스 - 렌더링 엔진 사이의 동작을 제어
    - 렌더링엔진
        - 게코(Gecko) - 파이어폭스
        - 웹킷(Webkit) - 사파리, 크롬
    - 자바스크립트 해석기
    - 자료 저장소
        - 쿠키, localStorage 등 모든 종류의 자원을 하드디스크에 저장할 필요가 있다.
    - 렌더링 엔진 동작 과정
        - 서버에 리소스 요청 → HTML(DOM), CSS(CSSOM) 파싱 → 렌더트리 구축 → 렌더 트리 배치 → 렌더 트리 그리기
        - HTML / CSSOM 생성 과정
            - content-type : content-type: text/html
            - ***바이트코드 -> 문자 -> 토큰 -> 노드 -> DOM***
- **호이스팅**
    - 변수 호이스팅
        - [https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#44-변수-선언의-실행-시점과-호이스팅](https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#44-%EB%B3%80%EC%88%98-%EC%84%A0%EC%96%B8%EC%9D%98-%EC%8B%A4%ED%96%89-%EC%8B%9C%EC%A0%90%EA%B3%BC-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85)
        - 호이스팅은 선언만 위로 올라가는것이지 **할당까지 하는건 아니다**
        - 변수 호이스팅은 var로 선언했을때만 발생함. 할당안하는건 헷갈리니까 **let, const는 호이스팅 발생하지 않는다.**
    - 함수 호이스팅
        - [https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#44-변수-선언의-실행-시점과-호이스팅](https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#44-%EB%B3%80%EC%88%98-%EC%84%A0%EC%96%B8%EC%9D%98-%EC%8B%A4%ED%96%89-%EC%8B%9C%EC%A0%90%EA%B3%BC-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85)
        - 함수 선언문(바로선언)은 호이스팅 되나 함수 표현식(변수에 할당) 호이스팅 되지만 초기화만 되고 값의 할당이 이뤄지진 않는다.
    - 함수 안에 있는 선언들을 모두 끌어올려서 해당 함수 유효 범위의 최상단에 선언하는 것
- **렉시컬 스코프**
    - [https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#241-렉시컬-스코프](https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#241-%EB%A0%89%EC%8B%9C%EC%BB%AC-%EC%8A%A4%EC%BD%94%ED%94%84)
    - **함수의 상위 스코프는 함수의 호출 위치가 아닌, 함수를 정의한 위치에 의해 결정된다.**
- **렉시컬 환경**
    - [https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#235-렉시컬-환경-lexical-enviroment](https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#235-%EB%A0%89%EC%8B%9C%EC%BB%AC-%ED%99%98%EA%B2%BD-lexical-enviroment)
    - 렉시컬 환경은 쉽게말해 **모든식별자(+값)와 상위 스코프에 대한 참조**를 가진 자료구조다
- 실행 컨텍스트
    - [https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#23-실행-컨텍스트](https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#23-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8)
    - `실행 컨텍스트` 는 **`소스코드 실행에 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역`** 이다.
    - 식별자를 등록하고 관리하는 스코프와 코드 실행 순서를 관리하는 내부 메커니즘으로 **식별자와 스코프는** `**렉시컬 환경**`으로 관리하고 코드의 **실행 순서**는 `**실행 컨텍스트 스택**`으로 관리한다.
- **클로저**
    - [https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#24-클로저](https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#24-%ED%81%B4%EB%A1%9C%EC%A0%80)
    - **❗️ 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.**
    - • 클로저는 **`상태`(state)를 안전하게 변경하고 유지하기 위해 사용한다.** 상태가 의도치 않게 변경되지 않도록 상태를 안전하게 `은닉`하고 특정 함수에게만 상태 변경을 허용하기 위해 사용한다.
    - 클로저는 독립적인 (자유) 변수를 가리키는 함수이다. 또는, 클로저 안에 정의된 함수는 만들어진 환경을 ‘기억한다’.
- **this바인딩**
    - [https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#22-this](https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#22-this)
    - 함수에서 this가 가리키는 값은 호출 방식에 의해 동적으로 결정된다.(렉시컬 스코프와 반대)
    - **일반함수 호출**시 (메서드 내부에서, 콜백함수,...) **global object**(단, **strict mode**에서는 **undefined**)
    - **화살표 함수** 내부 this는 **상위 스코프의 this** ( 예를들어 일반 함수 내의 화살표 함수라면 this는 전역객체를, 메서드 내부의 화살표 함수라면 메서드를 호출한 객체를, 생성자함수 내부의 화살표 함수라면 생성자 함수가 생성하는 인스턴스를 참조할 것이다.)
    - **메서드 내부**의 this는 **메서드를 호출한 객체**다.(**메서드를 소유한 객체가 아니다!**)
    - **생성자 함수** 내부의 this는 생성자 **함수가** **생성할 인스턴스**를 가리킨다.
    - Function.prototype.bind/call/apply 는 인자로 전달한 객체를 가리킨다.
- margin vs padding
    - 마진은 border 밖, padding은 border 안쪽 공간
    

---

<br>

# 주니어 프론트엔드 면접 질문 정리

> [https://joshua1988.github.io/web-development/interview/frontend-questions/#질문-유형](https://joshua1988.github.io/web-development/interview/frontend-questions/#%EC%A7%88%EB%AC%B8-%EC%9C%A0%ED%98%95)
> 

<br>

## LEVEL1

- 브라우저 저장소 WebStorage - Cookie
    - https://han41858.tistory.com/54
    - HTML5에는 웹의 데이터를 클라이언트의 디스크에 저장할 수 있는 새로운 자료구조인 **Web Storage** 스펙이 포함되어 있다. **WebStorage에는 로컬/세션 스토리지가 있고, 쿠키는 이전부터 존재했다.**
    - 공통점은 아래와 같다
        - 도메인 단위로 접근된다.
        - key-value로 저장한다.
    - 각각의 특징은 아래와 같다.
        - WebStorage
            - LocalStorage
                - 영구적인 저장소(따로 지우지 않는 이상 계속 남아있는다)
                - 같은 브라우저 - 같은 도메인이면 접근 가능하다.
                
            - Session Storage
                - 임시적인 저장소, 세션이 끝나면 지워진다.
                - 같은 도메인에 같은 브라우저라도 탭이 다르면(세션이 다르면) 접근 불가능하다.
        - 쿠키
            - 쿠키는 매번 서버로 전송된다.
            - 쿠키는 개수/용량의 제한이 있다.(사이트당 20개, 4kb)
            - 쿠키는 만료기간이 있다.
- 쿠키의 각종 옵션
    - `Domain` - 쿠키가 적용되어야 하는 호스트, 서브도메인은 포함하지 않음
    - `Path` - 특정 경로에만 쿠키 활성화를 원하면 사용할 수 있다.
    - `Expires` - 쿠키 만료기간, 이 옵션을 지정하지 않으면 `세션 쿠키`로 설정되어 탭을 닫으면 사라진다.
    - `HttpOnly` - 서버와의 통신에만 쿠키가 사용되고 스크립트로 접근이 불가능해짐
    - `Secure` - Https통신에만 쿠키가 전달됨
    - `SameSite` -
        - 서버가 사이트간 요청에 쿠키를 사용하지 않도록 설정, XSRF(크로스 사이트 요청 위조) 공격을 막기 위해 만들어진 옵션
        - `strict` - 쿠키가 다른 사이트 요청시 절대로 전달되지 않는다. 가장 안전
        - `lax` - 미설정시 기본값, **GET**방식 요청 혹은 **최상위 레벨 탐색**(브라우저에 주소입력, 링크 이동)에는 쿠키 전달함
        - `none` - 쿠키에 `Secure`옵션이 있어야만 사용 가능. 무조건 다른 사이트에도 쿠키를 전송한다.
        - 서브도메인/포트가  다른 사이트는 Same site임, http-https는 Cross-Site로 간주됨
        
    - 다른 도메인간 쿠키 전송
        - 요청 :  `withCredentials:true` 헤더
        - 서버 : `Access-Control-Allow-Credentials: true` 헤더
    
- 웹 워커
    - [https://boxfoxs.tistory.com/294](https://boxfoxs.tistory.com/294)
    - [https://realmojo.tistory.com/109](https://realmojo.tistory.com/109)
    - 웹 워커는 `Worker` 객체로 다른 스크립트와 독립적으로 백그라운드에서 실행되는 js다. 독립 실행이기때문에 웹 워커를 이용해 자바스크립트를 **멀티스레드**로 동작시킬 수 있다.

- 자바스크립트 비동기 처리
    - 비동기 처리 특성 및 에러처리 방법
        - 자바스크립트의 `실행 컨택스트 스택`은 한개이므로 기본적으로 싱글스레드로 동작한다.
        - 비동기 처리를 위해 브라우저에서는 `이벤트 루프`와 `태스크 큐`를 제공한다.
        - [https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#42-비동기-프로그래밍](https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#42-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)
        - 비동기 구조
            - 테스크큐(task/event/callback queue)
                - setTimeout과 같은 비동기 함수의 콜백 함수 또는 이벤트 핸들러 등이 일시적으로 보관되는 영역. 별도로 프로미스의 후속 처리 메서드의 콜백은 `마이크로태스크 큐` 라는 곳에 보관되는데, 45장에서 다룬다.
                - **호출 스케줄링** 이 완료된 함수들은 테스크 큐에 푸시된다.
            - 이벤트 루프(event loop)
                - 이벤트 루프는 `콜 스택`에 현재 실행 컨텍스트가 있는지, `태스크 큐`에 대기중인 함수가 있는지 반복해서 확인한다. 만약 콜 스택이 비어 있고, 태스크 큐에 대기 중인 함수가 있다면 이벤트 루프는 대기 중인 함수를 FIFO로 콜 스택으로 이동시킨다. 콜 스택으로 옮겨진 함수는 실행될것이다.
    - 콜백, 프로미스, async/await
        - 콜백
            - **호스트 환경이 제공하는 여러 함수(setTimeout ...)를 이용해 비동기 동작(콜백)을 스케줄링** 할 수 있다
            - **콜백지옥** 발생
            - **에러처리** → 에러는 **호출자(실행 컨텍스트 아래쪽) 방향**으로 전파되는데, 콜백 패턴에서 콜백 함수가 실행될 때는 콜백 함수를 스케줄링했던 실행 컨텍스트가 이미 끝난 상태다. 따라서 에러 처리를 위해서는 callback함수 자체가 try/catch문이어야 한다.
        - Promise
            - ES6에서 도입된 ECMA 표준 빌트인 객체
            - `new Promise((resolve, reject) ⇒ {})` 로 생성한다.
            - `pending`, `fulfilled`, `reject` 상태를 가지고, 비동기 동작의 후속 처리를 위해 `then`, `catch`, `finally` 메서드를 제공한다.
            - `catch`  메서드는 비동기 처리와 then 메서드 내부에서 발생한 모든 에러를 캐치할 수 있다.
            - 아래와 같은 static 메서드를 제공한다.
                - `resolve` ,`reject`- 이미 존재하는 값을 래핑하여 `Promise`를 생성한다.
                - `all(Iterable)`
                    - 여러 개의 비동기 처리를 모두 `병렬`로 처리할 수 있다.
                    - Iterable의 요소가 Promise가 아니면 Promise로 래핑한다.
                    - 모두 fullfilled 상태가 되면 종료하고, Iterable 순서대로 resolve한 결과를 차례로 배열로 전달한다.(`처리 순서 보장`)
                    - 하나라도 reject되면 기다리지 않고 종료한다.
                
                - `race(Iterable)` - 가장 먼저 fullfiled된 Promise의 처리 결과를 resolve하는 새로운 Promise를 반환한다. 이후 reject되는게 있어도 무시된다.
                - `allSettled(Iterable)`
                    - ES11에서 도입되었다
                    - 전달된 모든 Promise가 settled상태(fullfiled, rejected)가 되면 처리 결과를 반환한다. `{ status, value?, reson? }[]` 의 형태로 넘어온다.
        - Async/Await
            - [https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#466-asyncawait](https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#466-asyncawait)
            - `async` 키워드로 작성된 함수는 무조건 `Promise`를 반환한다.
            - `await` 키워드는 반환되는 Promise가 setteld 될 때 까지 기다린 후 Promise가 resolve 한 결과를 반환한다. 그 전까지 await 이후의 모든 코드는 블로킹 된다.
            - await은 반드시 `순차처리`가 필요한 동작에 사용하자. 그게 아니라면 그냥 비동기나 Promise.all 로 처리하는게 빠르다.

<br>

## LEVEL2

- 프런트엔드 빌드 시스템에 대해서 설명해보세요.
    - 바벨이란?
        - 바벨은 자바스크립트 트랜스파일러(컴파일러)로 상위 자바스크립트 문법을 하위문법으로 변환하는 역할을 한다.(es2020 → es5, `문법의 변환`)
    - 폴리필이란?
        - 브라우저 등 **자바스크립트 실행 환경에서 지원하지 않는 기능**들에 대한 호환성을 추가하는 일이다. (object에 프로토타입을 추가하는 방식)
        - 바벨은 빌드타임에 실행되고 폴리필은 런타임에 실행된다.
    - 모듈 번들러란?
        - `모듈 번들러`란 **웹 애플리케이션을 구성하는 자원(HTML, CSS, Javscript, Images 등)을 모두 각각의 `모듈`로 보고 이를 조합해서 병합된 하나(혹은 몇개의)의 결과물을 만드는 도구**를 의미합니다.
    - 웹팩이란?
        - [https://webpack.kr/concepts/](https://webpack.kr/concepts/)
        - 대표적인 모듈 번들러로 프로젝트에 필요한 모든 모듈을 매핑하고 하나 이상의 *번들을*  생성하는 [`디펜던시 그래프`](https://webpack.kr/concepts/dependency-graph/) 를 만듭니다
        - `Entry` - 디펜던시 그래프를 그리기 위한 진입점이다(index.js)
        - `Output` - ********생성된 번들을 내보낼 위치(dist)
        - `loader` - webpack은 기본적으로 Javascript와 Json만 읽을 수 있는데, 실제 자바스크립트 프로젝트는 그렇게 생기지 않았다. 이미지, 폰트, CSS, Typescript 등이 실제 프로젝트에 의존하고 있는데, 이를 읽을 수 있게 하는것이 로더다. 이런걸 **특정 유형의 모듈을 변환하는 작업**이라고 한다
            - `test`:처리할 파일 종류(regExp), `use`: 사용할 로더
        - `plugin` - 플러그인은 `번들 최적화`, `에셋 관리`, `환경변수 주입` 등의 광범위한 일을 한다.
    - Node.js란?
        - 라이언 달이 만든 V8 기반의 자바스크립트 런타임. 브라우저 밖에서도 자바스크립트를 실행 가능하게 해준다.
    - NPM이란?
        - 노드 패키지 매니저. 자바스크립트 패키지 매니저이고 NodeJS에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할을 하며 설치/관리를 수행할 수 있는 CLI를 제공한다.
        - 프로젝트의 패키지 의존성은 `package.json` 으로 관리되는데, 노드 패키지를 들고다닐 필요 없이 이것만 있으면 어디서든 똑같은 패키지를 받을수있다.
        - `package-lock.json` 은 현재 프로젝트에서 읜존하는 노드 패키지들의 의존성들의 정확한 버전을 기록해놓은 파일이다. 버전에 틸드(~)같은걸로 명시되어있으면 최신 버전으로 받을텐데, package-lock.json 파일은 정확한 버전을 골라준다.
    - ESLint란?
        - ESLint는 자바스크립트 파일을 파싱, 분석하고 정의된 rule에 의해 코드의 버그를 리포팅해주고 코드의 일관성 유지를 도와준다.****
        - Rule에는 두가지가 있다.
            - Code Formatting Rule(`max-len`, `no-mixed-spaces-and-tabs`, `keyword-spacing`)
            - Code Quality Rule(`no-unused-vars`, `no-extra-bind`, `no-implicit-globals`, `prefer-promise-reject-errors`)
        - `enviroment`(코드 실행환경), `global`(전역변수), parserOption(파싱옵션) 등 설정 가능(예를 들어 jest의 전역 변수를 eslint에 인식시켜 줘야 에러를 안낸다)
        - 코드 파싱에 기본적으로 `Espree` 라는 파서를 쓰는데, 바벨 사용시 `@babel/eslint-parser` 파서를 사용하거나 typescript 사용시 `@typescript-eslint/parser`파서를 사용하게 설정할 수 있다. 파서별로 파싱할 수 있는 문법이 다를것이다.
    - Prettier란?
        - Prettier는 코드의 스타일을 일관되게 하는 목적으로 사용되는데,  `AST`를 건드리지 않고 `Reprinting` 할 뿐이다. 즉 코드의 본질은 안바뀐다.
        - 보통 ESLint와 같이 사용하는데, ESLint의 Code Formatting Rule과 Prettier설정이 부딪힐 수 있다. eslint의 플러그인을 사용해서 Code Formatting Rule을 꺼줄 수 있다.
            - `[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)`, `[tslint-config-prettier](https://github.com/prettier/tslint-config-prettier)`
    - 웹 태스크 매니저란?
        - [https://joshua1988.github.io/webpack-guide/motivation/why-webpack.html#웹-개발-작업-자동화-도구](https://joshua1988.github.io/webpack-guide/motivation/why-webpack.html#%EC%9B%B9-%EA%B0%9C%EB%B0%9C-%EC%9E%91%EC%97%85-%EC%9E%90%EB%8F%99%ED%99%94-%EB%8F%84%EA%B5%AC)
        - 웹서비스 배포시 Html, css, js 를 압축하고 css 전처리기 변환하고 이미지 압축하고.. 이런 과정이 필요한데 이걸 자동화 해주는 툴이었다. Gulp, Grunt가 대표적인데 webpack 이 이런 기능들을 포함한다
- 자바스크립트 프레임워크를 써봤는지? 써봤다면 어떤 걸 쓰는지? 만약 쓴다면 쓰는 이유와 썼을 때의 장점?
    - Angular
        - 첫 회사에서 쓰고 있어서
        - 서비스를 싱글톤으로 만들어 DI하는 개념이 좀 스프링같은 언어랑 비슷했다.
        - 라우터구성이 좀 쉽다(React-Router v6에서 앵귤러 라우터 따라하는중)
        - guard, interceptor, directive 같은 개념들이 좋다
        - 타입스크립트가 기본언어라서 좋다.
        - Reactive Form - 벨리데이션 등이 매우 용이하고 관리하기 쉬운듯?
        - 단점
            - 위의 장점들이 한방에 들어오므로 진입장벽이 높다.
            - 앵귤러 자체 모듈시스템
            - 자체적인 언어로 인해 진입장벽( ngFor, ngIfElse, ...)
    - 리액트
        - `함수형 컴포넌트`가 좋다(this 바인딩 없어도 됨)
        - `JSX문법`이 매우 편하다(앵귤러는 컴포넌트에 셀렉터 넣고 어쩌구 해야함)
        - 자바스크립트만 잘하면 좀 진입하기 쉬운듯(for문같은게 다 그냥 자바스크립트니까)
        - 레퍼런스가 많다
        - 리액트를 안쓰고 dom 그리는거는 명령형 프로그래밍이고, 리액트 컴포넌트를 return 하는건 `선언형 프로그래밍`. 선언형이 아무래도 좋다
        - 가상 돔을 써서 빠르다 → 솔직히 채감할 정도의 규모는 안만들어봤따.
- “기획 - 디자인 - API 개발 - 프런트엔드 개발”의 서비스 절차에서 프런트엔드 개발자의 역할은 무엇이라고 생각하는지?

- CORS란? CORS를 해결하기 위한 방법을 아는 대로 모두 설명해 주시고 보통 어떤 방식으로 해결하는지 자주 사용하는 방법 1가지와 함께 실제 해결하신 경험을 공유해 주세요.

- 프런트엔드 성능 최적화란? 프런트엔드 성능 최적화 경험이 있다면 자세하게 설명해달라.
    - Angular - LazyLoading 모듈( 라우터의 메뉴 단위로 import().then(m⇒m.SOME_MODULE))
    - Angular CD?
    - 리액트에서 컴포넌트 export시 `React.memo` 붙이기
    - `useMemo` `useState`, `useCallback` 같은 훅들은 결국 상태나 함수들을 불변으로 만들어줘 랜더링 최적화를 해준다.(자식 컴포넌트에 전달하는 값들)
    
- 백엔드 개발 경험이 있는가?(REST API)
    - 200, 400, 500 Response → 500을 내면 안된다는걸 최근에 알았음
        - 200(ok) 201(created) 202(accepted, 비동기처리시, 완료시 확인 가능한 링크 제공해야함), 204(no content, 삭제시 등)
        - 401(unauthorized, 인증없음) 403(forbidden, 권한없음)
    - GET/POST/PUT(모든것)/PATCH(일부)/DELETE
    - BeanValidation 빡세개 하였다
    - 상세 에러 코드를 명세서로 작성하고 뿌렸다.
    - 컨트롤 리소스는 동작을 포함하는 이름으로 짓기
    
- Virtual DOM이 뭔지 아시는지? 썼을 때의 장점?
    - 가상돔의 역할은 실제 DOM을 만드는 데 까지인듯. 그 이후는 다른것들과 같이 DOM트리 기반의 렌더트리 구성하고 리플로우/리페인트를 진행한다.
    - [https://github.com/Motiveko/studies/tree/master/React-Study/실전 리액트 프로그래밍#3-중요하지만-헷갈리는-리액트-개념-이해하기-1](https://github.com/Motiveko/studies/tree/master/React-Study/%EC%8B%A4%EC%A0%84%20%EB%A6%AC%EC%95%A1%ED%8A%B8%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D#3-%EC%A4%91%EC%9A%94%ED%95%98%EC%A7%80%EB%A7%8C-%ED%97%B7%EA%B0%88%EB%A6%AC%EB%8A%94-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B0%9C%EB%85%90-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-1) 이걸 좀 보도록 하자.
    - 가상돔을 쓰면 변경된 부분만 실제 DOM에 반영하면 되므로 그런 부분은 좀 유리하다(diff 알고리듬)
    - 그런데 항상 RealDOM과 함께 VDOM도 만들어져 있어서 메모리가 두배로 든다

- 웹 서비스 배포 시스템 구축 경험?
    - git push하면 jenkins가 프로젝트를 ssh로 서버에 보내고 서버에 있는 스크립트 실행하면 npm install/ build하는 과정을 수행하는 스크립트를 짰었는데, 서버 스팩이 안좋아서 npm install 부분에서 cpu가 피크 친다더라(알람감) 그래서 구성 못함 ㅠ
    
- 테스트 자동화 경험? 단위 테스트 또는 E2E 코드를 작성해 본적이 있는지?

    - (꼬리 질문) 테스팅 라이브러리와 프레임워크에 특화된 테스팅 라이브러리는 각각 어떤 걸 썼는지?
    - (꼬리 질문) 테스트 대상과 커버리지는 보통 어떻게 잡는지?
      - 앵귤러 테스트 기준, 컴포넌트(퍼블릭 API, 자식 컴포넌트 랜더링), 서비스, 그리고 js module로 만드는 유틸 함수 등에 대해 테스트했다. 
      - 앵귤러는 jasmine + karma가 기본 셋팅 되어 있어 이를 사용했다. 최근 jest를 적용해보았다. `jest-preset-angular` 이라는 앵귤러용 jest conifg preset 패키지가 있는데, npm 다운로드가 51만이라 사용해도 되겠구나 싶었다. 그 외에 vanilla js등을 공부하면서 jest를 써봤다.
      - 커버리지까지 고려하며 테스트를 하진 못했다.
      - 백엔드 개발시 스프링에서는 junit으로 테스트를 작성했다. 마지막 프로젝트는 TDD로 개발을 했는데 사실 여전히 커버리지를 다 안다고 생각은 못하겠다. 조만간 '테스트 주도 개발'을 한번 읽어볼 참이다.
- 웹 접근성과 시맨틱 마크업이란? 이 2가지를 지키기 위해 보통 어떤식으로 마크업을 작성하는지?
    - 시맨틱 마크업 - 전체 웹사이트를 구조적으로 분리해서 분리된 각각의 틀을 의미가 있는 요소들로 묶어보자 해서 나온게 시맨틱 마크업이다. `header`, `footer` 같은 것들이 있다. 예전엔 div로 퉁쳤다.
    - 웹 접근성 - 이용자나 이용자의 장비에 관계없이 이용할 수 있는 웹사이트를 구성하는 것(시각장애인 등) 스크린 리더 등이 인식할 수 있게 `aria-label` 같은것들을 달거나 시맨틱 마크업을 지키면서 개발한다.
- 웹 서비스를 기획부터 배포까지 모두 스스로 해본 경험이 있는가? 토이 프로젝트나 회사 서비스 등
    - 회사에서 고객사의 요청으로 만든 챗봇 플랫폼을 처음부터 끝까지(fe, be) 개발한적이 있다. 사실 중요한 프로젝트도 아니고, 고객사 요구 사항도 명확하지 않아 거의 내 맘대로 만들었다. 기술도 내 맘대로 갖다 썼다.
    - 개인적으로 배운(느낀)게 많은 프로젝트였다. 간단한 프로젝트라도 기획의 중요성을 알게 되었고, 기획없이 개발하다보니 개발하면서 수정하는 사항이 여간 많은게 아니었다. 근데 이과정에서 백엔드는 TDD로 개발하니 수정을 그렇게 해도 코드가 어디서 깨지는지 다 나와서, TDD의 중요성을 세삼 깨달았다.(front는 TDD로 하기 좀 벅찼다.). 그 외에 앵귤러 프로젝트에 테스트 코드도 처음 스터디해서 작성해보고, eslint, prettier 도입했고, rxjs도 잘쓰게 되었다. typescript 역시 공부하면서 처음 strict 모드로 개발했다. 엉성하지만 ngrx도 도입했다. 장족의 발전이었다.


- SEO(검색 엔진 최적화)란? 적용 사례가 있으면 구체적인 적용 방법도 같이 설명
    - 검색 엔진은 html 페이지의 `meta`, title, description 등을 읽어 특정 인덱스를 만들고 이를 검색 결과를 보여준데 사용한다. `검색 엔진 최적화`는 ***검색 엔진이 내 사이트를 크롤링 할 때 정보를 더 잘 가져갈 수 있도록 도와주는 작업***이다. CSR방식인 SPA는 index.html 한덩이 뿐이므로 SEO에 취약하다.
    - `SSG`(Static Site Generator)
      - `Gatsby`, `Vue Press SSG`
      - HTML을 빌드 타임에 각 페이지별로 생성하고 해당 페이지로 요청이 올 경우 이미 생성된 HTML을 반환한다.
      - 정적인 데이터를 기반으로 한 페이지에 적합
    - `SSR`(Server Side Rendering)
      - `Next JS`, `Nuxt JS`
      - 요청이 올 때 마다 해당하는 HTML 문서를 그때 그때 생성하여 반환한다.
      - 동적인 데이터 교환을 기반으로 한 사이트에 적합
    - SEO 성능에 HTML meta 태그가 매우 중요한데, CSR에서 기본적으로 페이지단위로 meta태그를 붙이는건 불가능하나, `react-helmet`와 같은 패키지를 사용하면 가능하다. SEO에 필요한 메타태그들을 쉽게 변경할 수 있도록 도와준다.

- REST API로 받은 객체와 배열은 보통 어떤 자바스크립트 API나 로직을 이용해서 화면에 맞게 가공을 하는지?
    - 보통 Array.Prototye method들을 이용한다. 객체도 Object.keys/values를 걸면 배열이 되므로 적용 가능하다.
- 함수형 프로그래밍이란?
    - (꼬리 질문) 자바스크립트 클로저란?
      - 클로저는 자신이 정의된 스코프를 기억하는 함수다. 자신이 정의된 스코프를 캡슐화 하여 외부에서 변경 불가능하게 만들고자 할 때 사용할 수 있다. 간단한 예로 이걸 이용해서 `debounce`나 `throttle`구현할 수 있다.
    - (꼬리 질문) 자바스크립트 프로토타입이란?
      - https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#19-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85
      - `프로토타입`은 ***어떤 객체의 상위 객체 역할을 하는 객체***로 `공유 프로퍼티`를 제공해 상속을 구현할 수 있다. 자바스크립트는 프로토타입 기반의 객체지향 프로그래밍 언어다.
      - 모든 객체는 `__proto__` 접근자 프로퍼티로 프로토타입 체인의 최상위 객체인 `Object.prototype`에 접근할 수 있다.
      - 모든 프로토타입은 constructor 프로퍼티를 갖는데 이것은 생성자 함수를 가리킨다.
      - 프로토타입은 생성자 함수가 생성되는 시점에 동시에 생성된다. 사용자가 생성자 함수를 정의하는 경우엔, constructor 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도생성된다.(함수 선언문은 호이스팅 발생으로, 런타임 이전에 생성된다.)
      - `프로토타입 체인`은 `상속`과 `프로퍼티 검색`을, `스코프 체인`은 `식별자 검색`을 위한 메커니즘이다. 프로토타입 체인 검색시 종점인 Object.prototype까지 순서대로 올라간다.
      - prototype 상속 구현법에는 Object.create 메서드를 이용해서 인스턴스 생성하는 방법, 객체 리터럴에서 객체의 `__proto__`프로퍼티에 부모 객체 등록하는 방법이 있다. 후자가 더 직관적.
      - **static property,method는 `생성자 함수 객체`가 소유한 프로퍼티/메서드로, 프로토 타입에는 존재하지 않는다.**

<br>

## LEVEL 0

- 타입 시스템에 대해서 알고 있는지? 타입스크립트를 써봤는지?
    - 타입스크립트는 자바스크립트의 수퍼셋으로, 자바스크립트의 런타임 동작을 모델링하는 정적 타입 시스템을 가진다. 이를 이용해 타입 체커는 런타임에 오류를 발생시킬 수 있는 코드를 찾아낸다. 물론 타입 체커를 통과하는 런타임 오류는 얼마든지 많다.
    - (꼬리 질문) 자바스크립트와 타입스크립트의 차이점?
        - 정적 타이핑 시스템 - 동적 타이핑 시스템
    - (꼬리 질문) 타입스크립트의 장점과 단점?
        - 런타임에 발생할 수 있는 오류를 상당부분 컴파일타임에 잡을 수 있다.
        - 언어 서비스를 용해 자동완성 등을 제공받아 자동완성 등 가능 → 개발 능률이 올라간다. 확장성이 좋다
        - 타입 자체로 개발자에게 문서가 된다.
        - 그러나 어쨋든 이를 위한 러닝커브가 발생하고, 타입 체커가 완벽하게 런타임 오류를 잡아낼 수 없다. 그리고 타입 체커를 통과하기 위해 작성해야하는 많은 코드가 발생한다.
- 웹 서비스의 사용성을 개선하기 위해 고민해 봤던 부분이 있는지? 구체적인 사례와 경험 설명
    - 회사 프로젝트에서 데이터 목록을 보여주는 데이터 테이블을 사용하는 예가 있었다.  이거에 대한 페이징이나 검색 조건을 uri query param에 저장해 왔다갔다 해도 그대로 돌아오게 했다. 여기에 더해서 스크롤 위치를 기억하는걸 구현했었다. React router의 navigation event를 구독하고, 현재 history에 state에 스크롤 위치를 기억하는걸 했다.
    - 현재 진행중인 프로젝트에 고객 목록에 엄청나게 많은 dropdown들이 있는데, 스크롤 기억과 동일한 방식으로 dropdown을 다 열게 할 수 있을것 같다.

- 자바스크립트 관련해서 모르는 문법이나 API가 나왔을 때 관련 정보를 어떻게 검색하는지?
    - 그냥 구글에 javascript 문법~으로 검색할듯
- 다른 직무의 동료들과 어떤 식으로 커뮤니케이션 하는지?
    - 사실 이부분은 내가 회사에 오면 제일 배우고 싶은 부분이다. 나는 한 공간에 퍼블리셔, 기획자, 나머지 개발자들이 다 있는 회사에서 일했다(물론 고객사랑 일한적도 있으나 크게 어려운 일을 하진 않은듯) 그래서인지 모르는게 있으면 그냥 서로 바로바로 물어보고 바로바로 대답했다.
    - 개인적으로 마지막 프로젝트에서 프론트엔드를 전담하면서
    
- 여태까지 소속되었던 팀 내부적으로 혹은 회사 외부적으로 지식 공유나 지식 전파 같은 활동들을 해본 적이 있는지?
    - 회사 백엔드 개발자들과 한때 자바 스터디를 한적이 있다. 다같이 백기선 강의 듣고 TDD 책도 사서 테스트 코드 어떻게 짜는지 이런거 이야기 했다. 그렇게 해서 개인적으로 신규 프로젝트에 테스트 코드도 도입했었다. 근데 죄다 퇴사해서 3개월 못갔고, 나도 결국 이렇게 퇴사한다.
- 새로 배우는 개발 지식은 보통 어떤 식으로 정리하는가?
    - git에 올린다. 블로그에 올리지 않는 이유는 블로그에 올리려면 남이 봐도 처음부터 끝까지 이해되야 하게 작성해야 하는 것 같은데 거기 드는 시간이 너무 많은 것 같다. 나는 내가 딱보고 떠올릴 수 있게 정리하는게 좋다.
- 코딩 컨벤션은 보통 어떤 걸 따르고 코딩 컨벤션을 프로젝트에 적용하기 위해 어떤 노력들을 하는지?
    - 없다. eslint, prettier 적용했다.

<br>

## 지원 동기

- 이 직무로 지원한 이유?
  - 프론트엔드 개발을 파기 시작한건 회사의 환경이 좀 컸다.(프론트엔드 지식인 부재) 당분간 한우물만 파서 전문성을 키워봐야 겠다 생각했는데, 어쩌다 보니 이직을 해야하는 상황이 됐고 웹개발보단 역시 fe개발로 가야겠다고 생각했다.

- 이 직무로 지원했을 때 하는 일에 대해서 얼마나 조사 및 이해를 하고 왔는지?
  - fe 개발자로서 일하는 것에 대해서는 지금도 조사하고 있다. 회사마다 좀 성격이 다른 것 같다. 어디는 퍼블리싱을 잘하는 사람을 요구하고 어디는 마크업,스타일은 손도 못댄다고도 들었다. 그래도 기본적으로 웹 개발자로서의 직무와 프론트엔드 개발자로서의 직무는 많이 다를 것 같다. 개인 토이프로젝트를 개발해보고 공부하는 것과 회사의 프로덕션 레벨의 서비스를 개발하는것도 좀 다르지 않을까 싶다. 이걸 다 경험해보지 못해서 이해했다고 자신있게 말할 수는 없겠지만, 지금은 fe개발을 하며 컴포넌트를 만들고 비즈니스 로직을 구성하고, 또 이런 일을 하는데 필요한 기술, 패턴을 공부하는걸 즐기는 것 같다.

- 이직하려는 회사의 직무에서 기대하는 부분과 기여할 수 있는 부분?
  - 직무에 디자인 시스템을 개발한다는 내용이 있었는데, 이런부분을 해볼 수 있는게 재미있을 것 같다. 조만간 개인적으로 공부해보고 싶었는데, 실전에 먼저 부딪히게 생겼다. 그 외에 이전에는 코드리뷰라는걸 경험해본적이 없는데, 이런걸 받아볼 수(+해볼 수) 있었으면 좋겠다. 거기에서 성장이 나오지 않을까?
  - 주니어 개발자인 내가 당장 기여할 수 있는 부분은 많지 않겠지만, 최대한 빠르게 회사일에 적응하겠다. 그리고 회사의 개발자들도 분명히 부족한 부분들이나 외면하고 놓치는 부분들이 있을거라 생각한다. 이전회사도 그랬고. 그런 부분들을 내가 캐치해서 파고들면서 기여할 수 있지 않을까?

<br><br>

---

# 주니어 실전 면접

> [https://xiubindev.tistory.com/119](https://xiubindev.tistory.com/119)
> 

## CS

- 브라우저에 [www.google.com](http://www.google.com) 을 입력하면 일어나는 일
    - https://devjin-blog.com/what-happen-browser-search/
- 객체지향 프로그래밍
    - https://jeong-pro.tistory.com/95
- 프로세스 vs 스레드
  - `프로세스는` 운영체제로 부터 ***자원을 할당받는 작업의 단위***, `스레드`는 ***할당 받은 자원을 이용하는 단위***
  - 하나의 프로세스에 여러 스레드가 생길 수 있다. 애플리케이션은 하나의 프로세스고 그 안에서 스레드로 분기처리 될 수 있는것.
## JS

- **Promise - Callback 차이**
- Promise는 Promise 객체를 사용하고
- async/await 사용방법
- Promise - async/await 차이
    - await 키워드를 만나면 해당 비동기 로직이 모두 완료될 때까지 블로킹이 된다. 순차 처리가 필요한 코드를 동기 방식처럼 작성할 수 있다.
    - Promise에서 이를 처리하려면 아마 then 에 후속처리 함수를 전달해서 후속처리를 해야 할 것이다. 가독성 측면에서 async/await 이 당연히 우월하다.
    - async함수는 결국 Promise를 반환한다.
- var, let, const
    - var
        - 블록 스코프 지원 안함(if문 내에서 선언해도 전역)
        - 중복선언가능
        - 호이스팅 발생(undefined로 초기화)
        - 재할당 가능
    - let,const
        - 블록스코프 지원(if문 내에서 선언하면 if문 내에서만 유효)
        - 호이스팅 안함
        - 중복선언 불가
        - let은 재할당 가능, const는 재할당 불가능
- 이벤트 버블링/캡처링 예시
  - https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#406-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%A0%84%ED%8C%8C
  - 이벤트는 `캡처링` -> `타깃` -> `버블링` 순서로 전파됨. 캡처링은 window -> target, 버블링은 target -> window
  - 이벤트 등록 방식중
    - `addEventHandler`로 등록하면, 3번째 인수가 true면 캡처링 단계의 이벤트를 캐치 할 수 있다.
    - `attribute/property`로 이벤트 등록하면 타깃단계와 버블링 단계만 캐치한다.
  - `focus`, `blur`, `load`, `mouseenter` 등의 전파가 안되는 이벤트가 존재한다. 잡을 필요가 없기때문
  - 이벤트 전파를 이용해서 이벤트 위임(delegation)을 구현할 수 있다.(`target.match` 메서드 사용)
  - `preventDefault` 메서드로 DOM 요소의 기본동작 제어 가능
  - `stopPropagation` 메서드로 이벤트의 전바를 중지할 수 있다.
<!-- - 클로저 -->
<!-- - 호이스팅 -->
<!-- - 프로토타입 -->
- 불변성을 유지하는 법
  - 객체를 무조건 재할당 하는것이다. 원시값은 값의 변경이 불가하다(참조만 변함), 객체는 값의 변경(프로터피)이 가능한데, 변경하지 않고 기존걸 복사해서 변경된 부분을 반영하고 재할당 하는 방식으로 쓰면된다. `...`연산자나 `immerjs`를 사용한다.

## React

- 가상돔이 무엇이고 동작 원리
  - https://ui.toast.com/weekly-pick/ko_20210819
  - https://ko.reactjs.org/docs/reconciliation.html#the-diffing-algorithm

  - 가상돔은 실제 돔과 별개로 존재한다. 가상돔은 심지어 prev, current 두벌 존재
  - 이 두벌의 가상돔의 차이를 diff 알고리듬이 찾아서 실제 DOM에 반영한다.
  - 가상DOM을 안쓰고 Native DOM API로 DOM 조작시 조작하는 만큼 리플로우/리페인트 하게되는데, 가상돔은 일종의 `버퍼` 역할을 해 이런 조작들을 묶어서 한번에 반영해준다.
  - 변경 여부를 판단하는 기준은 요소의 순서다. 요소의 맨 끝을 추가/삭제하면 이를 잘 인지하지만 중간을 삭제하면 해당 요소 뒤의 요소는 순서가 바뀌고 모두 DOM에서 삭제/추가하게 된다.
  - 이를 방지하기 위해 각 요소에 고유한 `key`를 할당하고, 이를 기반으로 DOM의 차이를 비교한다.
  - DOM 요소의 `타입`이 변경되면(div->span) 실제 돔에서 **자식요소를 전부 삭제하고 다시 추가**된다. ***가급적 타입 변경을 지양***해야한다.
  - 그러나 DOM 요소의 `속성`이 변경되는 경우 해당 속성값만 실제 DOM에 반영한다. 자식 요소는 그대로 있는다.

- IncrementalDOM
  - Angular가 사용한다
  - VDOM을 만들이 않음므로 메모리 소비가 적다. 하지만 속도는 느리다.

- React 사용 이유
- 클래스컴포넌트 - 함수형 컴포넌트
- **컴포넌트 생명주기 메서드**
    - 클래스형 컴포넌트
  ![생명주기](https://cdn.filestackcontent.com/ApNH7030SAG1wAycdj3H)
        - Mount
            - `costructor` - `componenetWillMount` - `render`(Mount) - `componentDidMount`
            - `componenetWillMount`에서 props/state 변경하면 안됨. 또한 render 전이므로 DOM 접근 불가
            - `componentDidMount`에서는 DOM 접근 가능, 여기서 ajax요청, 호출 스케줄링
        - Props Update
            - props 업데이트 감지
            - `componentWillReceiveProps` - `shouldComponentUpdate` - `componentWillUpdate` - `render` - `componentDidMount`
        - State Update
            - `componentWillReceiveProps`를 제외하고 Props Update 과정과 동일하다.
        - Unmount
            - `componentWillUnmount`
        - Error
            - `componentDidCatch`는 리액트16에서 추가된 매서드로, 최상위 컴포넌트에 한번만 넣어주면 된다. 에러 로깅용으로 용이하다.
    - 함수형 컴포넌트
        - https://www.zerocho.com/category/React/post/5f9a6ef507be1d0004347305
        - 이것도 생명주기라면 생명주기다. 클래스가 컴포넌트 위주의 생명주기 메서드를 가진다면, 함수형 컴포넌트는 일종의 `데이터 위주의 생명주기`를 가진다.
        - `useEffect`훅의 deps에 설정된 데이터가 변경될 때 컴포넌트가 마운트 된 후 실행된다.
        - `useEffect`훅의 반환 함수는 훅의 다음 실행 이전에 실행된다. 리소스 정리 등을 처리하면 된다.
        - `useLayoutEffect`는 useEffect와 동일한 시그니처를 가지는데, DOM 변경 후 브라우저가 화면을 그리기 이전 시점에 동작된다는 차이가 있다.
- useState를 왜써야하는가
  - useState를 안쓰면 상태가 안변해도 매 랜더링시 상태값이 재할당된다. 
- 렌더링 성능 향상을 위해 해야하는 것
  - 메모아이제이션.
  - 요소의 타입을 바꾸는 일을 지양한다.
  
- Context Api
  - React.createContext로 컨텍스트 생성
  - Provider로 자식요소 감싸고 value로 컨텍스트 제공
  - 자식 요소에서 Context 접근 방법은 `Context.Consumer`, `useContext 훅` 두가지가 있다.
    1. 자식에서 Context.Consumer를 랜더링하고, 그 하위에서 Provider의 value 속성으로 전달한 값들을 사용 가능하다.
    2. useContext(CONTEXT)를 통해 value 참조 가능. 어쨋든 둘 다 Provider하위여야한다.
  - 개인적으로 useContext훅 결과를 반환하는 useCommon, useUser, userFolder... 같은 훅을 만들어서 그걸 export 해서 사용했었다.
  - Context를 사용하면 부모->자식으로 상태를 전달할 필요가 없어 prop drilling이 개선된다.
- [Redux vs Context](https://ridicorp.com/story/how-to-use-redux-in-ridi/#:~:text=%EC%97%AC%EA%B8%B0%EC%84%9C%20%EC%9E%A0%EA%B9%90%2C%20%EC%98%A4%ED%95%B4%ED%95%A0%20%EB%A7%8C%ED%95%9C,%EC%84%B1%EB%8A%A5%20%EB%A9%B4%EC%97%90%EC%84%9C%20%EB%82%98%ED%83%80%EB%82%98%EA%B2%8C%20%EB%90%A9%EB%8B%88%EB%8B%A4.)
    - 단순히 글로벌 상태 구현을 원하면 Context로도 가능하다.
    - Context는 상태관리 수단일 뿐, 실질적으로 상태 관리는 useState/useRedcuer가 한다.
    - Context 하나에 상태를 다 박아놓으면, 상태가 조금만 변해도 그 상태에 의존하지 않는 컴포넌트까지 전부 리렌더링된다. 최적화가 안되어 있는건데, 따라서 Context를 사용할 때에는 관심사 분리가 굉장히 중요해진다. (예를들어 1컴포넌트가 setState를 쓰고 2컴포너트가 state를 참조할 때 setState를 호출하면 불필요하게 1컴포넌트도 다시 랜더링한다. React.memo를 걸면 되긴 하겠지만 수많은 컴포넌트에 전부?)
    - 리덕스를 사용하는 이유는 위의 이유와 더불어 saga와 같은 미들웨어를 통해 부수효과를 처리할 수 있기 때문. 사가함수는 제너레이터로 사가에서 제공하는 함수의 결과는 js object로 테스트하기 쉽다.


## FE
- 웹 표준이란
    - '웹에서 표준적으로 사용되는 기술이나 규칙'
    - 표준화 단체인 W3C가 권고한 표준안에 따라 웹사이트를 작성할 때 이용하는 HTML, CSS, JavaScript 등에 대한 규정이 담겨 있다.
    - 어떤 운영체제나 브라우저를 사용하더라도 웹페이지가 동일하게 보이고 정상 작동해야함을 의미.
    - 표준 스펙을 잘 지키는 것 뿐만 아니라 구조적 마크업(XHTML)과 표현 및 레이아웃(CSS) 및 사용자 행위 제어(DOMScripting)를 잘 분리하는 고급 홈페이지 구축 방식.
    - CSS 와 HTML(XHTML)로 웹 문서를 작성하는 것의 명확한 용어는 권고(recommend)라고 하며 버전과 상관없이 HTML, XHTML은 그 자체로 표준이라고 한다.


## HTML/CSS

- Flexbox
- Cascading에 대해 설명좀
    - 스타일 우선순위.
    - 중요도 : `웹페이지 사용자가 만든 시트` > `제작자가 만든 !important` > `제작자가 만든 일반 시트` > `기본적인 브라우저 스타일`
    - 적용 범위 : `인라인 스타일` > `id 스타일` > `class 스타일` > `태그 스타일`
- CSS에니메이션과 JS에니메이션 차이
    - CSS에니메이션과
        - CSS의 `transform`, `translate`, `animation` 등을 이용한 에니메이션, 단순한 에니메이션에는 최적이다. 
    - JS에니메이션
        - CSS로 처리하기에 훨씬 복잡하고 무거운 에니메이션을 세밀하게 다룬다. 리플로우/리페인트가 계속 발생되므로 부드럽진 않았는데, `RequestAnimationFrame API`가 등장한 이후 60fs를 보장한다고 한다. `velocity`, `GSAP`같은 라이브러리를 쓴다. 
        - js코드로 세밀한 구성 가능, GPU를 통한 하드웨어 가속 제어 가능, 브라우저 호환성 측면에서 transition, animation 등 보다 훨씬 뛰어나다
    
- position 속성
    - `static`
        - 기본값, HTML 문서상 있어야 하는 원래 위치
        - top, left, bottom.. 등이 무시된다.
    - `relative`
        - 요소의 원래 위치(static)을 기준으로 상대적(relative)으로 재배치 해준다.
        - top, left, bootom, right 를 이용해 재배치한다.
    - `absolute`
        - 자신의 `상위 요소중 position이 static이 아닌 요소`를 찾아 그 요소를 기준으로 상대적으로 재배치 하게 된다. 없으면 body기준이다.
        - 기준이 꽤 복잡한데, 이때문에 보통 absolute를 적용한 요소의 부모요소에 relative를 지정해준다.
    - `fixed`
        - 뷰포트에 고정된 상태로 배치된다.(고정된 상단바 등에 사용)
        - top, left, bottom, right 속성은 브라우저 뷰포트 기준의 값이다.
    - `sticky`
        - https://tech.lezhin.com/2019/03/20/css-sticky
        - 평소에는 `static` 과 같은 상태이지만 스크롤 위치가 임계점에 이르면 `fixed`와 같이 뷰포트에 고정된다.
        - sticky는 top, left, bottom, right 속성값이 `필수`
        - sticky 요소는 자신의 가장 가까운 부모요소의 scroll에 고정된다. 부모 박스가 스크롤을 벗어나면 일반적인 흐름으로 간다.


---

## 실전
- 객체지향 vs 함수형 프로그래밍
    - https://wooono.tistory.com/270
    1. 절차지향 프로그래밍
        - 절차적 프로그래밍이란, 프로그램을 재사용 가능한 함수 단위로 나누는 프로그래밍 구조를 의미한다.
        - 변수나 상수 등의 값들을 관리하는 `자료형`과 해당 자료형을 사용하는 `함수`가 분리되어 사용된다.

    2. 객체지향 프로그래밍
        - 객체지향 프로그래밍은 절차지향 프로그래밍에서 자료형과 함수를 객체 단위로 묶어서 관리하기 시작한다. 각각 필드와 메서드가 된다
        
    3. 함수형 프로그래밍
        - 함수형 프로그래밍의 경우, 값의 연산 및 결과 도출 중심으로 코드작성이 이루어진다. 함수 내부에서 인자로 받은 값을 별도로 저장하거나 하지 않고, 간결한 과정으로 처리하고 매핑하는데에 주 목적을 둔다. 
        - 함수형 프로그래밍은 순수 함수들로 이뤄져 있어 상태가 없다.

    - 함수형 언어에서는 `함수`(Function) 자체가 `일급 객체`가 되겠지만, 객체지향 언어에서는 `클래스`(또는 객체, Object)가 `일급 객체`가 됩니다

- script tag의 async/defer
    - 공통점은 js 파일의 로드가 비동기로 동시에 진행된다. 코드 실행시점에 차이가 있다.
    - `async` : HTML 파싱과 JS로드가 비동기로 동시진행되고 ***JS파일의 로드가 끝나면 바로 평가/실행된다.*** JS가 실행되며 HTML 파싱은 블로킹된다. DOM 접근하는 코드는 이렇게 작성되면 안된다.
    - `defer`: HTML 파싱과 JS로드가 비동기로 동시진행되고, ***JS파일의 평가/실행은 DOM 생성 완료 후(DOMContentLoaded 이벤트 발생 후) 실행된다.*** DOM 조작이 필요하면 defer 키워드를 적용하자.

- javascript `strict` 모드
    - https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#20-strict-mode
    - 발생할 수 있는 에러
        - 솔직히 항상 strict로 개발하는거나 마찬가지라서 당연하다고만 느껴진다.
        - `implicit global` -> 선언하지 않은 변수를 참조하면 reference error 발생
        - delete 연산자로 변수, 함수, 매개변수 삭제시 SyntaxError 발생
        - 매개변수 이름 중복시 SyntaxError
        - with문 사용시 SyntaxError
    - strict mode 적용에 의한 변화
        - 일반 함수의 this는 원래 global인데 strict에서는 undefined
        - 함수의 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체가 변하지 않는다.(원래는 변하나봄)
- 즉시실행함수
    - 즉시실행 함수는 함수 정의와 동시에 단 한번만 실행된다.
    - 즉시실행 함수 내 변수들은 지역 변수가 되어 실행후 사라진다. 전역변수를 생성하지 않으므로 라이브러리 등에서 사용된다고 한다.
    - [즉시 실행 함수는 `클로저 함수를` 만드는데 유용](https://github.com/Motiveko/studies/tree/master/Javascript-Study/Modern-Javascript-Deep-Dive#244-%ED%81%B4%EB%A1%9C%EC%A0%80%EC%9D%98-%ED%99%9C%EC%9A%A9)하다. 아래 함수에서 increase는 num에대한 참조를 가진 유일한 함수로 클로저 함수다. num은 increase만 변경할 수 있다.
    ```js
    const increase = (function() {
        let num = 0;
        return function () {
            return ++num;
        }
    }());
    ```

<br>

- 싱글스레드 vs 멀티스레드
    - https://velog.io/@gil0127/%EC%8B%B1%EA%B8%80%EC%8A%A4%EB%A0%88%EB%93%9CSingle-thread-vs-%EB%A9%80%ED%8B%B0%EC%8A%A4%EB%A0%88%EB%93%9C-Multi-thread-t5gv4udj
    - 스레드 
        - **프로세스가 받은 자원을 이용하는 실행의 단위**
        - 프로세스 내 다양한 작업을 담당하는 최소 실행 단위이다.
        - 프로세스 내의 Heap, Data, Code 영역을 공유한다.
        - 각각의 스레드는 독립적인 작업을 수행해야 하므로 고유한 스레드 ID, 프로그램 카운터, 레지스터 집합, 스택을 가지고 있다.
    - 멀티 스레딩은 스레드 간의 자원을 공유하고 자원의 생성/관리의 중복성을 최소화 하여 수행 능력을 향상시킨다.
    - 멀티 스레드는 `컨텍스트 스위칭`을 통해서 이뤄진다. 스위칭이 엄청 빠르기 때문에 병렬로 동시 수행되는 것 처럼 보인다. 컨텍스트 스위칭에는 `오버헤드`가 발생하므로 조심해야한다.
    - `싱글 코어` 멀티스레딩은 스레드 생성 시간이 오히려 오버헤드로 작용해 싱글 스레드보다 느리다.
    - 멀티스레딩은 자원 접근에 대한 동기화를 신경써야한다. 이건 스프링 빈이 상태를 가지면 안되는 이유이기도 하다.


- this바인딩 실전문제 ㅜㅠ
```js
var obj = {
  name: 'a',
  print: function() {
    // 1. 일반 함수이므로 this는 전역 참조
    // 2. 전역변수
    var inner1 = function() {
      console.log(this.name, name);
    }
    inner1();  // b b
    
    // 1. 화살표 함수는 상위 스코프의 this로 여기서는 메서드 내의 this. 메서드 호출한 인스턴스(obj)를 참조한다.
    // 2. 전역변수
    var inner2 = () => console.log(this.name, name);
    inner2(); // a b

    // 1. 전역변수
    // 2. 메서드 이므로 this.name은 obj.name이 적용된다.(this는 메서드 호출한 인스턴스)
    // 3. 일반 name은 전역 참조
    console.log(window.name, this.name, name); // b a b
  }
}
// strict가 아니므로 var로 선언된다.
name = 'b';
obj.print();
```

