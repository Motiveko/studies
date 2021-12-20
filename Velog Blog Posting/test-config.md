## 간단한 Typescript 프로젝트 Unit/Integragtion 테스트 환경 설정(Karma + Jasmine + Webpack)
> E2E는 다루지 않는다. 아직 모른다.

<br>

## 자바스크립트 테스트 도구
**테스트 도구**에는 크게 테스트 구동 환경을 제공하는 `테스트 러너`와 테스트 코드 작성에 사용되는 `테스트 프레임워크`로 나뉜다. 세부적으로 나누면 단언/테스트더블 라이브러리들이 있는데 추세적으로 다 테스트 프레임워크에 포함된다.

<br>

<!-- ### 테스트 러너
테스트 러너는  -->

## 자바스크립트 테스트 환경
자바스크립트 코드의 실행 환경은 브라우저와 node가 있다. 테스트 환경 역시 같다.

브라우저에서 실행하려면 실질적으로 `Karma`가 거의 유일하고, `node`환경에서의 실행은 따로 runner가 필요 없이 테스트 프레임워크에서 실행 가능하다. 하지만 최근 `Karma`는 별로 안쓰이는 추세인 것 같고 node환경의 러너만 있는 `jest`가 대세인 듯 한데, 이유는 `jsdom`이라는 라이브러리를 이용해 브라우저 환경에서 처럼 DOM API 등을 node 환경에서 사용 가능하기 때문이다.

또한 `Karma`는 결국 브라우저에서 실행해야 하는데, 당연히 `node`실행보다 훨씬 느리다.(갑갑하다)

<br><br>

## Webpack을 이용한 간단한 typescript 개발환경 설정
https://velog.io/@ssh1997/webpack-typescript-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0

## 자바스크립트 테스트 환경 
https://ui.toast.com/fe-guide/ko_TEST

## Webpack + Jasmine + Karma를 이용한 브라우저 환경에서의 타입스크립트 코드 테스트

- [https://meetup.toast.com/posts/126](https://meetup.toast.com/posts/126) (기본셋업)
- [https://www.npmjs.com/package/karma-typescript](https://www.npmjs.com/package/karma-typescript) (karma로 타입스크립트 파일 테스트하기 위한)
- [https://vanayun.netlify.app/til/unit-test/](https://vanayun.netlify.app/til/unit-test/)
https://medium.com/@trustyoo86/typescript%EB%A1%9C-karma-%ED%85%8C%EC%8A%A4%ED%8A%B8%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0-4b7e48806cb5
https://gist.github.com/cevek/d64f864ad6677a7f7e46915670a14664
https://webpack.js.org/guides/typescript/
https://github.com/TypeStrong/ts-loader

<br><br>

## Jest 를 이용한 typescript 테스트 환경
`Jest`는 사용이 쉽다고 한다. 자체적으로 `테스트 러너`, `단언`, `테스트 더블`, `코드 커버리지`등 필요한 모든 기능을 지원해 추가적으로 설치할 게 별로 없다. 특별한 설정 없이 디폴트로도 웬만큼 돌아간다고 한다. 

하지만 타입스크립트 개발에도 아무것도 필요없을까? 기본반찬부터 설치한다.

```
npm i --save-dev jest @types/jest
npx jest
```
`jest`는 실행시 기본적으로 `*.test.js/ts`, `*.spec.js/ts`를 찾아서 실행히킨다.

실행 결과 결과 아래와 같은 에러메시지가 나온다. 타입스크립트를 쓰고싶으면 링크를 참고해서 설정하란다.

![jest-에러](https://images.velog.io/images/motiveko/post/dee312ca-3a6c-48e8-a935-641d64916ab0/jest-typescript-error.png)

https://jestjs.io/docs/getting-started#using-typescript 에 들어가보면 `babel`을 이용하거나 `ts-jest`를 사용하라고 나온다. `babel`사용시 테스트 실행간에 타입체크가 안된다고 한다. 따라서 `ts-jest`를 사용한다. 사용법은 매우 간단하다. 아래 명령어를 따라치자.

```
npm install --save-dev jest ts-jest
npx ts-jest config:init
```

프로젝트 루트에 `jest.config.js` 파일이 아래와 같은 내용으로다가 생성된다.
```js
// jest.config.js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node'
};
```
나는 fe를 개발하므로 테스트 환경은 DOM API가 있어야한다. `testEnviroment`를 `jsdom`으로 바꾼다.
```js
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom'
};
```

테스트를 실행하면 잘 통과한다.

```
npx jest
```
![jest성공](https://images.velog.io/images/motiveko/post/b098a070-5184-4bb7-9091-8fbf1e5d336d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.09.27.png)