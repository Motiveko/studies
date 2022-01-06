import { createInitialChanges } from '../constant/constant';
import { getRandomChanges } from '../utils/model-util';
import { validateProduct } from '../utils/validation-util';
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

  const addCustomerCharge = () => {
    alert('TODO :addCustomerCharge 구현해야 합니다.');
  };

  const purchaseProduct = name => {
    alert('TODO : 상품 구매 구현할 것');
  };
  const returnCustomerCharge = () => {
    alert('TODO : returnCustomerCharge 구현할 것');
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
