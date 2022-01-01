import { Todo } from "../getTodos";

export type State = {
  todos: Todo[],
  currentFilter: 'All' | 'Active' | 'Completed'
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
    

    listeners.forEach(listener => listener(freeze(state)));
  }
  
  return {
    addItem,
    addChangeListener
  }
}