import modelFactory, { State } from './model'

let model: any;
describe('observable model', () => {
  beforeEach(() => {
    model = modelFactory();
  })

  test('listeners should be invoked immediately',() => {
    let counter = 0;
    model.addChangeListener((data: State )=> {
      counter++;
    })
    expect(counter).toBe(1);
  })

  test('listeners should be invoked when changing data', () => {
    let counter = 0;
    model.addChangeListener((data: State) => {
      counter++;
    });
    model.addItem('item');
    expect(counter).toBe(2);
  })

  test('listeners should be removed when unsubscribing',() => {
    let counter = 0;
    const unsubscribe = model.addChangeListener((data: State) => {
      counter++;
    });
    unsubscribe();
    model.addItem('item');
    expect(counter).toBe(1);
  })

  test('state should be immutable',() => {
    model.addChangeListener((data: State) => {
      expect(() => {
        data.currentFilter = 'Active';
      }).toThrow();
    })
  })
});