import observableFactory from './observable';

describe('observable factory', () => {

  let observable: ReturnType<typeof observableFactory>;
  
   beforeEach(() => {
    observable = observableFactory({
      todos:[],
      currentFilter: 'All'
    })
  })

  test('listeners should be invoked immediatly', () => {
    let count = 0;
    observable.addChangeListener((state) => count++);
    expect(count).toBe(1);
  })

  test('listeners should be invoked when changing data', () => {
    let count = 0;
    observable.addChangeListener((state) => count++);
    observable.todos = [{text: 'test', completed: false}];
    expect(count).toBe(2);
  })

  test('listeners should be removed when unsubscribing', () => {
    let count = 0;
    const unsubscribe = observable.addChangeListener((state) => count++);
    unsubscribe();
    observable.todos = [{text: 'test', completed: false}];
    expect(count).toBe(1)
  })

  test('in listeners state should be immutable', () => {
    let count = 0;
    observable
      .addChangeListener((state) => 
        expect(state.currentFilter = 'Completed')
        .toThrow()
      );
  })
})