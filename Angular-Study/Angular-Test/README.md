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

FakeComponent는 **Partial\<CounterComponent>** 타입이고, selector가 같고, Input,Output이 동일하며, **아무것도 랜더링하지 않아도 된다.**(template은 empty)

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

## 12. Testing Components depending on Services
---
<br>

> Service를 Faking하면 Unit Test, 안하면 Integration Test이다.

<br>

## 12.1 Service Dependency Integration Test
- 실습중인 Service Counter Component가 의존하는  CounterService는 로직이나 의존성이 간단해서 Integration Test가 Unit Test보다 훨씬 쉽다.
- 실제 코드와 같이 Test Moudle의 Provider에 CounterService 넣어주기만 하면 설정이 끝난다,
```ts
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent],
      providers: [CounterService],
    }).compileComponents();
```
- Integeration은 실제 의존 Service를 주입하기때문에 Component와 Service 사이의 로직은 테스트하지 않는다. 예를, Increment버튼을 누르면 Componet 내부로직 -> Service -> Component 내부로직 -> 랜더링 같은 형태로 으로 진행되는데 이 과정을 버튼클릭 -> 랜더링값 확인 형태로 테스트한다.
```ts
  it('increments the count', () => {
    // 
    click(fixture, 'increment-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '1');
  });
```
- **`여러개의 컴포넌트가 Service로 하나의 상태를 공유하는 경우, Integration Test는 두개의 Component를 띄우고 한쪽에서 상태변경을 일으킬 때 다른쪽에서도 해당상태를 받는지 테스트해야한다.`**

<br>

## 12.2 Faking Service dependencies

Component가 의존하는 Service 객체의 Fake를 만들고 TestModule에 등록해준다. 

Service를 Fake 할 때 중요한 사항이 있다
  - fake의 타입은 original의 Partial이어야 한다. -> fake는 original과의 sync를 유지해야한다.
  - original은 건들면 안된다.

- Fake를 객체 리터럴로 선언할 수 있으나, 이런 방식으로는 fake와 original의 sync 유지가 어렵다.
- 타입스크립트의 **`mapped types`** 로 싱크를 유지한다. 여기선 Pick<T, keyof T>로 **public property**를 구현한다. Original이 변해서 싱크를 유지해야하면 컴파일 에러를 뱉을것이다.
> ❗️문서에서는 Pick을 [mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)로 분류하였는데, Typescript 공식문서에서는 [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)로 분류해놨다. Typescript를 공부하자..
- private은 구현이 불필요한데, 이유는 public 함수에서 private을 실제 호출하지 않기 때문이다.

```ts
const fakeCounterService:
  Pick<CounterService, keyof CounterService> = {
  increment() {},
  decrement() {},
  reset() {},
  getCount() {return of(currentCount);}
};
```
- 테스트 하는법은 호출여부를 테스트하는것이다. 해당 함수를 전부 spy해야한다. jasmine.createSpy(FUNCTION_NAME)으로 가능하다.
```ts
// service-counter.component.spec.ts

  const fakeCounterService: Pick<CounterService, keyof CounterService> = {
    increment: jasmine.createSpy('increment'),
    decrement: jasmine.createSpy('decrement'),
    reset: jasmine.createSpy('reset'),
    getCount: jasmine.createSpy('getCount').and.returnValue(of(currentCount))
  };
```
- jasmine.createSpy()는 노가다성이 짗다. Fake 객체 생성단계에서 ___jasmine.createSpyObj()___ 로 생성하면 객체의 모든 property가 spy된다. 생성된 객체의 타입은 SpyObj<T>.
```ts
// service-counter.component.spec.ts
  fakeCounterService = jasmine.createSpyObj<CounterService>(
    'CounterService',
    {
      getCount: of(currentCount),
      increment: undefined,
      decrement: undefined,
      reset: undefined,
    }
  );
```
- 생성된 SpyObj를 Module에 등록해준다. 

```ts
  await TestBed.configureTestingModule({
    declarations: [ServiceCounterComponent],
    providers: [{ provide: CounterService, useValue: fakeCounterService }],
  }).compileComponents();
```
- CounterService와 SpyObj<CounterService>의 타입이 다르므로 useValue로 Fake 객체를 사용한다.
- jasmine.createSpyObj()로 Fake하는 방식은 Typescript의 Pick을 이용할 때보다 soft하다. 모든 public property를 구현하지 않아도 에러가 발생하지 않는다. 단, CounterService에 없는 property를 구현하면 에러가 발생한다.


<br>

## 12.3 Fake Service with minimal logic
> Spring에서 의존객체에 given().thenReturn() 형태로 메소드 호출시 원하는 값을 return하도록 만든다.

- Fake는 실제로 값을 return해야하므로 Typescript의 Pick type으로 구현한다.
```js
// service-counter.component.spec.ts

describe('ServiceCounterComponent: unit test with minimal logic', () => {
  ...
  let fakeCounterService: Pick<CounterService, keyof CounterService>;
  let currentCount = 0;
  ...

  beforeEach(async () => { 
    let fakeCount$ = new BehaviorSubject<number>(currentCount);
    fakeCounterService = {
      getCount() { return fakeCount$;},
      increment() { fakeCount$.next(currentCount + 1);},
      decrement() { fakeCount$.next(currentCount - 1);},
      reset() { fakeCount$.next(newCount);},
    };
  });
  ...
});
```
- fake객체 메소드의 호출 테스트를 해야하는데, spyOn()을 사용하면 실제 호출은 되지 않는다.
```js
  // service-counter.component.spec.ts
    spyOn(fakeCounterService, 'getCount').and.callThrough();
    spyOn(fakeCounterService, 'increment').and.callThrough();
    spyOn(fakeCounterService, 'decrement').and.callThrough();
    spyOn(fakeCounterService, 'reset').and.callThrough();
  ```
