import { CHANGE_CONSTANTS, createInitialChanges } from '../constant/constant';
import { validateCharge } from './validation-util';

const getRandomCoin = totalValue => {
  const coinRange = CHANGE_CONSTANTS.COIN_TYPE.filter(coin => coin <= totalValue);
  // eslint-disable-next-line no-undef
  return MissionUtils.Random.pickNumberInList(coinRange);
};

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

export const hi = () => ({});
