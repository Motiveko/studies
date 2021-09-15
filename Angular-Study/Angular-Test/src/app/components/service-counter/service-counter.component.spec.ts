import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { take, toArray } from 'rxjs/operators';
import { CounterService } from 'src/app/services/counter.service';
import { click, expectText, setFieldElementValue, setFieldValue } from 'src/app/spec-helpers/element.spec-helper';

import { ServiceCounterComponent } from './service-counter.component';

describe('ServiceCounterComponent: integration test', () => {
  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent],
      providers: [CounterService],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the start count', () => {
    expectText(fixture, 'count', '0');
  })

  it('increments the count', () => {
    click(fixture, 'increment-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '1');
  })

  it('MY increments the count', () => {
    let actualCounts: number[] = [];
    component.count$.pipe(
      take(2),
      toArray()
    ).subscribe(
      (counts) => actualCounts = counts
    );

    click(fixture, 'increment-button');

    expect(actualCounts[1]).toBe(actualCounts[0] + 1);
  })

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '-1');
  })
  
  it('resets the count', () => {
    let resetCount = '30';
    // TODO : setFieldValue()는 좀 복잡하다. 손으로 다시 구현해보자.
    setFieldValue(fixture, 'reset-input', resetCount);

    click(fixture, 'reset-button');
    fixture.detectChanges();

    expectText(fixture, 'count', resetCount);

  })

});
