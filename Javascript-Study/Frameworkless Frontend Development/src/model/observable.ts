import { State} from "./model"

export type Listener = (state: State) => void;

type Freeze = <T extends object>(x:T) => T 
type CloneDeep = <T extends object>(x:T) => T 

const cloneDeep: CloneDeep = (state: any) => JSON.parse(JSON.stringify(state));

const freeze = (state: State) => {
  return Object.freeze(cloneDeep(state));
}

type Unsubscribe = () => void;
type AddChangeListener = (listener: Listener) => Unsubscribe ;
export default (initialState: State): State & { addChangeListener: AddChangeListener} => {
  
  let listeners: Listener[] = [];

  const proxy = new Proxy(cloneDeep(initialState), {
    set: function(target, prop, value) {
      console.log('setter caslls ', value);
      target[prop as keyof typeof target] =  value;
      listeners.forEach(listener => listener(freeze(target)));
      return true;
    }
  }) as State & { addChangeListener: AddChangeListener};

  proxy.addChangeListener = (listener: Listener) => {
    listeners.push(listener);
    listener(freeze(proxy));
    return () => listeners.filter(li => li !== listener);
  }
  return proxy;
}