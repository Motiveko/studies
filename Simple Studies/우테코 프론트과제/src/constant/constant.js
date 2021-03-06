import { cloneDeep } from '../utils/common-util';

// eslint-disable-next-line import/prefer-default-export
export const CHANGE_CONSTANTS = Object.freeze({
  COIN_TYPE: Object.freeze([500, 100, 50, 10])
});
export const DISPLAY = Object.freeze({
  // APP
  TITLE_APP: 'π₯€ μνκΈ° π₯€',

  // μν κ΄λ¦¬

  // μν κ΄λ¦¬ - μν λ±λ‘
  TITLE_PRODUCT_ADD_FORM: 'μν μΆκ°νκΈ°',
  FORM_PRODUCT_ADD: 'μν λ±λ‘',
  ID_PRODUCT_ADD_FORM: 'product-add-form',
  ID_PRODUCT_NAME_INPUT: 'product-name-input',
  ID_PRODUCT_PRICE_INPUT: 'product-price-input',
  ID_PRODUCT_QUANTITY_INPUT: 'product-quantity-input',
  ID_PRODUCT_ADD_BUTTON: 'product-add-button',
  NAME_PRODUCT_ADD_BUTTON: 'μν μΆκ°',
  // μν κ΄λ¦¬ - μν νν©
  TITLE_PRODUCT_TABLE: 'μν νν©',
  ID_PRODUCT_TABLE: 'product-table',
  CLASS_PRODUCT_MANAGE_NAME: 'product-manage-name',
  CLASS_PRODUCT_MANAGE_PRICE: 'product-manage-price',
  CLASS_PRODUCT_MANAGE_QUANTITY: 'product-manage-quantity',

  // μλ μΆ©μ 
  // μλ μΆ©μ  - μνκΈ° λμ  μΆ©μ νκΈ°
  TITLE_VM_CHARGE_FORM: 'μνκΈ° λμ  μΆ©μ νκΈ°',
  FORM_VM_CHARGE: 'μλ μΆ©μ  λ±λ‘',
  ID_VM_CHARGE_FORM: 'vending-machine-charge-form',
  ID_VM_CHARGE_INPUT: 'vending-machine-charge-input',
  ID_VM_CHARGE_BUTTON: 'vending-machine-charge-button',
  // μλ μΆ©μ  - λ³΄μ  κΈμ‘
  ID_VM_CHARGE_AMOUNT: 'vending-machine-charge-amount',
  NAME_VM_CHARGE_AMOUNT: 'λ³΄μ  κΈμ‘',
  // μλ μΆ©μ  - μνκΈ°κ° λ³΄μ ν λμ 
  TITLE_VM_CHARGE_TABLE: 'μνκΈ°κ° λ³΄μ ν λμ ',
  ID_VM_COIN_QUANTITY: 'coin-quantity',

  // μν κ΅¬λ§€
  // μν κ΅¬λ§€ - κΈμ‘ ν¬μ
  TITLE_CUSTOMER_CHARGE_FORM: 'κΈμ‘ ν¬μ',
  FORM_CUSTOMER_CHARGE: 'κΈμ‘ ν¬μ',
  ID_CUSTOMER_CHARGE_FORM: 'charge-form',
  ID_CUSTOMER_CHARGE_INPUT: 'charge-input',
  ID_CUSTOMER_CHARGE_BUTTON: 'charge-button',
  NAME_CUSTOMER_CHARGE_BUTTON: 'ν¬μνκΈ°',
  // μν κ΅¬λ§€ - ν¬μν κΈμ‘
  ID_CUSTOMER_CHARGE_AMOUNT: 'charge-amount',
  NAME_CUSTOMER_CHARGE_AMOUNT: 'ν¬μν κΈμ‘',
  // μν κ΅¬λ§€ - κ΅¬λ§€ν  μ μλ μν νν©
  TITLE_PRODUCT_PURCHASE_TABLE: 'κ΅¬λ§€ν  μ μλ μν νν©',
  ID_PRODUCT_PURCHASE_TABLE: 'product-table',
  CLASS_PRODUCT_PURCHASE_ITEM: 'product-purchase-item',
  CLASS_PRODUCT_PURCHASE_NAME: 'product-purchase-name',
  CLASS_PRODUCT_PURCHASE_PRICE: 'product-purchase-price',
  CLASS_PRODUCT_PURCHASE_QUANTITY: 'product-purchase-quantity',
  CLASS_PRODUCT_PURCHASE_BUTTON: 'purchase-button',
  NAME_PRODUCT_PURCHASE_BUTTON: 'κ΅¬λ§€νκΈ°',
  // μν κ΅¬λ§€ - μλ
  TITLE_CUSTOMER_CHARGE_TABLE: 'μλ',
  ID_COIN_RETURN_BUTTON: 'coin-return-button',
  NAME_COIN_RETURN_BUTTON: 'λ°ννκΈ°',
  ID_COIN_QUANTITY: 'coin-quantity'
});

export const createInitialChanges = () =>
  cloneDeep({
    500: 0,
    100: 0,
    50: 0,
    10: 0
  });
