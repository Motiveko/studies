# 실전 리액트 프로그래밍

![책표지](https://image.kyobobook.co.kr/images/book/xlarge/670/x9788966262670.jpg)

<br>

---

## 목차
- ### [1. 리액트 프로젝트 시작하기](#1-리액트-프로젝트-시작하기-1)
<!-- - ### [2. ES6+를 품은 자바스크립트, 매력적인 언어가 되다.](#2-ES6+를-품은-자바스크립트,-매력적인-언어가-되다.-1) -->
- ### [3. 중요하지만 헷갈리는 리액트 개념 이해하기](#3-중요하지만-헷갈리는-리액트-개념-이해하기-1)


<br><br>

## 1. 리액트 프로젝트 시작하기
### 1.1 리액트란 무엇인가
- 리액트란 UI 라이브러리다. 앵귤러와같이 SPA 애플리케이션 구성에 필요한 기능 전반을 주는 프레임워크와 달리 리액트는 기본적으로 UI 관련 기능들만 제공한다.

<br>

### 1.2 리액트 개발 환경 구성하기
- 보통 `create-react-app`으로 자동구성하는데, `babel`, `webpack`을 이용해 직접 구성할 수도 있다. 추후 다룬다.

<br>

### 1.3 create-react-app으로 시작하기
- `create-react-app`을 설치하고 cli로 프로젝트를 구성할 수 있다. 기본적으로 필요한 빌드/테스트/devserver등의 명령어는 npm script에 등록되어있다.
- `Angular-Cli`와 다르게 그외의 `Lint`나 `router`, `css` 관련 기능 등은 전부다 사용자가 직접 설치해야한다.

<br>

### 1.4 CSS 작성 방법 결정하기
- 컴포넌트 내부에서 CSS 코드를 관리하는 방법으로는 `css-module`, `css-in-js`가 있다.
    - css 팀이 따로있다면 이걸 쓸 일은 없다고한다.
- 일반 css작성 후 컴포넌트에 import 하면 캡슐화가 안돼 다른 컴포넌트의 css와 합쳐진다. 즉 기본적으로 캡슐화가 안된다.

<br>

### 1.4.1 CSS-Modul

- 이를 막기 위해 `css-module` 을 사용한다.  css 파일을 `{이름}.module.css` 로 만들면 `css-module`이 된다고 한다. 이걸 컴포넌트에서 import 한 후에, className={`${module.{className}}`} 형태로 쓰면 된다고함.
- 해보니까 Element 요소에 적용된 class명이 `FILENAME_clssname_HASH` 형태로 바뀐다
- 이게 import해서 사용하는 문법이 번거로워서 `cn(classname)` 이라는 패키지를 사용한다고 한다.


<br>

### 1.4.2 Sass
- `Sass는` 변수, 믹스인 개념을 이용해 스타일 코드를 재사용 할 수 있다. `Sass` 문법으로 작성한 파일은 별도의 빌드 단계를 거쳐 CSS 로 변환되어 사용된다
- `node-sass` 패키지는 `Sass`를 `CSS`로 빌드할 때 사용한다. 이것만 설치하면 리액트는 `Sass`를 위한 빌드 시스템이 구축되어 있어 ***js코드에서 scss 확장자를 가지는 파일을 불러오면 자동으로 CSS로 컴파일된다.***
- 공통코드를 보통 정의한다(shared.scss) 여기에다가 큰 변수들을 다집어넣음
- css module도 sass로 사용 가능하다.

<br>

### 1.4.3 css-in-js
- 이름 그대로 css를 자바스크립트 안에 작성하는 방법임. 동적인 css코드나 css코드를 변수로 처리할 수 있다는 장점이 있다.
- 모든 개발자가 `css-in-js`를 할줄 알지 못하거나 마크업 개발팀이 별도로 있으면 이건 도입하기 힘들다.
- 여러가지 `css-in-js`를 지원하는 패키지가 있는데, 대표적인건 `styled-components`이다.
- npm i styled-components
- `styled-components`의 분법은 태그된 템플릿 리터럴(tagged template literal)로 책의 2.6장에서 다룬다. 간단히 설명하자면 styled.div`{스타일}` 에서 styled.div는 함수, {style}은 함수의 인자가 된다.


### 1.5 단일 페이지 애플리케이션 만들기
- SPA는 최초 로딩시에만 서버에 요청하고 이후 페이지 변경에 대해서 서버에 요청하는게 아닌 클라이언트에서 처리하는 애플리케이션이다.
- vanilla js로 구현하려면 window의 history api 의 `pushstate`와 `popstate` 핸들러 등록을 통해 필요한 내용을 구현할 수 있다.
- 리액트에서 라우터 기능을 위한 대표 패키지로 `react-router-dom`이 있다.
  - 라우트 사용을 위해서는 `BrowserRouter` 컴포넌트로 전체를 감싼다. 루트컴포넌트에 적용해야 하겠다.
  - `Route` 컴포넌트로 주소와 컴포넌트의 맵핑을 등록한다.
  - `Link`는 클릭시 라우터 이동 이벤트를 발생시키는 컴포넌트다.


> react-router-dom이 책은 v5 기준이나, v6이 되면서 바뀐 문법들이 굉장히 많다. 맞게했는데 뭔가 안된다 싶으면 [여기](https://reactrouter.com/docs/en/v6/upgrading/v5)에서 찾아봐야한다.

🥕 책에 나온 내용 중 v6에서 바꿔야할 내용
- `Route`는 `Routes`의 자식요소여야한다.
```js
// v5
<Route path={"/room"} component={<Room />} />

// v6
<Routes>
  <Route path={"/room"} element={<Room />} />
</Routes>
```
- `Route`의 `component`속성과 `render` 속성은 `element`속성으로 통일한다. render 속성에서 쓰던 함수형태도 그냥 반환값을 써주면 된다.
```js
// v5
<Route exact path="/" render={() => <h2>방 고르기를 누르세요</h2>} />
// v6
<Route exact path="/" element={<h2>방 고르기를 누르세요</h2>} />
```
- 현재 url이나 parameter 들을 v5에서는 컴포넌트의 `props`로 받아 사용했는데, v6에서는 `hook`을 사용한다. 책에서 나오는 url을 가져오는 match는 아래와 같이 바뀐다.
```js
// v5
export default function Room({ match }) {
  console.log(match.url) // /room
}

// v6
export default function Room() {
  const {pathname} = useLocation(); // /room
}
```
- ❗️❗️ 그리고 중요한건, ***하위 라우터에서 `Route`로 컴포넌트 맵핑시 `path`속성에 `full path`를 써줘야 했던 것 같은데, v6부터는 `Angular route`처럼 자기 주소는 안적어줘도 된다.*** 이 당연한게 안됐었던 모양이다. 아래 예에서 Room 컴포넌트는 `/room`에 맵핑된 컴포넌트다.
```js
// v5 - { match }로 자신의 현재 path 가져와서 해당 내용을 prefix로 라우트 구성해야한다.
export default function Room({ match }) {
  return (
    <Routes>
      <Route exact path={`${match.url}`} element={<h2>방을 선택하세요</h2>} /> 
    </Routes>
  )
}

// v6 - 자신의 현재 path는 / 로 가정한다.
export default function Room() {
  return (
    <Routes>
      <Route exact path={`/`} element={<h2>방을 선택하세요</h2>} /> 
    </Routes>
  )
}
```

<br>


<!-- ## 2. ES6+를 품은 자바스크립트, 매력적인 언어가 되다. -->

## 3. 중요하지만 헷갈리는 리액트 개념 이해하기

### 3.1 상태값과 속성값으로 관리하는 UI 데이터
- UI 라이브러리인 리액트는 UI 데이터를 관리하는 방법을 제공한다. 상태값(`state`)과 속성값(`props`)이다.

### 3.1.1 리액트를 사용한 코드의 특징
- 리액트를 사용하지 않고 native dom api 를 사용해서 컴포넌트를 만들면 보통 ***화면을 어떻게 그릴지***가 코드에 담기게 된다.(`createElement`, `appendChild`,...) 이와 달리 리액트를 사용하면 어떻게 그릴지는 리액트가 처리하므로 ***무엇을 그릴지***가 코드에 담긴다. (`return <Home />`...)
- 전자를 `명령형(imperative)`, 후자를 `선언형(declarative)` 프로그래밍 이라고 하는데, 선언형 프로그래밍이 추상화가 높아 비즈니스 로직에 집중할 수 있다는 장점이 있다.

<br>

### 3.1.2 컴포넌트 속성값과 상태값
- `상태값(state)`은 컴포넌트가 관리하는 값이고 `속성값(props)`은 부모요소로부터 받는 값이다.
- 리액트에서는 ***UI 데이터를 반드시 상태값 혹은 속성값으로 관리해야한다.*** 일반 변수로 관리하면 리액트가 변경 내용을 인지하지 못해 랜더링이 갱신되지 않는 현상이 발생할 수 있다.
- `useState` 훅을 이용한 상태값 역시 `setter` 함수가 아닌 재할당 등으로 상태값을 변경하면 리액트가 인지하지 못한다.
- `props`의 경우 부모의 상태값을 넘겨받는 것인데, 부모의 상태값 변경시 부모 요소가 다시 랜더링 되며 자식까지 랜더링 된다.
- 이 때, ***자식이 자신이 받은 props 값의 변경이 있을때에만 다시 랜더링 하고 싶으면 `React.memo` 를 사용하자.***
```js
// 부모 요소에서 넘겨주는 title props의 변경이 있을 경우에만 다시 랜더링한다.
import React from "react";
function Title({ title }) {
  return <div>제목 : {title}</div>;
}
export default React.memo(Title)
```
- `props` 는 불변(immutable)이다. 자식에서 변경하려들면 에러가 발생한다.
- `state`는 불변이 아니지만 불변처럼 관리해야한다. 리액트에서 상태값 변경 여부를 참조값 변경으로 판단하기 때문이다.
  > 참고로 `Context`는 [`Object.is`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/is#%EC%84%A4%EB%AA%85)로 비교한다고 한다. 


<br>

### 3.1.3 컴포넌트 함수의 반환값
- 문자열, 배열, null, fragment 등을 반환할 수 있다.
- `false`, `null` 반환시 아무것도 랜더링하지 않는다.
- `배열` 반환시 각 요소에 고유한 `key`값이 있어야한다.
- [리액트 포털(`ReactDOM.createPortal`)](https://ko.reactjs.org/docs/portals.html)을 사용하면 컴포넌트의 위치와 상관없는 곳에 랜더링 가능하다.

<br>

### 3.2 리액트 요소와 가상 돔
- 보통 JSX 문법을 이용해 개발하므로 리액트 요소의 존재를 알기 힘들다. JSX 문법으로 작성된 코드는 `리액트 요소`로 변환되고 리액트 요소는 `돔 요소`로 변환된다.
### 3.2.1 리액트 요소 이해하기
- JSX로 작성된 코드는 `React.createElement`로 변환되어 `리액트 요소`를 반환한다.
```js
// JSX 문법
const element = <a key="key1" style={{width: '100'}} href="https://google.com">Click here</a>;

// createElement로 변환
const element = React.createElement({
  'a',
  {
    key: "key1",
    style: {width: '100'},
    href: "https://google.com"
  },
  'Click here',
});

// createElement가 반환하는 리액트 요소
{
  type: 'a',
  key: 'key1',
  ref: nullm
  props: {
    style: {width: '100'},
    href: "https://google.com"
    children: 'Click here'
  }
}
```

- `key`와 `ref`를 제외한 모든 속성값은 `props`에 들어간다.(자식 요소도 마찬가지)
- 표현식 (`{ value }`)를 사용하면 평가되어 값으로 바꿔 리액트 요소에 추가되는데, 문자열 등과 같이 사용되면 배열로 추가된다.
```js
// element
const element = <div>나이 : { age } 세</div>;

// 리액트 요소
{
  ...
  props: {
    children: ['나이 : ', '25', ' 세']
  }
}
```
- 요소에 컴포넌트를 사용하면 `type`은 `컴포넌트 함수`가 된다. `type`이 `문자열`이 될 때까지 함수를 계속 실행하게 되고 최종본이 `가상돔(Virtual DOM)`이 된다.
- 리액트는 전달된 리액트 요소와 이전 리액트 요소를 비교해 차이점만 실제 돔에 반영한다.

<br>

### 3.2.2 리액트 요소가 돔 요소로 만들어지는 과정
- DOM tree와 같이 리액트 역시 App 컴포넌트부터 시작해 리액트 요소 트리를 만들어 낸다.
- 리액트 요소 트리가 변경될 때 화면 업데이트는 랜더 단계(render/reconciliation phase)와 커밋 단계(commit phase)로 나뉜다.
- `랜더 단계`는 ***이전 트리와 현재 트리의 차이를 비교***하는 단계고, `커밋 단계`는 차이를 ***DOM 트리에 반영하는 단계***이다. 
- 랜더 단계의 시작은 `ReactDOM.render()`함수나 `상태값 변경`으로부터 시작된다.
- 트리를 만드는 과정은 최초 파싱된 트리에서 `type`이 함수인 것들을 실행해 모두 문자열 타입이 될때까지 실행하는 과정이다.
- `React.memo`가 적용된 함수는 `props` 변경이 없으면 memoization된 값을 사용한다.(함수 실행 안함)
- 엄밀히 말해 리액트 요소들은 리액트 16에서 도입된 `fiber 구조체`로 변환되는데, 위의 과정들은 모두 동일하다.

<br>

## 3.3 리액트 훅 기초 익히기
- 기존 클래스 컴포넌트가 지닌 여러 문제점들을 훅을 이용해서 해결할 수 있다. 클래스 컴포넌트는 레거시이므로 신규 프로젝트에서는 함수형 컴포넌트와 훅을 사용하자.

<br>

### 3.3.1 상태값 추가하기 : useState
- `useState` 훅을 이용해 컴포넌트에 상태값을 추가할 수 있다. `useState`로 처리되는 상태는 아래와 같은 특징이 있다.
1. 비동기, 배치로 처리된다.
- 리액트는 상태 변경을 보통 `비동기`로 한꺼번에 모아서 `배치`로 처리한다. 랜더링 최적화를 위함이다.
- 이걸 모르고 사용하면 아래와 같은 문제가 발생할 수 있다.
```js
export default function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
  }
  ...
}
```
- `handleClick`실행시 count가 2 증가하길 원했지만 실제론 1 증가한다. `setCount`함수가 비동기로 처리되기 때문이다. 이를 해결하기 위해 `setter`에 함수를 사용할 수 있다.

<br>

2. 상태값 변경 함수에 함수 사용
- 상태값 `setter`에 함수를 사용하면 인자로 `이전 상태값`을 받을 수 있다. 아래와 같이 사용하면 count는 2씩 증가한다.
```js
export default function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  }
  ...
}
```
- 물론 두번 실행했지만 배치로 처리되므로 `Count` 함수 호출을 찍어보면 한번씩만 호출된다.

<br>

3. `useState`훅 하나로 여러 상태 관리하기
- `useState`는 기존 클래스 컴포넌트의 `setState`와 달리 상태값을 merge 해주지 않는다. 따라서 여러 상태값을 한번에 관리하려면 setter에 함수를 사용하고 `...prev`를 사용해야만 한다.
- 보통 여러 상태를 한번에 관리할때는 `useEffect` 훅을 사용한다.

<br>

4. 배치로 처리되지 않는 상태값 변경
- 리액트에서 상태값의 변경을 배치로 처리하는것은 리액트 내부에서 처리하는 이벤트에 의한 상태 변경만이다. 아래와 같은 경우 배치로 처리되지 않으므로 두번씩 랜더링하게된다.

```js
export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleClick = () => {
      setCount(prev => prev + 1);
      setCount(prev => prev + 1);
    }
    document.querySelector('.countBtn').addEventListener('click', handleClick);
    return () => document.querySelector('.countBtn').removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <h2>Count : { count }</h2>
      <button className={"countBtn"} >카운트 증가하기</button>
    </>
  )
}
```
- 이런 경우에도 상태 변경을 한번에 배치처리 하고 싶으면 `ReactDOM.unstable_batchUpdates()` 함수를 사용하면 되나, 이름처럼 불안정하므로 가급적 지양해야한다.
```js
  const handleClick = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setCount(prev => prev + 1);
      setCount(prev => prev + 1);
    })
  };
```
- `concurrent`로 작동할 미래의 리액트는(어쩌면 현재일지도?) 외부에서 관리되는 이벤트 처리 함수도 배치로 처리할 수 있을것이라고 한다.

<br>

### 3.3.2 컴포넌트에서 부수 효과 처리하기: useEffect
- ***함수 실행 시 함수 외부의 상태를 변경하는 연산***을 `부수 효과`라고 한다. 보통 `useEffect`훅에서 부수효과를 처리한다.
- `useEffect`훅은 `부수효과 함수`와 `의존성 배열` 두개를 인자로 받는다. 부수효과 함수는 함수를 반환할 수 있는데, 이 함수는 보통 부수효과 함수의 리소스 정리(`unsubscribe` 등)를 수행한다.
- `useEffect`에 전달되는 의존성 배열에 따라 부수효과 함수의 실행이 달라진다.
    - ***의존성 배열 인자가 없으면*** 컴포넌트 랜더링 후 부수효과 함수가 실행되고 랜더링 갱신 직전 반환 함수가 실행된다.
    - ***빈 의존성 배열을 인자로 쓰면*** 컴포넌트 랜더링 후 최초 1회 부수효과 함수가 실행되고, 컴포넌트가 제거될 때 반환 함수를 실행한다.
    - ***props가 들어있는 의존성 배열***을 인자로 쓰면 빈의존성 배열과 같이 실행되고, 해당 `props`가 변경될 때 랜더링이 갱신되며 부수효과 함수가 실행된다.
- 의존성 배열을 사용할땐 조심해야한다. `useEffect`사용간에 발생하는 버그는 보통 의존성 배열을 잘못 입력해 발생한다.
- 아래는 `useEffect` 훅을 이용해 화면 넓이를 나타내는 함수다.
```js
export default function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  },[]);  

  return (
    <div>화면 넓이 : { width }</div>
  )
}
```
- 의존성 배열이 `[]`이므로, 컴포넌트 랜더링후 이벤트 핸들러 등록을 한번만 하고, 컴포넌트가 사라질 때 `removeEventListener`가 실행된다.

<br>

### 3.3.3 훅 직접 만들기
- 커스텀 훅을 만들 때 이름은 `use`로 시작해야한다. 가독성과 여러 도구의 도움을 받을 수 있게 된다.
- 커스텀 훅을 만들면 내부 구현을 숨기고 사용 편의성을 높여준다. 위의 화면 넓이를 나타내는 훅을 커스텀 훅으로 분리한다.
```js
// useWindowWidth.js
import { useEffect, useState } from "react";

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return width;
}

// App.js
import { useWindowWidth } from './Hooks/useWindowWidth'
export default function App() {
  const width = useWindowWidth();
  return <h2>넓이 : {width}</h2>;
}
```
- 훅을 사용하는 App.js는 매우 심플해졌다. 

> 훅 사용시 햇갈렸던 점은 `useState`훅이 컴포넌트 개개의 스코프를 제공하는 것 처럼 커스텀 훅도 사용하는 컴포넌트마다 독립적인 스코프를 가진다는 것이다. 전역적인 상태 관리 등으로는 쓸 수 없다. 전역적으로 같은 상태값을 사용하려면 `Context`를 사용해야 할 듯.

<br>

### 3.3.4 훅 사용 시 지켜야 할 규칙
- [규칙](https://ko.reactjs.org/docs/hooks-rules.html#gatsby-focus-wrapper)은 아래와 같다. 
  1. 컴포넌트에서 훅을 호출하는 순서는 같아야한다.
  2. 훅은 함수형 컴포넌트 혹은 커스텀 훅 안에서 최상단에서 호출되어야 한다.
- 훅을 최상단에서 호출해야 하는것은 순서가 같아야 한다는 점과 이어진다. 함수 실행시 조건문 등에 의해 훅이 실행되지 않으면 순서가 꼬인다.
- 순서가 중요한 이유는 ***리액트 내부적으로 훅을 호출 순서에 맞춰 배열로 관리하기 때문***이다. 컴포넌트 함수 호출시 매번 똑같은 순서로 똑같은 개수의 훅이 실행되어야만 한다.

<br>

### 3.4 콘텍스트 API로 데이터 전달하기
- 부모 -> 자식 상태값 전달은 보통 `props`로 하는데, 중간 컴포넌트가 많아지면 `Context`를 사용한다.

### 3.4.1 Context API 이해하기
- `ContextAPI`를 사용해서 중간다리를 생략하고 상태값을 전달해본다.

```js
import React, { useState } from "react";

const UserConetxt = React.createContext('')
export default function App() {
  const [username, setUsername] = useState("");
  console.log('APP 랜더링')
  return (
    <div>
      <UserConetxt.Provider value={username}>
        <Profile />
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </UserConetxt.Provider>
    </div>
  )
}

const Profile = () => {
  console.log('Profile 랜더링');
  return (
    <div>
      <Greeting />
    </div>
  )
}

const Greeting = () => {
  console.log('Greeting 랜더링')
  return (
    <UserConetxt.Consumer>
      {username => <p>{`${username}님 안녕하세요?`}</p>}
    </UserConetxt.Consumer>
  )
}
```
- `React.createContext`로 `Context`를 생성하고, `Provider`로 값을 전달하면 `Provider`의 자식에서 `Consumer`로 값을 가져다 쓸 수 있게된다.

- ❗️❗️중요한것은 ***`Provider` 컴포넌트의 속성값(`value`)이 변경되면 중간에 위치한 컴포넌트의 렌더링 여부와 상관없이 하위의 모든 `Consumer` 컴포넌트는 다시 렌더링 된다는 것***이다.
    - 위의 코드에서 input에 이름을 입력하면 App의 `username` 상태값이 변하면서 `App`이 다시 랜더링되고, 자식 컴포넌트가 모두 다시 랜더링된다.
    - 이 때, `Profile`을 `React.memo`를 사용해서 다시 랜더링 되지 않게 막으면, `Profile`의 자식인 `Greeting`도 랜더링 다시 랜더링하지 않는다.
    - `UserConetxt.Consumer`는 `Profile`, `Greeting`과 상관 없이 `Provider`의 속성이 바뀔때 다시 랜더링되므로 문제없이 최적화가 된다.
```js
// Profile은 props가 없기때문에 한번 랜더링되면 끝까지 간다.
const Profile = React.memo(() => {
  console.log('Profile 랜더링');
  return (
    <div>
      <Greeting />
    </div>
  )
})
```

<br>

### 3.4.2 Context API 활용하기
1. 여러 콘텍스트 중첩해서 사용하기
```js
// Provider
function Provider() {
  return (
    <SomeContext.Provider value={someValue} >
      <AnotherContext.Provider value={anotherValue}>
        ...
      </AnotherContext.Provider>
    </SomeContext.Provider>
  )
}

// Consumer
function Consumer() {
  return (
    <SomeContext.Consumer>
      {someValue => (
        <AnotherContext.Consumer>
          {anotherValue => <div>anotherValue</div>}
        </AnotherContext.Consumer>
      )}
    </SomeContext.Consumer>

  )
}
```

- 위와 같이 데이터 종류별로 `Context`를 나눠서 중첩 사용하면 보통 성능상의 이점이 생긴다. `Provider`의 데이터 변경시 해당 컨택스트의 `Consumer`만 다시 랜더링 되기 때문이다.

2. 하위 컴포넌트에서 콘텍스트 데이터를 수정하기
- `useState`훅의 `state`를 `Provider`로 전달할 때, `setState` 함수도 전달하면 `Consumer`에서 호출해서 `Context`의 상태값을 변경할 수 있다.
- 책에서는 `state`와 `setState`를 다른 `Context`로 나눠서 사용한다. 둘을 합쳐 객체로 만들어서 전달하면 바로 뒤에 다루는 ***불필요한 랜더링***이 발생할 수 있기 때문인듯.

### 3.4.3 ContextAPI 사용시 주의할 점
1. 불필요한 랜더링 발생
- `Provider`로 객체 전달시 불필요한 랜더링이 발생할 수 있다. 객체 전달시 Provider 컴포넌트가 랜더링 될 때 객체가 새로 생성되므로 객체를 구성하는 state값이 같아도 `Consumer`가 다시 랜더링 되게 된다.

```js
// 불필요한 랜더링 발생시키는 예
const UserContext = React.createContext({ username: '' });
function App() {
  const [username, setUsername] = useState('');
  return (
    // {username} 객체는 App이 랜더링 될때마다 새로운 참조값으로 다시생성 -> 하위의 Consumer 리랜더링
    <UserContext.Provider value={{username}}>
      ... 
    </UserContext.Provider>
  )
};


// 불필요한 랜더링 발생 안하는 예
function App() {
  // state값을 객체로 만들면 새로 랜더링해도 참조가 그대로다
  const [user, setUser] = useState({username: ''}); 
  return (
    <UserContext.Provider value={user}>
      ... 
    </UserContext.Provider>
  )
}
```
- 불필요한 랜더링은 컴포넌트의 `props`에 객체를 사용할 때도 똑같이 적용된다. `state`를 모아서 만든 객체를 `props`로 전달하면 매 랜더링시에 `props`가 바뀌어 `memo`를 쓴 자식도 다시 랜더링한다.

<br>

2. `Provider` 컴포넌트를 찾지 못하는 경우
- `Consumer`는 반드시 `Provider`의 자식요소여야한다. 자식요소가 아니면 `Provider`로 공급되는 값이 아닌 `Context`의 `기본값`만을 참조하게된다.

<br>