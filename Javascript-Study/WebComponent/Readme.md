# Web Components

### 23. Creating our First Custom Element
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
4. Observed Attribute upadated -> `attributeChangedCallback()` (Upadate Data + DOM)

<br>

## 28. Using Attributes on Custom Element
- CustomElement의 attribute에 설정한 값은 `connectedCallback()` 이후부터  `this.getAttribue(ATTR_NAME)`로 사용 가능하다. `constructor`에서는 아직 DOM에 attatch 되지 않았기 때문에 `undefined`가 반환된다.

<br>

## 31. Shdow DOM
- WebComponent의 CSS scope를 독립시키기위해 `Shadow DOM`을 이용할 수 있다.

- 전역 style이 Web Component 내부에 영향을 미치지 못하게 하기 위해서는 WebComponent가 자신만의 DOM 트리를 가지고 스타일을 적용해야한다. `ShadowDOM`은 ***RealDOM에서 분리된 독립적인 DOM***으로, Shadow DOM 트리의 루트를 shadowRoot라고한다. 

- ShadowDOM은 기본적으로 개발자 도구에서 보이지 않고, 속성에서 show ShadowDOM을 켜줘야 보인다.

```js
class Tooltip extends HTMLElement {
  constructor() {
    // shadow DOM 설정
    this.attachShadow({mode: 'open'});
    
    // shadow DOM에 child node 추가/삭제
    this.shadowRoot.appendChild(tooltipIcon);
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}
```

<br>

## 32. Adding a HTML Templates
- Template Element `<template>`은 자동으로 랜더링되지 않는다. 대신 자바스크립트 코드에서 `template`의 `content`요소에 접근해 이를 복사해서 렌더링에 사용할 수 있다. 한마디로 이 태그 안에는 사용할 HTML의 템플릿을 정의해놓고 이를 다른곳에서 가져다 사용하면 되는 것이다.
- `cloneNode()`는 객체를 deep clone 한다.

```js
const template = document.querySelector('#tooltip-template');
this.shadowRoot.appendChild(template.content.cloneNode(true));
```

<br>

## 33. Using slot
- ShadowDOM 내 `<slot></slot>`은 **WebComponent의 HTML 태그 사이에 프로젝션한 내용이 바인딩**된다. slot 사이에 기본값을 넣으면, WebComponent 태그 사이에 값이 없을경우 기본값을 사용한다. 
- 참고로 `this.innerHTML`로 웹컴포넌트의 child element 형태로 추가하면 바인딩 되지 않는다. ShadowDOM 내부에서만 위와 같이 작동하는듯하다.
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

<br>

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

<br><br>

