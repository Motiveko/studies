import { Todo } from "../getTodos";

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

export default (initialState: State = INITIAL_STATE) => {
  
  const state = cloneDeep(initialState);
  let listeners: Listener[] = [];
  const _invokeListeners = () => {
    listeners.forEach(listener => listener(freeze(state)));
  }
  
  const addChangeListener = (listener: Listener) => {
    listeners.push(listener);
    
    listener(freeze(state));

    return () => {
      // filter는 원본배열을 변환하지 않는다
      listeners = listeners.filter(l => l !== listener);
    }
  }

  const addItem = (text: string) => {
    if(!text) {
      return;
    }

    state.todos.push({
      text,
      completed: false
    });
    
    _invokeListeners();
  }

  const deleteItem = (index: number) => {
    const { todos } = state;
    if(index < 0 || index >= todos.length ) {
      return;
    }

    todos.splice(index, 1);
    
    _invokeListeners();
  }

  const toggleItem = (index: number) => {
    const { todos } = state;
    if(index < 0 || index >= todos.length ) {
      return;
    }

    todos[index].completed = !todos[index].completed;
    _invokeListeners();
  }
  const changeFilter = (filter: CurrentFilter) => {
    if(!['All', 'Active', 'Completed'].includes(filter)) {
      throw new Error(`선택한 filter값이 잘못되었습니다. 선택한 filter: ${filter}`);
    }
    state.currentFilter = filter;
    _invokeListeners();
  }

  const clearCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.completed);
    _invokeListeners();
  }
  
  return {
    addItem,
    deleteItem,
    toggleItem,
    changeFilter,
    clearCompleted,
    addChangeListener
  }
}
