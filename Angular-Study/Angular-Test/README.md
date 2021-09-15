# AngularTest
> Angular 프로젝트 테스트방법 학습 프로젝트

학습자료는 [Testing Angular - A Guide to Robust Angular Applications](https://testing-angular.com/introduction/#introduction).


<br>

---

<br>

## Faking Dependencies
> Arrange(given) 단계에서 테스트 하고자 하는 부분을 고립시키기 위해 의존관계를 가짜로 만든다(mock, stub, ..)
- jasmine.createSpy( STATEMENT )
    - 예) const fetchSpy = spyOn('fetch').and.returnValue( SOMETHING )
    - Spy객체를 반환하고, return값을 정해줄 수 있다.
    - 생성자 DI등에 Spy객체를 넣어서 사용 가능, 그런데 특정 타입의 Spy객체를 생성하고 특정 method의 return을 spy하는 법은 아직 나오지 않았다.
    - expect(fetchSpy).toHaveBeenCalledWith('/todos'); 같은 방식으로 method호출 테스트 가능
    - [Jasmine Reference: Spy](https://jasmine.github.io/api/edge/Spy.html)

<br>

- spyOn(SOME_COMPONENT, METHOD )
    - 예) spyOn(window,'fetch').and.returnValue( SOMETHING )
    - 이미 존재하는 global method 등을 spy한다.
    - 생성자 DI등을 사용하지 않는 method도 이렇게 global하게 overwrite해서 테스트하는 부분을 isolate할 수 있다.
    - **_spyOn으로 faking한  method는 실제 호출이 이뤄지지 않는다. expect()의 paramter로 호출 여부를 테스트한다._**
    - [Jasmine Reference: SpyOn](https://jasmine.github.io/api/edge/global.html#spyOn)


## Debugging Tests

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

<br>

---

<br>


## [10. Testing Components](https://github.com/Motiveko/studies/tree/master/Angular-Study/Angular-Test/src/app/components/counter)

Testing Component에선 아래와 같은 내용을 다룬다.
- Angular의 Test Module을 이용해서 컴포넌트를 셋팅한다.
- 컴포넌트 테스트를 추상화한다.
- 랜더된 DOM에 접근해 text content를 검사한다.
- 유저의 click 같은 동작들을 simulating한다.
- 컴포넌트의 @Input, @Output을 테스트한다.
- 컴포넌트 테스트에 전반적으로 사용되는 함수를 helper function으로 만든다.

<br>

## 10.1 Unit Testing for the Counter Component
Counter Component를 테스트 할 것이다. 테스트에 앞서 컴포넌트가 무슨 동작을 하는지, 무슨 동작을 테스트할 것인지, 어떻게 이 동작을 테스트 할 것인지 정리해야한다.

Counter Component는 아래와 같은 동작을 할 것이다.
- 현재 count를 랜더링한다. 초기값은 0으로 @Input으로 받는다.
- 유저가 + 버튼을 누르면 count는 1 증가한다.
- 유저가 - 버튼을 누르면 count는 1 감소한다.
- 유저가 reset input에 값을 입력하고 reset 버튼을 누르면 count는 해당 값으로 초기화된다.
- count값이 변하면 @Output은 새 count값을 emit한다.

**_컴포넌트가 무엇을 하는지 적는것은 유닛테스트 작성에 큰 도움이 된다._**


<br>

## 10.2 TestBed
어떤 컴포넌트를 랜더링 하는 과정은 꽤나 번거롭고 복잡하다. main.ts에서 platform을 만들고 AppModule을 Bootstrap한다. Component는 의존성 등이 주입되고 인스턴스로 생성되고, 템플릿은 Javascript코드로 변환된다.
최종적으로 template은 DOM으로 랜더링된다. 

**_이 복잡한 과정을 대신해 주는것이 Angular에서 제공하는 [TestBed](https://angular.io/api/core/testing/TestBed)이다. **_TestBed는 어플리케이션의 설정과 환경을 구축해, 어플리케이션의 특정 부분을 테스트 할 수 있게 도와준다._**

<br>

## 10.3 Configuring the test Module
TestBed는 일반적인 모듈의 설정과 같이, imports, declarations, providers를 설정할 수 있다. 아래와 같이 TestBed의 static method인 configureTestingModule()으로 설정한다.

```ts
TestBed.configureTestingModule({
  imports: [ /*… */ ],
  declarations: [ /*… */ ],
  providers: [ /*… */ ],
});
```

UnitTest에서는 Test시 필요한 것을만 모듈에 추가하도록 한다. 테스트할 대상과 필수 의존성, fake객체 등이다.

Counter Component는 의존성이 없는 컴포넌트로 테스트 컴포넌트만 추가하면 된다.

```ts
TestBed.configureTestingModule({
	declarations: [CounterComponent],
})
```

이렇게 설정하면 CounterComponent는 TestBed 모듈의 일부가 된다. 마무리를 위해 아래와 같은 과정이 필요하다.

```ts
TestBed
	.configureTestingModule({
    declarations: [CounterComponent],
	})
	.compileComponents();
```
compileComponents()는 Angular Compiler가 템플릿 코드를 javascript로 해석하도록 한다.( => 컴포넌트를 컴파일 한다)<br>
configureTestingModule()는 TestBed를 return하므로 체이닝이 가능하다.

<br>

## 10.4 Rendering the Component

Testing Module에 Component관련 설정이 끝나면 createComponent()를 통해 랜더링 할 수 있다.

```ts
const fixture = TestBed.createComponent(CounterComponent);
```

createComponent() 인자로 랜더링을 원하는 컴포넌트 타입을 넣어주면 해당 컴포넌트의 Wrapper class인 **[ComponentFixture](https://angular.io/api/core/testing/ComponentFixture)** 타입을 return한다.

createComponent()는 Component를 div 컨테이너에 랜더링 하는데, 이 때 모든것을 랜더링하는것이 아니라, static한 요소들만 랜더링한다. 예를들어 {{count}} 같은 동적인 HTML요소는 랜더링 하지 않는데 이를 랜더링 하기 위해서는 detectChanges()가 필요하다.

```ts
fixture.detectChanges();
```

이 말은 test환경에서는 **_auto change detection이 작용하지 않는다는 것이다._** test에서 auto detection을 하지 않음으로서 **_비동기 방식의 동작을 동기적으로 테스트 할 수 있는 이점_**이 있는데, 이는 차차 알아보도록 한다.


## 10.5 TestBed and Jasmine
위의 Testing Module 설정을 Jasmine suite에 넣어보자.

```ts
describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    fixture.detectChanges();
  });

  it('…', () => {
    /* … */
  });
});
```

beforeEach에서 TestBed의 모듈 설정 및 compileComponents()가 async - await으로 처리된 이유는 compileComponents() 메소드가 비동기로 작동하기 때문이다.

비동기로 작동하는 이유는 Component를 컴파일 하기 위해서는 템플릿이 templateUrl을 통해 참조하고있는 외부 Url을 fetch해야하기 때문이다.

Jasmine은 기본적으로 test suite 내부의 spec들이 동기적으로 작동한다고 생각한다. 하지만 compileComponents처럼 비동기 메소드 역시 async await으로 처리함으로서 정상적으로 작동하게 만들 수 있다.

<br>

## 10.6 ComponentFixture and DebugElement

ComponentFixture는 Component의 Wrapper Class이다. 이는 Component와 Rendered DOM 에 대한 다양한 인터페이스를 제공한다. 

Counter Component는 @Input과 @Output이 있어 이를 테스트하기로 했다. 모두 Component의 property값으로, 컴포넌트를 직접 조작해야한다. 컴포넌트는 fixture.componentInstance로 접근 가능하다.

@Input은 부모 컴포넌트로부터 값을 받는데, 테스트 모듈에는 부모 컴포넌트가 없기 때문에 직접 조작해줘야한다.

@Output은 어떤식으로 테스트 할 수 있을가? @Output 데코레이터로 장식된 propery의 타입은 EventEmitter인데 이를 살펴보면 아래와 같다.

```ts
export declare interface EventEmitter<T> extends Subject<T>
```

Rxjs의 Subject를 상속한 인터페이스로, emit()로 값을 방출하는 행위는 Subject의 next()와 같다. 따라서 이를 subscribe해서 값이 방출되는지를 테스트 할 수 있다.

```ts
// CounterComponent객체를 가져온다.
const component = fixture.componentInstance;
// @Input으로 장식된 startCount에 값을 수동으로 넣는다.
component.startCount = 10;
// @Output을 구독한다.
component.countChange.subscribe((count) => {
  /* … */
});
```

자세한 내용은 곧 나올 Testing Input, Output에서 다룬다.

컴포넌트에 접근했으니 DOM에도 접근해보자. Angular에서는 **[DebugElement](https://angular.io/api/core/DebugElement)** 라는 DOM에 접근하기 위한 추상화 된 객체를 제공한다. fixture.debugElement 로 취득 가능하다.

```ts
const debugElement = fixture.debugElement;
```

DebugElement는 DOM을 테스트할 수 있는 properties, attributes, classes and styles 등의 property를 제공한다. parent, children and childNodes property를 이용해 DOM tree에 접근할 수 있다.(해당 프로퍼티도 DebugElemnt다.)

debugElement.nativeElement로 NativeElement에도 접근이 가능한데, 타입은 any이다. 이유는 element 요소에 따라 타입이 다르기 때문이다. 주로 HTMLElement 의 subclass일 것이다.

NativeElement를 조작하기 위해서는 해당 Element의 DOM Interface를 알아야 한다.

<br >

## 10.7 Writing First Spec

아래와 같이 Jasmine Spec에 한가지 기능에 대한 테스트를 작성한다. 

```ts
it('테스트 할 내용', () => {
  // test
});
```

 테스트는 Arrange, Act and Assert로 나누는데 각각 Java진영에서 배웠던 given, when, then과 같은것이다.


<br>

 ## 10.8 Querying the DOM with test ids

DebugElement는 템플릿 내부 요소에 접근하기 위해 query, queryAll 메소드를 제공한다. 각각 단일,복수의 element를 반환한다.

```ts
// DebugElement
    query(predicate: Predicate<DebugElement>): DebugElement;
    queryAll(predicate: Predicate<DebugElement>): DebugElement[];
```

인자로는 predicate를 받고, predicate 가 ture인 DebugElement를 return한다.

Angualr에서는 이 predicate를 Css의 Selector문법으로 작성할 수 있는 **[By.css(...)](https://angular.io/api/platform-browser/By)** 메소드를 제공한다.
문법은 아래와 같이 직관적이다.

```ts
const { debugElement } = fixture;
// 첫번째 h1 element
const h1 = debugElement.query(By.css('h1'));
// class에 user가 있는 모든 elements
const userElements = debugElement.query(By.css('.user'));
```

그런데 class 셀렉터와 같은 형태로 테스트 환경에서 element를 선택한다고 해보자. test환경과 template은 강하게 결합하게된다. class, id는 리팩토링되면서 얼마든지 자주 변경될 수 있는 값이다. 리팩토링시마다 테스트가 깨질것이다.

이를 방지하기 위해 테스트를 위해 **[data attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)** 설정한다. HTML5에서는 사전 정의된 의미가 없는 data-* attribute를 제공하는데 바로 이럴 때 쓰라고 있다. 

```HTML
<button (click)="increment()" data-testid="increment-button">+</button>
```

```ts
const incrementButton = debugElement.query(
  By.css('[data-testid="increment-button"]')
);
```

위와 같이 테스트에 필요한 요소에 data-testid attribute로 테스트에서만 쓸 id를 넣는다. 해당 attribute는 실제 기능과는 아무 상관 없기 때문에 리팩토링 등에서도 살아남을것이다. 

위는 간단한 예로, 실제 테스트코드 작성 시 위와같은 testid를 만드는 convention을 정의하고 공유해야한다.

<br>

## 10.9 Triggering event handlers

Angular에서는 템플릿의 element에 (event)="handler($event)"와 같은 형태로 event handler를 등록한다.이벤트를 테스트 하기 위해서는 이벤트 핸들러를 직접 트리거해줘야한다.

DebugElement의 triggerEventHandler() 메소드는 이벤트 핸들러를 트리거 하는 메소드다.

```ts
incrementButton.triggerEventHandler('click', {
  /* 이벤트로 전달할 값 */
});

```

첫번째 인자는 이벤트 종류, 두번째 인자는 핸들러로 넘길 값(인자)이다.

CounterComponent의 incremenet버튼의 클릭은 아무 값을 안넘기므로 아래와 같이 작성된다.

```ts
incrementButton.triggerEventHandler('click', null);

```

<br>

## 10.10 Expecting text output

CounterComponent에서 버튼 클릭 시 {{count}}로 바인딩 된 데이터가 1 증가하면서 DOM에 랜더링 된 값 또한 1 증가할 것이다. 이를 테스트하는 과정은 아래와 같을 것이다.

1. 모듈셋팅, 컴포넌트 랜더링(beforeEach()에 작성됨 해결) -> Arrange
2. increment button element에 접근하여 click 이벤트 핸들러 트리거 -> Act
3. NativeDOM의 textContent에 접근해 표시된 값 확인 -> Assert

그런데, 하나 빠진게 있다. 앞서 설명했듯이 Angular의 테스트 환경에서는 ChangeDetection이 자동으로 이뤄지지 않는다. 이 말은 DOM이 변경된 값으로 다시 랜더링 되지 않는다는 뜻이다. 따라서 **2와 3 사이에 fixture.detectChange()가 필수적**이다. spec은 아래와 같이 작성될 것이다.

```ts
if('increments the count', () => {
	    // Act
    const incrementButton = debugElement.query(
      By.css('[data-testid="increment-button"]')
    );
    incrementButton.triggerEventHandler('click', null);

    // 수동으로 changeDetection -> Re-render the Component
    fixture.detectChanges();

    // Assert
    const countOutput = debugElement.query(
      By.css('[data-testid="count"]')
    );
    expect(countOutput.nativeElement.textContent).toBe('1');
})

```


<br>

## 10.11 Testing helpers

반복되는 많은 테스트 내용을 helper function을 작성해 추상화 할 수 있다. 주의할 원칙은 **_ 추상화 된 내용은 기존 반복되는 코드보다 읽기 쉬워야하고, 안전해야한다. _** 이 원칙을 지키지 못한 추상화는 안하느니 만 못한것이다.

element.spec-helper.ts의 코드 구현을 참고하자.


<br>

## 10.12 Filling out Forms

Angular의 Testing Tool은 form을 쉽게 채울수 있는 솔류션이 없다. 따라서 **_Form에 값을 채우기 위해서는  NativeElement를 찾아서 elemnt.value = {SOMETHING}_** 으로 채워야한다.

Angular의 Form은 직접 value change를 detect할 수 없다. input에서 valueChange가 발생할 때 브라우저에서 **_input_** 이벤트를 발생시키는데, 이를 감지한다.

**_따라서 input에 value를 패우고, 'input'이벤트를 발생기켜서 Agnular가 value change를 알아차리게 해야한다._** 이벤트는 nativeElement의 dispatchEvent(event: Event)로 발생시킬 수 있다!

```typescript
const resetInputEl = findEl(fixture, 'reset-input').nativeElement;
resetInputEl.value = '123';
resetInputEl.dispatchEvent(new Event('input'));
```

IE에서는 new Event()가 작동하지 않으므로 이벤트를 조금 더 복잡한 방법으로 생성해야한다.
```typescript
const event = document.createEvent('Event');
event.initEvent('input', true, false);
resetInputEl.dispatchEvent(event);
``` 

<br>

## 10.13 Testing Inputs
ComponentInstance.{INPUT_PROPERTY} 로 @Input으로 부모Component에서 받는 값을 test에서 직접 설정 가능하다.

그런데 @Input의 값의 변화에 후킹되는 OnChanges()는 테스트 환경에서는 자동으로 실행되지 않으므로 ComponentInstance.OnChanges()로 따로 호출해줘야 한다.

<br>

## 10.14 Testing Outputs
@Output 데코레이터로 장식되는 EventEmitter는 RxJs Subject를 상속하는데, 부모컴포넌트의 @Output의 이벤트 바인딩은, 내부적으로 EventEmitter를 구독해서 next()를 구현하는것이다.
    
따라서, Output의 EventEmitter를.emit(value)가 정상작동했는지를 테스트하려면 @Output이 붙은 컴포넌트의 프로퍼티를 구독하여 next()로 넘어오는 값을 테스트하면 된다.

Component 초기화 후 increment버튼을 누르면 시작값 + 1이 emit되는지 테스트하는 코드는 아래와 같다.

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

위 코드에서, subscribe()에서 next()에 바로 expect를 넣어서 테스트 할 수도 있다. 가능은 하지만 문제가 있는 방식인데, 이유는 테스트에 문제가있거나, 컴포넌트가 변경되어서 click이 emit()을 아예 발생시키지 않을 경우, Jasmine은 expectation이 없다고 WARN 메시지를 보내고 테스트를 통과시키기 때문이다.

```js
WARN: 'Spec 'CounterComponent increment버튼 클릭 시 countChange는 startCount + 1을 방출한다.' has no expectations.'
```

<u>**따라서 expectation은 반드시 실행될 수 있는 동기적인 자리에 배치해야한다.**</u>

<br>

## 10.15 Repetitive Component specs
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

<br>

# 10.16 BlacBox vs WhiteBox Testing
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

<br>

---
<br>

## 11. Testing Components with Children
> 자식 컴포넌트가 있는 컴포넌트의 테스트는 어떻게 할 것인가?

<br>

## 11.1 Shallow vs. deep rendering

자식 컴포넌트가 없는 **Low Level Component**들은 테스트하기 비교적 쉽다. 하지만 이런 low Level Component들은 결국 결합되어 애플리케이션을 구성되는데, 이 때 결합하는 역할을 하는 Component를 **Container Component**라고 한다.

Container Component를 테스트하는 케이스는 두가지가 존재한다. 

하나는 자식 컴포넌트를 **랜더링하지 않고(Shallow Rendering)** 테스트하는것이고(**Unit Testing**), 다른 하나는 **자식 컴포넌트를 랜더링하여(Deep Rendering)** 테스트하는것이다.(**Integration Testing**)

- Shallow Rendering
    - ShallowRendering에서는 자식 요소를 빈 껍데기로 랜더링한다. 그리고 자식 요소의 존재여부, 그것이 Container Component와 잘 연결되었는지, @Input과 @Output의 정상동작을 테스트한다.

- Deep Rendering
    - DeepRendering에서는 모든 자식 컴포넌트를 랜더링한다. 이후 세부 작동에 대해서 테스트 여부는 하위 컴포넌트의 Unit Test 존재 여부에 따라 결정한다.

<br>

## 11.2 Unit Test

기본적으로 컴포넌트에는 **Smoke Test**라 불리는, 가장 기본적인 오류없이 컴포넌트 인스턴스가 생성되는가를 테스트하는 코드가 있다. 자식 컴포넌트가 생기면, Smoke Test에서 아래와 같은 WARNING을 볼 수 있다.

```
'app-counter' is not a known element:
1. If 'app-counter' is an Angular component, then verify that it is part of this module.
2. If 'app-counter' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
```

**이 에러를 해결하려면 자식 컴포넌트를 랜더링 해야하고(integration), 무시하면 unit 테스트가 되는거다**

TestBed의 Module설정에 { schemas: [NO_ERRORS_SCHEMA] }를 추가해주면 사라진다.

자식 컴포넌트가 있는 컴포넌트를 테스트 하는 방법은 3가지가 있다.

1. 그냥 부모 컴포넌트만 Module에 등록하고 테스트한다
  - 자식 컴포넌트는 selector로 찾고, debugElement 타입니다.
  - Module에 Component를 등록하지 않았기 때문에 빈 껍데기다. ComponentInstance는 존재하지 않는다.
  - 예를 들어, 자식 컴포넌트와 event binding된 method를 테스트한다고 생각해보자. 
    ```js
      const counter = findComponent(fixture, 'app-counter');
      counter.triggerEventHandler('countChange',count);
    ```
  - findCompont의 타입은 debugElement이고 triggerEventHandler()로 이벤트를 발생키겨 해당 내용을 테스트 할 수 있다.


2. Module에 자식 컴포넌트의 fake component를 등록하여 테스트
  11.3에서 다룬다.

3. ng-mocks로 자식 컴포넌트 faking후 Module에 등록
  11.4에서 다룬다.

<br>

## 11.3 Faking a Child Component

**_Child Component를 fake하는것은 unit과 integration 중간형태의 테스트이다._**

FakeComponent를 선언하고 TestBed의 Module에 등록한다.

FakeComponent는 **Partial<CounterComponent>** 를 구현하고, selector가 같고, Input,Output이 동일하며, **아무것도 랜더링하지 않아도 된다.**(template은 empty)

```ts
// home.component.fake-child.spec.ts

// FakeComponent 선언, selector는 원본과 같아야한다.
@Component({
  selector: 'app-counter',
  template: ``,
})
export class FakeCounterComponent implements Partial<CounterComponent> {

  @Input()
  public startCount = 0;

  @Output()
  public countChange = new EventEmitter<number>();
}

...
// 변수 선언, 타입은 FakeCounterComponent
let counter: FakeCounterComponent;

// TestBed 모듈에 FakeComponent 등록
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, FakeCounterComponent],
  })})
...

```
<br>

부모 Component만 등록했을 때 처럼 'app-counter' selector로 DebugElement를 찾는게 아닌 **선언한 FakeCounterComponent 타입의 Instance를 찾을 수 있다.**

DebugElement에 query()의 인자로 By.directive(FakeCounterComponent)로 찾으면 DebugElement가 나온다.

```ts
// home.component.fake-child.spec.ts

let counter: FakeCounterComponent;

// DebugElement, By.directive(FakeCounterComponent)로 찾을 수 있다.
const counterEl = fixture.debugElement.query(By.directive(FakeCounterComponent));
// 최종적으로 찾고자 했던 Fake Component
counter = counterEl.componentInstance

```

<br>

원래 fixture.componenetInstance로 Component 객체에 접근했으나, 여기서는 **debugElement.componentInstance로 접근하는데, 타입은 any다.** 따라서 변수에 타입을 미리 선언해서 받는다.

FakeComponent를 만드는 테스트는 그러지 않는 테스트에 비해 Component Instance의 property에 접근이 가능하기 때문에 훨씬 다양한 테스트가 가능하다.

11.2에서 처럼 자식 컴포넌트의 이벤트 바인딩 관련해 자식 Component의 이벤트 방출을 좀 더 직관적으로 할 수 있다.

```ts
  // home.component.fake-child.spec.ts

  counter.countChange.emit(count);
```

단점이라면 selector를 원래 component에서 복사해서 넣은것이기때문에, 원래 컴포넌트에서 selector가 바뀌면 테스트가 깨진다는것. 이는 ng-mocks로 해결 가능하다.

<br>

## 11.4 Faking a child Component with ng-mocks

[ng-mocks](https://github.com/ike18t/ng-mocks)

TestBed의 Module에 자식 Component를 등록한다. 이 때, ng-mocks의 MockComponent()를 사용해서 등록한다.

```ts
  // home.component.ng-mocks.spec.ts
  await TestBed.configureTestingModule({
    declarations: [HomeComponent, MockComponent(CounterComponent)],
  }).compileComponents();
```

ng-mocks를 이용하면 **_FakeComponent와 달리 CounterComponent 타입으로 ComponentInstance를 참조할 수 있다._**

```ts
  // home.component.ng-mocks.spec.ts
  let counter: CounterComponent;

  const counterEl = fixture.debugElement.query(
    By.directive(CounterComponent)
  );
  counter = counterEl.componentInstance;
```

FakeComponent를 직접 선언할 때 @Input, @Output 프로퍼티를 직접 선언해야하고, selector가 원본 Component와 같아야 하는 등의 단점이 싹 사라진다. 

> ❗️결론 : 자식 컴포넌트는 ng-mocks로 fake하여 테스트하는것이 최고다!

<br><br>

<!-- 12장 정리중.. -->
## 12. Testing Components depending on Services
---
<br>
Service를 Faking하면 Unit Test, 안하면 Integration Test이다.

## 12.1 Service Dependency Integration Test
- service-counter Component가 의존하는  CounterService가 간단해서 Integration Test가 Unit Test보다 훨씬 쉽다.
- Moudle에 Provider에 CounterService 넣어주기만 하면 끝
- Integeration은 실제 의존 Service를 주입하기때문에 Component <-> Service간의 작동은 테스트하지 않는다. 버튼 누르면 Component -> Service -> Component로 count값이 변하는건 고려하지 않고 최종적으로 랜더링 된 값의 변화만 체크한다.
- Service에 상태가 저장된 Integration Test는 두개의 Component를 띄우고 한쪽에서 상태변경을 일으킬 때 다른쪽에서도 해당상태를 받는지 테스트해야한다.