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

