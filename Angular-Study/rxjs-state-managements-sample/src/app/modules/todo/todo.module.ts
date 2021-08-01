import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { FilterComponent } from './components/filter/filter.component';
import { TodoShellComponent } from './components/todo-shell/todo-shell.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

@NgModule({
  declarations: [
    FilterComponent,
    TodoShellComponent,
    TodoListComponent,
    TodoDetailComponent
  ],
  imports: [CommonModule, TodoRoutingModule],
})
export class TodoModule {}
