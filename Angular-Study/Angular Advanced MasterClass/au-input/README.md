## custom input component

### 컴포넌트 스타일링 방법
- 컴포넌트의 스타일시트에 작성
  - 컴포넌트 내부 요소들에만 스타일 적용 가능(컴포넌트별 `_ngcontent-..-..`, `_nghost-..-..` 어트리뷰트 적용하여 스타일 캡슐화)

- `pseudo host selector`
  - 컴포넌트 스타일 시트에 `:host`셀렉터로 스타일 입히면 컴포넌트 자체(`au-fa-input`)에 스타일 입힐 수 있다.
- 컴포넌트 내부 스타일은 가급적 `structural style`만 작성한다. structural style은 보통 컴포넌트의 설계 디자인이기 때문에 재정의하면 안되기 때문이다. color 같은것은 `theme`으로 외부에서 정의할 수 있어야 재사용성이 좋아진다.

<br>

### 컴포넌트 API 디자인
- 기본 HTML Element를 래핑하는 형태가 되는 API 디자인은 ***피해야***한다
  - 이 프로젝트로 예로들면, `input`을 컴포넌트 내부에 정의하고 필요한 프로퍼티를 밖으로 빼면 너무 많은 API가 생길것이다.(`placeholder`, `value`, `formControlName`, ...)
  - 따라서 단순히 HTML Element를 래핑하는 형태의 API 디자인은 지양한다. 대신 `Content Projection`을 사용하자.
- `Content Projection`으로 외부에서 넣은 요소들은 ***부모 요소와 동일한 앵귤러 HTML 어트리뷰트***를 가진다. 따라서 ***컴포넌트 내부에서 정의한 css는 먹지 않는다!***
  - 이는 **꽤나 특수한 케이스**로, 컴포넌트의 스타일시트에서 프로젝션 요소에 대한 셀렉터 앞에 `::ng-deep`(옛날엔 `/deep/`)을 붙이면 ***css 셀렉터에 컴포넌트 어트리뷰트가 안붙는다.***
  - 그러나 이렇게 했을 경우 해당 셀렉터는 전역 셀렉터가 되어 어디서 영향을 끼칠지 모른다. 이를 해결하려면 `:host`를 앞에 또 붙여주면 된다!
  ```css
  /* au-fa-input.component.css */
  :host ::ng-deep input {
    border: none;
  }
  ```
  ```css
  /* 빌드된 결과 => 컴포넌트 내 input 요소에 대한 셀렉터가 된다. */
  [_nghost-oha-c11] input {
    border: none;
  }
  ```

<br>

### 컴포넌트와 Content Projection 요소의 상호작용
- 컴포넌트 내부에서 `Content Projection`된 요소에 대한(의한) 조작이 필요할 때(여기선 input요소의 focus, blur에 대한 처리), 해당 요소를 어떻게 쿼리할까?
  - `@ContentChild({Template Reference})` -> 사용자가 사용법 기억하기도 어렵고, 붙이지 않았을 때 에러를 만들기도 힘들다.
  - NativeHTML 쿼리 -> @ContentChild는 NativeHTML로 쿼리 불가능하다. 아래만 가능하다.
    - `@Component`, `@Directive`로 작성된 앵귤러 클래스 타입
    - `TemplateReference`
    - `Provider`가 정의된 요소
    - `TemplateRef` (`ng-template`요소를 전달했을 때)
