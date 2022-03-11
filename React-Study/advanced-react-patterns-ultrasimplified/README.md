# The Complete Guide to Advanced React Component Patterns

> Udemy의 리액트 컴포넌트 디자인 패턴 강의 [The Complete Guide to Advanced React Component Patterns](https://www.udemy.com/course/the-complete-guide-to-advanced-react-patterns/)

### 9. Building and styling the medium clap
- `MediumClap` 컴포넌트는 3개의 자식 컴포넌트를 가지는 Container Component인 버튼이다. 
- 기본적으로 버튼은 박수모양 SVG 아이콘 `ClapIcon`과 클릭시 내가 몇 번 박수쳤는지 나타내는 `ClapCount`, 그리고 게시글의 총 박수 횟수를 나타내는 `CountTotal`로 구성된다. 자식은 `Stateless Component`다.
```js
const MediumClap = () => {
  return (
    <button>
      <ClapIcon />
      <ClapCount />
      <CountTotal />
    </button>
  )
}
```
- 자식 컴포넌트들은 한번에 보여지는게 아닌 클릭과 함께 변하는 `부모 컴포넌트의 상태`에 따라 보여진다.
- 앵귤러와 같은 방식의 컴포넌트의 `encapsulated style`을 구현하는 법을 몰랐는데 아래와 같은 방식으로 한다.
```css
/* index.css */
.clap {
  position: relative;
  outline: 1px solid transparent;
  border-radius: 50%;
...
```
```js
import React from 'react';
import styles from './index.css'

const MediumClap = () => {
  return (
    <button className={styles.clap}>
      <div className={styles.clap}></div>
      <ClapIcon />
      <ClapCount />
      <CountTotal />
    </button>
  )
}
```
- 이렇게 하면 css에서 `.clap`에 구현한 스타일을 `className={styles.clap}`을 지정한 요소에 추가할 수 있는데, 고유한 해시값이 할당된다.(컴포넌트 내에서 해시값은 같다)
```HTML
<button class="_1rhF2AtahLt0Armnpt0Dp1">
  <div class="_1rhF2AtahLt0Armnpt0Dp1">...</div>
</button>
```
- `._1rhF2AtahLt0Armnpt0Dp1` 셀렉터에 style.css에서 작성한 스타일이 적용된다. 이게 별도 설정 없이 동작하는것인지 다른 앱에서 테스트 해봐야 알 것 같다.

<br>

### 10. Handling User Interactivity
- `MediumClap`의 상태값은 `count`, `totalCount`, `isClicked`로 세가지다.(isClicked는 count로 추론 가능한데 굳이 추가해야 하는지 의문)
- `useState` 훅으로 상태를 만들고 자식 컴포넌트 props로 전달한다.
```js
const initialState = {
  count: 0,
  countTotal: 267,
  isClicked: false
}
const MediumClap = () => {
  const MAXIMIUM_USER_CLAP = 50;
  const [clapState, setClapState] = useState(initialState);
  const { count, isClicked, countTotal} = clapState;
  const handleClapClick = () => {
    setClapState(prev => ({
      isClicked: true,
      count: Math.min(count + 1, MAXIMIUM_USER_CLAP), 
      countTotal: count < MAXIMIUM_USER_CLAP ? prev.countTotal + 1 : prev.countTotal
    }))
  }
  return (
    <button className={styles.clap} onClick={handleClapClick}>
      <ClapIcon isClicked={isClicked}/>
      <ClapCount count={count}  />
      <CountTotal countTotal={countTotal} />
    </button>
  )
}
```
- `ClapIcon`은 클릭되는 순간 초록색으로 채워진다. css의 `.icon.checked`에 구현되어있는데, `isClicked` props에 따라 아래와 같이 스타일을 넣을 수 있다.
```js
const ClapIcon = ({ isClicked }) => {
  return <span>
    <svg 
      className={`${styles.icon} ${isClicked && styles.checked}`}
      //...
```

<br>

### 11. High Order Components recap
- [HOC(High Order Component, 고차 컴포넌트)](https://ko.reactjs.org/docs/higher-order-components.html)는 Component를 인자로 받아 일부 레이어(공통로직 등)가 추가된 Component*를 반환하는 `함수`다. 인자로 전달되는 컴포넌트를 보통 `WrappedComponent`라고 부른다.
- 우리의 `MediumClap`컴포넌트에 에니메이션(레이어)를 추가하는 HOC `withClapAnimation`를 아래와 같이 작성한다.
```js
const withClapAnimation = WrappedComponent => {
  class WithClapAnimation extends Component {
    // this handles animation logic
    
    animate = () => { /* 에니메이션 로직 */ }
    render() {
      return <WrappedComponent {...this.props} animate={this.animate} />
    }
  }
  return WithClapAnimation;
}


const Usage = () => {
  const AnimatedMediumClap = withClapAnimation(MediumClap);
  return <AnimatedMediumClap />
}

export default Usage;
```
- `export default MediumClap withClapAnimation(MediumClap);`라고 구현하지 않고 Usage 함수를 만든 이유는 잘 모르겠다. 강의에서 컴포넌트의 재사용성을 언급했는데 지금은 봐도 어디서 재사용정이 생기는건지 모르겠음.

<br>

### 12 - 17. Animation
> 재미있어서 정리한다. 이 강좌의 목적은 animation은 아니다.

- `MediumClap`의 애니메이션은 [`mojs`](https://mojs.github.io/) 라이브러리를 이용한다.
- `mojs`는 시간의 경과에 따른 상태 변화를 나타내는 `Timeline`객체를 만들고, `replay` 메서드를 이용해 t=0 ~ t=end 까지의 에니메이션을 재생시킬 수 있다.
- Timeline에는 mojs의 여러 객체들을 추가할 수 있다. 이 객체는 타임라인 실행간 각 요소별 타임라인을 의미한다. HTML요소에 대해 타임라인을 만들기 위해서는 해당 DOM 요소를 쿼리해야하는데, 따라서 컴포넌트 랜더링 이후에 만들어 져야 하므로 `componentDidMount` 훅에 만들어야한다.
- HTML요소에 대한 타임라인은 `new mojs.HTML()`로 만들 수 있다. mojs가 직접 요소를 만들어 주기도 하는데, 예를들어 MediumClap 클릭시 흩뿌려지는 삼각형, 원 등의 도형이 있다. 이를 `Burst`라고 하고 이에 대한 타임라인은 `new mojs.Burst()`로 만든다.
- HTML 요소에 대한 타임라인을 만들 때, HTML에 에니메이션을 발생시켜 한번 초기화 해줘야 한다. 그러지 않으면 요소는 t=0일때의 상태로 초기화 된다.(t=end 상태가 되어야 함) 아래는 transform을 발생시켜 #clap의 Timeline을 초기화한다.
  ```js
    const clap = document.getElementById('clap');
    clap.style.transform = 'scale(1,1)';
  ```
- Timeline객체는 `then` 메서드로 여러 타임라인을 계속에서 체이닝 할 수 있다.
- 기타 API는 [mojs-API](https://mojs.github.io/api/) 문서를 참고하자. 튜토리얼도 있다. 자세한 구현 코드 정리는 생략.

<br>

### 19-23 Custom Hook Animation
- 앞서 HOC로 MediumClap 컴포넌트의 props에 animationTimeline을 전달했는데, Custom Hook으로도 구현 가능하다.
- 컴포넌트의 캡슐화를 위해 [Callback Ref](https://ko.reactjs.org/docs/refs-and-the-dom.html#callback-refs)를 사용한다.





![Advanced React Patterns Ultrasimplified](assets/hero@3x.png)

**Welcome to Advanced React Patterns Ultrasimplified!**

Here I'll walk you through modern advanced react patterns in an intuitive fashion that models your day-to-day job as a Software Engineer.

### 🖥 [Want to see the demo site? Click here](https://advanced-react-patterns-ultrasimplified.netlify.com/)

---

## What do you mean by 'Ultrasimplified'?

### 1. Real World Demos 🚀

You won't find basic hello world demos here. The demos have been intentionally designed to be actually helpful and **relatable**.

![GIF of Medium clap demo](assets/explainer-demo.gif)

### 2. Mimics your day-to-day job as a developer 🖥

Each pattern is implemented and discussed via **a pull request**. **View** the PRs. **Read** the descriptions. Read the **comments**. Like you do at work!

## Coming from my Udemy Course?

- The branch we start off from is branch `clean-slate`. [See branch](https://github.com/ohansemmanuel/advanced-react-patterns-ultrasimplified/tree/clean-slate)
- The development DEMO site lives here: https://dev-advanced-react-patterns-ultrasimplified.netlify.com/

## But I'm just a beginner. Isn't this too advanced?

Every implementation is well explained with comments, diagrams and notes (in progress). You've got this.

### [Wanna watch me teach this? View my udemy course.](https://github.com/ohansemmanuel/advanced-react-patterns-ultrasimplified/pulls)

## How do I run the demos locally?

1. Clone this repo

```sh
git clone git@github.com:ohansemmanuel/advanced-react-patterns-ultrasimplified.git
```

2. Change directory

```sh
cd showcase
```

3. Install dependencies

```sh
npm install
```

or

```sh
yarn install
```

4. Run the app

```sh
npm dev
```

or

```sh
yarn dev
```

## The Patterns implemented (PRs)

---

[![cc-by-4.0](https://licensebuttons.net/l/by/4.0/80x15.png)](http://creativecommons.org/licenses/by/4.0/)
