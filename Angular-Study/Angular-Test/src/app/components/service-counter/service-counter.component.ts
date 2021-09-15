import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-service-counter',
  templateUrl: './service-counter.component.html',
  styleUrls: ['./service-counter.component.css']
})
export class ServiceCounterComponent {

  count$: Observable<number>

  constructor(private counterService: CounterService) { 
    this.count$ = this.counterService.getCount();
  }
  
  public increment(): void {
    this.counterService.increment();
  }

  public decrement(): void {
    this.counterService.decrement();
  }

  public reset(newCount: string): void {
    const count = parseInt(newCount, 10);
    if(!isNaN(count)) {
      this.counterService.reset(count);
    }
  }
}
