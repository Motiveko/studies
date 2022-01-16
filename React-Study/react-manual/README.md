# 리액트 공식 메뉴얼 예제 따라하기

### [Render Props](https://ko.reactjs.org/docs/render-props.html)
> React 컴포넌트 간에 코드를 공유하기 위한 테크닉 중 하나. 랜더링 할 컴포넌트의 종류 등을 `props`를 통해 동적으로 전달할 수 있다.


## Hook API

### [useContext](https://ko.reactjs.org/docs/hooks-reference.html#usecontext)
`useContext`는 context 객체를 받아 그 context의 현재 값을 반환한다. context의 현재 값은 컴포넌트 트리 안에서 `useContext` 훅을 사용한 컴포넌트의 가장 가까운 `Provider`의 value prop에 의해 결정된다.