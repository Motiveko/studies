import { CHANGE_CONSTANTS, createInitialChanges } from '../constant/constant';
import VMError from '../core/vm-error';
import { validateCharge } from './validation-util';

const getRandomCoin = totalValue => {
  const coinRange = CHANGE_CONSTANTS.COIN_TYPE.filter(coin => coin <= totalValue);
  // eslint-disable-next-line no-undef
  return MissionUtils.Random.pickNumberInList(coinRange);
};

/** 금액 -> 랜덤 잔돈으로 변환 */
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

/** 두개의 잔돈 객체를 합친다 */
export const mergeChanges = (changes1, changes2) =>
  Object.keys(changes1).reduce((acc, coin) => {
    acc[coin] = changes1[coin] + changes2[coin];
    return acc;
  }, {});

/** 주어진 잔돈에서 최소한의 잔돈으로 charge를 만든다. */
export const calcMinimumChanges = (changes, charge) => {
  let tempCharge = charge;
  const mimChanges = createInitialChanges();

  CHANGE_CONSTANTS.COIN_TYPE.forEach(coin => {
    const count = Math.min(changes[coin], tempCharge / coin);
    mimChanges[coin] = count;
    tempCharge -= count * coin;
  });

  if (tempCharge !== 0) {
    throw new VMError(`가진 잔돈으로 잔돈을 거슬러 줄 수 없습니다.`);
  }
  return mimChanges;
};

/** 잔돈 총 합계 계산 */
export const calcChangesSum = changes =>
  Object.keys(changes).reduce((acc, coin) => {
    // eslint-disable-next-line no-param-reassign
    acc += coin * changes[coin];
    return acc;
  }, 0);

// export const getReturnChanges = charge => {
//   const changes = createInitialChanges();
//   // 10원 4개이하, 50원 1개이하, 100원 4개이하로 구성되어야 한다.
//   const totalCharge = charge;
//   while (totalCharge >= 0) {
//     return;
//   }
// };
