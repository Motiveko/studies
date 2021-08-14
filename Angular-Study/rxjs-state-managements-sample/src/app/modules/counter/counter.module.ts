import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterRoutingModule } from './counter-routing.module';
import { CounterShellComponent } from './counter-shell/counter-shell.component';

@NgModule({
  declarations: [CounterShellComponent],
  imports: [CommonModule, CounterRoutingModule],
})
export class CounterModule {}
