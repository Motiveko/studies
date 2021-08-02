import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  // {Observable | async} 로 넘어오는 데이터는 자식 컴포넌트에서 Observable로도, 그냥 객체로도 받을 수 있다.
  @Input() todos: Todo[];
  @Input() selectedTodo: Todo;

  @Output() selectTodo: EventEmitter<Todo> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
