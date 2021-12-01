# WebComponent - Modal 
실행하기
```
npm i
npm run start

http://localhost:5500
```


## 61. Opening the Modal via CSS
- 모달을 끄는건 ShadowDOM의 `innerHTML`을 비우는것이 아닌 css에 아래 속성 추가하는 형태로 한다.
```html
<style>
#backdrop {
    ...
    opacity: 0;
    pointer-events: 'none'
}
#modal {
    ...
    opacity: 0;
    pointer-events: 'none'
}
</style>
```
- `pointer-events: 'none'`은 해당 요소에 클릭이 안먹도록 해준다.
- 모달의 open-close는 호스트 요소에 `opened`요소가 있는지 여부로 판단한다. open시 css에 `opacity: 1`, `pointer-events: 'all'`속성을 추가하는 형식으로 한다.
- 이 때 `attribute`의 change를 감지해서 `document.querySelector`로 쿼리해서 요소의 스타일을 고칠수도 있으나, css를 잘쓰면 아래와 같이 간단히 해결할수 있다.
```html
<style>
#backdrop {
    ...
    opacity: 0;
    pointer-events: 'none'
}
#modal {
    ...
    opacity: 0;
    pointer-events: 'none'
}
:host([opened]) #backdrop,
:host([opened]) #modal {
    opacity: 1;
    pointer-events: 'all';
}
</style>
```

<br>

## 62.Public Methods & Properties
- 모달의 open과 같은 액션은 class의 `public method`로 정의해 추상화 하는것이 좋다.
```ts
// modal.js
open() {
    this.setAttribute("opened", "");
    this.isOpen = true;
}

// script
showBtn.addEventListener("click", () => {
  const modal: Modal = document.querySelector("uc-modal");
  if (!modal.isOpen) {
    modal.open();
  }
});
```
- 또한 `isOpen`과 같은 `public property`를 정의해 컴포넌트 외부에 유용한 정보를 제공하자.

<br>

## 63. Understanding Named Slots
- 호스트 요소에 projection한 `slot`들을 분리해서 사용할 수 있다(header, content, ...)
- 프로젝션하는 요소에 `slot` 어트리뷰트에 값을 할당하고, 컴포넌트 내부에서는 `slot`요소에 `name` 어트리뷰트를 지정하면 받아진다.

```HTML
<!-- index.html -->
<uc-modal >
    <h2 slot="title">Please Confirm</h2>
    <p>With your confirmation you agree to pay the full amount!</p>
</uc-modal>
```

```ts
// modal.ts
this.shadowRoot.innerHTML = `
    <style>
        ...
        ::slotted(h2) {
            font-size: 1.25rem
        }
        ...
    <style>
    ...
    <header>
        <slot name="title">Defalut Title</slot>
    </header>
    <section id="main">
        <slot></slot>
    </section>
    ...
`
```
- 참고로 한번 `slot`으로 바인딩 한 요소는 중복으로 받아지진 않는다.
- slot요소는 `::slotted(selector)`로 잡는다. 
- 이 때, slot의 이름으로 select 하려면 "::slotted([name="someName"])"이 아닌 `::slotted([slot="someName"])`으로 잡아야 한다.(실제 랜더링 된 DOM에는 slot 어트리뷰트가 있기 때문)

<br>

## 64. 'slotchange' & Getting Access to Slot Content
- 아래와 같이 `ShadowDOM`의 slot 요소를 가져올 수 있다.
```ts
const slots: NodeListOf<HTMLSlotElement> = this.shadowRoot.querySelectorAll("slot");
```
- `HTMLSlotElement`에는 `slotchange` 이벤트 핸들러를 등록할 수 있는데, `slot`에 프로젝션 되는 요소가 바뀔 때 이벤트가 발생한다.
- `slot.assignedElements()`로 slot이 참조하는 `Element`들을 가져올 수 있다.
- 반면 `slot.assignedNodes()`메서드로 slot이 참조하는 `Node`들을 가져와보면, `element`앞 뒤로 공백이 text node가 되어 참조되어 있는것을 확인할 수 있다.(왜 이딴걸 만들었을까?)

- `slot`은 프로젝션하는 `LightDOM`요소를 가리키기(참조)만 할 뿐이다.

<br>


## 65 - 67 Dispatching Custom Event

- 모달 내부 버튼 클릭시 모달이 hide되고, `confirm`, `cancel`를 방출하게 한다. 이를 통해 외부에서 해당 이벤트를 감지해 추가적인 로직을 구성할 수 있게 만든다.(Material에서 늘상 봐오던 패턴)
- `ShadowDOM` 내부에서 Custom Event를 dispatch 할 땐, `composed: true`로 이벤트를 생성해야 한다. [compose](https://developer.mozilla.org/en-US/docs/Web/API/Event/composed) 옵션은 이벤트가 `ShadowDOM` 밖으로 전파되는지 여부로 기본값 false다.
- `bubbles`는 기본값이 true로 설정이 필요 없는듯. 구현은 아래와 같다.
```ts
// index.html - script
const modal = document.querySelector("uc-modal");
modal.addEventListener("confirm", () => {
  console.log("confirmed...");
});

modal.addEventListener("cancel", () => {
  console.log("canceled...");
});

// modal.ts
cancelBtn.addEventListener("click", this._cancel.bind(this));
confirmBtn.addEventListener("click", this._confirm.bind(this));

hide() {
    this.removeAttribute("opened");
    this.isOpen = false;
}

_cancel(event: Event) {
    this.hide();
    const cancelEvent = new Event("cancel", { composed: true });
    // cancel 버튼에서 event dispatch
    event.target.dispatchEvent(cancelEvent);
}

_confirm(event: Event) {
    this.hide();
    const confirmEvent = new Event("confirm");
    // 컴포넌트가 HTMLElement를 상속하므로, 컴포넌트에서 dispatch 해줘도 된다.
    this.dispatchEvent(confirmEvent);
}
```

<br>

## Adding Enhancements & Modal Animations
- 백드롭 클릭시 `_cancel()` 호출
- `transition: all 0.3s ease-out;`으로 에니메이션 줬다. 
