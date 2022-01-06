import { createInitialChanges } from '../constant/constant';
import VMError from '../core/vm-error';
import { calcMinimumChanges, getRandomChanges, mergeChanges } from '../utils/model-util';
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
    const newChanges = getRandomChanges(charge);
    const { changes } = proxy;
    proxy.changes = mergeChanges(changes, newChanges);
    return true;
  };

  const addCustomerCharge = charge => {
    addCharge(charge);
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
  const returnCustomerCharge = () => {
    const { changes } = proxy;
    const { charge } = proxy.customer;
    const minChanges = calcMinimumChanges(changes, charge);
    console.log(changes);
    console.log(minChanges);

    /**
     * 잔돈 반환로직
     * 1. 자판기의 잔돈을 가져온다.
     * 2. 500원부터 차례로 반환할 수 있는 최대치만큼 반환한다.
     * 3. 10원에서 돈을 맞출 수 없으면 에러를 던진다.
     */
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
