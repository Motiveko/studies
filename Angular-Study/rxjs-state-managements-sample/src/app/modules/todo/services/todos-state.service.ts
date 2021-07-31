import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StateService } from 'src/app/shared/state.service';
import { Filter } from '../models/filter';
import { Todo } from '../models/todo';
import { TodosApiService } from './api/todos-api.service';

interface TodoState {
  todos: Todo[];
  selectedTodoId: number | undefined;
  filter: Filter;
}
const initialState: TodoState = {
  todos: [],
  selectedTodoId: undefined,
  filter: {
    search: '',
    category: {
      isBusiness: false,
      isPrivate: false,
    },
  },
};

// eslint-disable-next-line no-shadow
function getTodosFiltered(todos: Todo[], filter: Filter): Todo[] {
  return todos.filter((item) => {
    return (
      item.title.toUpperCase().indexOf(filter.search.toUpperCase()) > -1 &&
      (filter.category?.isBusiness ? item.isBusiness : true) &&
      (filter.category?.isPrivate ? item.isPrivate : true)
    );
  });
}

@Injectable({
  providedIn: 'root',
})
export class TodosStateService extends StateService<TodoState> {
  // filter(검색) 결과 Observable
  private _todosFiltered$: Observable<Todo[]> = this.select((state) => {
    return getTodosFiltered(state.todos, state.filter);
  });

  todosDone$: Observable<Todo[]> = this._todosFiltered$.pipe(
    map((todos) => todos.filter((todo) => todo.isDone))
  );

  todosNotDone$: Observable<Todo[]> = this._todosFiltered$.pipe(
    map((todos) => todos.filter((todo) => !todo.isDone))
  );

  filter$: Observable<Filter> = this.select((state) => state.filter);

  selectedTodo$: Observable<Todo | undefined> = this.select((state) => {
    if (state.selectedTodoId === 0) {
      return new Todo();
    }
    return state.todos.find((todo) => todo.id === state.selectedTodoId);
  }).pipe(
    // Multicast to prevent multiple executions due to multiple subscribers
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  constructor(private apiService: TodosApiService) {
    super(initialState);
    this.load();
  }

  // todo 클릭 시 EditTodo 보여짐
  selectTodo(todo: Todo): void {
    this.setState({ selectedTodoId: todo.id });
  }

  // 새로 생설할 때?
  initNewTodo(): void {
    // selectedTodo$ 에서 selectedTodoId === 0 일 때 새로운 Todo 객체를 내보냈다
    this.setState({ selectedTodoId: 0 });
  }

  // EditTodo 닫을 때?
  clearSelectedTodo(): void {
    this.setState({ selectedTodoId: undefined });
  }

  // 검색내용 수정, { filter: newFilter }로 왜 안되는지?
  updateFilter(newFilter: Filter): void {
    this.setState({
      filter: {
        ...this.state.filter,
        ...newFilter,
      },
    });
  }

  // API CALLS
  load() {}
}
