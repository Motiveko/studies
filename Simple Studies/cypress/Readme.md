## E2E Test
### Writing First E2E Test
- cypress는 mocha와 chai 기반으로 이뤄져있다.
- cypress의 assertion은 보통 기본적으로 특별히 에러(500, 400)가 나거나 query가 뭘 못찾거나 하지 않으면 실패하지 않도록 되어있다. DOM 요소 쿼리 타임아웃은 기본 4초.
  - https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Default-Assertions
- `cy.get`으로 HTML 요소를 클래스로 쿼리할 수 있다. 근데 권장하진 않는다. 좋은예제는 아님. [`공식문서 Best Practice`](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements)에서는 data attr을 쓰는걸 권장한다.

<br>

- Page Transition
  - 방식두가지 => `cy.visit()`, `.click()`
  - 어떤걸 쓰던 cypress에서 `page transition event`를 인식해서 로딩이 끝날때까지 다음 명령어 실행을 멈춘다.
  - 페이지 트렌지션 이벤트 타임아웃 : 60초
  - 타임아웃 관련 설정 : https://docs.cypress.io/guides/references/configuration#Timeouts

<br>

### Testing Your App 
- https://docs.cypress.io/guides/references/best-practices#Web-Servers


## 참고
cypress eslint
- https://github.com/cypress-io/eslint-plugin-cypress
