import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  private count = 0;

  private subject: BehaviorSubject<number>;

  constructor() {
    this.subject = new BehaviorSubject(this.count)
   }

  getCount(): Observable<number> {
    return this.subject.asObservable()
  }

  public increment() {
    this.count++;
    this.notify();
  }

  public decrement() {
    this.count--;
    this.notify();
  }

  public reset(resetCount: number): void{
    this.count = resetCount;
    this.notify();
  }
  
  private notify(): void {
    this.subject.next(this.count);
  }
}
