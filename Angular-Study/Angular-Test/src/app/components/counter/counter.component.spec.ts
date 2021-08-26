import { DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CounterComponent } from './counter.component';


describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;

  // Arrange(given)
  // Configuring the test Module
  beforeEach(async () => {
    // compileComponents method는 async이므로(외부 url의 참조때문), async-await을 사용한다.
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();
    // 랜더링
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    // test환경에는 auto Change detection이 없기때문에 수동으로한다.
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('increments the count', () => {
    // Act(when)
    click(fixture, 'increment-button');
    fixture.detectChanges();

    // Assert(then)
    expectText(fixture, 'count', '1');
  });

  it('decrements the count', () => {
    // Act(when)
    click(fixture, 'decrement-button');
    fixture.detectChanges();

    // Assert(then)
    expectText(fixture, 'count', '-1');
  });

  it('resets the count', () => {
    // Act(when)
    const resetInputEl = findEl(fixture, 'reset-input').nativeElement;
    resetInputEl.value = '123';
    click(fixture, 'reset-button');
    fixture.detectChanges();

    // Assert(then)
    expectText(fixture, 'count', '123');

  })
});

function findEl<T>(fixture: ComponentFixture<T>, testid: string): DebugElement {
  return fixture.debugElement.query(By.css(`[data-testid="${testid}"]`));
}
export function click<T>(
  fixture: ComponentFixture<T>,
  testid: string
): void {
    const element = findEl(fixture, testid);
    const event = makeClickEvent(element.nativeElement);
    element.triggerEventHandler('click', event);
}

export function makeClickEvent(target : EventTarget): Partial<MouseEvent> {
  return {
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'click',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true,
    button: 0    
  }
}

export function expectText<T>(
  fixture: ComponentFixture<T>,
  testid: string,
  text: string
): void {
  const element = findEl(fixture, testid);
  const actualText = element.nativeElement.textContent;
  expect(actualText).toBe(text);
}