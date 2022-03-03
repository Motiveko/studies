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

### Component Theme Styles

