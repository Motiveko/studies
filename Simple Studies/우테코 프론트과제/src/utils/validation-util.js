import VMError from '../core/vm-error';
import { hasOwnProperties } from './common-util';

// TODO : model의 validation로직 분리할 것
// '0' 도 number로 취급한다.
const isNumber = value => Number.isFinite(value);

const validateProductPrice = price => {
  if (!isNumber(price)) {
    throw new VMError('상품 가격은 숫자만 입력해주세요.');
  }
  if (price < 100 || price % 10 > 0) {
    throw new VMError('상품 가격은 100원 이상이며 10으로 나눠떨어져야 합니다.');
  }
};

const validateProductQuantity = quantity => {
  if (!isNumber(quantity)) {
    throw new VMError('상품 수량은 숫자만 입력 가능합니다.');
  }
  if (quantity < 0) {
    throw new VMError('상품 수량의 최소값은 0 입니다.');
  }
};
export const validateCharge = charge => {
  if (isNaN(charge) || charge % 10 !== 0) {
    throw new VMError('입력값은 10단위의 숫자여야 합니다.');
  }
};
export const validateProduct = product => {
  if (!hasOwnProperties(product, ['name', 'price', 'quantity'])) {
    throw new VMError('상품은 name, price, quantity는 필수 속성입니다.');
  }
  const { price, quantity } = product;

  validateProductPrice(price);
  validateProductQuantity(quantity);
};
