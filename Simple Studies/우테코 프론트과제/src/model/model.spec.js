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

describe.only('model - customer test', () => {
  let model;
  let spyListener;

  beforeEach(() => {
    model = modelFactory();
    spyListener = jest.fn();
  });

  test('addCustomerCharge 실행시 charge가 10의배수가 아니면 Error', () => {
    expect(() => model.addCustomerCharge(103)).toThrow();
  });

  test('addCustomerCharge 실행시 customer.charge 값이 증가한다.', () => {
    let currentCharge;
    model.addChangeListener(state => {
      // const { charge } = state.customer;
      currentCharge = state.customer.charge;
    });
    expect(currentCharge).toBe(0);

    model.addCustomerCharge(1000);

    expect(currentCharge).toBe(1000);
  });

  test('purchaseProduct - 존재하지 않는 상품이면 Error', () => {
    const name = '사과';
    expect(() => model.purchaseProduct(name)).toThrow(
      new VMError(`${name}은 존재하지 않는 상품입니다.`)
    );
  });

  test('purchaseProduct - 상품이 재고가 0개면 Error', () => {
    const name = '사과';
    model.addProduct({
      name,
      price: 100,
      quantity: 0
    });
    expect(() => model.purchaseProduct(name)).toThrow(new VMError(`${name}은 재고가 부족합니다.`));
  });

  test('purchaseProduct - 돈이 모자르면 Error', () => {
    const name = '사과';
    model.addProduct({
      name,
      price: 1000,
      quantity: 10
    });
    model.addCustomerCharge(500);
    expect(() => model.purchaseProduct(name)).toThrow(
      new VMError(`${name} 구매에 필요한 금액이 부족합니다..`)
    );
  });

  test('pruchaseProduct - 해당 상품의 재고가 1 감소하고 고객 잔고는 price만큼 감소한다.', () => {
    // given
    const name = '사과';
    const price = 100;
    const quantity = 10;
    const charge = 1000;
    model.addProduct({
      name,
      price,
      quantity
    });
    model.addCustomerCharge(charge);
    let currentQuantity;
    let currentCharge;
    model.addChangeListener(state => {
      currentQuantity = state.products.find(product => product.name === name).quantity;
      currentCharge = state.customer.charge;
    });

    // when
    model.purchaseProduct(name);

    // then
    expect(currentCharge).toBe(charge - price);
    expect(currentQuantity).toBe(quantity - 1);
  });

  test('returnCustomerCharge - 남은 잔돈을 반환하고 charge를 0으로 만든다.', () => {
    const oldCharge = 1500;

    model.addCustomerCharge(oldCharge);
    model.returnCustomerCharge();
    let currentState;
    model.addChangeListener(state => {
      currentState = state;
    });

    const { charge, changes } = currentState.customer;

    expect(charge).toBe(0);
  });
});
