import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoShellComponent } from './components/todo-shell/todo-shell.component';

const routes: Routes = [{ path: '', component: TodoShellComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
