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
