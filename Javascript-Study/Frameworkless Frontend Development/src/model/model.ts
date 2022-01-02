import { Todo } from "../getTodos";
import observableFactory from './observable';

export type CurrentFilter = 'All' | 'Active' | 'Completed';
export type State = {
  todos: Todo[],
  currentFilter: CurrentFilter
}

export type Listener = (state: State) => void;

type Freeze = <T extends object>(x:T) => T 
type CloneDeep = <T extends object>(x:T) => T 
const cloneDeep: CloneDeep = (state) => {
  return JSON.parse(JSON.stringify(state));
}

const freeze: Freeze = (x) => Object.freeze(cloneDeep(x));

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
  
  const state = cloneDeep(initialState);
  let listeners: Listener[] = [];

  const addItem = (text: string) => {
    if(!text) {
      return;
    }

    state.todos.push({
      text,
      completed: false
    });
  }

  const deleteItem = (index: number) => {
    const { todos } = state;
    if(index < 0 || index >= todos.length ) {
      return;
    }

    todos.splice(index, 1);
  }

  const toggleItem = (index: number) => {
    const { todos } = state;
    if(index < 0 || index >= todos.length ) {
      return;
    }

    todos[index].completed = !todos[index].completed;
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
  
  const model: Model = {
    addItem,
    deleteItem,
    toggleItem,
    changeFilter,
    clearCompleted,
  };
  
  return observableFactory(model, () => state);
}
