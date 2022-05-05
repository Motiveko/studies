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

## 2.1 CSS Architecture Checklist
- `Organised` : fixed code structure(일관된 코드 구조)
- `No specificity issues` : 한 컴포넌트의 CSS는 다른 컴포넌트의 CSS와 충돌하지 않아야 한다.
- `Atomic design principles` 
- `Easy to understand`(comments, variables)
  - css 주석 관련하여 `VS Code CSS Comments` 플러그인의 규칙을 따른다.
- `Fully customizable / themeable`

<br>


