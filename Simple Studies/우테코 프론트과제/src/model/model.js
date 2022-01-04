import observableFactory from './observable';
/**
 *
 * item { name, price, stock }, price > 100, price % 10 === 0
 */
const INITIAL_STATE = {
  change: {
    10: 0,
    50: 0,
    100: 0,
    500: 0
  },
  items: [],
  amount: 0
};
const isNumber = value => typeof value === 'number' && Number.isFinite(value);

const validateItemPrice = price => {
  if (!isNumber(price)) {
    throw new Error('상품 가격은 숫자만 입력해주세요.');
  }
  if (price < 100 || price % 10 > 0) {
    throw new Error('상품 가격은 100원 이상이며 10으로 나눠떨어져야 합니다.');
  }
};
const validateItemStock = stock => {
  if (!isNumber(stock)) {
    throw new Error('상품 수량은 숫자만 입력 가능합니다.');
  }
  if (stock < 0) {
    throw new Error('상품 수량의 최소값은 0 입니다.');
  }
};

const validateItem = item => {
  if (!Object.prototype.hasOwnProperty.call(item, 'name', 'price', 'stock')) {
    throw new Error('상품은 name, price, stock이 필수 속성입니다.');
  }
  const { price, stock } = item;

  validateItemPrice(price);
  validateItemStock(stock);
};

export default (initialState = INITIAL_STATE) => {
  const proxy = observableFactory(initialState);
  const addItem = item => {
    try {
      validateItem(item);
    } catch (error) {
      alert(error.message);
      return;
    }

    proxy.items = [...proxy.items, item];
  };

  return {
    addChangeListener: proxy.addChangeListener,
    addItem
  };
};