- 이중에서 `Directive`를 사용한다. Auxiliary Directive.
  ```ts
  /* input-ref.directive.ts */
  @Directive({
    selector: 'au-fa-input input'
  })
  export class InputRefDirective {
    focus = false; // focus 여부

    @HostListener('focus')
    onFocus() {
      this.focus = true;
    }

    @HostListener('blur')
    onBlur() {
      this.focus = false;
    }
  }
  ```

  - `selector: 'au-fa-input input'` 는 au-fa-input 요소의 자식 요소중 input 요소를 참조한다.
  - `@HostListener`로 찾은 input요소의 `focus`,`blur` 이벤트에 반응해 focus 속성값을 업데이트한다. 
  ```ts
  // au-fa-input.component.ts
  export class AuFaInputComponent implements AfterContentInit {

    @ContentChild(InputRefDirective)
    input!: InputRefDirective;
  
    ngAfterContentInit(): void {
      if(!this.input) {
        console.error('the au-fa-input needs an input its content');
      }
    }

    @HostBinding('class.input-focus')
    get isInputFocus() {
      return this.input ? this.input.focus : false;
    }
    // ...
  }
  ```
  - `AuFaInputComponent`에서는 Content Projection 요소중 `InputRefDirective`의 셀렉터 `au-fa-input input`에 맞는 요소를 찾는다.
  - `ngAfterContentInit`에서 Content Child요소를 쿼리할 수 있는데, 없다면 적절한 에러를 출력한다.
  - `@HostBinding`을 통해 input요소에 focus 이벤트 발생시 호스트 요소에 `input-focus` 클래스를 추가하다록 한다.
  ```css
  /* au-fa-input.component.css */
  :host(.input-focus) {
    outline: none;  
    border: 1px solid #4D90FE;
    -webkit-box-shadow: 0px 0px 5px #4d90FE;
    box-shadow: 0px 0px 5px #4d90FE;
  }
  ```
  - host요소에 input-foucs클래스가 있으면 위의 스타일(파랑 테두리)를 적용한다! 이로써 컴포넌트와 Content Projection 요소간의 상호작용이 구현되었다!😱

<br>

### Scss 적용
> 여기서부터는 scss로 작성한다. 
- css로 작성하던 프로젝트의 scss적용방법은 아래와 같다. 우선 `angular.json`를 아래와같이 수정한다.
  ```json
  // angular.json
  "schematics": {
    "@schematics/angular:component": {
      "style": "scss"
    },
    //...

    "build": {
      "options": {
        "inlineStyleLanguage": "scss",
        // ...
  ```
- ***모든 css를 scss로 바꾼다.*** css에 scss를 import해서 쓰면 뭔가 컴파일이 제대로 안돼서 동작하지 않는다. ***반드시 scss로 다 바꾸자.***

<br>

### Component Theme Styles
- `:host-context` 셀렉터 : 호스트 요소(컴포넌트)와 그 부모요소들을 의미한다. 근데 컴파일되어 적용되는건 호스트요소
  - 예) `:host-context(.au-fa-input-red-theme) .input` 이라고 하면 호스트 요소와 부모중 `.au-fa-input-red-theme`가 있는애가 있으면, 호스트 요소의 자식중 `.input`인 애를 셀렉트한다.
  - 따라서 :host-context를 쓰면서 호스트 요소를 셀렉트하려면 `:host-context(.au-fa-input-red-theme).input` 형태가 되어야 한다.
  ```scss
  /* _au-fa-input-red-theme.scss */
  $border-color: red;
  :host-context(.au-fa-input-red-theme) {
    border-color: $border-color;
    &.input-focus {
      -webkit-box-shadow: 0px 0px 5px  $border-color;
      box-shadow: 0px 0px 5px  $border-color;
    }
  }
  ```
  - 위와 같이 작성하고 기본 scss에 default theme 아래에 import한다.

<br>

### Component Style Encapsulation
- 앵귤러의 기본 전략은 컴포넌트마다 `...nghost...`, `...ngcontent...` 어트리뷰트를 자동생성하고 css 셀렉터에도 이를 붙여 컴포넌트 단위로 스타일을 고립시키는 것이다(.`Emulated View Encapsulation`)
- 이런 방식으로 해결하지 못하는 문제는 `style.css`나 `index.html`등에 정의한 css는 고립되지 않은채 모든 컴포넌트에 영향을 줄 수 있다는 것이다.
- `ShadowDOM`으로 컴포넌트를 Encapsulation하면 애플리케이션에서 컴포넌트를 완전히 고립시킬 수 있다. 그러나 서드파티 라이브러리를 사용할 수 없다는(예를들면 font-awesome 아이콘) 치명적인 문제가 발생한다.(아마 해결 방법은 있을듯)

