import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../../models/filter';
import { Todo } from '../../models/todo';
import { TodosStateService } from '../../services/todos-state.service';

@Component({
  selector: 'app-todo-shell',
  templateUrl: './todo-shell.component.html',
  styleUrls: ['./todo-shell.component.css'],
})
export class TodoShellComponent implements OnInit {
  filter$: Observable<Filter> = this.todoState.filter$;

  selectedTodo$: Observable<Todo> = this.todoState.selectedTodo$;

  todosNotDone$: Observable<Todo[]> = this.todoState.todosNotDone$;

  todosDone$: Observable<Todo[]> = this.todoState.todosDone$;

  constructor(private todoState: TodosStateService) {}

  ngOnInit(): void {}

  // todoState.intitNewTodo()
  // -> state의 selectedTodoId: 0 ->
  // selectedTodo$에서 next(new Todo()) 로 신규 todo 객체 방출
  addTodo(): void {
    this.todoState.initNewTodo();
  }

  onFilterUpdate(filter: Filter): void {
    this.todoState.updateFilter(filter);
  }

  selectTodo(todo: Todo): void {
    this.todoState.selectTodo(todo);
  }
}
