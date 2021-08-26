import { DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { click, expectText, findEl, setFieldElementValue } from 'src/app/spec-helpers/element.spec-helper';
import { CounterComponent } from './counter.component';

const startCount = 123;
const newCount = 456;

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

    component.startCount = startCount;
    component.ngOnChanges();
    // test환경에는 auto Change detection이 없기때문에 수동으로한다.
    fixture.detectChanges();
  });

  it('시작시 startCount가 랜더링된다.', () => {
    expectText(fixture, 'count', String(startCount));
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('increments the count', () => {
    // Act(when)
    click(fixture, 'increment-button');
    fixture.detectChanges();

    // Assert(then)
    expectText(fixture, 'count', String(startCount + 1));
  });

  it('decrements the count', () => {
    // Act(when)
    click(fixture, 'decrement-button');
    fixture.detectChanges();

    // Assert(then)
    expectText(fixture, 'count', String(startCount - 1));
  });

  it('resets the count', () => {
    const newCount = '123';

    // Act(when)
    const resetInputEl = findEl(fixture, 'reset-input').nativeElement;
    // set Input Field
    setFieldElementValue(resetInputEl, newCount);

    // Click Reset Button
    click(fixture, 'reset-button');

    fixture.detectChanges();

    // Assert(then)
    expectText(fixture, 'count', newCount);
  });

  it('리셋하고자하는 값이 숫자가 아니면 리셋하지 않는다.', () => {
    const value = 'not a number';

    // Act(when)
    const resetInputEl = findEl(fixture, 'reset-input').nativeElement;
    setFieldElementValue(resetInputEl, value);
    click(fixture, 'reset-button');
    fixture.detectChanges();

    // Assert(then)
    expectText(fixture, 'count', String(startCount));
  }) 
});

