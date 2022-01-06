import VMError from '../core/vm-error';
import modelFactory from './model';

const add = (a, b) => a + b;
describe('model - addProduct test', () => {
  let model;
  let spyListener;

  beforeEach(() => {
    model = modelFactory();
    spyListener = jest.fn();
    window.MissionUtils = {
      Random: {
        pickNumberInList: range => {
          const randomIndex = Math.floor(Math.random() * range.length);
          return range[randomIndex];
        }
      }
    };
  });

  afterEach(() => {
    window.MissionUtils = undefined;
  });

  test('addProduct - 호출하면 product가 추가된다.', () => {
    let realState = {};
    model.addChangeListener(state => {
      realState = state;
    });
    const product = {
      name: '아이템',
      price: 100,
      quantity: 10
    };
    model.addProduct(product);
    expect(realState.products[0]).toStrictEqual(product);
  });

  test('addProduct - product에 필요 속성이 없으면 alert 호출한다.', () => {
    // when
    model.addChangeListener(spyListener);

    const addEmptyProduct = () => model.addProduct({});
    // then
    expect(addEmptyProduct).toThrow(new VMError('상품은 name, price, quantity는 필수 속성입니다.'));
    expect(spyListener).toHaveBeenCalledTimes(1);
  });

  test('addProduct - 상품 가격이 숫자가 아니면 alert 호출한다.', () => {
    // given
    model.addChangeListener(spyListener);

    // when
    const addInvalidProduct = () => model.addProduct({ name: 'name', quantity: 0, price: '한글' });
    expect(addInvalidProduct).toThrow(new VMError('상품 가격은 숫자만 입력해주세요.'));
    expect(spyListener).toHaveBeenCalledTimes(1);
  });

  test('addProduct - 상품 가격이 100원 이하이거나 나눠떨어 지지 않으면 alert 호출한다.', () => {
    // given
    const name = 'name';
    const quantity = 10;
    model.addChangeListener(spyListener);

    const addProduct1 = () => model.addProduct({ name, quantity, price: 101 });
    const addProduct2 = () => model.addProduct({ name, quantity, price: 90 });

    // when then
    expect(addProduct1).toThrow(
      new VMError('상품 가격은 100원 이상이며 10으로 나눠떨어져야 합니다.')
    );
    expect(addProduct2).toThrow(
      new VMError('상품 가격은 100원 이상이며 10으로 나눠떨어져야 합니다.')
    );
    expect(spyListener).toHaveBeenCalledTimes(1);
  });

  test('addProduct - 상품 갯수가 숫자가 아니거나 음수면 alert 호출한다.', () => {
    // given
    const name = 'n';
    const price = 110;
    model.addChangeListener(spyListener);

    // when
    const addProduct1 = () => model.addProduct({ name, price, quantity: '한글' });
    const addProduct2 = () => model.addProduct({ name, price, quantity: -1 });

    expect(addProduct1).toThrow(new VMError('상품 수량은 숫자만 입력 가능합니다.'));
    expect(addProduct2).toThrow(new VMError('상품 수량의 최소값은 0 입니다.'));
    expect(spyListener).toHaveBeenCalledTimes(1);
  });

  test('addCharge - 호출시 coin들이 증가한다.', () => {
    let currentChanges;
    model.addChangeListener(state => {
      currentChanges = state.changes;
    });
    // 최초 상태 - 잔돈 전부 0개씩이다
    Object.values(currentChanges).forEach(quantity => {
      expect(quantity).toBe(0);
    });

    const charge = 3000;
    model.addCharge(charge);
    // 동전별로 갯수가 추가된다.
    const changeSum = Object.keys(currentChanges).reduce((acc, coin) => {
      // eslint-disable-next-line no-param-reassign
      acc += coin * currentChanges[coin];
      return acc;
    }, 0);
    expect(changeSum).toBe(charge);
  });
});
