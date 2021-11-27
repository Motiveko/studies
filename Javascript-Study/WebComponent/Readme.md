# Web Components

### 23 
- `customElements.define()`로 web component 성한다.
-  메서드 첫번째인자로 태그명을 넣는데, 반드시 `-`가 포함되어야한다. built in html tag를 오버라이딩 하지 못하게 하기 위함.
- 2번째 인자로는 로직이 포함되는 `CustomElementConstructor` 타입의 객체를 받는데, `HTMLElement`를 상속하는 class를 생성해서 넣어주면 된다.

```js
class Tooltip extends HTMLElement {
  constructor() {
    super();
    console.log('It is work');
  }
}
customElements.define('uc-tooltip', Tooltip)
```
- js파일을 HTML 파일에 import하고 `<uc-tooltip></uc-tooltip>`를 넣으면 constructor가 호출되며 console.log 함수가 호출된다.


### 25 Web Comopnent Lifecycle
1. Element created -> `constructor()` (Basic Initialization, 각종 프로퍼티 초기화)
2. Element Attacched to DOM -> `connectedCallback()` (DOM Initialzations, 이때부터 DOM 접근 가능)
  - `appendChild` 같은 DOM 조작 메서드는 connectedCallback에서 이뤄져야한다.
3. Element detached from DOM -> `disconnectedCallback()` (Cleanup Work)
4. Observed Attribute upadated -> `attributeChangedCallback` (Upadate Data + DOM)


## 28. Using Attributes on Custom Element
- `connectedCallback()` 에서  `getAttribue()`로 사용 가능하다.

## 30. Styling elemnt
- WebComponent의 Css scope를 독립시키기위해 `Shadow DOM`과 `Template` 를 사용할 수 있다.

## 31. Shdow DOM
- 전역 style이 Web Component에 영향을 미치지 못하기 위해서는 WebComponent가 자신만의 DOM 트리를 가지고 스타일을 적용해야한다. ShadowDOM은 RealDOM에서 분리된 독립적인 DOM으로, Shadow DOM 트리의 루트를 shadowRoot라고한다. 
```js
// shadow DOM 설정
this.attachShadow({mode: 'open'});

// shadow DOM에 child node 추가/삭제
this.shadowRoot.appendChild(tooltipIcon);
this.shadowRoot.removeChild(this._tooltipContainer);
```

## 32. Adding a HTML Templates
Template Element `<template>`은 자동으로 랜더링되지 않는다. 대신 자바스크립트 코드에서 template의 content요소에 접근해 이를 복사해서 렌더링에 사용할 수 있다. 한마디로 이 태그 안에는 사용할 HTML의 템플릿을 정의해놓고 이를 다른곳에서 가져다 사용하면 되는 것이다.

## 33. Using slot
`<slot></slot>`은 WebComponent의 HTML 태그 사이에 있는 내용이 바인딩된다. slot 사이에 기본값을 넣으면, WebComponent 태그 사이에 값이 없을경우 기본값을 사용한다. 


## 36. extending built in elements
- `HTMLElement`의 자식 Element를 상속해서 Web Component를 만들면 `customElements.define` 메서드의 세번째 인자에 추가 옵션을 지정해줘야한다.
```js
class ConfirmLink extends HTMLAnchorElement {
  ...
}

customElements.define('uc-confirm-link', ConfirmLink, { extends: 'a' });
```
이런 종류의 웹 컴포넌트는 HTML에서 아래와 같은 형태로 사용한다.

```HTML
<a is="uc-confirm-link" href="https://google.com">Google</a>
```
상속한 a 태그에 is 어트리뷰트에 정의한 웹컴포넌트의 이름을 쓰면 된다.
이렇게 하면 빌트인 엘리먼트의 스타일과 기능을 모두 가진채 Shadow DOM을 넣거나 추가 기능을 넣거나 할 수 있다.