import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from '../state.service';

interface TodoState {
  todos: Todo[],
  selectedTodoId: number  // ??
}
interface Todo {
  id: number,
  todo: string,
  progress: number
}

const initialState: TodoState = {
  todos: [],
  selectedTodoId: undefined
}

@Injectable({
  providedIn: 'root'
})
export class TodoStateService extends StateService<TodoState>{

  todos$: Observable<Todo[]> = this.select(state => state.todos)


  selectedTodo$: Observable<Todo> = this.select((state) => {
    return state.todos.find((item) => item.id === state.selectedTodoId);
  });

  constructor() {
    super(initialState)
  }

  addTodo(todo: Todo){
    this.setState({todos: [...this.state.todos, todo]})
  }

  // 이게 잘 이해가 안된다 setState로 selectedTodoId값만 어떻게 바뀌게 되는거지?
  selectTodo(todo: Todo){
    this.setState({ selectedTodoId: todo.id})
  }
}
