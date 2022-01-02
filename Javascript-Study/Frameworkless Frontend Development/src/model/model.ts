import { cloneDeep } from "./eventBus";

export type ActionEvent = {
  type: string,
  payload?: any
}
export type Todo = { text: string, completed: boolean}
export type CurrentFilter = 'All' | 'Active' | 'Completed';
export type State = { todos: Todo[], currentFilter: CurrentFilter}


type Method = (state: State, event: ActionEvent) => State

const INITIAL_STATE: State = {
  todos: [],
  currentFilter: 'All'
}
const addItem: Method = (state, event) => {
  const text = event.payload;
  
  if(!text) {
    return state;
  }
  
  return {
    ...state,
    todos: [
      ...state.todos, 
      {
        text,
        completed: false
      }
    ]
  }
}

const updateItem: Method = (state, event) => {
  const { text, index } = event.payload;
  if(!text) {
    return state;
  }

  if(index < 0 || !state.todos[index]) {
    return state;
  }

  return {
    ... state, 
    todos: state.todos.map((todo, i) => {
      if(i === index) {
        todo.text = text;
      }
      return todo;
    })
  }
}

const deleteItem: Method = (state, event) => {
  const index = event.payload;
  
  if(!index || !state.todos[index]) {
    return state;
  }
  return {
    ...state,
    todos: state.todos.filter((todo, i) => {
      return i != index
    })
  }
}

const toggleItem: Method = (state, event) => {
  const index = event.payload;
  if(!index || !state.todos[index]) {
    return state;
  }
  return {
    ...state,
    todos: state.todos.map((todo, i) => {
      if(i == index) {
        todo.completed = !todo.completed;
      }
      return todo;
    })
  }
}

const clearCompleted: Method = (state, event) => {
  return {
    ...state,
    todos: state.todos.filter((todo) => !todo.completed)
  }
}

const changeFilter: Method = (state, event) => {
  const filter = event.payload;
  return {
    ...state,
    currentFilter: filter
  }
}

const methods: { [key: string]: Method } = {
  ITEM_ADDED: addItem,
  ITEM_UPDATED: updateItem,
  ITEM_DELETED: deleteItem,
  ITEM_TOGGLED: toggleItem,
  COMPLETED_ITEM_DELETED: clearCompleted,
  FILTER_CHANGED: changeFilter
}

export default (initialState: State = INITIAL_STATE) => {
  
  return (prevState?: State, event?: ActionEvent) => {
    if(!prevState) {
      return cloneDeep(initialState);
    }
    
    if(!event) {
      throw new Error('event should exists')
    }
    
    const currentMethod = methods[event.type];
    
    if(!currentMethod) {
      return prevState;
    }
    return currentMethod(prevState, event);
  }
}