import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/shared/state.service';

interface CounterState {
  count: number;
}

const initalState: CounterState = {
  count: 42,
};

@Injectable({
  providedIn: 'root',
})
export class CounterStateService extends StateService<CounterState> {
  $count: Observable<number> = this.select((state) => state.count);

  constructor() {
    super(initalState);
  }

  increment(): void {
    this.setState({ count: this.state.count + 1 });
  }

  decrement(): void {
    this.setState({ count: this.state.count - 1 });
  }
}
