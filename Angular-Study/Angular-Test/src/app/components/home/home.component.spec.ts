import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { findComponent } from 'src/app/spec-helpers/element.spec-helper';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a independent counter', () => {
    // const counter = fixture.debugElement.query(By.css('app-counter'));
    const counter = findComponent(fixture, 'app-counter');
    expect(counter).toBeTruthy();
  });

  it('passes a start count', () => {
    const counter = findComponent(fixture, 'app-counter');
    expect(counter.properties.startCount).toBe(5)
  });

  it('listens for count changes', () => {
    /**
     * 자료에서는 console.log를 테스트한다.
     * spyOn은 아무래도 1개만 spy할 수 있는듯하다. 두개를 spy하면 neverCalled 에러가 발생한다.
     * */ 
    

    // spyOn(console, 'log');
    spyOn(component, 'handleCountChange');
    const counter = findComponent(fixture, 'app-counter');
    const count = 5;
    counter.triggerEventHandler('countChange',count);

    expect(component.handleCountChange).toHaveBeenCalledWith(count);
    // expect(console.log).toHaveBeenCalledWith(
    //   'countChange event from CounterComponent',
    //    count
    // );

  });

  it('renders a sevice counter', () => {
    const serviceCounter = findComponent(fixture, 'app-service-counter');
    expect(serviceCounter).toBeTruthy();
  })

  it('renders a NgRx counter', () => {
    const ngrxCounter = findComponent(fixture, 'app-ngrx-counter');
    expect(ngrxCounter).toBeTruthy();
  })

  
  // 추가
  it('renders 3 service counter', () => {
    const serviceCounters: DebugElement[] = fixture.debugElement.queryAll(By.css('app-service-counter'));
    expect(serviceCounters.length).toBe(3);

  });
});
