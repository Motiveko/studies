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
        ```typescript
        const exampleObject = { name: 'Usagi Tsukino' };
        console.log(exampleObject);
        exampleObject.name = 'Sailor Moon';
        ```
        - 위와같은 코드 실행시, 콘솔창에서 Object Object누르면 나오는 name값은 Sailer Moon이 된다.
        - 이를 방지하기 위해 Json.Stringify()를 string으로 만들어 찍으면 동기적으로 찍힌다.
        ```typescript
        console.log(JSON.stringify(exampleObject, null, '  '));
        ```

        - interactive하게 console을 찍고 싶다면 JSON.parse로 한번더 묶어주자.
        ```typescript
        console.log(JSON.parse(JSON.stringify(exampleObject)));
        ```

### [Testing Components](https://github.com/Motiveko/studies/tree/master/Angular-Study/Angular-Test/src/app/components/counter)
... 작성중 ...
- Filling out Forms
    - Angular의 Testing Tool은 form을 쉽게 채울수 있는 솔류션이 없다. 따라서 NativeElement를 찾아서 elemnt.value = {SOMETHING} 으로 채워야한다.
    - Angular의 Form은 직접 value change를 detect할 수 없다. input에서 valueChange가 발생할 때 브라우저에서 'input'이벤트를 발생시키는데, 이를 감지한다.
    - 따라서 input에 value를 패우고, 'input'이벤트를 발생기켜서 Agnular가 value change를 알아차리게 해야한다.
        ```typescript
            const resetInputEl = findEl(fixture, 'reset-input').nativeElement;
            resetInputEl.value = '123';
            resetInputEl.dispatchEvent(new Event('input'));
        ```
    - IE에서는 new Event()가 작동하지 않으므로 이벤트를 조금 더 복잡한 방법으로 생성해야한다.
        ```typescript
            const event = document.createEvent('Event');
            event.initEvent('input', true, false);
            resetInputEl.dispatchEvent(event);
        ``` 

- Testing Inputs
    - ComponentInstance.{INPUT_PROPERTY} 로 @Input으로 부모Component에서 받는 값을 test에서 직접 설정 가능하다.
    - 그런데 @Input의 값의 변화에 후킹되는 OnChanges()는 테스트 환경에서는 자동으로 실행되지 않으므로 ComponentInstance.OnChanges()로 따로 호출해줘야 한다.

- Testing Outputs
    - @Output 데코레이터로 장식되는 EventEmitter는 RxJs Subject를 상속하는데, 부모컴포넌트의 @Output의 이벤트 바인딩은, 내부적으로 EventEmitter를 구독해서 next()를 구현하는것이다.
    
    - 따라서, Output의 EventEmitter를.emit(value)가 정상작동했는지를 테스트하려면 @Output이 붙은 컴포넌트의 프로퍼티를 구독하여 next()로 넘어오는 값을 테스트하면 된다.

    - Component 초기화 후 increment버튼을 누르면 시작값 + 1이 emit되는지 테스트하는 코드는 아래와 같다.
    ```typescript
    it('increment버튼 클릭 시 countChange는 startCount + 1을 방출한다.', () => {
        let actualCount: number | undefined;
        // Arrange(given)
        component.countChange.subscribe((count: number) => {
        actualCount = count;
        });
        // Act(when)
        click(fixture, 'increment-button');
        // Assert(then)
        expect(actualCount).toBe(startCount + 1);
    });
    ```
    - 위 코드에서, subscribe()에서 next()에 바로 expect를 넣어서 테스트 할 수도 있다. 가능은 하지만 문제가 있는 방식인데, 이유는 테스트에 문제가있거나, 컴포넌트가 변경되어서 click이 emit()을 아예 발생시키지 않을 경우, Jasmine은 expectation이 없다고 WARN 메시지를 보내고 테스트를 통과시키기 때문이다.
    ```
    WARN: 'Spec 'CounterComponent increment버튼 클릭 시 countChange는 startCount + 1을 방출한다.' has no expectations.'
    ```

    - 따라서 expectation은 반드시 실행될 수 있는 동기적인 자리에 배치해야한다.

