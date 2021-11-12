import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { CounterService } from './counter.service';

describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    service = new CounterService();
  });

  const expectCount = (count: number): void => {
    let actualCount: number | undefined;
    service
      .getCount()
      .pipe(first())
      .subscribe((serviceCount) => {
        actualCount = serviceCount;
      });
    expect(actualCount).toBe(count);
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns the count', () => {
    expectCount(0);
  });

  it('increments the count', () => {
    service.increment();
    expectCount(1);
  });

  it('decrements the count', () => {
    service.decrement();
    expectCount(-1);
  });

  it('resets the count', () => {
    const newCount = 123;
    service.reset(newCount);
    expectCount(newCount);
  });
});
