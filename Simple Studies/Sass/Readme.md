# Sass Crash Course
![sass](https://miro.medium.com/max/800/1*Fk9lVjzWan0OgYa828emhw.png)


### 급하게 실무에 도입하기 위한 Sass 스터디!   
> 학습자료 :  https://www.youtube.com/watch?v=Zz6eOVaaelI

<br>

### 정리
- Sass 라이브 컴파일러 : VSCode Extension - `Live Sass Compiler`
  - 브라우저는 sass를 읽지 못하므로 css로 실시간 변환해준다.
  - scss -> css로 컴파일하고, vendor prefix도 알아서 만들어준다.
- 변수 선언
  ```scss
    $변수명 : 값
  ```
  ```scss
    $primaryBtn: rgb(56, 146, 142);
    header button {
      background: $primaryBtn;
    }
    .contact button {
      background: $primaryBtn;
    }
  ```
- `selector`의 중첩이 가능하다. 중첩에 `::after`, `:hover` 등을 쓰려면 앞에 `&`를 붙인다.
  ```css
  <!-- 기존 css -->
  header {
    display: flex;
  }

  header button {
    background: $primaryBtn;
  }
  header button:hover {
    background: red;
  }
  header button:after {
    content: 'AFTER';
  }  
  ```
  ```scss
  <!-- sass에서 중첩 -->
  header {
    display: flex;
    button {
      background: $primaryBtn;
    }
    &:hover {
      background: red;
    }
    &::after {
      content: 'AFTER';
    }
  }
  ```

- 파일 분리 - scss파일을 분리해서 만들고 `@import`를 이용해 합칠 수 있다.
  
  ```scss
  // _variables.scss
  $primaryBtn: rgb(56, 146, 142);
  $textColor: rgb(43, 43,43);

  // _header.scss
  header {
    background: lightblue;
    // ...
  }
  ```
  ```scss
  // style.scss
  @import './variables';
  @import './_header';
  ```
- `mixin`을 이용한 스타일 함수화. 여러 스타일을 묶어서 재사용 가능하고, 함수와 같이 호출시 매개변수 전달이 가능하다.
  ```scss
  @mixin flexCenter($direction, $background) {
    height: 100vh;
    display: flex; 
    justify-content: center;
    align-items: center;
    flex-direction: $direction;
    background: $background;
  }

  header {
    // 수직 방향으로 가운데 정렬, 배경색 skyblue
    @include flexCenter(column, skyblue);  
    background: lightblue;
    height: 100vh;

  }
  .contact  {
    // 수평 방향으로 가운데 정렬, 배경색 lightgrey
    @include flexCenter(column, lightgrey);
  }
  ```
- `extend` 키워드를 이용한 특정 요소의 스타일 상속
  ```scss
  header {
    height: 100vh;
    color: $textColor;
    background-color: lightblue;
    button {
      background: $primaryBtn;  
    }
  }
  .contact  {
    // header 에 정의된 스타일을 그대로 사용한다.
    @extend header;
    // override도 가능
    background-color: aliceblue;
  }
  ```
- 연산자 (`+`,`-`,`/`,`*`)를 이용한 값의 계산
  ```scss
  .contact  {
    // width는 80%가 된다.
    width: 100% - 20%
  }
  ```