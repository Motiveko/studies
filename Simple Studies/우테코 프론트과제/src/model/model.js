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
  amount: 0
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

  return {
    addChangeListener: proxy.addChangeListener,
    addProduct,
    addCharge
  };
};