- spyOn() 뒤 .and.callThrough()를 해주면 호출시 실제 작동하면서 동시에 호출여부 테스트가 가능하다.(beforeEach문에서 해줘야 한다. it() 내부에서 해주면 에러발생)


<br>

## 12.4 Faking Services: Summary

> simple Services that are easy to fake: Services with a clear API and an obvious purpose.

즉 api는 심플하고 명확해야한다는것이다. Single Responsibilty 원칙에서 말하는 것 처럼, 하나의 method는 하나의 동작을 하는것이 가독성과 유지보수, 테스트 측면에서 모두 좋다.

Faking Service에는 많은 방법이 있고 정답은 없다. 전부 장단점이 있기때문이다. 계속 해보면서 상황에 맞춰 더 적절한 방법을 써보자.

- 테스트가 Component와 Service 중요한 Interaction을 커버하고 있는가? Interaction의 어느정도까지 테스트할것인가?
- Faking 원칙
  - fake의 타입은 original에서 가져와야한다.
  - original은 건들면 안된다.

<br>

## 12.5 추가 찾은 사항  
> ❗️[ng-mocks](https://ng-mocks.sudo.eu/api/MockProvider) 를 이용해 MockProvider를 만들고 spring mockito의 given().thenReturn처럼 mocking이 가능하다.

<br><br>

## 13. [Testing complex forms](https://github.com/Motiveko/studies/tree/master/Angular-Study/Angular-Test/src/app/components/signup-form)


### 13.1 Test Plan
> form 에서 아래와 같은 동작을 테스트한다. 테스트 방식은 `Component`, `ChildComponent`, `Directive` 의 상호작용을 한번에 테스트하는 `Integration` 테스트를 수행한다. 단, `Service`의 동작은 stubbing한다.
- Form Submission
  - submit 성공
  - invalid form은 submit하지 않는다.
  - submit 실패
- `reuqired` 필드는 validation 통과하지 못하면 관련된 에러 표시
- username, email, password에 적용된 Asyc Validation 동작 테스트
- validation 등이 동적으로 적용되는 필드 테스트
- Password type 토글 테스트
- 웹 접근성(accessibility) 테스트

<br>

### 13.2 Test setup
- Test Module
  - Interation Test이므로 Componet와 Directive는 모두 실제 객체를 사용하고, Service는 Fake 객체를 주입한다. 
  - Reactive Form을 사용하므로 `ReactiveFormsModule`를 import한다. 
  - `SignupService`는 **호출 여부**를 테스트하므로 `jasmine.createSpyObj()`로 생성하고, 각 메서드에 대한 동작을 메 spec마다 동적으로 정의해줘야 하므로 ***setup시 Service의 동작을 인수로 받아 동적으로 overriding*** 할 수 있게 구성한다.
  ```ts
  let fixture: ComponentFixture<SignupFormComponent>;
  let signupService: jasmine.SpyObj<SignupService>;

  // setup은 SignupService의 동작을 Dynamic하게 정의할 수 있어야하므로 beforeach()로 실행하지 않는다.
  const setup = async (
    signupServiceReturnValues?: jasmine.SpyObjMethodNames<SignupService>
  ) => {
    // Spy SignupService 셋팅, 기본값은 모두 success되는것으로 설정되어있다.
    signupService = jasmine.createSpyObj<SignupService>('SignupService', {
      isUsernameTaken: of(false),
      isEmailTaken: of(false),
      getPasswordStrength: of(strongPassword),
      signup: of({ success: true }),
      // setup시 인자로 받은 값으로 SignupService의 동작의 일부를 overriding 한다.
      ...signupServiceReturnValues,
    });
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        SignupFormComponent,
        ControlErrorsComponent,
        ErrorMessageDirective,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SignupService,
          useValue: signupService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);

    fixture.detectChanges();
  };
  ```

<br>

### 13.3 Successful form submission
- form submission을 수행하기에 앞서, `required` validator가 붙은 폼에 대해 유효한 값을 채워주는 helper method `fillForm`을 정의한다.
```ts
// signup-data.spec-helper.ts
export const username = 'quickBrownFox';
export const password = 'dog lazy the over jumps fox brown quick the';
export ...
...

export const signupData: SignupData = {
  plan: 'personal',
  username,
  email,
  password,
  address: {
    name, addressLine1, addressLine2,
    city, postcode, region, country
  },
  tos: true,
};


// signup-form.component.spec.ts
const fillForm = () => {
  setFieldValue(fixture, 'username', username);
  setFieldValue(fixture, 'email', email);
  ...
};
```
- `submit()`이 성공하기 위해서는 `FormGroup`이  validation 로직을 모두 통과해 valid 상태가 되어야 한다. Angular의 기본 제공 validator들(`required`, `email`, ...) 모두 `Synchronous`로 동작하나 username, email, password에 적용한 custom `AsycValidator`는 비동기로 동작한다. 여기서는 RxJs `timer()`로 1초의 `debounce`를 갖고 외부 validation API를 호출하도록 설정되어 있다.
```ts
// signup-form.component.ts

// ASYNC_VALIDATION_DELAY : 1000
private validateUsername(username: string): Observable<ValidationErrors> {
  return timer(ASYNC_VALIDATION_DELAY).pipe(
    switchMap(() => this.signupService.isUsernameTaken(username)),
    map((usernameTaken) => (usernameTaken ? { taken: true } : {}))
  );
}
```
- 따라서 `fillForm()`후 `submit()` 동작까지 1초의 시간이 필요한데, 이를 `setTimeout`을 통해 해결할 수 있으나, **이런 방식은 spec의 실행 속도를 늦어지게 만든다.**
- Angular에서 제공하는 [fakeAsync]('https://angular.io/api/core/testing/fakeAsync')를 사용하면, 타이머 관련 함수의 호출 스케줄링을 동기적으로 처리할 수 있게 해준다.
- 여기서는 `tick()` 메서드로 비동기 처리에서 시간의 흐름(asynchronous passage of time)을 simulation한다.
- spec 작성은 아래와 같다.
```ts

it('submits the form successfully', fakeAsync(async () => {
  await setup();

  fillForm();
  fixture.detectChanges();

  // async validator가 username/email/pw 를 검사하기 전까지는 form이 invalid므로 submit 버튼은 disabled
  const submitButton = findEl(fixture, 'submit');
  expect(submitButton.properties.disabled).toBe(true);

  // 1초간 기다리는것을 simulation한다. simulation이므로 실제로 기다리는게 아니다.
  tick(1000);
  fixture.detectChanges();

  expect(submitButton.properties.disabled).toBe(false);

  // find form and emit submit event
  findEl(fixture, 'form').triggerEventHandler('submit', {});
  fixture.detectChanges();

  // signup 성공시 성공 메시지 화면에 출력
  expectText(fixture, 'status', 'Sign-up successful!');

  expect(signupService.isUsernameTaken).toHaveBeenCalledWith(username);
  expect(signupService.isEmailTaken).toHaveBeenCalledWith(email);
  expect(signupService.getPasswordStrength).toHaveBeenCalledWith(password);
  expect(signupService.signup).toHaveBeenCalledWith(signupData);
}));

```

<br>

### 13.4 Invalid Form
- 값을 채우지 않고 `submit` 이벤트 발생시, `AsyncValidator`는 호출되지 않고, `signupService.signup()`도 호출되지 않을것이다.
```ts
it('does not submit an invalid form', fakeAsync(async () => {
  await setup();

  // Wait for async validators
  tick(1000);

  findEl(fixture, 'form').triggerEventHandler('submit', {});

  expect(signupService.isUsernameTaken).not.toHaveBeenCalled();
  expect(signupService.isEmailTaken).not.toHaveBeenCalled();
  expect(signupService.getPasswordStrength).not.toHaveBeenCalled();
  expect(signupService.signup).not.toHaveBeenCalled();
}));
```

<br>

### 13.5 Form submission failure
- form을 정상적으로 채워 `signupService.signup()` 메서드 호출까지 했을 때, 응답은 `200 ok`가 아닐 수 있다. 네트워크 에러, server-side validation 등의 이유가 있을것이다. 
- 이 때 `signupService.signup()`의 반환값 Observable은 `error`를 방출할텐데, RxJs에서는 `throwError`로 error를 방출하는 Observable을 생성할 수 있다. 이 spec에서는 `signupService.signup()`의 동작을 동적으로 할당한다.
- 최종 spec은 아래와 같다.
```ts
// signup-form.component.ts
...
import { throwError } from 'rxjs';
...

it('handles signup failure', fakeAsync(async () => {
  await setup({
    // throwError로 생성한 Observable은 무조건 인수로 전달받은 Error를 던진다.
    signup: throwError(new Error('Validation failed')),
  });

  fillForm();

  // Wait for async validators
  tick(1000);

  findEl(fixture, 'form').triggerEventHandler('submit', {});
  fixture.detectChanges();

  expectText(fixture, 'status', 'Sign-up error');

  expect(signupService.isUsernameTaken).toHaveBeenCalledWith(username);
  expect(signupService.getPasswordStrength).toHaveBeenCalledWith(password);
  expect(signupService.signup).toHaveBeenCalledWith(signupData);
}));
```

<br>

### 13.6 Required fields
- `required`가 적용된 폼 필드는 아래와 같은 특성을 가진다
  - `aria-required` 어트리뷰트를 가진다.
  - validation 실패시, `aria-errormessage`를 가진다.(ErrorMessage 디렉티브에 의해 동적 생성)
  - validation 실패시, tos를 제외한 필드는 '… must be given'의 에러 메시지가 표시된다.

- 테스트 전 `required`가 적용되 필드명을 array로 선언하고, 이를 하나의 spec에서 `forEach()`로 순회하여 테스트한다.
- validation을 체크하기 위해서는 field가 `touched` 상태가 되어야하는데, Angular 내부적으로 폼 필드의 `blur` 이벤트를 listen하여 상태를 변경한다. 테스트에서는 이를 명시적으로 수행해줘야 하므로 메서드를 선언한다.
```ts
const markFieldAsTouched = (element: DebugElement) => {
  dispatchFakeEvent(element.nativeElement, 'blur');
};
```

- validation 실패시 `aria-errormessage` 어트리뷰트에 error message 요소의 id값이 표시된다. 따라서 `aria-errormessage`에 id값이 있고, `document.getElementById(id)`로 찾은 HTML 요소의 innerText값이 원하는 에러 메시지로 출력되는가를 테스트한다.
- 최종 spec은 아래와 같이 작성된다.

```ts
it('handles signup failure', fakeAsync(async () => {
  await setup({
    // throwError
    signup: throwError(new Error('Validation failed')),
  });
  fillForm();

  tick(1000);

  findEl(fixture, 'form').triggerEventHandler('submit', {});
  fixture.detectChanges();

  expectText(fixture, 'status', 'Sign-up error');

  expect(signupService.isUsernameTaken).toHaveBeenCalled();
  expect(signupService.isEmailTaken).toHaveBeenCalled();
  expect(signupService.getPasswordStrength).toHaveBeenCalled();
}));

// ==== Required fields ====
it('marks fields as required', fakeAsync(async () => {
  await setup();

  // Mark required fields as touched
  requiredFields.forEach((testId) => {
    markFieldAsTouched(findEl(fixture, testId));
  });
  fixture.detectChanges();

  requiredFields.forEach((testId) => {
    const el = findEl(fixture, testId);
    
    // required인 요소에는 aira-requried 어트리뷰트가 true다.
    expect(el.attributes['aria-required'])
      .withContext(`${testId} must be marked as aria-required`) // expect 실패시 에러 메시지에 출력될 내용
      .toBe('true');

    expect(el.attributes['aria-invalid'])
      .withContext(
        `${testId} 요소의 aria-invalid 어트리뷰트 값은 true여야 합니다.`
      )
      .toBe('true');

    const errormessageId = el.attributes['aria-errormessage'];
    if (!errormessageId) {
      throw new Error(`Error message id for ${testId} not present`);
    }
    const errormessageEl = document.getElementById(errormessageId);
    if (!errormessageEl) {
      throw new Error(`Error message element for ${testId} not found`);
    }
    // // Terms and Service만 에러메시지가 다르다
    if (errormessageId === 'tos-errors') {
      expect(errormessageEl.textContent).toContain(
        'Please accept the Terms and Services'
      );
    } else {
      expect(errormessageEl.textContent).toContain('must be given');
    }
  });
}));
```

<br>

### 13.7 Asynchronous validators
- Form의 AsycValidor는 SignupService의 `isUsernameTaken`, `isEmailTaken`, `getPasswordStrength`을 비동기로 호출하여 외부 API를 통해 validation을 체크한다. 
- 체크 결과 오류가 있으면 form의 `submit`이벤트 발생시 `signupService.signup`메서드는 호출되지 않아야 한다. 그리고 각각의 error에 대한 메시지를 화면에 출력해야한다.
- username에 대한 spec은 아래와 같다. 나머지도 모두 거의 비슷하다.
```ts
it('fails if the username is takne', fakeAsync(async () => {
  await setup({
    isUsernameTaken: of(true),
  });

  fillForm();
  tick(1000);
  fixture.detectChanges();

  expect(findEl(fixture, 'submit').properties.disabled).toBe(true);

  findEl(fixture, 'form').triggerEventHandler('submit', {});

  const errormessageId = findEl(fixture, 'username').attributes[
    'aria-errormessage'
  ];
  if (!errormessageId) {
    throw new Error(`Error message id for username not present`);
  }

  const errormessageEl = document.getElementById(errormessageId);
  if (!errormessageEl) {
    throw new Error(`Error message element for username not found`);
  }

  expect(errormessageEl.textContent).toContain(
    'User name is already taken. Please choose another one.'
  );
  expect(signupService.isUsernameTaken).toHaveBeenCalledWith(username);
  expect(signupService.isEmailTaken).toHaveBeenCalledWith(email);
  expect(signupService.getPasswordStrength).toHaveBeenCalledWith(password);
  expect(signupService.signup).not.toHaveBeenCalled();
}));
```

<br>

### 13.8 Dynamic Field Relations
- sign-up form의 `plan`필드 값에 따라 `addressLine1` 필드의 `label`값과 `required`validatoor 적용 여부가 결정된다. 
  - plan => "Person" 이면 `label`은 "Address line 1"이고 required는 false
  - plan => "Business" 이면 `label`은 "Company"이고 required는 true
  - plan => "Education & Non-profit" 이면 `label`은 "Organization"이고 required는 true 
- `plan`의 각 필드에 대해 check시 `fixture.detectChanges()`를 호출해 템플릿에서 form의 값의 변화를 인지하게 한 후 테스트한다.
- spec은 아래와 같이 작성된다.

```ts
it('requires address line 1 for business and non-profit plans', async () => {
  await setup();

  // plan => personal
  const addressLine1El = findEl(fixture, 'addressLine1');
  expect('ng-invalid' in addressLine1El.classes).toBe(false);
  expect('aria-required' in addressLine1El.attributes).toBe(false);

  // plan => business
  checkField(fixture, 'plan-business', true);
  fixture.detectChanges();

  expect(addressLine1El.attributes['aria-required']).toBe('true');
  expect(addressLine1El.classes['ng-invalid']).toBe(true);

  // plan => non-profit
  checkField(fixture, 'plan-non-profit', true);
  fixture.detectChanges();

  expect(addressLine1El.attributes['aria-required']).toBe('true');
  expect(addressLine1El.classes['ng-invalid']).toBe(true);
});
```

<br>

### 13.9 Password type toggle
- `showPassword` 버튼을 누르면 Component의 showPassword 상태가 toggle되고 이에 따라 password input의 type이 toggle된다.
- 버튼을 click하고 `fixture.detectChanges()`를 호출해 Component 상태 변화를 template이 알아차리게 한다.
- spec은 아래와 같이 작성한다.
```ts
it('toggles the password display', async () => {
  await setup();

  setFieldValue(fixture, 'password', 'top secret');
  const passwordEl = findEl(fixture, 'password');
  expect(passwordEl.attributes.type).toBe('password');

  click(fixture, 'show-password');
  fixture.detectChanges();

  expect(passwordEl.attributes.type).toBe('text');

  click(fixture, 'show-password');
  fixture.detectChanges();

  expect(passwordEl.attributes.type).toBe('password');
});
```

<br>

### 13.10 Testing form accessibility
- `aria-` 어트리뷰트는 웹 접근성관련한 어트리뷰트로, 스크린 리더 등에서 이 값을 읽는다고 한다. 이외에 여러 요소가 있는데 `pa11y`, `pa11y-ci`를 이용해 웹 접근성이 올바른지 테스트 할 수 있다.

1. pa11y
- cli로 페이지 단위로 테스트한다. 웹서버로 프로젝트를 실행하고, 명령어로 해당 페이지 주소를 알려주면 테스트해준다.

```
// 설치
npm install -g pa11y

// localhost:4200/ 에 대해 접근성 테스트를 실행한다.
pa11y http://localhost:4200/

```
- 웹 접근성을 어기면 아래와 같은 에러메시지를 볼 수 있다.

![errormessage](./readme-assets/Pa11y_error_example.png)

2. pa11y-ci
- 설정 파일을 읽어서 자동으로 웹 접근성 검사를 수행한다. 설정 파일에 여러 url을 넣어 한꺼번에 검사할 수 있다. `.pa11yci`라는 설정파일을 프로젝트 루트에 아래와 같은 형태로 작성한 후 명령어를 실행한다.

```json
// .pa11yci 
{
  "defaults": {
    "runner": [
      "axe",
      "htmlcs"
    ]
  },
  "urls": [
    "http://localhost:4200"
  ]
}
```
```
// pa11y-ci 설치
npm install pa11y-ci

// pa11y-ci 실행
npx pa11y-ci
```

3. start-server-and-test
- `start-server-and-test`는 node 패키지로, 웹 서버를 실행한 후 실행이 완료되면 원하는 `npm script`를 실행할 수 있다. 이를 이용하면 명령어 하나로 웹서버 띄우기 + 웹접근성 테스트를 수행할 수 있다.
```
// 설치
npm install start-server-and-test
```
- package.json에 아래 script를 추가한다.
```json
{
  "scripts": {
    "a11y": "start-server-and-test start https-get://localhost:4200/ pa11y-ci",
    "pa11y-ci": "pa11y-ci"
  },
}
```

<br><br>

## 14. Testing Components with Spectator
> 기존 Anuglar의 테스팅 툴을 이용해 작성하던 코드들을 `Spectator` 라이브러리를 이용해 작성한다.

<br>

기존 Angular에서 제공하는 테스팅 툴(`TestBed`, `ComponentFixture`, `DebugElement`, `HttpClientTestingModule`, `RouterTestingModule`, ...)을 직접 사용하여 테스트 코드 작성시 아래와 같은 문제점이 있다.
- 기본 **setup에 들어가는 boiler plate코드**가 너무 많다.
- `DebugElement`는 DOM을 래핑한 추상화된 객체로, 테스트시 번거롭고 Type Safe 하지 않다.
- 기본 제공되는 안전한 객체의 **faking solution이 없다.**
- 이벤트 트리거, DOM 접근등의 많은 동작에 **반복적인 코드가 많이 발생**한다. 이는 결국 helper library를 직접 만들어 해결하게된다.

<br>

`Spectator`는 이런 문제를 해결해주는 Angular 테스트 라이브러리다. [flickr search](https://github.com/Motiveko/studies/tree/master/Angular-Study/Angular-Test/src/app/components/flickr-search) 컴포넌트를 테스트한다.
Spectator를 사용한 테스트 코드는 `spectator.spec.ts`로 끝나는 파일에 작성한다.

<br>

### 14.1 Component with an Input
Spectator를 이용한 테스트 모듈 설정 및 테스트 컴포넌트 생성은 `Component factory`를 이용한다.

```ts
export declare function createComponentFactory<C>(typeOrOptions: Type<C> | SpectatorOptions<C>): SpectatorFactory<C>;
```
```ts
import { createComponentFactory } from '@ngneat/spectator';

describe('FullPhotoComponent with spectator', () => {
  /* … */

  const createComponent = createComponentFactory({
    component: FullPhotoComponent,  // 테스트 컴포넌트
    shallow: true,  // shallow rendering한다.(자식컴포넌트는 렌더링 하지 않는다)
  });

  /* … */
});
```

<br>

`createComponentFactory` 메서드 인자로 `SpectatorOptions`를 전달한다. 이 메서드는 내부적으로 `beforeEach` 블록을 만들고 `TestBed.configureTestingModule`와 `TestBed.compileComponents`를 실행한다. Spectator를 사용하기 전에 반복적으로 작성하던 코드를 그대로 작성해주는 것이다.

> ❗️ `createComponentFactory`는 내부적으로 `beforeEach`블록을 만들기 때문에 반드시 `describe` 코드 블록 내에서 사용해야한다.

<br>

컴포넌트 생성은 아래와 같이 작성한다.

```ts
// types
export declare type SpectatorFactory<C> = (options?: SpectatorOverrides<C>) => Spectator<C>;
/**
 * @publicApi
 */
export interface SpectatorOverrides<C> extends BaseSpectatorOverrides {
    detectChanges?: boolean;
    props?: Partial<C>;
}
```

```ts
let spectator: Spectator<FullPhotoComponent>;

beforeEach(() => {
  spectator = createComponent({ props: { photo: photo1 } });
});
```
인자로 `SpectatorOverrides`타입 객체를 전달해 컴포넌트의 내부 프로퍼티를 정의할 수 있다. 반환 타입은 `Spectator`로 랩핑된 컴포넌트 객체로, 테스트시 필요한 여러 유틸 메서드를 제공한다. 예를 들면 `Spectator.query()` 메서드는 이전 `debugElement.query()` 와 같이 컴포넌트 템플릿 내 DOM을 쿼리한다. <br> [Spectator: Queries](https://github.com/ngneat/spectator#queries)

```ts
spectator.query(byTestId('full-photo-title'))
```

<br>

Spectator의 `DOMSelectorFactory`인 `byTestId`는 DOM객체중 `data-testid` 어트리뷰트 값을 검색해 일치하는 객체를 가져온다.

<br>

`Spectator` 설치시 `Jasmine matchers`에 몇몇 Custom matcher가 추가되는데, 이는 기존 jasmine matcher만 이용했을 때 발생했던 여러 boilerplate 코드를 줄여준다. 예를들어, 예전엔 HTMLElement 객체의 textContent를 검사하기 위해서는 `DebugElement.nativeElement.textContent`를 검사했었는데 Specator를 사용하면 아래와 같이 단순화된다. <br>

[Spectator: Custom matchers](https://github.com/ngneat/spectator#custom-matchers)

```ts
expect(
  spectator.query(byTestId('full-photo-title'))
).toHaveText(photo1.title);
```

<br>

HTMLElement의 attribute 검사는 아래와 같이 단순화된다.

```ts
const img = spectator.query(byTestId('full-photo-image'));
expect(img).toHaveAttribute('src', photo1.url_m);
```

<br>

이런 방식은 DebugElement를 사용해서 작성했던 코드보다 훨씬 직관적이고 짧으며 안전하다.

<br>

### 14.2 Component with children and Service dependency

Spectator는 `Container Component`를 테스트 할 때 특히 편해진다. [FlickrSearchComponent](https://github.com/Motiveko/studies/tree/master/Angular-Study/Angular-Test/src/app/components/flickr-search/flickr-search)는 `FlickrService`에 의존하고, 자식컴포넌트를 가진다.

<br>

테스트 모듈은 아래와 같이 설정한다. 

```ts
import {
  createComponentFactory, mockProvider, Spectator
} from '@ngneat/spectator';

describe('FlickrSearchComponent with spectator', () => {
  /* … */

  const createComponent = createComponentFactory({
    component: FlickrSearchComponent,
    shallow: true,
    declarations: [
      MockComponents(
        SearchFormComponent, PhotoListComponent, FullPhotoComponent
      ),
    ],
    providers: [mockProvider(FlickrService)],
  });

  /* … */
});
```
위 코드에서 모듈 설정시, shallow rendring을 하였고, 테스트를 위해 자식 객체는 `ng-mocks`의 `MockComponents` 메서드를 이용해 Fake Component를 만들어 모듈에 선언했다. 테스트시 자식 컴포넌트는 컴포넌트 클래스 타입으로 참조하고 사용 가능하다.

<br>

또한 `Spectator`의 `mockProvider`를 사용해 컴포넌트가 의존하는 `FlickrService` 객체의 Fake 객체를 주입했다. beforeEach 문은 아래와 같이 작성한다.

```ts

import {
  createComponentFactory, mockProvider, Spectator
} from '@ngneat/spectator';

describe('FlickrSearchComponent with spectator', () => {
  let spectator: Spectator<FlickrSearchComponent>;

  let searchForm: SearchFormComponent | null;
  let photoList: PhotoListComponent | null;
  let fullPhoto: FullPhotoComponent | null;

  const createComponent = createComponentFactory(/* … */);

  beforeEach(() => {
    spectator = createComponent();

    spectator.inject(FlickrService).searchPublicPhotos.and.returnValue(of(photos));

    searchForm = spectator.query(SearchFormComponent);
    photoList = spectator.query(PhotoListComponent);
    fullPhoto = spectator.query(FullPhotoComponent);
  });

  /* … */
});
```

`spectator.inject` 메서드는 `TestBed.inject()` 메서드와 같은 역할을 한다. 메서드 실행 결과는 `SpyObject<FlickrService>`로, 바로 체이닝하여 동작을 spy한다. 

<br>

자식 컴포넌트에 대한 접근은 `spectator.query`메서드를 이용한다. 인자로는 접근하려는 자식 컴포넌트의 타입이다. 반환 타입은 인자로 넣은 컴포넌트타입 or null로 이렇게 가져온 컴포넌트는 `DebugElemnt`와 달리 원본과 같은 프로퍼티를 가지므로 Type Safe하게 사용 가능하다.

<br>
 
그런데, 이 때 문제가 있는데 Union type으로 null이 있으므로 .에 의한 참조시 타입스크립트에서는 에러나 발생한다. Spectator에서 자식 컴포넌트가 null이 아닌지 테스트하는 코드는 아래와 같다.
```ts
expect(photoList).not.toBe(null)
```

그런데 `expect`는 [Typescript Type Guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html)가 아니므로 이 코드 이후에도 자식 컴포넌트 변수의 타입은 `R | null`(R은 컴포넌트 타입)이 된다. 이를 해결하기 위해서는 **자식 컴포넌트가 null일경우 명시적으로 Error를 던져줘야한다.** ~~Type Guard에 대한 지식이 없어서 도대체 어떻게 해야 하는건지 늘 궁금했는데, 해결..~~

<br>

```ts
if (!(searchForm && photoList)) {
  throw new Error('searchForm or photoList not found');
}
// 이후 typscript는  searchForm과 photoList가 null이 아니라고 판단한다.
```

<br>

이러한 Spectator의 특성을 이용한 테스트 코드는 [여기](https://github.com/Motiveko/studies/blob/master/Angular-Study/Angular-Test/src/app/components/flickr-search/flickr-search/flickr-search.component.spectator.spec.ts)를 참고하자.

<br>

### 14.3 Event handling with Spectator

`DebugElement`를 사용한 테스트시 컴포넌트의 이벤트 발생은 `DebugElement.triggerEventHandler`를 사용하였다. 이는 실제 DOM 이벤트를 발생시키는게 아닌 **이벤트 바인딩으로 표시된 헨들러**를 호출하는 것이다. 반면 Spectator에서는 `Synthetic DOM Event`를 발생시키는 방식으로 테스트하는데, 이 이벤트는 이벤트는 실제 DOM 트리상에서 버블링되므로 좀 더 실제 동작에 가까운 이벤트 테스트가 가능하다.

<br>

Spectator에서는 `click`이나 `blur`, `focus` 등의 몇몇 이벤트는 기본 메서드로,이외에는 `Spectator.dispatchFakeEvent`로 distpatch 할 수 있다. 예를 들면 클릭 이벤트는 아래와 같이 발생시킬 수 있다.

```ts
spectator.click(byTestId('photo-item-link'));
```

<br>

폼 관련 처리는 훨씬 복잡했었던것을 매우 간소하게 바꿀 수 있다. 먼저 폼에 값을 채우는 것을 생각해보자. `DebugElement`를 사용했을 때 아래와 같은 과정으로 폼에 값을 채웠다.(이 과정을 결국 헬퍼 메서드로 정의한다.)

```ts
const el = fixture.query(By.css('[data-testid="input"]')).nativeElement;

el.value = 'value'; // 값 설정

// 값 설정 후 컴포넌트에서 값 변화를 알 수 있도록 적절한 이벤트를 발생시켜줘야한다.
const type = (el instanceof HTMLSelectElement) ? 'change' : 'input';
const event = document.createEvent('Event');
event.initEvent(type, false, false);
el.dispatchEvent(event);
```

<br> 

이렇게나 복잡하고 직관적이지 않은 동작을 `Spectator.typeInElement` 메서드 하나로 해결 가능하다. 또한 submit event(`ngSubmit`) 이벤트 역시 `Spectator.dispatchFakeEvent` 메서드로 간단하게 dispatch 할 수 있다. 적용된 spec은 아래와 같다. <br>
[Spectator: Events API](https://github.com/ngneat/spectator#events-api)

```ts
describe('SearchFormComponent with spectator', () => {
  /* … */

  it('starts a search', () => {
    let actualSearchTerm: string | undefined;

    spectator.component.search.subscribe((otherSearchTerm: string) => {
      actualSearchTerm = otherSearchTerm;
    });

    // input에 값을 채운다.
    spectator.typeInElement(searchTerm, byTestId('search-term-input'));

    // ngSubmit 이벤트 발생
    spectator.dispatchFakeEvent(byTestId('form'), 'submit');

    expect(actualSearchTerm).toBe(searchTerm);
  });
});
```

<br>

### 15. Testing Services

Angular에서 싱글톤으로 생성되는 서비스는 일반적으로 아래와 같은 역할을 가진다.
- 값을 반환하는 public method를 가진다.
- 상태값을 가진다.

<!-- 따라서 서비 -->

### 16. Testing Pipes
`pipe`를 테스트 하는데는 두가지 방법이 있다.
  1. `transform` 메서드만 테스트
  2. `Component`에 `pipe`를 적용하고 랜더링 되는 값을 테스트

아래  `TranslatePipe`는 `TranslateService`에 의존하여, 동기/비동기적으로 작동하는 pipe다.

```ts
// translate.pipe.ts
@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private lastKey: string | null = null;
  private translation: string | null = null;

  private onTranslationChangeSubscription: Subscription;
  private getSubscription: Subscription | null = null;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService
  ) {
    this.onTranslationChangeSubscription =
      this.translateService.onTranslationChange.subscribe(() => {
        if (this.lastKey) {
          this.getTranslation(this.lastKey);
        }
      });
  }

  public transform(key: string): string | null {
    if (key !== this.lastKey) {
      this.lastKey = key;
      this.getTranslation(key);
    }
    return this.translation;
  }

  private getTranslation(key: string): void {
    this.getSubscription?.unsubscribe();
    this.getSubscription = this.translateService
      .get(key)
      .subscribe((translation) => {
        this.translation = translation;
        this.changeDetectorRef.markForCheck();
        this.getSubscription = null;
      });
  }

  public ngOnDestroy(): void {
    this.onTranslationChangeSubscription.unsubscribe();
    this.getSubscription?.unsubscribe();
  }
}
```
pipe사용시 Angular에서 `transform()` 메서드를 호출하게 되는데, 이 때 `getTranslation`을 호출하고, 이는 다시 `TranslateService.get()`을 호출한다.
```ts
// translate.service.ts
@Injectable()
export class TranslateService {
  private currentLang = 'en';

  private translations: Translations | null = null;

  public onTranslationChange = new EventEmitter<Translations>();

  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLang);
  }

  public use(language: string): void {
    this.currentLang = language;
    this.loadTranslations(language);
  }

  /** Sync/Async 로 처리된다.*/
  public get(key: string): Observable<string> {
    if (this.translations) {
      return of(this.translations[key]);
    }
    return this.onTranslationChange.pipe(
      take(1),
      map((translations) => translations[key])
    );
  }

  /** 설정된 language값에 따라 translation 가져온다. */
  private loadTranslations(language: string): void {
    this.translations = null;
    this.http
      .get<Translations>(`assets/${language}.json`)
      .subscribe((translations) => {
        this.translations = translations;
        this.onTranslationChange.emit(translations);
      });
  }
}
```
`TranslateService.get()`은 `translation`이 있을경우 해당 값을 Synchronous하게 반환하고, 없을경우 `onTranslationChange`를 반환하는데, 이게 결국 `httpClient`를 사용해 비동기적으로 동작하게 된다.
`TranslatePipe.getTranslation()`의 subscription의 next헨들러 내 `changeDetectorRef.markForCheck()`는 이런 동작을 고려해 우선 pipe가 우선 null을 반환하고, 추후 비동기적으로 값이 넘어왔을때 Angular의 changeDetector가 다시 한번 변화감지하여 `TranslatePipe.transform`가 호출하고 다시 translation을 받아 값을 랜더링 하도록 동작하게 만든다.

<br>

Component에 랜더링 하지 않는 unit test는 간단하고, 의미가 별로 없다. 따라서 랜더링을 테스트하는 `integration test`를 작성한다. 컴포넌트는 간단한 테스트용 컴포넌트를 만든다. `TranslateService`는 `pipe`에서 직접 의존하는 `onTranslationChange`와 `get`만 mocking하여 만든다(`Partial<TranslateService>`).

<br>

비동기 테스트는 역시 `fakeAsync`, `tick`함수를 사용하고, Service의 비동기 동작은 RxJS의 `delay` 연산자로 흉내낸다. 작성된 test suite는 아래와 같다.


```ts
// translate.pipe.spec.ts

//...import

const key1 = 'key1';
const key2 = 'key2';

@Component({
  template: `{{ key | translate }}`,
})
class HostComponent {
  public key = key1;
}

describe('TranslatePipe', () => {
  let fixture: ComponentFixture<HostComponent>;
  // pipe에서 직접 의존하는 메서드/프로퍼티만 작성한다.
  let translateService: Pick<TranslateService, 'onTranslationChange' | 'get'>;

  beforeEach(async () => {
    translateService = {
      onTranslationChange: new EventEmitter<Translations>(),
      get(key: string): Observable<string> {
        return of(`Translation for ${key}`);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [TranslatePipe, HostComponent],
      providers: [{ provide: TranslateService, useValue: translateService }],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(HostComponent);
  });

  // service가 동기방식으로 값을 줄때 테스트
  it('translates the key, sync service response', () => {
    fixture.detectChanges();
    expectContent(fixture, 'Translation for key1');
  });

  // translateService가 비동기로 동작할때의 테스트는 delay oerator로 가라로 만들고, fakeAsync 함수로 테스트한다.
  it('translates the key, async service response', fakeAsync(() => {
    
    // get메서드가 비동기로 동작하도록 재정의한다.
    translateService.get = (key) =>
      of(`Async translation for ${key}`).pipe(delay(100));
    fixture.detectChanges();
    
    // null은 랜더링하면 ''
    expectContent(fixture, '');

    tick(100);

    // 다시 변화감지가 수행되도록 한다.
    fixture.detectChanges();
    expectContent(fixture, 'Async translation for key1');
  }));

  it('translates a changed key', () => {
    fixture.detectChanges();
    fixture.componentInstance.key = key2;
    fixture.detectChanges();

    expectContent(fixture, 'Translation for key2');
  });

  it('updates on translation change', fakeAsync(() => {
    fixture.detectChanges();
    translateService.get = (key) => of(`New translation for ${key}`);
    // translation이 바뀌면 값을 emit, pipe에서 이걸 구독하고 있다가 translateService.get()을 다시 호출한다.
    translateService.onTranslationChange.emit({});
    fixture.detectChanges();
    expectContent(fixture, 'New translation for key1');
  }));
});
```