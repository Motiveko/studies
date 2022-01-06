import { CHANGE_CONSTANTS } from '../constant/constant';
import { validateCharge } from './validation-util';
import { cloneDeep } from './common-util';

const getRandomCoin = totalValue => {
  const coinRange = CHANGE_CONSTANTS.COIN_TYPE.filter(coin => coin <= totalValue);
  // eslint-disable-next-line no-undef
  return MissionUtils.Random.pickNumberInList(coinRange);
};

export const getRandomChanges = charge => {
  validateCharge(charge);

  let totalCharge = charge;

  const changes = cloneDeep(CHANGE_CONSTANTS.INITIAL_CHANGES);

  while (totalCharge > 0) {
    const randomCoin = getRandomCoin(totalCharge);
    totalCharge -= randomCoin;
    changes[randomCoin] += 1;
  }
  return changes;
};

export const hi = () => ({});
