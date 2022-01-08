import { createInitialChanges } from '../constant/constant';
import {
  calcMinimumChanges,
  getRandomChanges,
  mergeChanges,
  unionChanges
} from '../utils/model-util';
import { validateProduct, validatePurchase } from '../utils/validation-util';
import observableFactory from './observable';
/**
 * products { name, price, quantity }, price > 100, price % 10 === 0
 */
const INITIAL_STATE = {
  changes: createInitialChanges(),
  products: [],
  amount: 0,
  customer: {
    charge: 0,
    changes: createInitialChanges()
  }
};

export default state => {
  const initialState = state ?? INITIAL_STATE;
  const proxy = observableFactory(initialState);
  /**
   * 상품 추가
   * @param {*} product 추가할 상품 객체
   */
  const addProduct = product => {
    validateProduct(product);
    proxy.products = [...proxy.products, product];
  };

  /**
   * 자판기 잔돈 충전
   * @param {*} charge 충전할 금액
   */
  const addCharge = charge => {
    const newChanges = getRandomChanges(charge);
    const { changes } = proxy;
    proxy.changes = mergeChanges(changes, newChanges);
  };

  /**
   * 고객 - 금액 투입하기
   * @param {*} chargeInput 투입할 금액
   */
  const addCustomerCharge = chargeInput => {
    addCharge(chargeInput);
    const { charge } = proxy.customer;
    proxy.customer = { ...proxy.customer, charge: charge + chargeInput };
  };

  /**
   * 상품 구매
   * @param {*} pName 구매할 상품명
   */
  const purchaseProduct = pName => {
    const { name, price, quantity } = validatePurchase(proxy, pName);
    const { charge } = proxy.customer;
    proxy.products = proxy.products.map(p => {
      if (p.name === name) {
        return { ...p, quantity: quantity - 1 };
      }
      return p;
    });

    proxy.customer = { ...proxy.customer, charge: charge - price };
  };

  /**
   * 남은 투입 금액 잔돈으로 반환하기
   */
  const returnCustomerCharge = () => {
    const { changes } = proxy;
    const { charge } = proxy.customer;
    const minChanges = calcMinimumChanges(changes, charge);
    proxy.customer = { changes: minChanges, charge: 0 };
    proxy.changes = unionChanges(proxy.changes, minChanges);
  };

  return {
    addChangeListener: proxy.addChangeListener,
    addProduct,
    addCharge,
    addCustomerCharge,
    purchaseProduct,
    returnCustomerCharge
  };
};
