# 실전 리액트 프로그래밍

![책표지](https://image.kyobobook.co.kr/images/book/xlarge/670/x9788966262670.jpg)

<br>

---

## 목차
- ### [1. 리액트 프로젝트 시작하기](#1-리액트-프로젝트-시작하기-1)
<!-- - ### [2. ES6+를 품은 자바스크립트, 매력적인 언어가 되다.](#2-ES6+를-품은-자바스크립트,-매력적인-언어가-되다.-1) -->
- ### [3. 중요하지만 헷갈리는 리액트 개념 이해하기](#3-중요하지만-헷갈리는-리액트-개념-이해하기-1)
- ### [4. 리액트 실전 활용법](#4-리액트-실전-활용법-1)
<!-- - ### [5. 레거시 프로젝트를 위한 클래스형 컴포넌트](#5-레거시-프로젝트를-위한-클래스형-컴포넌트-1) -->
- ### [6. 리덕스로 상태 관리하기](#6-리덕스로-상태-관리하기-1)

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

### 3.5 ref 속성값으로 자식 요소에 접근하기
- `ref` 속성값은 리액트에서 직접 처리한다. ref 속성과 함께 `useRef`훅을 사용해 만든 `ref 객체`로 자식요소(컴포넌트 / DOM 요소)에 접근 가능하다.
- `클래스 컴포넌트`는 인스턴스가 생성되므로 ref 속성을 사용할 수 있다.
- `함수형 컴포넌트`는 인스턴스가 생성되지 않아, ref를 직접 사용할수는 없다. 선택지는 두가지가 있다.
    1. ref가 아닌 다른 이름으로 ref 객체를 입력받아 함수형 컴포넌트 내부의 DOM 요소에 연걸한다.
    ```js
    function Form() {
      const inputRef = useRef();
      useEffect(()=> {
        inputRef.current.focus();
      }, [])
      return (
        <TextInput inputRef={inputRef}>
      )
    }

    function TextInput({ inputRef }) {
      return (
        <input type="text" ref={inputRef} />
      )
    }
    ```
    -  `ref` 속성을 바로사용하면 리액트에서 이를 처리하기 때문에 우리가 원하는데로 동작하지 않는다. 따라서 `inputRef`로 이름을 바꿔사용함

    2. `forwardRef` 함수로 `ref` 속성값을 직접 처리하기
    - `forwardRef` 함수를 사용해 함수형 컴포넌트를 만들면 `ref` 예약어를 속성값을 사용할 수 있다.
    ```js
    const TextInput = React.forwardRef((props, ref) => (
      <input type="text" ref={ref} />
    ));
    ```

- `ref` 속성값에 `함수`를 사용할 수 있다.
- `ref` 함수는 컴포넌트 생성시에는 인자로 요소에 대한 참조를, 컴포넌트 제거시에는 인자로 null을 준다.
- 주의할 점은 컴포넌트가 랜더링될 때마다 새로운 함수를 `ref`로 넣는다는 점이다.
```js
export default function App() {
  const [text, setText] = useState(INITIAL_TEXT)
  const [showText, setShowText] = useState(true);
  return (
    <div>
      {showText && (
        <input
          type='text'
          ref={ref => ref && setText(INITIAL_TEXT)}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
      <button onClick={() => setShowText(!showText)}>보이기/가리기</button>
    </div>
  )
}
```
- 위 코드에서 input에 값 입력시 text가 원하는대로 변하지 않는다. 값 변화에 따라 컴포넌트가 다시 랜더링되고, `ref` 속성에 새로운 함수가 할당되기 때문이다.
- `useCallback` 훅을 이용해 ref에 전달되는 함수를 `고정된 함수`로 만들면 해결할 수 있다.
```js

// ...
const setInitialText = useCallback(ref => 
  ref && setText(INITIAL_TEXT)
,[])
<input ref={setInitialText} />
```
- `ref` 속성값에 새로운 함수를 입력하지 않으므로 `input`요소가 생성/제거 될 때만 setInitialText 함수가 호출된다.
- [추가적으로 클래스 컴포넌트 사용시 메서드를 등록해서 이를 ref 콜백으로 사용해서 해결할 수 있다.](https://ko.reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs)


> 추가 ) [`ref`를 사용해야할 때](https://ko.reactjs.org/docs/refs-and-the-dom.html#when-to-use-refs)를 참고하자. 선언형으로 해결할 수 있는 문제는 선언형으로 해결하는것이 좋다.

<br>

### 3.6 리액트 내장 훅 살펴보기
### 3.6.1 Consumer 컴포넌트 없이 콘텍스트 사용하기 : [useContext](https://ko.reactjs.org/docs/hooks-reference.html#usecontext)
- 기존에 `Context`의 `Provider`에서 제공한 값은 `Consumer`컴포넌트를 사용해야 사용 가능했으나, `useContext` 훅을 사용하면 훨씬 간단하게 접근 가능하다.
```js
const UserContext = React.createContext();
const user = {name: 'motiveko', age: 32};
function Parent() {
  return (
    <UserContext.Provider value={user}>
      <Child />
    </UserContext.Provider>
  )
}
function Child() {
  const user = useContext(UserContext);
  return {user.name};
}
```

<br>

### 3.6.2 렌더링과 무관한 값 저장하기: [useRef](https://ko.reactjs.org/docs/hooks-reference.html#useref)
- `props`는 불변이고, `state`는 렌더링에 연관되는 값이다. 렌더링과 무관한 값이 있는데, 이를 저장할 때 `useRef`를 사용한다. 예를들면 `setTimeout`의 결과 Id값도 어딘가에 저장해서 `clearTimeout`을 호출해야한다.
- 아래 예제는 `state`값인 age의 이전값을 useRef에 저장하는 예제다.
```js
function Profile() {
  const [age, setAge] = useState(20);
  const prevAgeRef = useRef(20);
  useEffect(() => {
    prevAgeRef.current = age;
  }, [age]);

  const prevAge = prevAgeRef.current;
  const text = age === prevAge ? 'same' : age > prevAge ? 'older' : 'younger';
  return (
    <div>
      <p>{`age ${age} is ${text} than age ${prevAge}`}</p>
      <button
        onClick={() => {          
          const age = Math.floor((Math.random() * 50 + 1));
          setAge(age);
        }}
      >
        나이변경
      </button>
    </div>
  )
}
```
- `useEffect`훅이 호출되는 시점은 `age`가 변경되고, ***변경에 대한 랜더링이 모두 완료된 후***라는 것을 기억하자.
- 동작 순서는 아래와 같다. 사용자가 `버튼`을 클릭하면
  1. age 상태 변화, 비동기로 완료됨
  2. 변화 완료 후 렌더링. prevAgeRef에는 아직 이전값이 저장됨
  3. 렌더링 완료 후 `useEffect`훅이 호출되어 `prevAgeRef`에 현재 age저장


<br>

### 3.6.3 메모이제이션 훅: [useMemo](https://ko.reactjs.org/docs/hooks-reference.html#usememo), [useCallback](https://ko.reactjs.org/docs/hooks-reference.html#usecallback)
- `useMemo`와 `useCallback`은 둘 다 이전 값을 기억해(memoization) 성능을 최적화 한다. 하지만 약간의 차이가 존재한다.

1. `useMemo`
- 계산량이 많은 `함수의 반환값`을 재활용할 때 사용한다.
- 인자로 함수와, 의존성 배열을 받는다. [`lodash`의 `memoize`](https://lodash.com/docs/4.17.15#memoize) 와 비슷하다.
```js
function Component({ v1, v2 }) {
  const value = useMemo(() => expensiveFunction(v1, v2), [v1, v2]);
  return (
    <div>결과 : {value}</div>
  )
}
```
2. `useCallback`
- 랜더링 최적화를 위해 ***자식 컴포넌트의 속성값에 할당되는 함수에 적용***한다.
- 부모 -> 자식에 속성으로 함수 할당시, 부모가 재생성 되면 함수가 새로 생성되므로, 자식에 `React.memo`를 적용해도 자식은 다시 랜더링 된다. 이를 방지하기 위해 `useMemo`로 함수를 감싸면, 부모 컴포넌트가 재생성 될 때도 함수가 재실행 되지 않는다.

```js
// useCallback이 필요한 코드
function Profile() {
  const [name, setName] = useState('motiveko')
  const [age, setAge] = useState(20);
  return (
    <User 
      onSave={() => saveToServer(name, age)}
      name={name}
      age={age}
    />
  );
}

// useCallabck 적용
function Profile() {
  ....
  const onSave = useCallback(() => saveToServer(name, age), [name, age]);
  return (
    <User 
      onSave={onSave}
      ...
    />
  );
}
```

<br>

### 3.6.4 컴포넌트의 상태를 리덕스처럼 관리하기: useReducer
- `useReducer`훅을 이용하면 `dispatch` 함수를 이용해 `action`을 발생시키고, `reducer`로 상태변경을 처리하는, `reducer`와 같은 방식으로 상태를 관리할 수 있다.
- 기본 사용법은 아래와 같다.
```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```
- `useReducer`와 Context API를 합쳐서 사용해, `dispatch` 함수를 전달하면 모든 자식 컴포넌트에서 쉽게 상태를 변경시킬 수 있게된다.

```js
const AppContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={dispatch}>
      <Child />
      <Child2 />
    </AppContext.Provider>
  )
}
```
- ***`useReducer`훅의 `dispath`함수는 값이 변하지 않기 때문에 `Consumer`컴포넌트의 불필요한 랜더링이 발생하지 않는다.👍👍***

<br>

### 3.6.5 부모 컴포넌트에서 접근 가능한 함수 구현하기: useImperativeHandle
- 부모 컴포넌트에서 `함수형` 자식 컴포넌트를 `ref` 속성으로 참조할 때, 자식 컴포넌트의 함수를 호출해야 할 경우가 발생하는데, 이 때 자식 컴포넌트에서 함수 공개를 위해 `useImperativeHandle`훅을 사용할 수 있다.

> ❗️ 안티 패턴이므로 가급적 지양해야한다.

```js

function Parent() {
  const childRef = useRef();
  const onClick = () => {
    childRef.current.addAge(5);
    console.log(`이름의 길이 : ${childRef.current.getNameLength()}`);
  }
  return (
    <>
      <Child ref={childRef} />
      <button onClick={onClick}>버튼</button>
    </>
  )
}

const Child = forwardRef((props, ref) => {
  const [name, setName] = useState('motiveko');
  const [age, setAge] = useState(10);
  useImperativeHandle(ref, () => ({
    addAge: (value) => setAge(age + value),
    getNameLength: () => name.length
  }))
  return <div>{`이름 : ${name}, 나이 : ${age}`}</div>
})
```
- 함수형 컴포넌트인 `Child`를 `ref`속성으로 참조하기 위해 `forwardRef` 사용하였다.
- `useImperativeHandle`의 첫번째 인자로 부모에서 참조할 `ref`객체를 넣어주고, 두번째 인자로 공개할 함수(메서드)를 반환하는 함수를 넣었다.
- 부모에서는 `childRef.current.METHOD_NAME`으로 자식에서 공개한 함수를 실행할 수 있다.

<br>

### 3.6.6 기타 리액트 내장 훅: useLayoutEffect, useDebugValue
1. `useLayoutEffect`
- `useEffect`와 비슷하게 랜더링 후 부수효과를 실행하는 훅
- 차이점은 `useLayoutEffect`는 동기로 작동하기 때문에 컴포넌트가 DOM에 추가된 직후 작동한다는 것이다.(`useEffect`는 비동기)
- 가급적 `useEffect`를 사용하고, 랜더링 직후 DOM을 읽어야 할 경우에만 `useLayoutEffect`를 사용한다.

<br>

2. `useDebugValue`

- `useDebugValue`훅은 커스텀 훅 내부의 상태를 관찰하기 위한 개발용 훅이다. 커스텀 훅 내부에서 `useDebugValue`을 사용하면 개발자 도구에서 훅의 상태값을 볼 수 있게된다.

<br><br>

## 4. 리액트 실전 활용법
> `useEffect` 훅을 잘못쓰면 오래된 데이터를 참조하거나 부수효ㅗ가가 자주 실행되는 문제가 발생한다. 이 장에서는 `useEffect` 훅을 제대로 사용하는 법과, 가독성/생산성을 높이는 코드 작성법, 렌더링 속도를 올리는 성능 최적화 방법을 다룬다.

<br>

### 4.1 가독성과 생산성을 고려한 컴포넌트 코드 작성법
> 컴포넌트의 작성자 입장에서는 유지/보수하기 쉬운 코드를, 컴포넌트의 사용자 입장에서는 컴포넌트의 인터페이스를 쉽게 파악할 수 있는 코드를 작성하는게 좋다.

### 4.1.1 추천하는 컴포넌트 코드 작성법
- 컴포넌트를 아래와 같은 순서로 작성한다.
```js
// 1.
MyComponent.propTypes = {
  // ...
}

// 2.
export default function MyComponent({ prop1, prop2 }) {
  // ...
}

// 3. 
const COLUMNS = [
  {id: 1, name: 'phone', width: 200, color: 'white'},
  //...
];
const URL_PRODUCT_LIST = '/api/products';
function getTotalPrice({ price, total }) {
  // ...
}
```
1. 파일의 최상단에 속성값의 타입을 정의한다. 컴포넌트 사용자가 파일을 열자마자 컴포넌트의 속성값 타입을 보며 컴포넌트의 구조를 이해할 수 있다.

2. 컴포넌트 함수의 매개변수는 `명명된 매개변수`로 정의하는게 좋다. 또한 익명 함수가 아닌 함수의 이름을 정의해야 리액트 개발자 도구에서 디버깅이 쉽다.

3. 컴포넌트 바깥의 변수/함수는 파일의 가장 밑에 정의한다. 가급적 `상수(const)`로 정의하고, 상수라면 가독성을 위해 대문자로 정의한다. ***컴포넌트 내부에 커다란 객체를 생성하는 함수가 있다면, 컴포넌트이 외부 상수 변수로 정의해, 렌더링 시 불필요한 객체 생성을 피해 성능을 올리자.***

<br>

- 컴포넌트 내부 코드를 ***훅별로 모으는게 아닌 연관된 코드끼리(기능별로) 모으자.***
```js
function Profile({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUserApi(userId).then(setUser);
  }, [userId])
  
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [])
  // ...
}
```
- 컴포넌트 코드가 복잡하다고 느껴지면 아래와 같이 각 기능을 커스텀 훅으로 분리하는것도 좋은 방법이다. 단, 단순한 컴포넌트를 커스텀 훅으로 분리하면 오히려 가독성에 좋지 않을 수 있다.
```js
function Profile({ userId }) {
  const user = useUser(userId);
  const width = useWidth();
  // ...
}

function useUser({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUserApi(userId).then(setUser);
  }, [userId])
  return user;
}

function useWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [])
  return width;
}
```

<br>

### 4.1.2 속성값 타입 정의하기: prop-types
> 🤔 타입스크립트를 사용하면 아마 `prop-types`를 사용하진 않을 것으로 생각된다.

- 타입스크립트같은 정적 타입 언어를 사용하지 않고 리액트 컴포넌트의 props의 타입을 지정할 수 있는데, `prop-types` 라이브러리를 이용한다.
- 원래 [`React.PropTypes`](https://ko.reactjs.org/docs/typechecking-with-proptypes.html) 였으나 현재는 [`prop-types`](https://www.npmjs.com/package/prop-types)라는 외부 패키지로 분리되었다.
- 4.1.1 에서 첫번째로 propTypes를 작성했는데, 작성 방법은 [공식 문서의 작성 방법](https://www.npmjs.com/package/prop-types#Usage)을 참고한다.
- 자바스크립트의 변수 타입, element, node, 클래스 타입, 값 union 타입, 객체 형태 등을 정의할 수 있는데, `함수 타입`의 경우 ***매개변수와 반환값에 대한 타입 정보는 정의할 수 없다.*** 주석으로 대체한다.
- Validationr 함수를 정의해 커스텀 타입 함수를 작성할 수도 있다.
- ***자바스크립트로 개발시 무조건 propType을 정의하도록 하자.***

<br>

### 4.1.3 가독성을 높이는 조건부 렌더링 방법
- 조건부 랜더링시 ***`3항 연산`자보단 `&&` 연산자를 사용하자.*** 가독성에 훨씬 좋다.
- `조건 ||` 보다 `!조건 &&`을 사용해 일관성을 높이자.
- `&&` 연산자 사용시, `0`, `빈 문자열`, `undefined`, `null` 을 주의하자. 모두 기본적으로 거짓으로 판단된다. 이 중 `0`의 경우 거짓으로 판단되면서 해당값이 출력될 수 있다. `!!0`으로 작성하면 0은 false로 판단되어 출력되지 않는다.
```js
// 문제가 될 수 있다.
function Component() {
  let flag = 0;
  return <div> { flag && '테스트'} </div>  // 결과 : 0
}

// 해결
function Component() {
  let flag = 0;
  return <div> { !!flag && '테스트'} </div>  // 결과 : 
}
```

- 조건에 따라 아무것도 랜더링 하지 않는 컴포넌트의 경우, 
  1. 부모 컴포넌트에서 자식 컴포넌트를 통째로 랜더링하지 않기
  2. 자식 컴포넌트에서 return 값에 null을 반환
- 두 가지 방법으로 작성될 수 있다. 후자의 경우 컴포넌트의 mount/unmount 반복으로 인해 성능상 불이익이 있을 수 있으나, 자식 컴포넌트의 로직이 단순화 된다는 장점이 있다. 
- 조건부랜더링은 다양한 방식이 있으므로 프로젝트에서 하나의 컨벤션을 정해서 사용하는것이 좋다.

<br>

### 4.1.4 관심사 분리를 위한 프레젠테이션, 컨테이너 컴포넌트 구분하기
> 🥕참고🥕 댄 아브라모프의 [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- 댄 아브라모프의 글은 프레젠테이션/컨테이너 컴포넌트를 나눈 기준이 까다로운데, 간단히 아래와 같이 나눌 수 있다.
  1. `프레젠테이션` : ***비즈니스로직, 상태값이 없다. 단, 마우스 오버와 같은 UI 효과를 위한 상태값은 제외한다.***
  2. `컨테이너` : 프레젠테이션과 반대로 ***비즈니스로직, 상태값이 있다.***

<br>

- ***프레젠테이션/컨테이너 컴포넌트를 구분하지 않고 마구 개발하면, 비즈니스 로직과 상태값이 여기저기 흩어지고, 상태값의 중복이 발생해 버그로 이어지는 경우도 많다.*** 아래의 경우, 부모의 상태를 자식이 props로 받아 별도의 상태로 관리하는 `안티 패턴(anti-pattern)`의 한 예다.

```js
function Child({ todos }) {
  const [doneList, setDoneList] = useState(todos.filter(item => item.done));
  function onChangeName(key, name) {
    setDoneList(
      doneList.map(item => (item.key === key ? {...item, name} : item))
    );
  }
  // ...
}
```
- 부모의 `todos`를 받아 `doneList`라는 새로운 상태값을 만들고, `onChangeName` 호출 시 특정 요소의 `name`을 변경하는 로직이 있다. ***`onChangeName`으로 `doneList`가 변경되어도, 상태는 불변이기 때문에 부모의 todos와는 더이상 정합성이 없어지게된다.*** 아래와 같이 리펙터링해 개선할 수 있다.

```js
function Child({ todos, onChangeName}) {
  const doneList = useMemo(() => todos.filter(item => item.done), [todos]);
  // ...
}
```
- 자식의 `doneList` 값은 `useMemo`를 이용해 생성했고, todos 상태를 변화시킬 비즈니스 로직 `onChangeName`은 부모 요소로부터 속성값으로 받아서 쓴다.

- 컴포넌트의 재사용성은 컴포넌트가 비즈니스 로직과 상태값이 없을수록 높아지므로 재사용성을 높이기 위해 ***항상 상태와 비즈니스 로직을 컨테이너 컴포넌트에 넘기는 것을 고민해야한다.***
- 일반적으로 프레젠테이션 / 컨테이너 컴포넌트는 ***폴더도 별도로 관리***한다.

<br>

### 4.2 useEffect 훅 실전 활용법
> 🥕참고🥕 [A Complete Guide to useEffect](https://overreacted.io/ko/a-complete-guide-to-useeffect/)

### 4.2.1 의존성 배열을 관리하는 방법

1. 부수효과 함수에서 API를 호출하는 경우

- 의존성 배열은 잘못 입력하면 쉽게 버그로 이어지므로 꼭 필요한 내용만 입력한다.
- `부수효과 함수`에서 참조해 사용하는 상태, 속성값을 의존성 배열에 추가해야한다.
- `eslint`의 `exhaustive-deps`규칙은 의존성 배열에서 잘못된 값(빼먹은 값, 없어도 되는 값)에 대해서 알려준다. [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) 패키지에 포함되어 있는데, `create-react-app`을 사용하면 직접 설치는 필요하지 않은듯.

- 아래는 의존성 배열을 잘못 관리하는 케이스다.
```js
function Component() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  useEffect(() => {
    const id = setInterval(() => console.log(value1, value2), 1000);
    return () => clearInterval(id);
  }, [value1])
  //...
}
```
- 부수효과 함수는 `value1`이 변경될 때에만 새로 실행되고, `value2` 상태값이 변경되어도, `value1`이 변하기 전까지는 변경 이전의 값을 계속 참조하게 된다. Lint의 `exhaustive-deps`규칙이 경고를 띄워줄테니 잡아서 해결하면 된다.

<br>

2. `useEffect` 훅에서 `async/await` 함수 사용하기
- `부수효과 함수`의 반환값은 (리소스 정리)`함수`여야 한다. 그러나 `async` 함수의 반환값은 무조건 `Promise`이기 때문에 그냥은 사용할 수 없다. ***`async` 함수를 `부수효과 함수` 내부에 정의하고 호출하는 방식으로는 사용 가능***하다.

```js
// 잘못된 예. 에러 발생한다.
useEffect(async () => {
  const data = await fetchAndUser(userId);
  setUser(data);
}, [userId]);

// 올바른 예
useEffect(() => {
  async function fetchAndSetUser() {
    const data = await fetchAndUser(userId);
    setUser(data);
  }
  fetchAndSetUser();
}, [userId]);
```

3. `fetchAndSetUser`함수 재사용하기
- 위의 `fetchAndSetUser` 함수를 컴포넌트 내 여러곳에서 재사용해야 한다면 어떻게 해야 할까?
```js
function Component({ userId }) {
  const [user, setUser] = useState();
  const fetchAndSetUser = useCallback(async () => {
    const data = await fetchAndUser(userId);
    setUser(data);
  }, [userId]);
  useEffect(fetchAndSetUser, [fetchAndSetUser]);
}
```
- `fetchAndSetUser` 함수를 `useCallback` 훅을 사용해 정의하고, 의존성 배열로 `userId`상태를 넣었다. `userId`가 바뀌어야 `fetchAndSetUser`도 새로 생성된다.
- `useEffect`의 부수효과 함수로 `fetchAndSetUser`를 넣고, 의존성 배열에도 `fetchAndSetUser`를 넣었다. 결과적으로 ***`userId` 속성값이 변경되어야 부수효과 함수가 다시 실행되어 `user` 상태를 변경할 것이다.***

<br>

### 4.2.2 의존성 배열을 없애는 방법


1. 부수효과 함수 내에서 분기 처리하기
> 🤔 분기 처리로 의존성 배열을 없애는게 맞는지 생각해봐야 할 것 같다. 분기처리보단 의존성 배열 쓰는게 성능상 훨씬 좋지 않은가?

- 위의 '`fetchAndSetUser`함수 재사용하기' 예제를 '부수효과 함수 내에서 분기 처리'해 의존성 배열을 제거할 수 있다.
```js
function Component({ userId }) {
  const [user, setUser] = useState();
  const fetchAndSetUser = async () => {
    const data = await fetchUser(userId);
    setUser(data);
  }

  useEffect(() => {
    if(!user || user.id !== userId) {
      fetchAndSetUser();
    }
  }, []);
}
```
- `부수효과 함수` 내에서 user에 대해 if문으로 분기처리하여, 매 컴포넌트 함수 호출시 재실행 되어도, 필요할 때에만 `fetchAndSetUser`를 호출하도록 만들었다.
- `fetchAndSetUser`에 대해 `useCallbck` 훅을 사용하지 않아도 된다.(사용하는게 더 좋지 않나?)

<br>

2. ***`useState`의 상탯값변경 함수에 함수 입력하기***
- `상태값의 setter 함수` 사용시 이전 상태값이 필요하다면 함수를 인자로 전달하자.
```js
// 이전 상태값(count)를 참조해야 하므로 의존성 배열을 꼭 써줘야한다. 안써주면 어디선가 count가 업데이트 됐을 때 부수효과 함수는 과거 값을 참조하고 있게 된다.
useEffect(() => {
  function onClick() {
    setCount(count + 1);
  }
  // ...
}, [count])

// setCount의 인자로 함수를 전달하면 이전 상태를 참조할 수 있다. 의존성 배열이 필요 없다.
useEffect(() => {
  function onClick() {
    setCount(prev => prev + 1);
  }
}, [])
```

<br>

3. `useReducer` 활용하기
- 부수 효과 함수가 여러개의 상탯값을 참조할 경우 `useReducer`사용을 고려해야한다. 아래 `Timer` 컴포넌트는 주어진 시간에서 1초씩 감소시키는 예제다
```js
function Timer({ initialTotalSeconds }) {
  const [hour, setHour] = useState(Math.floor(initialTotalSeconds / 3600));
  const [minute, setMinute] = useState(Math.floor((initialTotalSeconds % 3600) / 60));
  const [second, setSecond] = useState(initialTotalSeconds % 60);
  useEffect(() => {
    const id = setInterval(() => {
      // 1초마다 적절히 시/분/초 감소시키는 로직
    }, 1000);
    return () => clearInterval(id)
  }, [hour, minute, second]);
}
```
- 의존성 배열이 많아졌고, 매 초마다 `setInterval`,`clearInterval`을 호출하는 비효율적인 코드다. 이렇게 참조하는 상태가 여러개라면 `userReducer`를 사용해야한다.
```js
function Timer({ initialTotalSeconds }) {
  const [state, dispatch] = useReducer(reducer, {
    hour: Math.floor(initialTotalSeconds / 3600),
    minute: Math.floor((initialTotalSeconds % 3600) / 60),
    second: initialTotalSeconds % 60
  });
  useEffect(() => {
    const id = setInterval(dispatch, 1000);
    return () => clearInterval(id);
  }, [])
}

function reducer(state) {
  // 적절히 시/분/초 감소시키는 로직
}
```
- 세 가지 상태값은 모두 `useReducer`훅으로 관리된다. 부수효과 함수는 상태값에 대해 몰라도 되기때문에 의존성 배열이 제거되었다.
- `dispatch`의 값은 변하지 않기 때문에 의존성 배열에 없어도 된다.
- 물론 `dispatch` 함수의 `payload`에서 속성값을 참조한다면 이는 의존성 배열에 추가될 것이다)

<br>

4. `useRef` 활용하기
- 속성값으로 함수가 넘어오는 케이스를 가정해보자. 부모에서 `useCallback`을 사용하지 않았다면 자식으로 넘어오는 함수는 매번 새로운 함수가 될 것이다. 이 함수가 `useEffect`의 의존성 배열에 있다면 매 랜더링 시 `부수효과 함수`가 호출될 것이다.
- `useRef`훅의 특징은 ***저장된 값이 변경되어도 컴포넌트가 다시 랜더링 되지 않는다는 것이다.***
- 해당 함수가 ***랜더링과 무관한*** 함수라면, `useRef`에 저장해서 의존성 배열을 제거할 수 있다.


```js
// useRef 사용하지 않은 경우
function MyComopnent({ onClick }) {
  useEffect(() => { // 매 랜더링시 호출될 가능성이 농후하다.
    window.addEventListener('click', () => onClick());
    //...
  }, [onClick]);
}

// useRef에 onClikc을 저장하는 경우
function MyComponent({ onClick }) {
  const onClickRef = useRef();
  useEffect(() => {
    onClickRef.current = onClick;
  }, []);

  useEffect(() => {
    window.addEventListener('click', () => onClickRef.current());
  }, []);
}
```
- `onClick`함수는 랜더링과 무관해 `onClickRef`에 저장했다. ***`useRef`에 저장된 값이 변경돼도 컴포넌트는 다시 랜더링 되지 않는다.***
- 부수효과 함수에서 사용되는 `useRef` 값은 의존성 배열에 추가하지 않아도 된다.

<!-- TODO : useRef의 자세한 동작을 알아봐야 할 것 같다. 
  1. current가 가지는 의미 : 
  2.   ... 졸리다!
-->



<br>

### 4.3 렌더링 속도를 올리기 위한 성능 최적화 방법
- 리액트에서 CPU를 가장 많이 쓰는것은 렌더링이다. 최초 렌더링 이후, 데이터 변경시 렌더링을 수행하는데, 다음과 같은 단계를 거친다.
  1. 이전 렌더링 결과를 재사용할지 판단한다.
  2. 컴포넌트 함수를 호출한다.
  3. 가상 돔끼리 비교해서 변경된 부분만 실제 돔에 반영한다.

- 이중 첫번째 단계는 클래스 컴포넌트의 `shouldComponentUpadat`메서드나 함수형 컴포넌트에서 `React.memo`를 이용해 구현할 수 있다. 이를 통해 성능 최적화가 가능하다.
- 사실 대부분의 웹페이지는 성능 최적화를 하지 않아도 잘 돌아간다. 성능 최적화는 성능 이슈가 발생했을 때 고민하도록 하자.

<br>

### 4.3.1 **[React.memo](https://ko.reactjs.org/docs/react-api.html#reactmemo)로 렌더링 결과 재사용하기**
>  참고자료 - [https://ui.toast.com/weekly-pick/ko_20190731](https://ui.toast.com/weekly-pick/ko_20190731)

<br>

- 컴포넌트가 다시 렌더링 되어야 할 때, 이전 속성값과 현재 속성값을 비교해 컴포넌트 함수 호출 여부를 결정한다. `React.memo`로 감싼 컴포넌트 함수라면 값을 비교해 `boolean`을 반환할moviePropsAreEqual 것이고, 일반 컴포넌트라면 항상 `false`가 반환되어 다시 렌더링 된다.
- 이 말은 ***`React.memo`를 적용하지 않으면, 부모 컴포넌트가 다시 랜더링 될 때 무조건 자식도 다시 랜더링하게 된다는 것***이다.

```js
// React.memo의 시그니처
function memo<P extends object>(
    Component: FunctionComponent<P>,
    propsAreEqual?: (prevProps: Readonly<PropsWithChildren<P>>, nextProps: Readonly<PropsWithChildren<P>>) => boolean
): NamedExoticComponent<P>;
```
- `React.memo`는 두번째 인자인 `propsAreEqual` 함수를 전달하지 않으면 [`얕은 비교(shallow Eqaul)`](https://github.com/facebook/react/blob/v16.8.6/packages/shared/shallowEqual.js)를 수행한다.

  > `얕은 비교`란 객체에 직접 연결된(1 depth) 값에 대해 일치 연산(`===`)을 수행 하는것을 말한다. 

- 속성값을 `불변 객체`로 관리하면 값의 단순비교만 해도 변경 여부를 확인할 수 있다. 그러나 `가변 객체`로 관리하면 객체 내부를 모두 순회하며 값을 비교해야 한다. => ***`속성값`은 결국 `부모의 상태값`이므로, 상태값을 불변으로 관리해야 한다는 말이다!***
```js
// 속성값이 불변 객체일 경우 구현하며 되는 propsAreEqual 함수 예. 단순하다.
function propsAreEqual(prevProps, nextProps) {
  return prevProps.todos !== nextProps.todos;
}
```
> [(참고)](https://ko.javascript.info/object-copy) 객체 비교시 `==`, `===`은 사실 동일하게 작동한다. 둘 다 참조 주소를 비교한다.

<br>

### 4.3.2 속성값과 상탯값을 불변 변수로 관리하는 방법
1. 함수의 값이 변하지 않도록 관리하기
- 자식 컴포넌트 속성에 함수 할당시, 부모 컴포넌트가 랜더링 되도 불필요하게 다시 생성되지 않는 함수를 할당해야한다.
```js
// 잘못된 예. React.memo를 사용해도 소용없다.
function Parent() {
  const [state, setState] = userState();
  return (
    <Child func={(value) => setState(value)} />
  )
}

// 올바른 예. useState 훅의 setter 함수는 불변이다.
function Parent() {
  const [state, setState] = userState();
  return (
    <Child func={setState} />
  )
}
```
- 위와같이 단순한 `상태값 setter 함수`가 아닌 여러 연산이 합쳐지는 함수의 경우 `useCallback`훅으로 만든 함수를 사용하자.
```js
// 잘못된 예.
function Parent() {
  const [state, setState] = userState();
  function func(value) {
    if(value !== null)  setState(state);
  }
  return (
    <Child func={func} />
  )
}

// 올바른 예, func는 컴포넌트 생성시 최초 한번만 만들어진다.
function Parent() {
  const [state, setState] = userState();
  const func = useCallback(() => {
    if(value !== null)  setState(state)
  },[]);
  return (
    <Child func={func} />
  )
}
```

<br>

2. 객체의 값이 변하지 않도록 관리하기
- 자식의 `props`에 객체를 inline으로 할당하면 매 랜더링에 새로 생성된다. `컴포넌트 밖 상수`나 `상태값`으로 관리하자
```js
// 잘못된 예
function Parent() {
  return (
    <Child obj={{key: 'value'}}/>
  )
}

// 올바른 예
function Parent() {
  return(
    <Child obj={obj} />
  )
}
const obj = {key: 'value'};

```
- 객체 생성이 상태/속성값을 기반으로 연산이 필요하다면, `useMemo` 훅을 이용해 객체를 생성하자.
```js
// 잘못된 예, 매 랜더링에 newItems가 새로 생성됨
function Parent({ items }) {
  const newItems = items.filter(item => item.new);
  return (
    <Child newItems={newItems}/>
  )
}

// 올바른 예, items속성값이 변할때만 newItems가 새로 생성된다.
function Parent({ items }) {
  const newItems = useMemo(() => items.filter(item => item.new), [items]);
  return (
    <Child newItems={newItems}/>
  )
}
```
<br>

### 4.3.3 가상 돔에서의 성능 최적화
> 가상 돔이 만들어져 실제 돔에 반영되는 과정을 이해하고 성능을 최적화 할 수 있는 부분을 알아본다.

1. 요소의 `타입` 또는 `속성`을 변경하는 경우
- 요소의 `타입`이 변경되면(예 : div -> span) ***실제 돔에서 자식요소는 삭제되고 다시 추가된다.***
```js
function Parent() {
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setFlag(prev => !prev), 1000);
    return () => clearInterval(id);
  }, []);

  if(flag) {
    return (
      <div> 
        <Child />
      </div>
    )
  } else {
    return (
      <span> 
        <Child />
      </span>
    )
  }
}
function Child() {
  // 자식 컴포넌트 상태는 1초마다 0으로 초기화된다.
  const [count, setCount] = useState(0);

  // 1초마다 Child컴포넌트가 DOM에서 제거/추가 되면서 부수효과 함수가 실행된다.
  useEffect(() => {
    const id = setInterval(() => setCount(prev => prev+1), 50);
    return () => clearInterval(id);
  }, []);

  return (
    <h2>{count}</h2>
  )
}
```
- ## 이 때 <u>***자식 컴포넌트가 삭제된 후 추가되므로 상태값은 초기화 된다.***</u>

- 그러나 요소의 `속성`이 변경되는 경우 해당 속성값만 실제 돔에 반영한다. ***실제 돔에서 자식 요소는 그대로 있는다.***
  > ❗️ 실제 돔에서 그대로 있는다는거지 컴포넌트 함수가 실행되지 않는게 아니다! 컴포넌트 함수 실행은 가상돔을 만드는 과정이다!

<br>

2. 요소를 추가/삭제하는 경우
- 리액트에서 요소의 추가/삭제시 ***기본적으로 실제DOM과 가상DOM 사이의 변경 여부를 판단하는 기준은 요소의 `순서`다.*** 요소의 맨 끝에 요소를 추가/삭제할 경우, 앞에 있는 요소가 변경되지 않았으면 리액트는 이를 인지한다. 그러나 요소의 ***중간에 추가/삭제를 수행할 경우 해당 요소의 뒤의 요소는 순서가 바뀌어 모두 DOM에서 삭제/추가를 수행***하게 된다.
- 이 때 각 요소에 `key` 프로퍼티에 고유한 값이 할당되어 있으면, 이를 기반으로 가상DOM과 실제 DOM의 차이를 비교하게 된다. 즉 순서가 필요 없어지는 것이다.
```js
// 1. 맨 끝에 3요소를 추가했으므로 리액트가 1,2에 대해서는 변경되지 않았음을 인지하고 실제 DOM에서 건드리지 않는다.
function App() {
  // ..
  if(flag) {
    return (
      <div>
        <p>1</p>
        <p>2</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>      
    )
  }
}

// 2. 1과 2 사이에 1.5가 추가됨으로 인해 1.5뒤의 2는 변경되지 않았음에도 실제 DOM에서 제거됬다가 다시 추가된다.
function App() {
  // ..
  if(flag) {
    return (
      <div>
        <p>1</p>
        <p>2</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>1</p>
        <p>1.5</p>
        <p>2</p>
      </div>      
    )
  }
}

// key를 사용해 1,2가 이전 요소와 동일한 요소임을 인지하고 실제 DOM에서 건드리지 않는다.
function App() {
  // ..
  if(flag) {
    return (
      <div>
        <p key={1}>1</p>
        <p key={2}>2</p>
      </div>
    )
  } else {
    return (
      <div>
        <p key={1}>1</p>
        <p key={1.}>1.5</p>
        <p key={2}>2</p>
      </div>      
    )
  }
}
```
- 이러한 이유로, 배열을 순회해서 요소 생성시 각 요소에 고유한 `key`속성값이 없으면 에러가 난다.

<br>

<!-- ## 5. 레거시 프로젝트를 위한 클래스형 컴포넌트 -->

## 6. 리덕스로 상태 관리하기
### 6.1 리덕스 사용 시 따랴아할 세 가지 원칙

1. **전체 상태값을 하나의 객체에 저장한다.**
- 하나의 객체에 전채 상태를 저장하면 특정한 상태에 발생했던 버그를 다시 구현해서 확인하기 쉽고, 최근 상태값을 저장해 undo/redo 기능을 쉽게 구현할 수 있다.
- 그러나 전체 상태를 리덕스에서 하나의 객체로 관리하는건 쉽지 않다. 간단한 데이터들은 컴포넌트 상태로 관리하도록 하자.

<br>

2. **상태값은 불변 객체로 관리한다.**
- `상태값 수정`이라는 점만 생각하면, 상태값을 직접 수정하는게 더 빠르다. 하지만 이전 상태값과 이후 상태값을 비교해 상태 변경 여부를 파악할 때는 불변 객체가 유리하다(빠르다). 따라서 불변 상태가 렌더링 성능에 더 좋고, 메모이제이션 같은 기능을 사용할 수도 있다는 장점이 있다.

<br>

3. **상태값은 순수 함수에 의해서만 변경되어야 한다.**
- reducer는 `(state, action) => nextState` 형태의 순수 함수다. 순수 함수는 같은 인자로 호출하면 같은 결과값을 반환하기 때문에 <u>***테스트가 용이하고, 상태변경 실행 당시의 상태값/액션을 기억해 쉽게 replay 할 수 있다는 장점***</u>이 있다.

<br>

### 6.2 리덕스의 주요 개념 이해하기

![리덕스-구조](https://blog.kakaocdn.net/dn/dg9DeB/btqKgFZuNN9/lxjSoNEjL2Nu94Tckvz9ik/img.png)

<div style="text-align: center; color: #a9a9a9; font-size: 12px;">
리덕스의 상태값 변화 과정
</div>

<br>

### 6.2.1 액션
- 액션은 `type`속성을 가진 객체로 `dispatch` 메서드의 호출 인자로 사용된다.
- `type`외에 여러 속성값을 가지고(ngrx의 `props`), 이를 이용해 상태 변화 가능하다.
- `type` 속성은 고유한 값을 가져야 하므로 일반적으로 관련 상태를 접두사로 쓰고 해당 값은 `상수`로 정의한다. 각 **액션에 대해 생성자 함수를 정의해서 호출**하는 방식으로 사용한다.

```js
// 액션 정의의 예
export const ADD = 'todo/ADD';
export const REMOVE = 'todo/REMOVE';
export const REMOVE_ALL = 'todo/REMOVE_ALL';

export function addTodo({ title, priority }) {
  return { type: ADD, title, priority };
}
export function removeTodo({ id }) {
  return { type: REMOVE, id };
}
export function removeAllTodo() {
  return { type: REMOVE_ALL };
}
```

<br>

### 6.2.2 미들웨어
- 미들웨어는 ***리듀서가 액션을 처리하기 전에 실행되는 `함수`*** 다. 상태값 변경시 로그를 출력하거나, 리듀서에서 발생한 예외를 서버에 보내거나 하는 등의 동작을 만들 수 있겠다. 따로 설정 안하면 액션은 바로 리듀서로 향한다.
- 미들웨어 구조는 아래와 같다.

```js
// 연속 화살표 함수
const middleware = store => next => action => next(action);

// 쉽게 중첩함수로 풀어보면..
const middleware = function(store) {
  return function(next) {
    return function(action) {
      return next(action);
    }
  }
}
```
- 중첩 화살표 함수에서 뒤의 `action => next(action)`는 `dispatch`와 같다는것에 유념하자. 
- 아래와 같이 미들웨어를 정의하고 결과를 살펴보자.
```js
import { createStore, applyMiddleware } from 'redux';
const middleware1 = store => next => action => {
  console.log('middleware1 start');
  next(action);
  console.log('middleware1 end');
}

const middleware2 = store => next => action => {
  console.log('middleware2 start');
  next(action);
  console.log('middleware2 end');
}

const reducer = (state, action) => {
  console.log('reducer');
  return state;
}

const store = createStore(reducer, applyMiddleware(middleware1, middleware2));
store.dispatch({ type: 'someAction' });

/**
  === 출력 결과 ===
  middleware1 start
  middleware2 start
  reducer
  middleware2 end
  middleware1 end
*/
```
- `next(action)`은 다음 미들웨어 혹은 store의 `dispatch`함수를 실행하게 된다.
- `applyMiddleware`함수의 구조는 아래와 같다

```js
const applyMiddleware = (...middlewares) => createStore => (...args) => {
  const store = createStore(...args);
  const funcsWithStore = middlewares.map(middleware => middleware(store));
  const chainedFunc = funcsWithStore.reduce((a, b) => next => a(b(next)));
  return {
    ...store,
    dispatch: chainedFunc(sotre.dispatch);
  }
}
```
- `functionWithStore`는 미들웨어 함수의 첫 번째 함수를 호출한 결과들이다.
- `chainedFunc`는 `functionWithStore`를 체이닝 한 결과다. 미들웨어가 a~d 네개라면 결과는 `next => a(b(c(d(next))))`가 될 것이다.
- 마지막 반환되는 객채의 `dispatch`함수는 `chainedFunc`의 next에 store의 `dispatch`함수를 전달한 것으로 `a(b(c(d(store.dispatch))))`가 된다. 즉 ***store에서 action을 dispatch하면 a->b->c->d->store.dispatch->d->c->b->a 순으로 처리하게 되는것***이다. 앞서 설명했듯 `action => next(action)`은 `dispatch`와 같다고 했는데, 결국 `d(next)`는 `d(store.dispatch)`가 되는것이다.

<br>

- 추가적으로 store의 `dispatch` 함수는 아래와 같이 생겼다.
```js
function dispatch(action) {
  currentState = currentReducer(currentState, action);
  for(let i = 0; i < listeners.length; i++) {
    listeners[i]();
  }
  return action;
}
```
- `reducer`에 `state`와 `action`을 전달해 상태값을 변경하고 모든 이벤트 처리 함수를 호출한 후 `action`을 반환한다.

<br>

> [apply middleware](https://redux.js.org/api/applymiddleware) 에 따르면 applyMiddleware [`Store enhancer`](https://redux.js.org/understanding/thinking-in-redux/glossary#store-enhancer)의 하나라고 한다. 공식 메뉴얼을 살펴보자.

<br>

### 미들웨어 활용 예
1. 로그 출력 미들웨어
 - 아래는 액션 발생간에 상태값 변화를 로그로 남기는 미들웨어다. 상태변경은 모든 미들웨어의 next 호출 후에 이뤄지기 때문에 가능하다.
```js
const printLog = store => next => action => {
  console.log(`prev state = ${store.getState()}`)  
  const result = next(action);
  console.log(`next state = ${store.getState()}`)
  return result;
}
```

<br>

2. 에러 정보 전송 미들웨어
- 아래 미들웨어는 리듀서와 하위 미들웨어에서 예외 발생시 내용을 서버로 전송할 수 있는 미들웨어다.
```js
const reportCrash = store => next => action => {
  try {
    return next(action);
  } catch(err) {
    // 캐치된 에러를 서버로 저송
  }
}
```
- 생각해보면 알겠지만 상위 미들웨어의 에러는 캐치하지 못한다. 최상위 미들웨어로 적용하면 좋겠다.

<br>

3. 실행을 연기할 수 있는 미들웨어
- 사용자가 원하는 경우 액션 처리를 일정시간 연기할 수 있는 미들웨어다. 참 머리좋은사람 많다.
```js
const delayAction = store => next => action => {
  const delay = action.meta?.delay;
  if(!delay) {
    return next(action); // delay 없으면 바로 next 호출
  }

  const timeoutId = setTimeout(() => next(action), delay);
  return () => clearTimeout(timeoutId); // 딜레이를 취소할 수 있는 함수 반환
}
const cancel = sotre.dispatch({ type: 'action', meta: { delay: 1000 }});
cancel(); // 1초 안지나면 취소함
```

<br>

4. 로컬 스토리지에 값을 저장하는 미들웨어
- 발생한 액션 타입이 'SET_NAME'이면 액션 이름을 저장한다.
```js
const saveLoaclStorage = store => next => action => {
  if(action.type === 'SET_NAME') {
    localStorage.setItem('name', action.name);
  }
  return next(action);
}
```

<br>

### 6.2.3 리듀서
- 리듀서는 액션 발생시 새로운 상태값을 만드는 `함수`다. 아래와 같이 생겼다.
```js
(currentState, action) => nextState;
```
- todolist를 관리하는 간단한 리듀서다.
```js
function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    // ...
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };

    default:
      return state;
  }
}
const INITIAL_STATE = { todos: [] };
```
- 상태는 불변객체로 관리해야하므로 기존 상태를 복사해서 수정한 후 반환해야한다. 이 때  `...` 연산자로 객체를 복사할 수 있는데, 상태값이 거대해지면 이런 방식으로는 한계가 있다.[`immer`](https://www.npmjs.com/package/immer) 패키지의 `produce` 를 이용하면 객체를 쉽게 복사해 수정해 불변으로 관리할 수 있다.

- `immer`의 `proudce`를 이용한 객체 복사는 아래와 같은 형태로 한다.
```js
import produce from 'immer';
const person = { name: 'motiveko', age: 23};
const newPerson = produce(person, draft => {
  draft.age = 32;
})
```
- `draft`는 첫 번째 인자로 받은 `person`의 복사본과 같다고 보면 되는데, 이걸 고치면 `produce` 함수는 고친 부분을 반영한 새로운 객체를 반환한다. `draft`를 수정해도 원본 `person`은 영향이 없다.
- ***`produce`를 이용해 리팩토링한 리듀서는 아래와 같다.***
```js
function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch(action.type) {
      // ...
      case REMOVE:
        // 값을 반환하지 않고 draft를 수정하기만 한다!
        draft.todos = draft.todos.filter(todo => todo.id !== action.id );
        break;
      default: 
        break;
    }
  })
}
```
- 액션이 발생할 때 리듀서가 호출되면 내부의 `produce` 함수를 호출해 새로운 상태를 생성하게된다.

<br>

### 리듀서 작성 시 주의할 점 : 데이터 참조
- 상태값은 불변이기 때문에, ***현재 상태의 참조는 언제든 변할 수 있다.*** 즉 현재 상태의 참조를 어딘가에 할당하는 식으로 참조하면, 상태가 변경되었을 때 할당된 값은 알지 못하게 된다. ***상태 참조는 반드시 `id`를 이용해서 하자.***
```js
// 잘못된 예
function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch(action.type) {
      case SET_SELECT_PEOPLE: 
        //  selectedPeople이 특정 people의 참조를 가지고 있다. people이 변해도 selectedPeople은 예전 값을 참조하게 될 것이다.
        draft.selectedPeople = draft.peopleList.find(people => people.id === action.id);
        break;
      //...
    }
  })
}

// 올바른 예
function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch(action.type) {
      case SET_SELECT_PEOPLE: 
        // 참조하고 잇는 id는 변하지 않을것이다. 값이 필요하면 id를 이용해 찾으면 된다.
        draft.selectedPeople = action.id
        break;
      //...
    }
  })
}
```

<br>

### 리듀서 작성시 주의할 점 : 순수 함수
- 리듀서는 `순수 함수`로 작성해야 한다. 순수 함수가 아니라는건 `부수 효과`를 발생시키는 함수다.
- 대표적인 부수 효과는 `외부 API 호출`이다. 외부 API가 순수 함수일지라도 부수 효과이므로, **부수 효과(API 호출)은 반드시 `미들웨어`에서 하도록 하도록 한다.**

<br>

### `createReducer` 함수로 리듀서 작성하기
- `createReducer`함수를 이용하면 switch문 없이 간결하게 리듀서를 작성할 수 있다. 참고로 createReducer는 리덕스에서 제공하는 함수는 아니라고 한다.
```js
// immer의 produce를 사용해서 정의한 createReducer함수
function createReducer(initialState, handlerMap) {
  return function(state = initialState, action) {
    return produce(state, draft => {
      const handler = handlerMap[action.type];
      if(handler) {
        handler(draft, action);
      }
    })
  }
}
// createReducer함수를 이용해 생성한 reducer
const reducer = createReducer(INITIAL_STATE, {
  [ADD]: (state, action) => state.todos.push(action.todo),
  [REMOVE]: (state, action) => (state.todos = state.todos.filter(todo => todo.id !== action.id))
  // ..
})
```
- 따로 라이브러리에서 가져오는 함수는 아니고 그냥 구현하면 되는 듯 하다. switch문을 쓰지 않고 henalderMap을 사용한다는 점이 다르고, 리듀서 생성을 펙토리 매서드로 분리했다는 차이가 있다고 보면 될 듯 하다.

<br>

### 6.2.4 스토어
- `스토어`는 리덕스의 상태값을 가지는 객체다. 액션을 발생시키는 `dispatch` 메서드도 가지고 있다.
- 스토어는 액션 발생시 '미들웨어 함수 실행 -> 리듀서 함수로 상태 변경 -> 사전에 등록된 모든 이벤트 리스너 함수 호출' 의 순서로 동작한다.
- 리덕스 첫번째 원칙 `애플리케이션 상태값을 하나의 스토어에 저장`에 따라 스토어는 하나만 만든다. 단, ***데이터를 종류에 따라 구분하기 위해 리듀서를 여러개 만들고 `combineReducer`를 이용해 합치기도 한다.***
- 스토어에 리스너 등록(구독)은 `subscribe` 메서드를 이용해서 한다.
```js
// 리듀서 생성

const store = createStore(reducer);
let prevState;
// 스토어 리스너 등록
store.subscribe(() => {
  const state = store.getState();
  if(state === prevState) {
    console.log('상태값 같음');
  } else {
    console.log('상태값 변경됨');
  }
  prevState = state;
})
```
- 상태값은 불변이기 때문에, 단순 비교로 상태값 변경 여부를 검사할 수 있다.

<br>

### 6.3 데이터 종류별로 상탯값 나누기
- 책에서는 먼저 리듀서와 스토어를 만들고, 유틸 함수로 공통부분을 묶는 형식으로 리팩토링 했지만 그건 내 머릿속에 넣고 최종 코드만 정리한다.
- 페이스북을 예로 타임라인과 친구목록을 상태값으로 관리하는 스토어를 작성한다.
```js
// common/createReducer.js
import produce from 'immer';

export default function createReducer(initialState, handlerMap) {
  return function(state = initialState, action) {
    return produce(state, draft => {
      const handler = handlerMap[action.type];
      if(handler){
         handler(draft, action);
      }
    })
  }
}
```
- 앞에서 다뤘던, immer를 이용해서 상태값을 쉽게 불변으로 관리하는 리듀서를 생성하는 함수다.
```js
import createReducer from "./createReducer";

// 리듀서, 액션 생성간의 공통 로직 분리
export default function createItemsLogic(name) {
  
  const ADD = `${name}/ADD`;
  const REMOVE =`${name}/REMOVE`;
  const EDIT =`${name}/EDIT`;

  const add = item => ({ type: ADD, item });
  const remove = item => ({ type: REMOVE, item });
  const edit = item => ({ type: EDIT, item });


  const reducer = createReducer({ [name]: [] }, {
    [ADD]: (state, action) => state[name].push(action.item),
    [REMOVE]: (state, action) => {
      const index = state[name].findIndex(item => item.id === action.item.id);
      if(index >= 0) state[name].splice(index, 1);
    },
    [EDIT]: (state, action) => {
      const index = state[name].findIndex(item => item.id === action.item.id);
      if(index >= 0) {
        state[name][index] = action.item;
      }
    }
  })

  return { add, remove, edit, reducer };
}
```
- `배열 형태의 상태`와 관련된 `액션`과 `리듀서` 생성을 한방에 해결하는 함수다. 이를 이용해 친구 목록 상태를 관리하는 리듀서를 아래와 같이 쉽게 작성한다.
```js
// friend/state.js
import createItemsLogic from "../common/createItemsLogic";

const { add, remove, edit, reducer} = createItemsLogic('friends');
export const addFriend = add;
export const removeFriend = remove;
export const editFriend = edit;

export default reducer;
```
- 타임라인도 이와 비슷하다. 그런데 타임라인은 무한스크롤 구현을 위해 페이징 값도 상태로 관리해야한다. 아래와 같이 리듀서를 구현할 수 있다.
```js
// timeline/state.js
import createItemsLogic from "../common/createItemsLogic";
import createReducer from "../common/createReducer";
import mergeReducers from '../common/mergeReducers'
const { add, remove, edit, reducer: timelinesReducer } = createItemsLogic('timelines');

const INCREASE_NEXT_PAGE = 'timeline/INCREASE_NEXT_PAGE';

export const addTimeline = add;
export const removeTimeline = remove;
export const editTimeline = edit;
export const increaseNextPage = () => ({type: INCREASE_NEXT_PAGE});

const INITIAL_STATE = { nextPage: 0 };
const reducer = createReducer(INITIAL_STATE, {
  [INCREASE_NEXT_PAGE]: (state, action) => (state.nextPage += 1)
});

export default mergeReducers([timelinesReducer, reducer]);
```
- `createItemsLogic`로 만든 타임라인 상태 리듀서가 있고, `nextPage` 상태를 관리하는 리듀서가 있다. 이 둘을 `mergeReducers`라는 함수를 이용해서 합쳤다. 리듀서를 어떻게 합친걸까?
```js
// common/mergeReducers.js
export default function mergeReducers(reducers) {
  return function (state, action) {
    if(!state) {
      // 인자로 상태값이 없다 => 각 리듀서에서 초기값 모두 합쳐서 반환
      return reducers.reduce((acc, r) => ({...acc, ...r(state, action)}), {});
    } else {
      // 인자로 상태값 있다 => 전체 리듀서 돌려서 상태값 변환시켜본다.(같은 액션에 대한 핸들러 있을경우 연달아 호출될것이다.)
      let nextState = state;
      for(const r of reducers) {
        nextState = r(nextState, action);
      }
      return nextState;
    }
  }
}
```
- 리듀서는 결국 `(state, action) => state` 형태이므로 `mergeReducers`의 반환값도 같은 형태다. 리듀서는 `initialState`와 `handlerMap`의 참조를 지니는 클로저 함수인데, 참조를 꺼내서 합칠 수 있다면 베스트지만 그건 불가능하므로, ***리듀서들을 참조하는 리듀서 함수(클로저)를 반환***하게 한다. 이 함수는 액션 발생시 자신이 참조하는 리듀서들을 순회하면서 호출하여 새로운 상태를 생성한다.
- state가 null/undefined 일 때는 초기값을 반환해야 하므로, `reduce`연산자를 이용해 모든 리듀서들이 반환하는 초기값을 머지해서 반환한다.
- staet가 있으면 모든 리듀서들을 순회하며 상태를 변화시킨다. 혹시 같은 액션에 대한 핸들러가 여럿 존재하면 다 호출하게 될 것이다.

<br>

- 최종적으로 timeline 리듀서와 friends 리듀서를 리덕스의 `combineReducers`로 합치고, `createStore`로 스토어를 생성한다.

```js
// index.js
import { createStore, combineReducers } from 'redux'
import timelineReducer from './timeline/state';
import friendReducer from './friend/state';

const reducer = combineReducers({
  timeline: timelineReducer,
  friend: friendReducer,
});

const store = createStore(reducer);
```

- store의 `subscribe`함수로 리스너를 등록하거나 `dispatch`함수로 액션을 발생시킬 수 있다!

<br>

> 🍓 `덕스패턴` 
<br>
리듀서 공식 문서는 액션타입, 액션 생성자 함수, 리듀서 함수를 파일을 따로 나눠서 생성한다. 이러면 상태 하나 고치는데도 파일 죄다열어서 고쳐야 해서 매우 불편해진다. 리덕스 코드가 작을경우 덕스패턴으로 하나의 파일에 작성하고 커지면 코드를 별도로 분리해서 작성한다.
<br><br>
덕스 패턴은 아래와 같은 패턴을 따라 리듀서를 작성한다.
>- 연관된 액션 타입, 액션 생성자 함수, 리듀서 함수를 `하나의 파일`로 작성한다.
>- 리듀서 함수는 `export default`키워드로 내보낸다.
> - 액션 생성자 함수는 `export` 키워드로 내보낸다.
> - 액션 타입은 접두사와 액션 이름을 조합해서 만든다.
<br>

> `createStore(reducer)` 호출 시 자체적으로 reducer에 `{type: @@redux/INIT...}` 형태의 기본 액션을 넣는다. 리듀서의 구조를 생각해 봤을때, ***핸들러가 존재하지 않는 액션***을 넣어서 `initial state`를 꺼내서 store가 들고 있기 위해서 이런 행위가 이뤄지는 것 같다. 따라서 액션에 대한 핸들러가 없을경우 핸들러 호출하지 않도록 처리해줘야한다.(switch 문의 default 처리와 같다)

> 🍓 자바스크립트 함수는 `값에 의한 호출`이다. 매개변수로 전달한 변수는 값이 변경되지 않는다.(`함수에서 매개변수를 재할당해도 원본 변수는 변하지 않는다`)

<br>

### 6.4 리액트 상탯값을 리덕스로 관리하기
- 리액트에서 리덕스를 쓸 땐 보통 `react-redux` 패키지를 쓰지만, 없이도 리덕스를 사용할 수 있다. `react-redux`를 사용하지 않은 예와 이를 `react-redux`를 사용하는 예로 바꿔보자.

<br>

### 6.4.1 react-redux 패키지 없이 직접 구현하기
- 6.3에서 작성한 내용을 컴포넌트에서 어떻게 사용하는지를 알려준다. timeline 컴포넌트만 다룬다. friends 컴포넌트의 동작도 똑같다.
```js
// timeline/components/TimelineList.js
import React from 'react';

function TimelineList({ timelines }) {
  return (
    <ul>
      {timelines.map(timeline => (
        <li key={timeline.id}>{timeline.desc}</li>
      ))}
    </ul>
  )
}
export default TimelineList;
```
- `TimelineList`는 `프레젠테이션` 컴포넌트다. 부모로부터 timelines를 받아 화면에 뿌려준다. 다음은 `컨테이너` 컴포넌트다.
```js
// timeline/container/TimelineMain.js
import React, { useEffect, useReducer } from 'react';
import { getNextTimeline } from '../../common/mockData';
import store
 from '../../common/store';
import TimelineList from '../components/TimelineList';
import { addTimeline } from '../state';
function TimelineMain() {
  const [, forceUpdate] = useReducer(v => v+1, 0);
  
  useEffect(() => {
    let prevState = store.getState().timeline;
    const unsubscribe = store.subscribe(() => {
      const state = store.getState().timeline;
      if(prevState !== state) {
        forceUpdate()
        prevState = state;
      }
    });
    return () => unsubscribe();
  }, []);

  function onAdd() {
    const timeline = getNextTimeline();
    store.dispatch(addTimeline(timeline));
  }

  console.log('TimelineMain render');
  const timelines = store.getState().timeline.timelines;

  return (
    <div>
      <button onClick={onAdd}>타임라인 추가</button>
      <TimelineList timelines={timelines} />
    </div>
  )

}
export default TimelineMain;
```
- 컨테이너 컴포넌트지만 상태값은 없다. 상태는 리덕스 스토어에 저장되어 있기 때문. 따라서 상태 변화에 따라서 리랜더링이 자동으로 안되는데, 이를 위해서 `useReducer`의 `forceUpdate`를 정의하였다. `useReducer`의 상태를 변경하는 `forceUpdate`가 호출되면 컴포넌트가 다시 랜더링 될 것이다.
- 이를 위해 `useEffect` 훅에서 스토어에 `리스너`를 등록했고, 여기서는 타임라인 상태 변화만 감지하고 싶기 때문에 prevState로 타임라인 상태값만 참고하게 만들었다. 
- 나머지는 중요하지 않으므로 다루지 않는다.

<br>

### 6.4.2 react-redux 패키지 사용하기
- `react-redux` 패키지를 사용하면 상태값 변화시 `forceUpdate` 같은 함수를 정의해서 강제로 랜더링하게 만들 필요가 없다. 자체적으로 제공하는 훅이 이런 부분을 처리해 주기 때문.
```
npm i react-redux
```
- react-redux는 `Provider` 컴포넌트를 이용해 store를 관리한다. 최상위에 Provider를 정의하고 store를 주입하면, 내부적으로 `store.subscribe`로 스토어를 구독하고, 구독함수가 호출 될 때 마다 `Context API`를 이용해 하위 컴포넌트에 리덕스의 상태값을 전달한다.

```js
// index.js
import { Provider } from 'react-redux';
import store from './common/store';
ReactDOM.render(
  <Provider store={store}>
    <div>
      <FriendMain />
      <TimelineMain />
    </div>
  </Provider>,
  document.getElementById('root')
)
```

- 하위 컴포넌트에서 상태를 가져오는데는 `useSelector`훅을 사용하고 액션 디스패치에는 `useDispatch`훅을 사용한다.
```js
// friend/container/FriendMain.js
import { useSelector, useDispatch } from 'react-redux';
  const friends = useSelector(state => state.friend.friends);
  const dispatch = useDispatch();

  function onAdd() {
    const newFriend = getNextFriend();
    dispatch(addFriend(newFriend));
  }

  return (
    //...
  )
}
```
- `useSelector`훅은 아래와 같이 생겼다. 
```js
const result: any = useSelector(selector: Function, equalityFn?: Function)
```
- 첫번째 인자 `selector` 함수는 상태를 가공해 새로원하는 상태값을 방출한다. 두번째 `equalityFn`는 이전에 방출된 상태값을 기억해 현재 상태값과 비교해 랜더링 여부를 결정한다. 따로 정의하지 않으면 단순비교(`===`)를 수행한다.
- 위의 `FriendMain`컴포넌트의 경우처럼 단순히 상태를 조회해 그대로 가져오는 경우 문제가 되지 않는다. 그런데 상태를 가공해 ***새로운 객체를 반환하는 경우*** 어떤 경우든 새로운 객체가 생성돼 참조가 변하므로 매번 랜더링 되는 문제가 생긴다. 이를 해결하기 위한 방법으로 `shallowEqual` 함수가 있다.
```js
// timeline/container/TimelineMain.js

function TimelineMain() {
  const [timelines, nextPage] = useSelector(state => [state.timeline.timelines, state.timeline.nextPage], shallowEqual);
  // ...
}
```
> 🍓 사실 위의 경우에는 state.timeline을 반환하고 객체 디스트럭처링 할당 문법을 쓰면 `shallowEqual`이 필요 없다. 뭔가 실질적인 가공이 필요할 때 이게 필요하다.

- `shallowEqual`은 객체의 첫 번째 뎁스의 모든 속성값을 단순비교한다. 예를들어
```js
const object = {
  a: {
    x: 3,
    y: 2,
    z: 1
  },
  b: 1,
  c: [{ id: 1 }]
}
```
- 위와 같은 상태값을 가져온다고 했을 때 `obj.a`,  `obj.b`, `obj.c`를 단순비교한다. `obj.a.x` 같은건 비교하지 않는다는 것.
- shallowEqual 사용을 `커스텀 훅`을 정의해 사용할 수도 있다.
```js
// 커스텀 훅
function useMySelector(selector) {
  return useSelector(selector, shallowEqual);
}

// 커스텀 훅 사용
function MyComponent() {
  const [val1, val2] = useMySelector(state => [state.val1, state.val2]);
}
```
- `useMySelector`같은 형태의 훅 사용시, 단순히 객체를 가져오는 경우 불필요하게 객체 속성값 전체를 비교하게 돼 손해를 볼 수 있다. 이 때 `selector` 함수의 반환핪을 배열로 한번 감싸주면 객체를 통으로 비교하게 된다.
```js
function MyComponent() {
  // obj 객체 하나만 가져오는데, obj의 모든 1뎁스 속성을 비교하는 낭비를 []로 감싸면 막을 수 있다.
  const [obj] = useMySelector(state => [obj])
}
```

<br>

### 6.5 reselect 패키지로 선택자 함수 만들기
- 상태값을 컴포넌트에서 사용하기 위해서는 다양한 방식으로 가공하게 된다. 이 때 `reselect`패키지를 사용할 수 있는데, 먼저 사용하지 않은 케이스를 살펴본다.
### 6.5.1 reselect 패키지 없이 구현하기
- 친구 목록에 `보여줄 친구 수`와 `친구 연령 제한`으로 필터링을 한다고 해보자. 필요한 부분만 살펴본다. 나머지는 책/소스코드 참고.
```js
// friend/container/FriendMain.js

function FriendMain() {
  const {friends, ageLimit, showLimit} = useSelector(state => {
    const {friends, ageLimit, showLimit} = state.friend
    const filterdFriends = friends.filter(friend => friend.age <= ageLimit);
    return {friends: filterdFriends.splice(0, showLimit), ageLimit, showLimit};
  }, shallowEqual);
  
  //...
}
```
- friends를 ageLimit과 showLimit 값을 이용해 필터링 한 결과를 셀렉트했다. `shallowEqual`을 사용했으므로 세가지 값이 변하지 않으면 컴포넌트는 다시 랜더링 되진 않는다. 문제는 ***액션 발생시 매번  필터링된 friends를 생성하는 연산이 불필요하게 수행된다는 것***이다. `reselect`를 적용해보자.

<br>

### 6.5.2 reselect 패키지 사용하기
- **`reselect` 패키지는 `Ngrx`의 `selector`와 같다.** 셀렉터에 `메모아이제이션 기능`이 들어 있어, 인자가 같으면 연산을 수행하지 않고 기억해뒀던 이전값을 방출해주는 것.
```
npm i reselect
```
- `state`폴더를 만들고 selector.js, state.js를 넣는다. selector가 많아지므로 파일을 분리한다.
```js
// friend/state/selector.js
import { createSelector } from 'reselect';

export const getFriends = state => state.friend.friends;
export const getAgeLimit = state => state.friend.ageLimit;
export const getShowLimit = state => state.friend.showLimit;

// getFriends, getAgeLimit 값이 이전과 같다면 연산을 수행하지 않고 이전값을 방출한다.
export const getFriendsWithAgeLimit = createSelector([getFriends, getAgeLimit],(friends, ageLimit) => friends.filter(friend => friend.age <= ageLimit));

// 마찬가지로 메모아이제이션 적용됨
export const getFriendsWithAgeShowLimit = createSelector([getFriendsWithAgeLimit, getShowLimit],(friends, showLimit) => friends.slice(0, showLimit));
```
- 메모아이제이션의 `인자가 같으면 같은 값을 방출한다`라는 기능은 순수 함수와 같은 말이다. 셀렉터는 반드시 순수함수여야한다.
- 셀렉터 사용은 아래와 같다
```js
// friend/container/FriendMain.js

function FriendMain() { 
  const [friends, ageLimit, showLimit] = useSelector(state => [getFriendsWithAgeShowLimit(state), getAgeLimit(state), getShowLimit(state)], shallowEqual)
  //...
}
```
- `shallowEqaul`까지 착실하게 걸었기대문에 불필요한 랜더링은 없다. useSelector훅 하나로 처리하는게 아닌 각 값별로 훅을 사용해도 무방하다.

<br>

### 6.5.3~4 reselect에서 컴포넌트 속성값 이용하기
- 셀렉터에 컴포넌트 속성값을 사용할 수 있다. 컴포넌트가 `ageLimit`을 속성값으로 받아 `friends`를 필터링한다고 가정해보자.
```js
// index.js
ReactDOM.render(
  <Provider store={store}>
    <div>
      <FriendMain ageLimit={40} />
      <FriendMain ageLimit={25} />
    </div>
  </Provider>,
  document.getElementById('root')
)
```

```js
// state/selector.js 
export const getAgeLimit = (_, ageLimit) => ageLimit; // _는 state가 될 것이다.
```

```js
// friend/container/FriendMain.js
function FriendMain({ ageLimit }) {
  const friends = useSelector(state => getFriendsWithAgeLimit(state, ageLimit));
  //...
}
```
- `getFriendsWithAgeLimit`는 (아마) 인자로 받은걸 전개 연산자 등으로 각각의 셀렉터에게 전달하는 모양이다. 두개 전달하면 결국 각각의 하위 셀렉터 함수들은 `(state, ageLimit) => 셀렉트` 로 동작할 것이다.
- 이렇게 했을 때 ageLimit값이 컴포넌트에 따라 다른데, 셀렉터 함수는 하나라서 매 액션 발생시 인자가 달라 ***메모아이제이션이 작동하지 않을 것이다.*** `셀렉터 함수의 생성자 함수`를 정의하고, 각 컴포넌트에서 이를 호출하도록 고치면 된다.
```js
// state/selector.js 
const getFriendsWithAgeLimit = createSelector([getFriends, getAgeLimit],(friends, ageLimit) => friends.filter(friend => friend.age <= ageLimit));
// 셀렉터 함수의 생성자 함수
export const makeGetFriendsWithAgeLimit = () => getFriendsWithAgeLimit;
```

```js
// friend/container/FriendMain.js
function FriendMain({ ageLimit }) {
  
  const getFriendsWithAgeLimit = useMemo(makeGetFriendsWithAgeLimit, [])
  const friends = useSelector(state => getFriendsWithAgeLimit(state, ageLimit));
  //...
}
```
- 이제 각 컴포넌트는 다른 `getFriendsWithAgeLimit`를 가질 것이므로 메모아이제이션은 컴포넌트 단위로 작동할 것이다.

<br>
