import VMError from '../core/vm-error';
import { cloneDeep } from '../utils/common-util';
import { calcChangesSum, calcMinimumChanges } from '../utils/model-util';
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
    const changeSum = calcChangesSum(currentChanges);
    expect(changeSum).toBe(charge);
  });
});

describe('model - customer test', () => {
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

  test('addCustomerCharge 실행시 charge가 10의배수가 아니면 Error', () => {
    expect(() => model.addCustomerCharge(103)).toThrow();
  });

  test('addCustomerCharge 실행시 고객의 charge와 자판기 changes가 증가한다.', () => {
    let currentChanges;
    let currentCharge;
    model.addChangeListener(state => {
      const { changes } = state;
      const { charge } = state.customer;
      currentChanges = changes;
      currentCharge = charge;
    });

    // 초기상태
    expect(currentCharge).toBe(0);
    expect(calcChangesSum(currentChanges)).toBe(0);

    const charge = 1000;
    // 금액 투입 1회차
    model.addCustomerCharge(charge);
    expect(currentCharge).toBe(charge);
    expect(calcChangesSum(currentChanges)).toBe(charge);
    // 금액 투입 2회차
    model.addCustomerCharge(charge);
    expect(currentCharge).toBe(charge * 2);
    expect(calcChangesSum(currentChanges)).toBe(charge * 2);
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
    }); // given end

    // when
    model.purchaseProduct(name);

    // then
    expect(currentCharge).toBe(charge - price);
    expect(currentQuantity).toBe(quantity - 1);
  });

  test('returnCustomerCharge - 잔돈 반환시 자판기 잔돈 감소한만큼 고객 잔돈 증가하고 charge는 0이된다.', () => {
    // 초기상태
    let VMChanges;
    let custmoerChanges;
    let custmoerCharge;
    model.addChangeListener(state => {
      VMChanges = state.changes;
      custmoerChanges = state.customer.changes;
      custmoerCharge = state.customer.charge;
    });
    expect(calcChangesSum(VMChanges)).toBe(0);
    expect(calcChangesSum(custmoerChanges)).toBe(0);
    expect(custmoerCharge).toBe(0);

    // 고객의 금액 투입
    const charge = 1500;
    model.addCustomerCharge(charge);

    const chargedChanges = cloneDeep(VMChanges);
    expect(custmoerCharge).toBe(charge);

    // 잔돈 반환
    model.returnCustomerCharge();

    // then
    expect(calcChangesSum(VMChanges)).toBe(0);
    expect(custmoerCharge).toBe(0);
    expect(custmoerChanges).toStrictEqual(chargedChanges);
  });
});
