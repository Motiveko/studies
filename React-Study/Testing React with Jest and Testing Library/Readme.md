# Testing React with Jest and Testing Library
- Udemy의 리액트 테스트 강의 [Testing React with Jest and Testing Library](https://www.udemy.com/course/react-testing-library/)

<br>

## 1. Introduction
- React Testing Library vs Jest
  - React Testing Library
    - https://testing-library.com/docs/react-testing-library/intro
    - 테스트에 필요한 `Virtual DOM`을 제공한다. 이를 이용해서 컴포넌트를 Virtual DOM에 랜더링 할 수 있다.
    - Virtual DOM에 대한 `쿼리 기능`을 제공한다.(getByText... )
    - Virtual DOM과의 Interaction을 제공한다.
  - Jest
    - 테스트러너로 테스트를 찾고, 실행하며, 성공 여부를 확인한다.
    - 테스트 실패 여부는 테스트 함수 내부에서 Error가 throw 되는지 여부다. assertion도 실패하면 Error를 던지도록 되어있다.

<br>

- `npx creacte-react-app`
  - `npx`를 사용하면 cra를 로컬 머신에 설치하지 않고, 매번 최신 버전을 다운로드해서 사용한다.

<br>

- `setupTests.js` - `jest-dom`
  - cra로 프로젝트 생성시 setupTests.js가 생성되고 내부에 `@testing-library/jest-dom`를 import한다.
  - 이렇게하면 [jest-dom](https://github.com/testing-library/jest-dom)에서 제공하는 DOM-based Custom matchers들이 추가된다. 
  - 아래는 cra로 앱 생성시 기본 제공되는 App.js의 테스트 코드다.
  ```js
  // App.test.js
  test('renders learn react link', () => {
    //..

    // toBeInTheDocument은 jest-dom이 제공하는 matcher다.
    expect(linkElement).toBeInTheDocument();  
  });
  ```

<br>

- TDD - 아래의 순서로 진행한다.
  - 코드 작성 전 test spec 작성
  - 테스트 실패
  - 실패한 테스트를 기반으로 테스트가 통과할때까지 수단과 방법을 가리지 않고 코드를 작성
  - 테스트 통과

<br>

- Types of Tests
  - Unit tests : Test one unit of code in isoloation(예 - 단일 컴포넌트)
  - Integration tests : How multiple units work together(예 - 두개의 컴포넌트)
  - Functional tests : Tests a particular function of a software
    - 예 - 폼에 값을 채우고 submit button을 클릭한 후 원하는대로 동작하는지
    - [`The more your tests resemble the way your software is used, the more confidence they can give you.`](https://testing-library.com/docs/guiding-principles/)
    - Testing library가 추구하는 테스트
  - Acceptance/ E2E tests : 실제 브라우저와 서버를 이용한 테스트(Cypress, Selenium)

<br>

- Unit Testing vs Functional Testing
  - Unit Testing
    - `Isolation`: mock dependencies, test internals
    - 실패의 이유를 찾기 매우 쉽다.
    - 유저가 실제로 앱을 사용하는것과 괴리가 있다.
    - 리팩토링시 테스트가 깨지기 쉽다.
  - Functional Testing
    - Include all relavant units, test behavior
    - 실제 유저가 앱을 사용하는것과 비슷하다.
    - 리팩토링에 강하다.
    - 테스트 실패를 디버깅하기 힘들다.

<br>

- Accessibility and Finding Elements
  - Testing Library는 스크린 리더가 하는 방식으로 DOM쿼리하는걸 권장한다.(웹 접근성)
  - https://testing-library.com/docs/queries/about 
  - 예전에 Angular test공부할 땐 ***`data-testid`를 사용해서 DOM을 쿼리했는데, 이는 좋은 방법이 아니라고한다.***


<br>

<!-- https://github.com/bonnie/udemy-TESTING-LIBRARY -->

## 2. Simple App: Color Button
- `color-button`에 구현한다. 클릭시 색깔과 버튼명이 바뀌는 간단한 버튼.
- DOM 쿼리 후 assertion의 matcher는 가급적 jest-dom의 matcher를 사용한다.(DOM에서 텍스트를 꺼내서 `.toEqual()`을 호출하는게 아닌 DOM 자체에 `.toHaveTextContent()`를 검사하는 형식. 이게 훨씬 가독성 좋다)
- 가급적 컴포넌트의 `초기 상태` 테스트와 이후 `유저 인터렉션에 의한 상태 변화` 테스트는 분리하여 작성한다. **테스트가 너무 커지면 디버깅하기 힘들어진다.**
- `fireEvent.click`으로 클릭 이벤트 트리거 할 수 있다.

<br>

- `CSS moudle` import test
  - jest-dom의 `.toHaveStyle()`은 css module을 className에 할당하는 방식으로 작성된 코드는 테스트 할 수 없다.
  - jest에 의해서 css module의 import가 무시되기 때문이다.
  - 대부분의 경우 css가 기능에 영향을 끼치지 않기 때문에 기능 테스트에는 영향이 없다. 근데 `display:none`과 같이 기능에 영향을 끼칠 수 있는 스타일은 결국 테스트 환경에 추가되어야 한다.
  - jest가 className을 css로 해석할 수 있게 하기 위해서는 `Transformer`를 추가해야한다.([`jest-transform-css`](https://www.npmjs.com/package/jest-transform-css), [`jest-css-modules-transform`](https://www.npmjs.com/package/jest-css-modules-transform)). 사용법은 각각의 메뉴얼을 참고하자.
  - css모듈을 테스트하는 제일 쉬운 방법은 그냥 className으로 테스트하는 것이다.(`className={styles.hidden}` 이라면 `.toHaveClass('hidden')`으로 테스트 가능하다고 한다)

<br>

- `screen`의 accessible 관련 쿼리에서 optional을 작성하는것을 생활화 하자. 여러 요소가 있을 경우 특정 요소만 찝을 수 있도록 도와준다.
- `optional.name`은 role 등에 따라 쿼리하는 값이 달라진다.(button: 버튼명, checkbox: label의 text content, ...)

<br>

- 아래 `replaceCamelWithSpaces`와 같이 간단한 함수들은 functional test에 포함시켜도 좋다.(꼭 여러 케이스에 대응하는 unit test가 없어도 된다.)
```js
export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');  // 대문자를 찾으면 앞에 공백을 붙인다
}
```
- 하지만 좀 복잡한 함수라면 functional test에서 실패에 대해 디버깅이 힘드니 꼭 unit test를 작성하자.
- functional test의 경우 `describe`함수를 이용해 **테스트를 그룹핑**하는게 좋다.