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
`@Prop`은 외부에서 컴포넌트로 들어오는 값으 변화감지를 수행하고, `@State()`는 내부에서 변화감지를 수행한다.(`open`은 변화감지를 통해 랜더링을 다시한게 아닌, css selector에 의해 다시 랜더링 한것이었다.) `@State`가 변하면 `reder()`가 재실행된다.

<br>

## 96 Adding Methods to Component
`@Method()` 데코레이터를 메서드에 붙여야만 외부에 공개할 수 있다. 기본적으로 컴파일을 거치면 메서드의 이름이 바뀐다고한다. Method 데코레이터를 붙이면 이를 막을 수 있다.

<br>

## 97. Adding Backdrop
JSX는 하나의 root element만 가질 수 있다고 했는데, 사실 `render()`의 return이 배열이면 여러개의 Element를 랜더링 할 수 있다고한다 ㅎㅎ. 