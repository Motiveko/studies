import { cloneDeep } from '../utils/common-util';

// eslint-disable-next-line import/prefer-default-export
export const CHANGE_CONSTANTS = Object.freeze({
  COIN_TYPE: Object.freeze([500, 100, 50, 10])
});
export const DISPLAY = Object.freeze({
  // APP
  TITLE_APP: '🥤 자판기 🥤',

  // 상품 관리

  // 상품 관리 - 상품 등록
  TITLE_PRODUCT_ADD_FORM: '상품 추가하기',
  FORM_PRODUCT_ADD: '상품 등록',
  ID_PRODUCT_ADD_FORM: 'product-add-form',
  ID_PRODUCT_NAME_INPUT: 'product-name-input',
  ID_PRODUCT_PRICE_INPUT: 'product-price-input',
  ID_PRODUCT_QUANTITY_INPUT: 'product-quantity-input',
  ID_PRODUCT_ADD_BUTTON: 'product-add-button',
  NAME_PRODUCT_ADD_BUTTON: '상품 추가',
  // 상품 관리 - 상품 현황
  TITLE_PRODUCT_TABLE: '상품 현황',
  ID_PRODUCT_TABLE: 'product-table',
  CLASS_PRODUCT_MANAGE_NAME: 'product-manage-name',
  CLASS_PRODUCT_MANAGE_PRICE: 'product-manage-price',
  CLASS_PRODUCT_MANAGE_QUANTITY: 'product-manage-quantity',

  // 잔돈 충전
  // 잔돈 충전 - 자판기 동전 충전하기
  TITLE_VM_CHARGE_FORM: '자판기 동전 충전하기',
  FORM_VM_CHARGE: '잔돈 충전 등록',
  ID_VM_CHARGE_FORM: 'vending-machine-charge-form',
  ID_VM_CHARGE_INPUT: 'vending-machine-charge-input',
  ID_VM_CHARGE_BUTTON: 'vending-machine-charge-button',
  // 잔돈 충전 - 보유 금액
  ID_VM_CHARGE_AMOUNT: 'vending-machine-charge-amount',
  NAME_VM_CHARGE_AMOUNT: '보유 금액',
  // 잔돈 충전 - 자판기가 보유한 동전
  TITLE_VM_CHARGE_TABLE: '자판기가 보유한 동전',
  ID_VM_COIN_QUANTITY: 'coin-quantity',

  // 상품 구매
  // 상품 구매 - 금액 투입
  TITLE_CUSTOMER_CHARGE_FORM: '금액 투입',
  FORM_CUSTOMER_CHARGE: '금액 투입',
  ID_CUSTOMER_CHARGE_FORM: 'charge-form',
  ID_CUSTOMER_CHARGE_INPUT: 'charge-input',
  ID_CUSTOMER_CHARGE_BUTTON: 'charge-button',
  NAME_CUSTOMER_CHARGE_BUTTON: '투입하기',
  // 상품 구매 - 투입한 금액
  ID_CUSTOMER_CHARGE_AMOUNT: 'charge-amount',
  NAME_CUSTOMER_CHARGE_AMOUNT: '투입한 금액',
  // 상품 구매 - 구매할 수 있는 상품 현황
  TITLE_PRODUCT_PURCHASE_TABLE: '구매할 수 있는 상품 현황',
  ID_PRODUCT_PURCHASE_TABLE: 'product-table',
  CLASS_PRODUCT_PURCHASE_ITEM: 'product-purchase-item',
  CLASS_PRODUCT_PURCHASE_NAME: 'product-purchase-name',
  CLASS_PRODUCT_PURCHASE_PRICE: 'product-purchase-price',
  CLASS_PRODUCT_PURCHASE_QUANTITY: 'product-purchase-quantity',
  CLASS_PRODUCT_PURCHASE_BUTTON: 'purchase-button',
  NAME_PRODUCT_PURCHASE_BUTTON: '구매하기',
  // 상품 구매 - 잔돈
  TITLE_CUSTOMER_CHARGE_TABLE: '잔돈',
  ID_COIN_RETURN_BUTTON: 'coin-return-button',
  NAME_COIN_RETURN_BUTTON: '반환하기',
  ID_COIN_QUANTITY: 'coin-quantity'
});

export const createInitialChanges = () =>
  cloneDeep({
    500: 0,
    100: 0,
    50: 0,
    10: 0
  });
