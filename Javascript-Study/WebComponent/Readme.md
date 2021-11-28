# Web Components

### 23.
- `customElements.define()`로 web component를 생성한다.
-  메서드 첫번째인자로 ***태그명***을 넣는데, 반드시 `-`가 포함되어야한다. built in html tag를 오버라이딩 하지 못하게 하기 위함이다.
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

<br>

### 25 Web Comopnent Lifecycle
1. Element created -> `constructor()` (Basic Initialization, 각종 프로퍼티 초기화)
2. Element Attacched to DOM -> `connectedCallback()` (DOM Initialzations, 이때부터 DOM 접근 가능)
  - `appendChild` 같은 DOM 조작 메서드는 connectedCallback에서 이뤄져야한다.
3. Element detached from DOM -> `disconnectedCallback()` (Cleanup Work)
4. Observed Attribute upadated -> `attributeChangedCallback` (Upadate Data + DOM)

<br>

## 28. Using Attributes on Custom Element
- `connectedCallback()` 에서  `getAttribue(ATTR_NAME)`로 사용 가능하다. `constructor`에서는 아직 DOM에 attatch 되지 않았기 때문에 `undefined`만 반환된다.

<br>

## 30. Styling elemnt
- WebComponent의 CSS scope를 독립시키기위해 `Shadow DOM`과 `Template` 를 사용할 수 있다. 

<br>

## 31. Shdow DOM
- 전역 style이 Web Component에 영향을 미치지 못하기 위해서는 WebComponent가 자신만의 DOM 트리를 가지고 스타일을 적용해야한다. `ShadowDOM`은 ***RealDOM에서 분리된 독립적인 DOM***으로, Shadow DOM 트리의 루트를 shadowRoot라고한다. 

- ShadowDOM은 기본적으로 개발자 도구에서 보이지 않고, 속성에서 show ShadowDOM을 켜줘야 보인다.

```js
// shadow DOM 설정
this.attachShadow({mode: 'open'});

// shadow DOM에 child node 추가/삭제
this.shadowRoot.appendChild(tooltipIcon);
this.shadowRoot.removeChild(this._tooltipContainer);
```

## 32. Adding a HTML Templates
- Template Element `<template>`은 자동으로 랜더링되지 않는다. 대신 자바스크립트 코드에서 `template`의 `content`요소에 접근해 이를 복사해서 렌더링에 사용할 수 있다. 한마디로 이 태그 안에는 사용할 HTML의 템플릿을 정의해놓고 이를 다른곳에서 가져다 사용하면 되는 것이다.
- `cloneNode()`는 객체를 deep clone 한다.

```js
const template = document.querySelector('#tooltip-template');
this.shadowRoot.appendChild(template.content.cloneNode(true));
```

## 33. Using slot
`<slot></slot>`은 **WebComponent의 HTML 태그 사이에 있는 내용이 바인딩**된다. slot 사이에 기본값을 넣으면, WebComponent 태그 사이에 값이 없을경우 기본값을 사용한다. 
```HTML
<web-component>
  <p>this is slot</p>
</web-component>
```
```js
// <p>this is slot</p> 이 들어간다.
this.shadowRoot.innerHTML = `
  <slot>
    <p>Default Slot</p>
  </slot>
`
```

## 36. extending built in elements
- `HTMLElement`의 자식 Element를 상속해서 Web Component를 만들면 `customElements.define` 메서드의 세번째 인자에 아래와 같이 추가 옵션을 지정해줘야한다.
```js
class ConfirmLink extends HTMLAnchorElement {
  ...
}

customElements.define('uc-confirm-link', ConfirmLink, { extends: 'a' });
```
- 이런 종류의 웹 컴포넌트는 HTML에서 아래와 같은 형태로 사용한다.

```HTML
<a is="uc-confirm-link" href="https://google.com">Google</a>
```
- 상속한 a 태그에 is 어트리뷰트에 정의한 웹컴포넌트의 이름을 쓰면 된다.
이렇게 하면 빌트인 엘리먼트의 스타일과 기능을 모두 가진채 Shadow DOM을 넣거나 추가 기능을 넣거나 할 수 있다.

<br>
---
<br >

## 41. Understanding Shadow DOM Projection
- Shadow DOM에 slot을 랜더링 할 때, slot이 Shadow DOM에 직접적으로 추가되는것은 아니다.(개발자 도구에서 분석해보면 DOM에서 WebComponent에 projection한 내용은 Shadow DOM내 slot태그 안에 존재하지 않는다, #text reveal만 있다.)
- 이 말은 projection한 컨텐츠는 light DOM(일반 DOM)에서 스타일링 등이 가능하다는 것

<br>

## 42. Styling slot content Outside the the Shadow DOM
- 그냥 일반적인 element styling 하듯이 하면 된다.

<br>

## 42. Styling slot content Inside the the Shadow DOM
- Shadow DOM 의 `<style>` 내 pseudo-selector `::slotted(selector)`를 이용해서 스타일링 할 수 있다.
- selector는 기본적으로 최상단 element만 선택할 수 있고 그의 자식 element는 선택 불가라고 한다.
- 우선권은 ligthDOM 에 있기때문에 ShadowDOM 에서 스타일링한것은 LigthDOM에 같은게 있으면 덮어쓴다.

## 43. Styling Host element
- Shadow DOM의 `<style>`내에서의 `:host`는 WebComponent를 의미한다. 이를 이용해서 Host Element의 Style을 지정할 수 있다.
- slot과 마찬가지로 LightDOM에서의 스타일이 우선권을 가진다.

## 46. Conditional Host Styling
- host 요소에 특정 class가 있을 때 스타일링을 다르게 한다고 생각해보자. 
  - `:host.className`은 안먹는다. 
  - `:host(slector)` 와 같은 형태로 한다. -> `:host(.className)`


## 47 Styling with Host Content in Mind
- host요소의 주변 환경에 따라 스타일링을 다르게 하고싶다면. 예를 들어 host element가 `p` 요소로 둘러 쌓였을 때 특정 스타일을 지정하고 싶다고 가정해보자.
- `:host-context(selector)`와 같은 형태로 저장할 수 있다. 매개변수 selector는 host 요소의 부모요소라고 보면 된다. 단, selector에 `body`같은걸 넣으면 모든 컴포넌트에 전부 적용될것이다.

## 48. Smart Dynamic Styling with CSS Variables
- (CSS Variable)[https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties] 로 primary color를 정의하고 Component 내부에서 이를 읽어 적용해보자.
```HTML
<!-- Ligth DOM -->
<style>
/* document의 root요소를 선택한다. html요소일것이다. */
:root {
  --color-primary: #a4fcda;
}
</style>

...
<uc-tooltip class="important"></uc-tooltip>

<!-- Shadow DOM -->
<style>
  :host(.important) {
    background-color: var(--color-primary, #ccc);
  }
</style>
```
- 
- 변수 선언은 `--some-variable` 형태로 선언하고, `var(변수명, 기본값)` 형태로 사용 가능하다.