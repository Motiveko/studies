import { ActionEvent } from "./model";

type CloneDeep = <T extends object>(state: T) => T
type Freeze = <T extends object>(state: T) => T
type Listener = (v: any) => void


export const cloneDeep: CloneDeep = (state) => {
  return JSON.parse(JSON.stringify(state));
}

const freeze: Freeze = (state) => {
  return Object.freeze(cloneDeep(state));
}

const eventBusFactory = (model: any) => {
  // model : 상태 변경을 위한 순수함수(reducer)
  type State = ReturnType<typeof model>

  let listeners: Listener[] = []
  let state: State = model()

  const subscribe = (listener: Listener) => {
    listeners.push(listener)
    listener(state)
    return () => listeners.filter(l => l !== listener)
  }

  const _invokeSubscribers = () => {
    const data = freeze(state)
    listeners.forEach(listener => listener(data))
  }

  const dispatch = (event: ActionEvent) => {
    const newState = model(state, event)
    
    if (!newState) {
      throw new Error('model should always return a value')
    }

    if (newState === state) {
      return
    }

    state = newState

    _invokeSubscribers()
  }

  return {
    subscribe,
    dispatch,
    getState: () => freeze(state)
  }
}
export type EventBus = ReturnType<typeof eventBusFactory>;
export default eventBusFactory