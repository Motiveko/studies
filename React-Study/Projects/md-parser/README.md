# Simple 마크다운 파서

간단한 마크다운 파서를 만들어 본다.

---

## Unified
[`unified`](https://github.com/unifiedjs/unified)는 [`remark`](https://github.com/remarkjs/remark), [`rehype`](https://github.com/rehypejs/rehype)의 상위 프로젝트로서 `마크다운`, `HTML`형태의 문자열을 파싱해 `AST`를 생성하고 프로세싱해 원하는 형태로 변환해준다. `use`를 체이닝해 여러 플러그인을 적용할 수 있어서 편하다. `Lint`, `Prettier` 등에서 사용되고 있다고 한다.

<br>

## 이슈
### 1. 코드 블록 강조(highlight)
[`rehype-highlight`](https://unifiedjs.com/explore/package/rehype-highlight/)플러그인을 이용하여 syntax highlight를 적용할 수 있다.
```tsx
unified()
  // ...
  .use(rehypeHighlight, {
    ignoreMissing: true
  })
  .processSync(text).toString();
```

`ignoreMissing` 옵션을 쓰지 않으면 실시간으로 파싱할 때 코드 블록에 `js`를 입력하기 전 `j`를 입력하는 순간 에러가 나면서 앱이 깨진다.

이걸 적용하면 코드 블록의 `AST`가 변경되어 `hljs` 관련된 클래스가 붙게 되는데, `rehype-highlight`가 내부적으로 [`highlight.js`](https://highlightjs.org/) 패키지를 사용하기 때문이다. 여기에 색깔등의 스타일을 입히려면 `highlight.js theme` 을 검색해 원하는 테마 css 파일을 찾아서 앱에 정의해주면 된다. 

<br>

### 2. 인용문 스타일
인용문에 기본 스타일이 없는 것 같다. 적절한 스타일을 찾기 어려워 직접 만들었다.
```css
/* App.css */
blockquote{
   width:100%;
   padding:0.4rem;
   overflow-wrap: break-word;
   font-style:italic;
   color: #555555;
   border-left:8px solid #78C0A8 ; 
   background:#EDEDED;
 }
 blockquote p {
    padding: 0;
    margin: 0.2rem 0;
 }
```

<!-- indent 처리 생각해야함. velog는 텍스트 에디터를 code mirror라는걸 사용하는듯 -->