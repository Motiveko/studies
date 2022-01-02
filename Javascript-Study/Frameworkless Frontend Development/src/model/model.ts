import { Todo } from "../getTodos";
import observableFactory from './observable';

export type CurrentFilter = 'All' | 'Active' | 'Completed';
export type State = {
  todos: Todo[],
  currentFilter: CurrentFilter
}


const INITIAL_STATE: State = {
  todos: [],
  currentFilter: 'All'
}

export type Model = {
  addItem: (text: string) => void
  deleteItem: (index: number) => void
  toggleItem: (index: number) => void
  changeFilter: (filter: CurrentFilter) => void
  clearCompleted: () => void
}

export default (initialState: State = INITIAL_STATE) => {
  
  let state = observableFactory(initialState);

  const addItem = (text: string) => {
    if(!text) {
      return;
    }
    const { todos } = state;
    todos.push({
      text,
      completed: false
    });
    state.todos = todos;
  }

  const deleteItem = (index: number) => {
    const { todos } = state;
    if(index < 0 || index >= todos.length ) {
      return;
    }

    state.todos = state.todos.filter((todo, i) => i !== index)
  }

  const toggleItem = (index: number) => {
    if (index < 0) {
      return
    }

    if (!state.todos[index]) {
      return
    }

    state.todos = state.todos.map((todo, i) => {
      if (i === index) {
        todo.completed = !todo.completed
      }
      return todo
    })
  }

  const changeFilter = (filter: CurrentFilter) => {
    if(!['All', 'Active', 'Completed'].includes(filter)) {
      throw new Error(`선택한 filter값이 잘못되었습니다. 선택한 filter: ${filter}`);
    }
    state.currentFilter = filter;
  }

  const clearCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.completed);
  }
  
  return {
    addChangeListener: state.addChangeListener,
    addItem,
    deleteItem,
    toggleItem,
    changeFilter,
    clearCompleted,
  };
}
