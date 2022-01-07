import { CHANGE_CONSTANTS, createInitialChanges } from '../constant/constant';
import VMError from '../core/vm-error';
import { validateCharge } from './validation-util';

const getRandomCoin = totalValue => {
  const coinRange = CHANGE_CONSTANTS.COIN_TYPE.filter(coin => coin <= totalValue);
  // eslint-disable-next-line no-undef
  return MissionUtils.Random.pickNumberInList(coinRange);
};

/**
 * 금액 -> 랜덤 잔돈으로 변환
 * @param {*} charge 잔돈으로 바꿀 금액
 * @returns 잔돈객체
 */
export const getRandomChanges = charge => {
  validateCharge(charge);

  let totalCharge = charge;

  const changes = createInitialChanges();
  while (totalCharge > 0) {
    const randomCoin = getRandomCoin(totalCharge);
    totalCharge -= randomCoin;
    changes[randomCoin] += 1;
  }
  return changes;
};

/**
 * 두개의 잔돈 객체를 합친다
 * @param {*} changes1
 * @param {*} changes2
 * @returns 합쳐진 잔돈 객체
 */
export const mergeChanges = (changes1, changes2) =>
  Object.keys(changes1).reduce((acc, coin) => {
    acc[coin] = changes1[coin] + changes2[coin];
    return acc;
  }, {});

/**
 * 잔돈 객체에서 잔돈 객체를 뺀다 ( left - right )
 * @param {*} changes
 * @param {*} changesToUnion
 */
export const unionChanges = (leftChanges, rightChanges) =>
  Object.keys(leftChanges).reduce((acc, coin) => {
    acc[coin] = leftChanges[coin] - rightChanges[coin];
    if (acc[coin] < 0) {
      throw new VMError(`${coin}원짜리 잔돈이 모자랍니다.`);
    }
    return acc;
  }, {});

/**
 * 주어진 잔돈에서 최소한의 잔돈으로 charge를 만든다.
 * @param {*} changes 주어진 잔돈
 * @param {*} charge 잔돈으로 만들 금액
 * @returns 생성된 잔돈 객체
 */
export const calcMinimumChanges = (changes, charge) => {
  let tempCharge = charge;
  const mimChanges = createInitialChanges();

  CHANGE_CONSTANTS.COIN_TYPE.forEach(coin => {
    const count = Math.min(changes[coin], Math.floor(tempCharge / coin));
    mimChanges[coin] = count;
    tempCharge -= count * coin;
  });

  if (tempCharge !== 0) {
    throw new VMError(`가진 잔돈으로 잔돈을 거슬러 줄 수 없습니다.`);
  }
  return mimChanges;
};

/**
 * 잔돈 객체의 합계 금액 계산
 * @param {*} changes 계산할 잔돈 객체
 * @returns 합계 금액
 */
export const calcChangesSum = changes =>
  Object.keys(changes).reduce((acc, coin) => {
    // eslint-disable-next-line no-param-reassign
    acc += coin * changes[coin];
    return acc;
  }, 0);
