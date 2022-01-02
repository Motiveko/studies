import { Listener, State, Model} from "./model"
import modelFactory from './model';
import { Module } from "webpack";

const cloneDeep = (state: any) => JSON.parse(JSON.stringify(state));

const freeze = (state: State) => {
  return Object.freeze(cloneDeep(state));
}

type ModelActions = Model[keyof Model];

export default (model: Model, stateGetter: () => State) => {
  
  let listeners: Listener[] = [];

  const wrapAction = (action: ModelActions) => {
    // TODO : action의 시그니쳐가 매번 다른데 이걸 아래 방법 말고 컴파일 에러 안나게 할 수 있는 방법을 모르겠다.
    return (...args: any[]) => {
      // @ts-ignore: Unreachable code error
      const value = action(...args);
      invokeListener();
      return value;
    }
  }

  const invokeListener = () => {
    console.log(stateGetter());
    listeners.forEach(listener => listener(freeze(stateGetter())));
  }

  const addChangeListener = (listener: Listener) => {
    listeners.push(listener);
    listener(freeze(stateGetter()));
    return () => listeners.filter(li => li !== listener);
  }

  const baseProxy = {
    addChangeListener
  }
  return Object
    .keys(model)
    .filter(key => {
      return typeof model[key as keyof typeof model] === 'function'
    })
    .reduce((proxy, key) => {
      const action = model[key as keyof typeof model];
      return {
        ...proxy,
        [key]: wrapAction(action)
      }
    }, baseProxy) as unknown as (Model & { addChangeListener: typeof addChangeListener });
}