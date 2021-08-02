import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// 모듈단위 lazy loading 구현시, 필요한 module을 부모 모듈에 항상 넣어줘야한다. (form은 어디서나 쓰일수있다). 그래서 이 때 shared moudle이라는걸 써야하는듯?
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TodoRoutingModule } from './todo-routing.module';
import { FilterComponent } from './components/filter/filter.component';
import { TodoShellComponent } from './components/todo-shell/todo-shell.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

@NgModule({
  declarations: [FilterComponent, TodoShellComponent, TodoListComponent, TodoDetailComponent],
  imports: [CommonModule, TodoRoutingModule, MatSidenavModule, FormsModule, ReactiveFormsModule],
})
export class TodoModule {}
