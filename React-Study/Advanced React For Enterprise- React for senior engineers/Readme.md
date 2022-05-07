# Advanced React For Enterprise: React for senior engineers

- [Advanced React For Enterprise: React for senior engineers](https://www.udemy.com/course/react-for-senior-engineers/) 강의 정리
- React로 Design System을 구축하는것을 학습한다.

# 1. Introduction to Design System

## 1.1 What are Design Systems

- 디자인 시스템은 중복성을 줄이면서 다양한 페이지와 채널에서 공유 언어와 시각적 일관성을 만들어 대규모로 디자인을 관리하기 위한 일련의 표준이다. 여러 플랫폼/서비스에서 시각적 일관성을 만들어 사용자들에게 하나의 서비스라는 안정감과 신뢰감을 줄 수 있다.
- 참고 글 : [Design Systems 101](https://www.nngroup.com/articles/design-systems-101/#:~:text=Summary%3A%20A%20design%20system%20is,across%20different%20pages%20and%20channels.)

<br>

## 1.2 Atomic Design Principals

- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/#atoms)은 디자인 시스템을 만들기 위한 하나의 방법론이다.
- 컴포넌트 요소를 독립적으로 존재할 수 있는 가장 작은 단위로 분리하고 이를 조합해서 사용한다.
- 가장 작은 요소부터 `Atom` < `Molecules` < `Organisms` < `Templates` < `Pages` 순으로 커진다.
  - `Atom` : 예를 들면 버튼이 있다. 버튼은 더 쪼갤 수 없다.
  - `Molecules`: Atom의 조합으로 만들어진 요소. 예를들면 Input + Label 같은 것들이 있다.
  - `Organisms`: Molecules의 조합으로 만들어진 요소/유기체. 예를들어 Navbar, Footer 같은 것들이 있다.
  - `Templates`: 하나의 페이지 템플릿을 의미한다. Page와의 차이는 데이터의 유무로, 템플릿에 데이터를 넣으면 Page가 된다.
  - `Pages` : 우리가 웹페이지에서 보는 하나의 페이지가 되겠다.

<br>

- [아토믹 디자인 규칙](https://maeng2418.github.io/react/atomic_design/#%EC%95%84%ED%86%A0%EB%AF%B9-%EB%94%94%EC%9E%90%EC%9D%B8-%EA%B7%9C%EC%B9%99)
  - 원자에 margin이나 position과 같은 위치에 영향을 주는 속성을 지정하지 않는다. (페이지내에서 사이드 이펙트를 일으킬 수 있음)
  - 컴포넌트들은 상태를 가지지 않아야 한다.
  - 오직 분자나, 유기체만이 원자들의 위치를 지정할 수 있으며 마찬가지로 자기 자신의 position과 margin을 지정해선 안된다.
  - 템플릿은 오직 그리드만을 가져야하고, 특정 컴포넌트의 위치를 지정해선 안된다.
  - 템플릿위에 컴포넌트를 렌더링하여 페이지를 완성시킨다.
  - 변수를 모아두는 파일(테마나 색상 변수값들)을 만들고 모든 아토믹 컴포넌트가 이 변수를 사용하게끔 만든다.

<br>

## 1.3 Example Design System

- 유명한 디자인 시스템에는 [Carbon Design System(IBM)](https://carbondesignsystem.com/), [Fluent UI(MS)](https://developer.microsoft.com/en-us/fluentui)등이 있다.
- 별건 없고, 이게 디자인 시스템을 만들 때 좋은 지표가 될 수 있기 때문에 잘 참고해야 한다. 각 디자인 시스템의 철학이나 코드 레벨에서의 구현, Doc의 구성 등을 비교해가며 참고하고, 모두 오픈소스로 깃헙 레포지토리에서 관리되고 있으므로 코드를 참고해본다.

<br>

## 1.4 Our role as an engineer in a design system

- 디자인 시스템을 구축하는데서 개발자의 역할은 디자인 철학과 가이드라인을 이해하고 이를 재사용 가능한 코드로 바꾸는 것이다. 디자인 시스템을 보고 재사용 가능한 데이터를 뽑아내서 코드화 시켜야 한다.(예를들어 color pallete를 scss로 변수화 시킨다)

<br><br>

# 2. CSS Architecture

- Design System은 확장성(Scalability), 지속성(Mainainability)가 중요하다. 여기에 맞춰 CSS가 작성되어야 한다.
- [Design System on Figma](https://www.figma.com/file/EX8VxcTtAatzI2PBLb361g/designsystems.engineering?node-id=99%3A0)
- [Material Design Theme Kit Figma](<https://www.figma.com/file/dx7FPC2YajKFAdTW9D1jAZ/Material-Design-Theme-Kit-(Copy)?node-id=0%3A2304>)

## 2.1 CSS Architecture Checklist

- `Organised` : fixed code structure(일관된 코드 구조)
- `No specificity issues` : 한 컴포넌트의 CSS는 다른 컴포넌트의 CSS와 충돌하지 않아야 한다.
- `Atomic design principles`
- `Easy to understand`(comments, variables)
  - css 주석 관련하여 `VS Code CSS Comments` 플러그인의 규칙을 따른다.
- `Fully customizable / themeable`

<br>

### 2.2 scss

### 2.2.1 foundation

- [Material Design Theme Kit](<https://www.figma.com/file/dx7FPC2YajKFAdTW9D1jAZ/Material-Design-Theme-Kit-(Copy)?node-id=0%3A2>)의 Theme Overview를 참고하자.
- foundation에서 정의한 변수들은 가장 기본이 되는 변수들이다. 이를 `atoms/*.scss`에서 사용해서 atom 요소를 스타일링 할 것이다.
- SCSS IntelliSense 플러그인 설치
  - Scss에 대해 자동완성, 추천, hover, Go to 등의 기능을 제공한다.
- 정의할 파일
  - `_varibale.scss`: 가장 기본이 되는 변수(figma 파일 foundation에 정의)
  - `_colors.scss`: color 변수
- 가장 기본이 되는 `_variable.scss`를 제외하고, 이를 사용하는 `_colors.scss` 등의 변수는 모두 css varibale을 사용한다. 이유는 scss를 사용하지 않는 사용자가 커스터마이징 할 수 있어야 하기 때문.

```scss
// scss로 정의, css로는 커스터마이징 할 수 없다.
$body-text-color: $dark;

// css varibale 사용
// --dse같은 prefix를 붙여서 다른 css 변수와 겹치지 않게 한다.
$body-text-color: var(
  --dse-body-text-color,
  $dark
) !default;
```

- `!default`의 의미는 해당 변수가 [어디선가 먼저 정의되지 않았을 경우에만 값을 할당한다는 의미.](https://stackoverflow.com/questions/10643107/what-does-default-in-a-css-property-value-mean)
- 커스터마이징은 scss 사용시 `$body-text-color`를 정의해서, css 사용시 `--dse-body-text-color`를 정의해서 할 수 있다.

### 2.2.2 colors

- color 관련된 변수를 설정한다. 기본이되는 `text-color`, `bg-color`, Button이나 Input등 요소의 `color`, `hover-color`, `focus-border`, `error-border`등의 컬러를 세부적으로 지정한다. `atom/*.scss`에서 파일에서 이걸 쓸것이다.

<br>

### 2.2.3 typography

- `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`등에 대한 정의가 필요하다. Body, Head로 분류할 수 있다. 상세한건 강좌에선 지정하지 않는다.

<br>

### 2.2.4 Mixins

- mixin에는 앱 전체에서 공통으로 사용될 수 있는 `reusable functionality`를 정의한다.

  - 각 break point별 Media query 정의하는 mixin
  - 사전 정의한 spacing skill을 사용하도록 강제하는 spacing mixin(margin, padding)

- mixin 정의 및 사용은 [`Scss Mixin`](https://sass-lang.com/documentation/at-rules/mixin)을 참고하자.
- mixin 작성시 [Scss Map](https://sass-lang.com/documentation/values/maps)을 사용했다. 매우유용하다. Getter 함수 문법이 강의와 공식문서가 다른데 강의는 [`map-get($map, $key)`](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=phlox__&logNo=221181093967), 공식문서는 [`map.get($map, $key)`](https://sass-lang.com/documentation/modules/map#get)문법을 쓴다.
- 강의에서는 spacing관련하여 `padding`, `margin` 두개만 정의했는데 이걸 `margin-top`, `padding-left`과 같이 세부적으로 만들수도 있다.

<br>

### 2.2.5 Global

global 에서는 `foundation`과 `base`를 정의한다.

- `foundation` : foundation에 정의한 전체 scss를 import한다
- `base`: 기본이 되는 css 설정(e.g. Root Variable 정의, Reset Browser CSS)
  - Reset CSS는 [normalize-scss](https://www.npmjs.com/package/normalize-scss) 패키지를 사용한다.
  - \_root에는 `--dse-body-text-color`와 같이 root css variable을 정의한다. 이 때 scss 변수를 css 변수에 할당하는데, 아래와 같은 문법으로 작성해야 한다.
  ```
  # 문법
  --css-variable-name: #{$SCSS_VAR}
  ```
  ```scss
  :root {
    --dse-body-text-color: #{$dark};
    ...
  }
  ```

> 🧐 굳이 root variable을 왜 정의하는건지 모르겠다. 어차피 `$body-text-color: var(--dse-body-text-color, $dark) !default;`같은 형태로 정의했기 때문에 css 변수값이 없으면 자동으로 scss 변수가 사용될텐데. [css var](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#custom_property_fallback_values)

<br>

### 2.2.6 Stylelint

- CSS, SCSS 의 코드베이스 통일을 위해 [`Stylelint`](https://stylelint.io/)를 사용한다. Prettier도 사용한다. ESLint + Prettier 사용하는 원리와 똑같다.

```bash
yarn add --dev stylelint stylelint-config-prettier stylelint-config-sass-guidelines stylelint-prettier
```

```json
{
  "scripts": {
    "lint": "stylelint './**/*.scss'",
    "lint:fix": "yarn lint --fix"
  }
}
```

<br>

### 2.2.7 husky, lint-staged 적용

- [`husky`](https://www.npmjs.com/package/husky)는 git hook으로, 특정 git action 발생시 정해진 로직을 수행하도록 도와준다. after/befor commit, pull, push 등에 사용할 수 있다.
- [`lint-staged`](https://www.npmjs.com/package/lint-staged)은 staged 된 파일에 대해 lint를 수행한다. 내부적으로 `husky`를 사용한다고 한다.
- 설치

```bash
yarn add --dev husky lint-staged
```

- `package.json` 설정

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.scss": "yarn lint:fix"
  }
}
```

- commit 시도 발생시 \*.scss에 대해 lint:fix 스크립트를 수행하고 오류가 있으면 commit을 중단한다.

- 이거 root 폴더가 아니면 작동하지 않는것같다. 테스트필요함

<br>

### 2.2.8 Compile SCSS to css

- [`node-sass`](https://www.npmjs.com/package/node-sass)를 이용해서 `global.scss`를 css로 컴파일한다. 사용자가 원하면 scss를 가져다 쓸수도 있긴 하나, css도 제공해야한다.
- 패키지 설치

```bash
yarn add -dev node-sass
```

- 공식 문서를 참고해서 빌드 스크립트를 작성한다.

```js
// src/scripts/build.js
const fs = require("fs");
const path = require("path");
const sass = require("node-sass");

// 컴포넌트 파일 가져오기
const getComponents = () => {
  let allComponents = [];

  const types = ["atoms", "molecules", "organisms"];

  types.forEach((type) => {
    const allFiles = fs
      .readdirSync(`src/${type}`)
      .map((file) => ({
        input: `src/${type}/${file}`,
        output: `src/lib/${file.slice(0, -4)}css`,
      }));

    allComponents = allComponents.concat(allFiles);
  });

  return allComponents;
};

// filpath를 컴파일하여 filename에 결과 생성
const compile = (filePath, filename) => {
  const result = sass
    .renderSync({
      data: fs
        .readFileSync(path.resolve(filePath))
        .toString(),
      outputStyle: "expanded",
      includePaths: [path.resolve("src")],
    })
    .css.toString();

  fs.writeFileSync(path.resolve(filename), result);
};

// 컴포넌트 컴파일
getComponents().forEach(({ input, output }) => {
  console.log(input, output);
  compile(input, output);
});

// global 컴파일
compile("src/global.scss", "src/lib/global.css");
```

```json
// package.json
{
  "scripts": {
    "build": "node src/scripts/build.js"
  }
}
```

<br>

> ❗️추가적으로, `stylelint`가 기본적으로 css로 린트하는데, stylelint plugin에서 쓸데없는 에러가 많이 난다. 설정에서 빌드 결과물은 제외시키자.

```json
{
  "ignoreFiles": ["./src/lib/*.css"]
}
```

<br><br>

# 3. Monorepositories
> [`lerna`](https://www.npmjs.com/package/lerna)를 이용해 mono-repo를 구축한다.
> 참고 자료 : https://kdydesign.github.io/2020/08/25/mono-repo-lerna/

<br>

## 3.1 Multi-Repo vs Mono-Repo
1. Multi-Repo
- 여러 패키지들을 각각의 Repository에 분산해서 관리하는것을 말한다.
- 장점
  - Repository별 Owner를 지정할 수 있다.
  - 빠른 CI Build
  - 패키지의 명확한 분리로 인한 유연성 향상 : 의존 Repository와 분리되어 있기 때문에 유지보수에 있어 유연성 향상
- 단점
  - 중복된 설정 및 반복된 설치(e.g. eslint, babel)
  - 이슈의 분산 : 별개의 Repository들로 관리되므로 이슈 트래킹도 별도로 가진다. `CHANGELOG`도 분리된다.
  - Dependency Hell : 의존성이 복잡해진다. 같은 모듈을 쓰는 패키지들이 버전 차이에 따라 종속성이 달라지고 이로 인한 충돌을 야기할 수 있다.
  - 공통된 코드의 중복

<br>

2. Mono-Repo
- 여러 패키지들을 하나의 Repository에서 관리하는것을 의미한다.
- 장점
  - 공통 항목의 단일화 : `lint`, `build`, `test`등 공통된 설정 및 `node_module`을 한번의 설치와 한번의 설정으로 모든 패키지가 공유한다.
  - 쉬운 Package 공유 : 패키지가 분산되어 있지 않기 때문에 Package간의 코드 공유가 매우 수월하다.
  - 단일 이슈 트래킹
  - 효율적인 의존성 관리

- 단점
  - Repository의 거대화
  - 느린 CI Build
  - 무분별한 의존성 : Package간 의존성 관리가 쉽다는 장점이 있지만, 오히려 이로 인해 과도한 의존 관계가 발생할 수 있다.
  - Dev Tools의 인덱싱 저하 : Mono-Repo를 하나의 개발 도구로 열 경우 해당 Package의 인덱싱 속도가 느려진다.

<br>

Mono-Repo는 아래의 조건을 만족하는 프로젝트에서 사용하면 좋다.
  1. 서로 다른 패키지가 연관 관계를 가질 경우
  2. 첫 번째 항목이 고려된 상황에서 N개의 패키지의 형태와 목적이 유사한 경우
  3. 두 번째 항목이 고려된 상황에서 N개의 패키지 중 배포되어야 할 패키지의 비중이 큰 경우

<br>

### 3.2 Lerna
- [`Lerna`](https://www.npmjs.com/package/lerna)는 Mono-Repo 패키지를 관리하기 위한 CLI 도구다. 
- 주요 기능은 아래와 같다
  1. Fixed Mode
      - 다중 패키지의 버전이 단일 버전 라인에서 작동하며 관리
      - 버전은 Root에서 관리되며, `learna publish`할 경우 새 버전으로 패키지 게시
      - ***하나의 패키지가 수정되더라도 모든 패키지는 새로운 버전을 개시***
  2. Independent Mode
      - 패키지의 유지 관리자가 서로 독립적으로 패키지 버전을 관리
      - lerna publish시 변경된 패키지에 대해서만 새 버전을 업데이트
      - 버전은 각 패키지의 `package.json`에 명시
  3. Hoisting
      - 다중 패키지에서 사용되는 node module을 최적화하여 중복되는 node module을 최상위 경로로 재구축
      - 공통 종속성을 최상위 수준에서만 설치되며 개별 패키지는 생략
    ![img](https://kdydesign.github.io/2020/08/25/mono-repo-lerna/lerna-hoisting.png)

  4. Yarn Workspace
      - Yarn WorkSpace는 여러 패키지를 하나의 패키지에서 관리하게 해준다.
      - ***Yarn WorkSpace를 통해 각 패키지는 서로 참조하는 연관 관계를 가질 수 있다.*** 
      - npm도 v7부터 workspace를 도입했다고 한다.
- 가장 주요 명령어는 아래와 같다.
  1. `lerna clean`: Root를 제외한 package의 node_modules 제거
  2. `lerna bootstrap`: 모든 패키지의 node_modules 설치
  3. `lerna run`: 각 패키지의 package.json에 명시된 script를 실행
  4. 그 외 : https://github.com/lerna/lerna/tree/main/commands

<br>

### 3.3 Setup
- core package 설치 및 초기화
```bash
yarn init
yarn add -dev lerna
yarn lerna init
```
- `package.json`에 아래 내용을 추가한다.
```json
{
  "private": true,
  "workspaces": {
    "packages": [
      "packages/*"
    ],
    "nohoist": ["**/normalize-scss"]
  }
}
```
- private은 core 패키지가 publish 되지 않고 하위 패키지를 관리하는 용도임을 명시한다.
- workspace 옵션은 lerna에서 사용할 옵션으로 보인다. `packages`는 하위 패키지들이 있는 위치, `nohoist`는 하위 패키지 의존성중 호이스팅(core에 설치)시키지 않을 패키지를 의미한다.

> `normalize-scss`는 호이스팅이 안된다고한다. 이게 패키지 레벨에서 지원이 안되는건지, scss @import 로 사용해서 안되는건진 잘 모르겠다.

- `lerna.json` 에 아래 내용을 추가한다.
```json
{
  "npmClient": "yarn",
  "useWorkspaces": true,  // npmClient의 workspace(package.json에 정의)를 공유해서 사용한다.
  "stream": true  // stream 아웃풋을 디버깅 할 수 있게 출력
}
```

> [package.json의 workspace관련 설정 ([npm](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#workspaces), [yarn](https://yarnpkg.com/configuration/manifest#workspaces))과 [lerna.json의 설정](https://github.com/lerna/lerna#lernajson)에 관련해서는 강의의 내용에 대해서는 공식문서에서 찾을 수가 없다. 따라서 대략적으로 추론하여 정리함.

- 모든 node_modules 폴더를 지우고 루트에서 `yarn`을 입력해서 다시 설치해보자. 아래와 같이 설치된다.
```bash
node_modules/ # @ds.e/scss 를 포함한 모든 의존성 설치(호이스팅)
packages/scss/node_modules/ # ./bin/ : symlink들, 이외 의존성 설치되지 않음
```
- yarn은 개발중인 패키지의 의존성을 호이스팅하여 root 폴터로 집어넣는다.(중복은 제거된다)
- core의 package.json에 build script를 작성한다.
```json
{
  "scripts": {
    "build": "yarn lerna run build"
  }
}
```
- 해당 스크립트는 모든 하위 패키지에서 `yarn build`를 실행한다.

<br>