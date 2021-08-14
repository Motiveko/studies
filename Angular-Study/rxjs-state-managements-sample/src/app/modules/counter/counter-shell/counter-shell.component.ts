import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterStateService } from '../services/counter-state.service';

@Component({
  selector: 'app-counter-shell',
  templateUrl: './counter-shell.component.html',
  styleUrls: ['./counter-shell.component.css'],
})
export class CounterShellComponent implements OnInit {
  counter$: Observable<number> = this.counterState.$count;

  constructor(private counterState: CounterStateService) {}

  ngOnInit(): void {}

  increment(): void {
    this.counterState.increment();
  }

  decrement(): void {
    this.counterState.decrement();
  }
}
