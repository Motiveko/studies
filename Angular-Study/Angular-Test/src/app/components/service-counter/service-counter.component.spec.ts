import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { CounterService } from 'src/app/services/counter.service';
import {
  click,
  expectText,
  setFieldElementValue,
  setFieldValue,
} from 'src/app/spec-helpers/element.spec-helper';

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
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '1');
  });

  it('MY increments the count', () => {
    let actualCounts: number[] = [];
    component.count$
      .pipe(take(2), toArray())
      .subscribe((counts) => (actualCounts = counts));

    click(fixture, 'increment-button');

    expect(actualCounts[1]).toBe(actualCounts[0] + 1);
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '-1');
  });

  it('resets the count', () => {
    let resetCount = '30';
    // TODO : setFieldValue()는 좀 복잡하다. 손으로 다시 구현해보자.
    setFieldValue(fixture, 'reset-input', resetCount);

    click(fixture, 'reset-button');
    fixture.detectChanges();

    expectText(fixture, 'count', resetCount);
  });
});

describe('ServiceCounterComponent: unit test', () => {
  let fixture: ComponentFixture<ServiceCounterComponent>;
  let component: ServiceCounterComponent;
  let currentCount = 123;
  let fakeCounterService: CounterService;

  beforeEach(async () => {
    fakeCounterService = jasmine.createSpyObj<CounterService>(
      'CounterService',
      {
        getCount: of(currentCount),
        increment: undefined,
        decrement: undefined,
        reset: undefined,
      }
    );
    await TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent],
      providers: [{ provide: CounterService, useValue: fakeCounterService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('show the count', () => {
    expectText(fixture, 'count', String(currentCount));
    expect(fakeCounterService.getCount).toHaveBeenCalled();
  });
  it('increment the count', () => {
    click(fixture, 'increment-button');
    expect(fakeCounterService.increment).toHaveBeenCalled();
  });
  it('decrement the count', () => {
    click(fixture, 'decrement-button');
    expect(fakeCounterService.decrement).toHaveBeenCalled();
  });
  it('resets the count', () => {
    let resetCount = 3;
    let resetInput = fixture.debugElement.query(
      By.css('[data-testid=reset-input]')
    );
    // setFieldValue(fixture, 'reset-input', String(resetCount));
    resetInput.nativeElement.value = resetCount;
    click(fixture, 'reset-button');
    expect(fakeCounterService.reset).toHaveBeenCalledWith(resetCount);
  });
});

describe('ServiceCounterComponent: unit test with minimal logic', () => {
  let fixture: ComponentFixture<ServiceCounterComponent>;
  let component: ServiceCounterComponent;
  let fakeCounterService: Pick<CounterService, keyof CounterService>;
  const newCount = 100;
  let currentCount = 0;
  beforeEach(async () => {
    let fakeCount$ = new BehaviorSubject<number>(currentCount);
    fakeCounterService = {
      getCount() {
        return fakeCount$;
      },
      increment() {
        fakeCount$.next(currentCount + 1);
      },
      decrement() {
        fakeCount$.next(currentCount - 1);
      },
      reset() {
        fakeCount$.next(newCount);
      },
    };
    // TODO : spyOn이 it()내부로 가면 toHaveBeenCalled에서 오류난다. 원인을 모르겠다..
    spyOn(fakeCounterService, 'getCount').and.callThrough();
    spyOn(fakeCounterService, 'increment').and.callThrough();
    spyOn(fakeCounterService, 'decrement').and.callThrough();
    spyOn(fakeCounterService, 'reset').and.callThrough();
    
    await TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent],
      providers: [{ provide: CounterService, useValue: fakeCounterService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the count', () => {
    expectText(fixture, 'count', String(currentCount));
    expect(fakeCounterService.getCount).toHaveBeenCalled();
  });

  it('increment the count', () => {
    click(fixture, 'increment-button');
    fixture.detectChanges();
    expectText(fixture, 'count', String(currentCount + 1));
    expect(fakeCounterService.increment).toHaveBeenCalled();
  })

  it('decrement the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    expectText(fixture, 'count', String(currentCount - 1));
    expect(fakeCounterService.decrement).toHaveBeenCalled();
  })

  it('reset the count', () => {
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    fixture.detectChanges();
    expectText(fixture, 'count', String(newCount));
    expect(fakeCounterService.reset).toHaveBeenCalledWith(newCount);
  })
});
