import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CounterComponent } from '../counter/counter.component';
import { HomeComponent } from './home.component';

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

describe('Home Component (Faking a Child Component)', () => {
  
  let fixture: ComponentFixture<HomeComponent>; 
  let homeComponent: HomeComponent; 
  let counter: FakeCounterComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, FakeCounterComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    homeComponent = fixture.componentInstance;
    fixture.detectChanges();

    const counterEl = fixture.debugElement.query(By.directive(FakeCounterComponent));
    /*
     fixture(Component, DebugElement(DOM, NativeEl)) 인데 
     DebugElement에서도 자신의 Component를 찾을 수 있다(엄밀이 DebugEl이 상속한 DebugNode에서)
     그러나 DebugElement는 Component의 래퍼객체는 아니므로 Component type은 알지 못한다.
    */
    counter = counterEl.componentInstance
  })

  it('renders an independent counter', () => {
    expect(counter).toBeTruthy();
  })

  it('passes a start count', () => {
    expect(counter.startCount).toBe(5);
  })

  it('listens for count changes', () => {
    spyOn(console, 'log');

    const count = 5;
    
    counter.countChange.emit(count)

    expect(console.log).toHaveBeenCalledWith(
      'countChange event from CounterComponent', 
      count
    );
  })
})

