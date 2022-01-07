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

/**
 * 투입 금액 Validation
 * @param {*} charge 투입 금액
 * @throws VMError
 */
export const validateCharge = charge => {
  if (isNaN(charge) || charge % 10 !== 0) {
    throw new VMError('입력값은 10단위의 숫자여야 합니다.');
  }
};

/**
 * 상품 Validation
 * @param {*} product 추가할 상품
 * @throws VMError
 */
export const validateProduct = product => {
  if (!hasOwnProperties(product, ['name', 'price', 'quantity'])) {
    throw new VMError('상품은 name, price, quantity는 필수 속성입니다.');
  }
  const { price, quantity } = product;

  validateProductPrice(price);
  validateProductQuantity(quantity);
};

/**
 * 상품 구매에 대한 Validation
 * @param {*} proxy 상태
 * @param {*} pName 구매할 상품명
 * @throws VMError
 * @returns 구매할 상품 객체
 */
export const validatePurchase = (proxy, pName) => {
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
  return product;
};