<br>

### NgModule로 결합 및 AOT 컴파일러 작동 테스트
- `ng serve`로 동작되는 개발 서버 모드는 JIT으로 컴파일한다(소스코드에 컴파일러 포함). 빌드 속도도 빠르고 개발시 브라우저에서 동작을 확인해야하기 때문
- 프로덕션 빌드시 `AoT`로 컴파일 하게되는데, 이를 따로 테스트해야한다고 한다. 컴파일시 에러를 잡아주기 때문인 것 같다. 아래 명령어로 개발서버에 aot로 컴파일해서 올려보자
```bash
$ ng serve  --aot -c production
```

<br>

### 모듈 배포
- 프로젝트 루트 폴더에 index.ts를 만들고 아래와 같이 module export 해준다.
```ts
// index.ts
export { AuInputModule } from './src/app/lib/au-input.module';
```

<br>

### 컴포넌트 테스트하기
- 랜더링 테스트를 하기 때문에 Interation Testing이다.
- 아래 내용을 테스트한다.
  - `au-fa-input`을 잘 랜더링했는지
  - projection이 잘 됐는지
  - icon이 잘 생성됐는지
  - icon에 적절한 클래스가 지정되었는지

- 테스트 가독성을 높이기 위해서 test suite를 최대한 잘게 쪼갠다(한테스트당 하나의 기능 테스트). 대신 공통 로직을 `beforeEach`로 분리해야한다.(분리할 수 있는 단위로 `describe`를 작성)
```ts
  let fixture: ComponentFixture<AppComponent>,
    component: AppComponent,
    el: DebugElement,
    emailField: DebugElement;
    
  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, AuFaInputComponent, InputRefDirective
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    el = fixture.debugElement;
    emailField = el.query(By.css('#email-field'));
    fixture.detectChanges();
  })

  it('should create a font awesome email input', () => {
    expect(emailField).toBeTruthy();

  })
  it('should include the correct email icon inside the email input ', () => {
    console.log(emailField.nativeElement);
    expect(emailField.query(By.css('i.icon.fa.fa-envelope'))).toBeTruthy();
  })

  it('should have projected the correct test input inside the email field', () => {
    expect(emailField.query(By.css('input'))).toBeTruthy();
  })
```

<br>

### Publishing
- 앵귤러 프로젝트에는 [Angular Package Format(APF)](https://angular.io/guide/angular-package-format)라는게 있다. `@angular/core`, `@angular/material`등과 같은 앵귤러 프로젝트들이 따르는 프로젝트 구조. 강의의 APF는 Deprecated된 옛날 구조로 [Angular-Quickstart-lib](https://github.com/angular/angular-cli)을 따른다. 그냥 한번 쭉 보고 분석해보자. 지금은 `Angular cli`로 만들라고 한다.
- npm에 올리고 싶지 않은 파일이 `.gitignore`과 다르면 `.npmignore`를 작성하면 된다.(작성 안하면 기본적으로 `.gitignore`를 읽는다)
- package.json에 아래 내용 정리하고 올린다.
  - name: 다른 public repo와 중복되지 않는 이름
  - private: false
- APF를 따라서 구조화된 패키지는 Agnular cli 프로젝트에서 사용가능하며, UMD를 쓰는 System.js에서도 사용 가능하다고 한다. 이 부분은 `UMD`에 대한 추가적인 스터디가 필요한것으로 보인다. bundles/au-input.umd.js 등이 umd 모듈인듯하다.
> https://www.zerocho.com/category/JavaScript/post/5b67e7847bbbd3001b43fd73
- README.md에는 라이센스, 설치, 사용방법을 적어준다. 많은 오픈소스 라이브러리들을 참고해서 작성하면 될 듯.
<!-- https://github.com/angular-university/au-input 의 Readme 참고 -->

<br>

