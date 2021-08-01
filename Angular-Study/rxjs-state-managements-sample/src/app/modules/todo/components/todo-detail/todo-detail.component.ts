import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo';
import { TodosStateService } from '../../services/todos-state.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit {
  @Input() todo: Observable<Todo>;

  constructor(private todoState: TodosStateService) {}

  ngOnInit(): void {}

  // selectedTodo 초기화?, side nav 닫기
  onClose() {}
}
