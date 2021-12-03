# WebComponent - Stencil.js

## 76. What is Stencil
Stencil은 네이티브 웹 컴포넌트 컴파일러이다. 앵귤러나 리객트처럼 프레임워크나 라이브러리가 아니다. Stencil.js 코드로 작성된 코드는 폴리필 등이 추가되어 네이티브 자바스크립트 웹 컴포넌트로 변환된다. 이 컴포넌트는 폴리필이 추가되므로 IE 등의 브라우저에서도 사용 가능해진다.

## 83. Creating a New Stencil Web Component
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
    - `@Prop({ reflect: true })`
- `render()` : Vanilla로 만든 웹 컴포넌트의 라이프 사이클 훅 메서드처럼 `render`는 이름이 바뀌면 안된다. 말그대로 랜더링하는 함수로, 랜더링 할 HTML 내용을 반환한다. 이 때, 반환하는 HTML은 하나의 root element로 감싸진 내용이어야한다.(root가 2개면 에러발생함)
    - 컴포넌트 프로퍼티는 템플릿에서 `{this.PROPERTY}`로 바인딩한다
    - `<slot>`요소는 Stencil.js에서도 사용 가능하다. `::slotted` 로는 top level content밖에 select하지 못하기 때문에, slot에 대한 스타일링은 Light DOM에서 한다.(흐름을 생각해봐도 외부에서 프로젝션하는 템플릿은 외부에서 스타일링 하는것이 맞다고 본다)

