import { createInitialChanges } from '../constant/constant';
import VMError from '../core/vm-error';
import { getRandomChanges } from '../utils/model-util';
import { validateCharge, validateProduct } from '../utils/validation-util';
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
  const addProduct = product => {
    validateProduct(product);
    proxy.products = [...proxy.products, product];
  };

  const addCharge = charge => {
    const newChange = getRandomChanges(charge);
    const { changes } = proxy;
    proxy.changes = Object.keys(newChange).reduce((acc, coin) => {
      acc[coin] = newChange[coin] + changes[coin];
      return acc;
    }, {});
    return true;
  };

  const addCustomerCharge = charge => {
    validateCharge(charge);
    proxy.customer = { ...proxy.customer, charge };
  };

  const purchaseProduct = pName => {
    const product = proxy.products.find(({ name }) => name === pName);
    // TODO : 리팩터링
    if (!product) {
      throw new VMError(`${pName}은 존재하지 않는 상품입니다.`);
    }
    const { name, price, quantity } = product;
    if (quantity <= 0) {
      throw new VMError(`${name}은 재고가 부족합니다.`);
    }

    const { charge } = proxy.customer;
    if (price > charge) {
      throw new VMError(`${name} 구매에 필요한 금액이 부족합니다..`);
    }

    proxy.products = proxy.products.map(p => {
      if (p.name === name) {
        return { ...p, quantity: quantity - 1 };
      }
      return p;
    });

    proxy.customer = { ...proxy.customer, charge: charge - price };
  };
  const returnCustomerCharge = () => {};

  return {
    addChangeListener: proxy.addChangeListener,
    addProduct,
    addCharge,
    addCustomerCharge,
    purchaseProduct,
    returnCustomerCharge
  };
};
