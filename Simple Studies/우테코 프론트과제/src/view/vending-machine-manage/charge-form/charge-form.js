import model from '../../../model/model-instance';
import { CHANGE_CONSTANTS } from '../../../constant/constant';

const template = document.createElement('template');
template.innerHTML = `<h2>자판기 동전 충전하기</h2>
<form id="charge-form">
  <fieldset>
    <legend>잔돈 충전 등록</legend>
    <input type="number" id="vending-machine-charge-input" name="charge" placeholder="자판기가 보유할 금액" />
    <button id="vending-machine-charge-button" type="submit">충전하기</button>
  </fieldset>
</form>
`;
export default class ChargeForm extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    const newTemplate = template.content.cloneNode(true);
    this.appendChild(newTemplate);
    this.initEvent();
  }

  initEvent() {
    this.addEvent('submit', 'form#charge-form', e => {
      e.preventDefault();
      const { target } = e;
      this.chargeCoins(target);
    });
  }

  addEvent(event, selector, callback) {
    // TODO : CommonComponent 정의 후 이런 메서드들 분리하기
    this.addEventListener(event, e => {
      const { target } = e;
      if (target.matches(selector)) {
        callback(e);
      }
    });
  }

  chargeCoins(form) {
    let { charge } = Object.fromEntries(new FormData(form));

    const changes = CHANGE_CONSTANTS.INITIAL_CHANGES;
    while (charge > 0) {
      const randomCoin = this.getRandomCoins(charge);
      charge -= randomCoin;
      changes[randomCoin] += 1;
    }
    if (model.addCharge(changes)) {
      form.reset();
    }
  }

  getRandomCoins(totalValue) {
    const coinRange = CHANGE_CONSTANTS.COIN_TYPE.filter(coin => coin <= totalValue);
    // eslint-disable-next-line no-undef
    return MissionUtils.Random.pickNumberInList(coinRange);
  }
}

customElements.define('charge-form', ChargeForm);
