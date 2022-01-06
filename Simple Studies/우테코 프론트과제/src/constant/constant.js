import { cloneDeep } from '../utils/common-util';
// eslint-disable-next-line import/prefer-default-export
export const CHANGE_CONSTANTS = Object.freeze({
  COIN_TYPE: Object.freeze([500, 100, 50, 10])
});
export const createInitialChanges = () =>
  cloneDeep({
    500: 0,
    100: 0,
    50: 0,
    10: 0
  });
