# 초보자를 위한 React 200제 학습 내용 정리

## 1 ~ 16 리액트 라이프사이클 함수
```js
// SimpleComponent.js
class SimpleComponent extends Component {
  static getDerivedStateFromProps(props, state) {
    console.log('2. getDerivedStateFromProps Call : ' + props.prop_value);
    
    return { tmp_state: props.prop_value };
  }
  constructor(props) {
    super(props);
    this.state = {};
    console.log('1. 생성자 call')
  }

  componentDidMount() {
    console.log('4. componentDidMount Call');
    console.log(`5. tmp_state : ${this.state.tmp_state}`);

    this.setState({tmp_state2: true}, () => console.log('setState Callback'));
  }

  shouldComponentUpdate(props, state) {
    console.log(`6. shouldComponentUpdate Call / tmp_state2 = ${state.tmp_state2}`)
    return state.tmp_state2;
  }

  render() {
    console.log('3. render Call')
    return (
      <h2>[THIS IS IMPORTED COMPONENT]</h2>
    )
  }
}
```

```js
// App.js
import './App.css';
import SimpleComponent from './R006_ImportComponent'

function App() {
  return (
    <div>
      <h1>Start React 200!</h1>
      <p>HTML 적용하기</p>
      <SimpleComponent 
        prop_value = 'FromApp.js'
      />
      
    </div>
  );
}

export default App;
```
출력 결과
![출력결과](./assets/생명주기함수_출력결과.png)


1. `constructor`
2. static `getDerivedStateFromProps`
- 컴포넌트가 새로운 props를 받게 됐을 때 state를 변경해준다. 반환하는 객체를 state에 머지해줌
3. `render`
- 랜더링할 HTML 내용을 반환한다.

4. `componentDidMount` 
- 컴포넌트가 랜더링 된 이후(DOM 트리에 마운트) 실행된다.

5. `shouldComponentUpdate`
- 컴포넌트의 `props`나 `state`가 변경도리 때 실행된다. 위 코드에서 `componentDidMount`에서 `this.setState` 호출 결과로 실행됨.
- 반환 타입은 `boolean`으로, `true`반환시 `render`를 호출한다.

<br><br>

## 17 ~ 65 리액트 기초 다지기

### 17-19. `props` 사용하기
- `props`는 부모 컴포넌트에서 자식 컴포넌트에 데이터를 전달하는 용도로 사용된다. Angular의 `@Input()`과 같은 역할을 한다고 볼 수 있다.
- 자식 컴포넌트에서 수정 불가능하다.

```js
// App.js
import PropsDataType from './R018_PropsDataType';

function App() {
  return (
    <div>
      <h1>Start React 200!</h1>
      <p>HTML 적용하기</p>
      <PropsDataType 
        String = 'react'
        Number = {200}
        Boolean = {true}
        Array = {[0,1,2]}
        ObjectJSON = {{react: "리액트"}}
        Function = {console.log("Function")}
        Callable = {() => console.log("Callable")}
      />
      
    </div>
  );
}

export default App;
```
```js
// R018_PropsDataType.js
import React, { Component } from "react";
import datatype from 'prop-types';

export default class PropsDataType extends Component {

  render() {
    let {
      String, Number, Boolean, Array, ObjectJSON, Function, Callable
    } = this.props;
    return (
      <div style={{padding: "0px"}}>
        <p>String Props: {String}</p>
        <p>Number Props: {Number}</p>
        <p>Boolean Props: {Boolean}</p>
        <p>Array Props: {Array.toString()}</p>
        <p>ObjectJSON Props: {JSON.stringify(Object)}</p>
        <p>Function Props: {Function}</p>
        <p>Callable Props: {Callable()}</p>
      </div>
    )
  }
}
PropsDataType.propTypes = {
  String: datatype.string,
  Number: datatype.number,
  Boolean: datatype.bool,
  Array: datatype.array,
  ObjectJSON: datatype.object,
  Function: datatype.string,
  Callable: datatype.func,
}
```
- `string`타입은 그냥 넘겨줄 수 있고, 나머지 타입은 `{}`로 감싸서 넘겨줘야 한다.
- 화면에 출력시 string으로 변환해서 출력해줘야 한다. 객체의 경우 그냥 바인딩 시키면 에러가 나면서 앱이 중지된다.
- props에 대한 타입 정의는 `Component.propTypes`에 객체를 할당해 할 수 있다. `prop-types` 모듈의 `datatype`객체를 사용한다.
- 이 때, 타입 정의에 맞지 않는 값이 넘어와도, 콘솔에 오류만 출력하고 동작을 막진 않는다.

<br>

### 19. Booelan 타입 props
- `Boolean`타입으로 정의한 경우 경우 값을 넘기지 않으면 기본값 `true`다.(부모에서 선언은 해줘야함)

<br>

### 20. 객체 타입 props 
- 객체 자료형은 `datatype.shape()` 함수를 이용해 아래와 같이 상세하게 선언할 수 있다.
```js
Component.propTypes = {
  ObjectJson: datatype.shape({
    string: datatype.string,
    number: datatype.number
  })
}
```