## 41. Understanding Shadow DOM Projection
- Shadow DOM에 `slot`을 랜더링 할 때, slot이 Shadow DOM에 직접적으로 추가되는것은 아니다.(개발자 도구에서 분석해보면 DOM에서 WebComponent에 projection한 내용은 Shadow DOM내 slot태그 안에 존재하지 않는다, #text reveal만 있다.)
- 이 말은 projection한 컨텐츠는 light DOM(일반 DOM)에서 스타일링 등이 가능하다는 것

<br>

## 42. Styling slot content Inside the the Shadow DOM
- 기본적으로는 LightDOM에서 그냥 일반적인 element styling 하듯이 하면 된다.
- ShadowDOM 내부에서 스타일링 하고 싶으면 Shadow DOM 의 `<style>` 내 pseudo-selector `::slotted(selector)`를 이용해서 스타일링 할 수 있다.
- selector는 기본적으로 최상단 element만 선택할 수 있고 그의 자식 element는 선택 불가라고 한다.
- 우선권은 LigthDOM 에 있기때문에 ShadowDOM 에서 스타일링한것은 LigthDOM에 같은게 있으면 덮어쓴다.

<br>

## 43. Styling Host element
- Shadow DOM의 `<style>`내에서의 `:host`는 WebComponent를 의미한다. 이를 이용해서 Host Element의 Style을 지정할 수 있다.
- slot과 마찬가지로 LightDOM에서의 스타일이 우선권을 가진다.
> ❗️ `ShadowDOM` 내에서 `:host`로 스타일링 할 수 있다는 말은 `constructor`에서 스타일링 가능하다는 말이다. DOM에 붙기 전에 스타일 지정이 가능하다.

<br>

## 46. Conditional Host Styling
- `:host(slector)` 형태의 selector로 host 요소에 특정 `attribute`, `class`등이 있을 때 select 할 수 있다. 예를 들어, 호스트에 important 요소가 있을 경우를 셀렉트 하려면 `:host(.important)`가 된다.

<br>

## 47 Styling with Host Content in Mind
- 호스트 요소의 parent 요소의 상태에 따라 css에서 호스트 요소를 셀렉트 하고 싶다면 `:host-context(selector)` 문법을 사용하자.
- 예를 들어, 부모 요소중에 `<p>`가 있을 때 호스트 요소를 셀렉트 하고 싶으면 `:host-context(p)`를 사용할 수 있다.
- `:host-context(body)`와 같은 형태를 사용하면 거의 무조건 선택된다고 볼 수 있겠다.

<br>

## 48. Smart Dynamic Styling with CSS Variables
- [CSS Variable](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties) 로 primary color를 정의하고 Component 내부에서 이를 읽어 적용해보자.
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
- 변수 선언은 `--some-variable` 형태로 선언하고, `var(변수명, 기본값)` 형태로 사용 가능하다.

<br>

## 50. Observing Attribute Changes
- WebComponent가 HTML Element의 attribute 값의 변화를 감지해서, 툴팁 메시지 랜더링 시 변경된 값을 랜더링 하고자 한다.
- 기본적으로, Element의 어트리뷰트가 변해도 WebComponent는 이를 감지하지 못한다. 컴포넌트에서 아래와 같이 함수 구현이 필요하다.
```js
class Tooltip extends HTMLElement {
  // ...

  attributeChangedCallback(name, oldValue, newValue) {
    if(oldValue === newValue){
      return 
    }

    if(name === 'text') {
      this._tooltipText = newValue;

    }
  }

  static get observedAttributes() {
    return ['text', 'class'];
  }
  // ...
}
```
- 우선 `static getter`로 `observedAttributes()` 메서드에 변화감지를 적용할 어트리뷰트 명을 배열 형태로 반환하는 함수를 구현해야한다. 기본적으로 성능상 이점으로 모든 어트리뷰트를 변화감지 하진 않기 때문.
- 그 뒤 `attributeChangedCallback` 메서드에 변화감지시 처리할 로직일 구현해야한다. 인자는 3개. 우리는 툴팁 랜더링시 `_tooltipText`프로퍼티를 기반으로 `HTMLDivElement`를 생성하므로 `newValue`를 `_tooltipText`에 할당한다.


## 52. Using disconnectedcallback
- WebComponent가 DOM에서 detatched될 때의 Hook으로 자원 정리를 할 때 쓴다.
```js
  connectedCallback() {
    // ...
    this._tooltipIcon = this.shadowRoot.querySelector('span'); 
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(this._tooltipIcon)
  }

  disconnectedCallback() {
    // _tooltipIcon에 mouseenter, mouseleave 이벤트 리스너 제거
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    
  }
```

## 53. Adding a Render Method
- Element를 만들고 DOM에 추가해서 랜더링 하는 로직은 `_render()` 메서드에 모으고, 나머지 메서드들에서는 렌더링에 필요한 property값의 변경과 렌더링 메서드 호출로 바꾼다. 가독성 좋아지게 리팩터링.
```js
_render() {
  let tooltipContainer = this.shadowRoot.querySelector('div');
  if(this._tooltipVisible) {
    tooltipContainer = document.createElement('div');
    tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(tooltipContainer);
  } else {
    if(tooltipContainer) {
      this.shadowRoot.removeChild(tooltipContainer);
    }
  }
}

_showTooltip() {
  this._tooltipVisible = true;
  this._render();
}

_hideTooltip() {
  this._tooltipVisible = false;
  this._render();
}
```