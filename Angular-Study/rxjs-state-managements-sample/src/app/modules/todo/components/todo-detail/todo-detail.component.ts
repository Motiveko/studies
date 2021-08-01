import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../../models/todo';
import { TodosStateService } from '../../services/todos-state.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // 무엇일까..
})
export class TodoDetailComponent implements OnInit {
  // [todo]="selectedTdodo$ | async" 로 받을 때 Observabe | T 둘 다로 받을 수 있다.
  @Input() todo: Todo;

  constructor(private todoState: TodosStateService) {}

  ngOnInit(): void {}

  // selectedTodo 초기화? -> 자동으로 side nav 닫아짐
  onClose(): void {
    this.todoState.clearSelectedTodo();
  }

  submit(form: NgForm): void {
    // this.todo에 form.value를 덮어쓴다.
    const newTodo = {
      ...this.todo,
      ...form.value,
    };

    if (newTodo.id) {
      this.todoState.update(newTodo);
    } else {
      this.todoState.create(newTodo);
    }
  }

  delete(): void {
    this.todoState.delete(this.todo);
  }
}
