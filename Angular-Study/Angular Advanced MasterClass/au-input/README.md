## custom input component

### 컴포넌트 스타일링 방법
- 컴포넌트의 스타일시트에 작성
  - 컴포넌트 내부 요소들에만 스타일 적용 가능(컴포넌트별 `_ngcontent-..-..`, `_nghost-..-..` 어트리뷰트 적용하여 스타일 캡슐화)

- `pseudo host selector`
  - 컴포넌트 스타일 시트에 `:host`셀렉터로 스타일 입히면 컴포넌트 자체(`au-fa-input`)에 스타일 입힐 수 있다.
- 컴포넌트 내부 스타일은 가급적 `structural style`만 작성한다. structural style은 보통 컴포넌트의 설계 디자인이기 때문에 재정의하면 안되기 때문이다. color 같은것은 `theme`으로 외부에서 정의할 수 있어야 재사용성이 좋아진다.

<br>

### 컴포넌트 API 디자인
- 기본 HTML Element를 래핑하는 형태가 되는 API 디자인은 피해야한다
  - 이 프로젝트로 예로들면, `input`을 컴포넌트 내부에 정의하고 필요한 프로퍼티를 밖으로 빼면 너무 많은 API가 생길것이다.(`placeholder`, `value`, `formControlName`, ...)
  - 따라서 단순히 HTML Element를 래핑하는 형태의 API 디자인은 지양한다. 대신 `Content Projection`을 사용하자.
- `Content Projection`으로 외부에서 넣은 요소들은 부모 요소와 동일한 앵귤러 HTML 어트리뷰트를 가진다. 따라서 ***컴포넌트 내부에서 정의한 css는 먹지 않는다!***
  - 이는 **꽤나 특수한 케이스**로, 컴포넌트의 스타일시트에서 프로젝션 요소에 대한 셀렉터 앞에 `::ng-deep`(옛날엔 `/deep/`)을 붙이면 ***css 셀렉터에 컴포넌트 어트리뷰트가 안붙는다.***
  - 그러나 이렇게 했을 경우 해당 셀렉터는 전역 셀렉터가 되어 어디서 영향을 끼칠지 모른다. 이를 해결하려면 `:host`를 앞에 또 붙여주면 된다!
  ```css
  /* 컴포넌트에서 작성한 css */
  :host ::ng-deep input {
    border: none;
  }
  ```
  ```css
  /* 빌드된 결과 */
  [_nghost-oha-c11] input {
    border: none;
  }
  ```

<br>
