import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterShellComponent } from './counter-shell/counter-shell.component';

const routes: Routes = [{ path: '', component: CounterShellComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CounterRoutingModule {}