- Repetitive Component specs
    > 반복적인 테스트를 어떻게 줄일 수 있을까?

    - beforeEach, afterEach 등은 반복을 줄이는 대표적인 예
    - 반복적인 작동을 helper method로 추상화하거나, 라이브러리를 사용해 줄일 수 있을 것이다.
        - 그러나 테스트를 읽는 사람이 helper method에 대해 잘 인지해야한다.
        - 자신만의 skill이나 습관을 추상화 하면 오히려 가독성이 매우 안좋아진다.
    - 반복을 줄이는 것의 궁극적인 목표는 테스트륵 쉽게 읽고 쉽게 파악하도록 하는 것이다.

    - (예) Testing Output은 모두 increment, decreement, reset 버튼 클릭 시 output이 이벤트를 방출하는 공통부분이 있다. 이를 RxJs의 operator를 사용해 합칠 수 있다.
    ```typescript
    import { take, toArray } from 'rxjs/operators'

    it('버튼 클릭으로 countChange event 방출', () => {
        let resetValue = 444;
        let actualCounts: number[] | undefined;

        component.countChange.pipe(take(3), toArray()).subscribe((counts) => {
            actualCounts = counts;
        });
    
        click(fixture, 'increment-button');
        click(fixture, 'decrement-button');
        setFieldValue(fixture, 'reset-input', String(resetValue));
        click(fixture, 'reset-button');

        expect(actualCounts).toEqual([startCount + 1, startCount, resetValue]);
    });
    ```
    - 위의 코드는 click을 3회 발생시키고 순서대로 next()를 통해 받을 값을 3회 묶어서 array로 만들었다. expectation 역시 array를 통째로 expect해 1번으로 테스트가 가능하다.

- BlacBox vs WhiteBox Testing
    - BlackBox는 Component에 어떤 Input을 넣고 내부 동작을 고려하지 않고, Output을 테스트한다.
    - WhiteBox는 내부 동작을 고려하고 이를 구현한다.
    - 우리가 위에서 한 테스트는 모두 BlackBox이다.
        - increment 버튼을 클릭했고(Input), 내부에서 어떤메소드가 호출되고 작동하여 최종적으로 어떤 값이 랜더링되거나 방출되는지(Ouptput)을 테스트했다.
        - 이를 WhiteBox테스트로 바꾸면, 컴포넌트 내부 increment()를 직접 호출하고(내부로직 관여) 어떤 값이 랜더링 하는지 테스트할 것이다.
        ```typescript
        describe('CounterComponent', () => {
            /* … */
            it('increments the count', () => {
                component.increment();
                fixture.detectChanged();
                expectText(fixture, 'count', '1');
            });
        });        
        ```
        - 이런식의 테스트는 컴포넌트 테스트시 권장되지 않는다. 이유는 template에서 버튼이 사라졌다고 가정할 때, increment()는 호출될 일이 없고, 테스트가 의미가 없을 것이기 때문.

        - Angular의 DOM, Component, Input, Output이 상호작용 하는것을 테스트 할 때 의미가 있다.
            (물론 WhiteTest로 해야하는 부분도 있다.)
        - 아래의 표는 Component 테스트 시 BlackBox로 테스트해야 하는 부분을 의미한다.

        | ClassMember | Acess from Test | 
        |---|:---:|
        | `@Input Properties` | O (write) | 
        | `@Output Properties` | O (subscribe) |  
        | `Lifecycle Methods` | Avoid, except for OnChanges |  
        | `Other public Methods` | Avoid |  
        | `Private Properties & Methods` | WhiteBox(DOM등과 직접 상호작용하지 않는다.) |  


