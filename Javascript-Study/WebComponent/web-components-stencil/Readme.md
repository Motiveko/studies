# WebComponent - Stencil.js

## 76. What is Stencil
Stencil은 네이티브 웹 컴포넌트 컴파일러이다. 앵귤러나 리객트처럼 프레임워크나 라이브러리가 아니다. Stencil.js 코드로 작성된 코드는 폴리필 등이 추가되어 네이티브 자바스크립트 웹 컴포넌트로 변환된다. 이 컴포넌트는 폴리필이 추가되므로 IE 등의 브라우저에서도 사용 가능해진다.

## 83~. Creating a New Stencil Web Component
> tsx 파일을 사용해서 WebComponent를 만든다.

```tsx
import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  
  @Prop() title: string;

  render() {
    return (
      <aside>
        <header>
          <h1>{ this.title }</h1>
        </header>
        <main>
          <slot />
        </main>
      </aside>
    )
  }
}
```
- `@Component` : 데코레이터를 사용해 웹 컴포넌트로 사용할 class임을 알려준다. 
    - `tag`는 HTML tag명
    - `styleUrl`: css파일이나 인라인으로 스타일 지정할 수 있다.
    - `scoped`: Angular처럼 css의 독립적인 스코프를 만드는데, ShadowDOM 방식이 아닌 attribute에 해쉬값 같은걸 넣어서 스코프를 만든다. 기본값 false
    - `shadow`: Shadow DOM을 사용해서 css 스코프를 독립시킨다. 브라우저에서 ShadowDOM을 지원하지 않으면 알아서 `scoped: true`를 사용해준다.
- `class`: Stencil.js에서는 컴포넌트가 `HTMLElement`를 상속하지 않아도 된다.
- `@Prop()` : property의 변화감지가 가능해진다. render()메서드에서 property가 적용된 부분만 다시 랜더링한다.(효율적이다)
    - `@Prop({ reflect: true })` : 어트리뷰트 값고 싱크를 이룬다.
- `render()` : Vanilla로 만든 웹 컴포넌트의 라이프 사이클 훅 메서드처럼 `render`는 이름이 바뀌면 안된다. 말그대로 랜더링하는 함수로, 랜더링 할 HTML 내용을 반환한다. 이 때, 반환하는 HTML은 하나의 root element로 감싸진 내용이어야한다.(root가 2개면 에러발생함)
    - 컴포넌트 프로퍼티는 템플릿에서 `{this.PROPERTY}`로 바인딩한다
    - `<slot>`요소는 Stencil.js에서도 사용 가능하다. `::slotted` 로는 top level content밖에 select하지 못하기 때문에, slot에 대한 스타일링은 Light DOM에서 한다.(흐름을 생각해봐도 외부에서 프로젝션하는 템플릿은 외부에서 스타일링 하는것이 맞다고 본다)

<br>

## 90. Using Attributes for Styling
`ShadowDOM`사용시 css에서 `:host(selector)`로 호스트 요소를 select 할 수 있다. Drawer의 open/close는 `position left`값 0/-100%로 조정 가능하다.
```css
aside {
  left: -100%;
  transition: left 0.3s ease-in-out;
}

:host([open]) aside {
  left: 0;
}
```
<br>

## 92. Understanding Mutable Props
`open` 프로퍼티를 Component 내부에서 변경하려고 할 때, 아래와 같은 설정이 필요하다.

```jsx
@Prop({ reflect: true, mutable: true }) open: boolean;
```
jsx에서 기본적으로 prop은 HTML -> Component로 단방향으로 흐르기 때문에 immutable 하다고 한다. 암튼 mutable 속성을 추가하고, 아래와 같은 문법으로 바꾼다.

```jsx
onCloseDrawer () {
  this.open = false;
}
(<button onClick={this.onCloseDrawer.bind(this)}>X</button>)
```
함수의 래퍼런스를 전달하기 때문에 this 바인딩은 필수다.

<br>

## 95. Using State
`@Prop`은 외부에서 컴포넌트로 들어오는 값의 변화감지를 수행하고, `@State()`는 내부에서 변화감지를 수행한다.(`open`은 변화감지를 통해 랜더링을 다시한게 아닌, css selector에 의해 다시 랜더링 한것이었다.) `@State`가 변하면 `reder()`가 재실행된다.

<br>

## 96 Adding Methods to Component
`@Method()` 데코레이터를 메서드에 붙여야만 외부에 공개할 수 있다. 기본적으로 컴파일을 거치면 메서드의 이름이 바뀐다고한다. Method 데코레이터를 붙이면 이를 막을 수 있다.

<br>

