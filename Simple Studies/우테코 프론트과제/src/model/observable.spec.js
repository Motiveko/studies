import observableFactory from './observable';

describe('observable factory', () => {
  let model;

  beforeEach(() => {
    model = observableFactory({ foo: 'bar' });
  });

  test('구독과 동식에 listener 호출되어야한다.', () => {
    let count = 0;
    model.addChangeListener(() => {
      count += 1;
    });
    expect(count).toBe(1);
  });

  test('model에 변경(set)이 발생하면 listener 호출된다.', () => {
    let count = 0;
    model.addChangeListener(state => {
      count += 1;
    });
    model.foo = 'zar';
    expect(count).toBe(2);
  });

  test('unsubscribe 하면 listener 등록 해제되어야한다.', () => {
    let count = 0;
    const unsubscribe = model.addChangeListener(() => {
      count += 1;
    });
    unsubscribe();
    model.foo = 'zar';
    expect(count).toBe(1);
  });

  test('listener가 받는 상태값은 immutable이다.', () => {
    model.addChangeListener(state => {
      expect(() => {
        // eslint-disable-next-line no-param-reassign
        state.foo = 'z';
      }).toThrow();
    });
  });
});
