import observableFactory from './observable';
/**
 *
 * products { name, price, quantity }, price > 100, price % 10 === 0
 */
const INITIAL_STATE = {
  change: {
    10: 0,
    50: 0,
    100: 0,
    500: 0
  },
  products: [],
  amount: 0
};

// '0' 도 number로 취급한다.
const isNumber = value => Number.isFinite(value);

const validateProductPrice = price => {
  if (!isNumber(price)) {
    throw new Error('상품 가격은 숫자만 입력해주세요.');
  }
  if (price < 100 || price % 10 > 0) {
    throw new Error('상품 가격은 100원 이상이며 10으로 나눠떨어져야 합니다.');
  }
};
const validateProductQuantity = quantity => {
  if (!isNumber(quantity)) {
    throw new Error('상품 수량은 숫자만 입력 가능합니다.');
  }
  if (quantity < 0) {
    throw new Error('상품 수량의 최소값은 0 입니다.');
  }
};

const validateProduct = product => {
  if (!Object.prototype.hasOwnProperty.call(product, 'name', 'price', 'quantity')) {
    throw new Error('상품은 name, price, quantity는 필수 속성입니다.');
  }
  const { price, quantity } = product;

  validateProductPrice(price);
  validateProductQuantity(quantity);
};

export default state => {
  const initialState = state ?? INITIAL_STATE;
  const proxy = observableFactory(initialState);
  const addProduct = product => {
    try {
      validateProduct(product);
    } catch (error) {
      alert(error.message);
      return false;
    }
    proxy.products = [...proxy.products, product];
    return true;
  };

  return {
    addChangeListener: proxy.addChangeListener,
    addProduct
  };
};
