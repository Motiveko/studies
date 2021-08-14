import { Component } from '@angular/core';
import { CounterStateService } from './modules/counter/services/counter-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'rxjs-state-managements-sample';
  counter$ = this.counterState.$count;
  constructor(private counterState: CounterStateService) {}
}
