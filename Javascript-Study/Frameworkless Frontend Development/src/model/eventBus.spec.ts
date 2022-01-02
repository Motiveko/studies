import eventBusFactory, { EventBus } from './eventBus'
const counterModel = (state?: any, event?: any) => {
  // initial state
  if(!event) {
    return {counter: 0};
  }

  if(event.type === 'ERROR') {
    return;
  }

  // bypass
  if(event.type !== 'COUNTER') {
    return state;
  }


  // state changes
  return {
    counter: state.counter++
  }
}

describe('event bus', () => {
  let eventBus: EventBus;
  beforeEach(() => {
    eventBus = eventBusFactory(counterModel);
  })
  test('subscriber should be invoked when the model catch the event', () => {
    let counter = 0;
    
    eventBus.subscribe(() => counter++);

    eventBus.dispatch({type: 'COUNTER'});

    expect(counter).toBe(2);
  })

  test('subscribers should not be invoked when model does not catch the evnet',() => {
    let counter = 0;

    eventBus.subscribe(() => counter++);

    eventBus.dispatch({type: 'HI'});

    expect(counter).toBe(1);
  })

  test('subscriber should receive immutable state', () => {
    eventBus.subscribe((state) => {
      expect(() => {state.a = 'a'}).toThrow
    })
  })

  test('should throw error in the model does not return a state', () => {
    eventBus.subscribe(() => {});

    expect(() => {eventBus.dispatch({type: 'ERROR'})}).toThrow();
  })
});