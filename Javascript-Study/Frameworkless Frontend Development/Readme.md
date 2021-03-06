# 프레임워크 없는 프론트엔드 개발
> 웹 프론트엔드의 근본을 익히기 위해 읽고 정리해보는 '프레임워크 없는 프론트엔드 개발'

## 1. 프레임워크에 대한 이야기
## 2. 렌더링

정리할 키워드
[`Node.cloneNode(options: boolean)`](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)
`가상 DOM`
`window.requestAnimationFrame`
`Element.replaceWith`

테스트 관련
jest로 테스트시 tsconfig Target을 너무 최신으로 잡으면 없던 에러가 발생하는데, 예를들면 optional chaning 연산자 뒤에 `.`에 대해 unexpected token 에러가 뜬다. 이거 왜그런지 좀 생각해볼 문제. 추후 정리필요

데이터 속성 : https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/Use_data_attributes

## 3. DOM 이벤트 관리
모든 DOM 노드는 `EventTarget` 인터페이스를 구현하는데, `EventTarget`은 다음과 같은 시그니처를 가진다.
```ts
interface EventTarget {
  addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;
  dispatchEvent(event: Event): boolean;
  removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
}
```



## 4. 웹 구성 요소
웹 컴포넌트
- 커스텀 엘리먼트 : https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_custom_elements
- 


## 5. HTTP 요청
## 6. 라우팅
## 7. 상태 관리
## 8. 적합한 작업을 위한 적합한 도구