## 97. Adding Backdrop
JSX는 하나의 root element만 가질 수 있다고 했는데, 사실 `render()`의 return이 배열이면 여러개의 Element를 랜더링 할 수 있다고한다 ㅎㅎ. 

<br>

## 107. Accessing the Host Element
`@Element`를 이용해 Host Element에 접근할 수 있다. 이를 이용해 `shadowRoot`,`qeurySelector` 등의 HTMLElement의 메서드, 프로퍼티를 사용할 수 있다.
```ts
// el은 host element에 바인딩된다.
@Element() el: HTMLElement; 

// render()함수의 랜더링 결과는 shadowRoot에 랜더링되므로, 요소는 shadowRoot에서 쿼리해야한다.
const symbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
```

<br>

## 108. Using Refernces
Element의 `ref` attribute를 이용해 컴포넌트의 프로퍼티와 HTML요소를 바인딩해 직접 접근 가능하다.(Angular에서 TemlplateReference 쓰는거랑 약간 비슷하다.) 문법은 `ref` 내부에 함수를 정의해 컴포넌트 속성에 HTMLElement를 할당하면 된다.

```ts
// stock-price.tsx
export class StockPrice {
  stokcInput: HTMLInputElement
  //...

  render() {
    return [
      //... 
      <input type="text" id="stock-symbol" ref={el => this.stokcInput = el }/>
    ]
  }
```
> `ref`는 `tsx`의 기능이 아닌 `Stencil`의 기능이다. 

<br>

## 109. Two Way Binding & Input Validation
`value` + `onInput` 어트리뷰트로 HTMLInputElment의 value에 대한 two way binding을 구현할 수 있다.(Angular보다 훨 복잡다)

```tsx
// stock-price.tsx
export class StockPrice {

  // @State 데코레이터가 있기때문에 값 변경시 다시 랜더링된다.
  @State() stockUserInput: string;  
  @State() stockInputValid = false;

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    this.stockInputValid = this.stockUserInput.trim() !== '';
  }
  // ...
  render() {
    return [
      // input 이벤트 발생시 stockUserInput값 재할당 및 최종적으로 다시 랜더링될것이다.
      <input type="text" id="stock-symbol" 
        ref={el => this.stokcInput = el }
        value={this.stockUserInput}
        onInput={this.onUserInput}  
      />
        
      <button type="submit" disabled={!this.stockInputValid}>Fetch</button>
    ]
  }
```

