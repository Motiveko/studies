import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement
  // Configuring the test Module
  beforeEach(async () => {
    // compileComponents method는 async이므로(외부 url의 참조때문), async-await을 사용한다.
    await TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();
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

  it('implements the count', () => {
    const incrementButton = 
      debugElement.query(By.css('[data-testid="increment-button"]'));
    incrementButton.triggerEventHandler('click',null);

    const countOutput = 
      debugElement.query(By.css('[data-testid="count"]'))
  })
});
