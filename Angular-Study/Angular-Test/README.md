# AngularTest
> Angular 프로젝트 테스트방법 학습 프로젝트

학습자료는 [Testing Angular - A Guide to Robust Angular Applications](https://testing-angular.com/introduction/#introduction).

<br>

---

<br>

### Faking Dependencies
> Arrange(given) 단계에서 테스트 하고자 하는 부분을 고립시키기 위해 의존관계를 가짜로 만든다(mock, stub, ..)
- jasmine.createSpy( STATEMENT )
    - 예) const fetchSpy = spyOn('fetch').and.returnValue( SOMETHING )
    - Spy객체를 반환하고, return값을 정해줄 수 있다.
    - 생성자 DI등에 Spy객체를 넣어서 사용 가능, 그런데 특정 타입의 Spy객체를 생성하고 특정 method의 return을 spy하는 법은 아직 나오지 않았다.
    - expect(fetchSpy).toHaveBeenCalledWith('/todos'); 같은 방식으로 method호출 테스트 가능
    - [Jasmine Reference: Spy](https://jasmine.github.io/api/edge/Spy.html)

<br>

- spyOn( SOME_EXISTING_METHOD )
    - 예) spyOn(window,'fetch').and.returnValue( SOMETHING )
    - 이미 존재하는 global method 등을 spy한다.
    - 생성자 DI등을 사용하지 않는 method도 이렇게 global하게 overwrite해서 테스트하는 부분을 isolate할 수 있다.
    - [Jasmine Reference: SpyOn](https://jasmine.github.io/api/edge/global.html#spyOn)


### Debugging Tests

- Test Focus
    > 테스트가 복잡해지고 방대해지면, 테스트를 수정하여 리로드해 다시 결과를 얻는데 오래걸리는데, 이를 막기 위해 작업중인 특정 테스트만 Focus해서 실행/재실행/컴파일 할 수 있다.
    - suite 단위 focus
        - describe(...) -> fdescribe(...)
    - spec 단위 focus
        - it(...) -> fit(...)
    - 하나의 파일만 번들링하여 테스트
        - ng test --include {{SPEC FILE}}   
        - Angular Core같은 공통적인 라이브러리와 특정 테스트 파일만 번들링 하기 때문에 reload가 매우 빠르다.
    - 개발 후 commit 전 testcode의 focus를 반드시 제거해야한다.
        - eslint의 커스텀 설정으로 focuscode 색출
            - https://timdeschryver.dev/blog/dont-commit-focused-tests
        - jest 사용시 -> eslint-plugin-jest 사용

- Debug output and the JavaScript debugger
    > 브라우저 debugger, console.log, AsyncLogging, Log a SnapShot등으로 테스트를 디버깅 할 수 있다.
    - debugger
        - 디버거는 js의 execution을 중지하기때문에, async process나 여러 execution의 순서가 이상하게 될 수 있다.
    - console.log
        - 원시적이지만 강력한 방법. 
        - Object를 console로 찍을 때 렌더링이 async하게 되는데, 여기서 문제가 발생할 수 있다.
        ```
        const exampleObject = { name: 'Usagi Tsukino' };
        console.log(exampleObject);
        exampleObject.name = 'Sailor Moon';
        ```
        - 위와같은 코드 실행시, 콘솔창에서 Object Object누르면 나오는 name값은 Sailer Moon이 된다.
        - 이를 방지하기 위해 Json.Stringify()를 string으로 만들어 찍으면 동기적으로 찍힌다.
        ```
        console.log(JSON.stringify(exampleObject, null, '  '));
        ```

        - interactive하게 console을 찍고 싶다면 JSON.parse로 한번더 묶어주자.
        ```
        console.log(JSON.parse(JSON.stringify(exampleObject)));
        ```

### Testing Components