### 112. All Lifecycle Hooks
다양한 종류의 [Stencil Component Lifecycle Method](https://stenciljs.com/docs/component-lifecycle#component-lifecycle-methods)를 알어보자

기본적으로 Component Initialize 이후 순서대로
- `connectedCallback`
- `componentWillLoad` : component 로드 전에 호출
- `componentWillRender`
- `render`
    - `render` 이후로 `State`붙은 값을 바꾸면 랜더링을 다시하므로 비효율적. 해당 작업은 가급적 `render` 전에 하자!
- `componentDidRender`
- `componentDidLoad`
- `disconnectedCallback`: 컴포넌트 최종 제거

`@Prop`이나 `@State`의 값이 변하면 rerender를 일으킨다.
- `@Watch('propName')`
- `componentShouldUpdate`
- `componentWillUpdate`
- `componentWillRender`
- 이하 동일

<br>

## 114. Watching Prop Changes 
`@Watch(PROPERTY_NAME)`데코레이터를 메서드에 붙이면 해당 메서드를 PropertyChange Hook으로 활용할 수 있다.(lifecycle상 update에서 제일 먼저 호출되는듯)
```ts
@Prop() stockSymbol!: string

@Watch('stockSymbol')
stockSymbolChanged(newValue: string, oldValue: string) {
  // 인자로는 newValue, oldValue를 받는다.
}
```

<br>

## 117. Outputting a List of Elements
`tsx`는 문법이 굉장히 특이하다. 아래와 같이 컴포넌트의 프로퍼티를 랜더링 할 수 있다.
```tsx
export class StockFinder {

  searchResults: {name: string, symbol: string}[];

  render() {
    return [
      <ul>
        {this.searchResults?.map(result => (
          <li>{result.name}</li>
        ))}
      </ul>
    ]
}
}
```

<br>

## 119. Emitting Customs Events
> 참고 : https://stenciljs.com/docs/events

Custom Event의 이름은 충돌 가능성이 없게 unique하게 짓는게 좋다.(예 :`ucSymbolSelected`)

```tsx
export class StockFinder {
  @Event({bubbles: true, composed: true}) ucSymbolSelected: EventEmitter<string>;

  onSelectSymbol(symbol: string) {
    this.ucSymbolSelected.emit(symbol)
  }

  render() {
    return (
      {this.searchResults?.map(result => (
        <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>{result.name}</li>
      ))}
    )
  }
}
```

```HTML
<!-- ... -->
<uc-stock-finder></uc-stock-finder>
<script>
  const stockFinderEl = document.querySelector('uc-stock-finder');
  stockFinderEl.addEventListener('ucSymbolSelected', event => {
    console.log(event);
    // event.detail에 emit()으로 넘겨준 값이 들어있따.
  })
</script>
```

<br>

## 121. Using the Listen Decorator
[`@Listen`](https://stenciljs.com/docs/events#listen-decorator) 데코레이터를 사용하면 `DOM Event`나 `Custom Event`의 핸들러를 정의할 수 있다. 기본적으로 컴포넌트 내부의 이벤트를 감지하나, 옵션으로 target을 설정하면 버블링되는 외부의 이벤트도 감지 가능하다.
```tsx
@Listen('ucSymbolSelected', {target: 'body'})
onStockSymbolSelected(event: CustomEvent) {
  // do somethig
}
```
`target`은 `body`, `codument`, `window`가 설정 가능하고, `body`로 설정하면 컴포넌트 외부의 이벤트가 버블링되어 body에 도달하면 이걸 가져오는 형태이다. 개인적으로 이렇게 컴포넌트 외부의 이벤트를 컴포넌트 내부에서 핸들러를 만드는게 좋은 방법인지는 잘 모르겠다

<br>

## 122. Using Hostdata
강좌에서는 `hostData()`메서드를 쓰는데 공식 문서상에 해당 내용을 찾을수 없다. 대신 [`HostElement`](https://stenciljs.com/docs/host-element)를 사용해 `render()`의 반환값을 `<Host>`태그로 래핑해서 해당 태그에 class, attribute를 사용할 수 있다.

예를들어 `stock-price`컴포넌트에서 http 요청 중 에러 발생시, 컴포넌트 스타일을 변경하고 싶다고 가정해보자. 아래와 같이 적용할 수 있다.
```tsx
export class StockPrice {
  // ...
  hostData() {
    return { class: this.error ? 'error' : '' }
  }
}
```
```css
:host(.error) {
    border : 2px solid #e79804; 
}
```
참고로 `hostData()`에서 반환하는 값은 `set`이 아니라 `add`의 개념이다.

<br>

## 124. Embedding Components Into Components
`Angular`에서는 Component를 모듈에서 만들고 해당 컴포넌트를 다른 모듈에서 사용하려면 다른 모듈의 `declarations`에 선언해야하는데, `stencil.js`에서는 기본적으로 global하게 사용 가능하다. WebComponent는  전역 객체의 메서드 `customElements.define()`를 사용하기 때문인 듯 하다.

<br>

## 125. Using CSS Properties
[`css variable`](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)을 이용하면, component 밖에서 정의한 변수를 컴포넌트 내부에서 사용 가능하다.
```html
<!-- index.html -->
<style>
  html {
    --color-primary: #3b013b;
    --color-primary-inverse: white;
  }
</style>
```

```css
/* stock-price.css */
form button:hover {
  background: var(--color-primary, grey);
}
/* ... */
```

이러한 방법은 전체 `component`들의 `css color`를 통일하는데 굉장히 유용하다.

<br><br>

## 130. Using Stencil Config
Stencil 프로젝트의 빌드 관련된 설정을 정의한다. [공식가이드](https://stenciljs.com/docs/host-element)를 참고하는게 낫다.

<br>

## 131. Building & Using the Components

`npm run build`로 빌드 후 빌드한 파일을 프로젝트에 위치시킨다. 빌드시 `stencil.config.ts`의 `namespace`를 test로 지정하고, 빌드 결과물을 `scripts/`디렉토리에 넣었다면, 아래와 같이 html 파일에 esm을 import시킨다.
```html
<script type="module" src="./scripts/esm/test.js"></script>
```
이후 추가적인 설정 없이 html 파일에서 정의했던 Web Component를 사용할 수 있다.

참고로 lazy loading으로 작동한다(실제 DOM에 render되는 순간에 load). 설정 안해도 알아서 해준다.

<br>

## 135. Using Web Components in an Angular App

npm 배포한 프로젝트 설치 후..

1. `AppModule`에서 import `@angular/core/CUSTOM_ELEMENTS_SCHEMA `
  - angular component가 아닌 요소를 사용할것이다.

2. @NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA] })
3. `main.ts`에서 import `NPM_PACKAGE_NAME/dist/loader/defineCustomElements`
4. `main.ts`에서 `defineCustomElements(window)` 실행
  - 프로젝트 전역에 WebComponent를 정의한다.
5. 아무 컴포넌트의 템플릿에서 WebComponent를 사용할 수 있다.
