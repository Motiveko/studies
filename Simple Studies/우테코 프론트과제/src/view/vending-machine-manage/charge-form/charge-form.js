import model from '../../../model/model-instance';

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

  addCustomerCharge(form) {
    const { charge } = Object.fromEntries(new FormData(form));
    model.addCustomerCharge(charge);
    form.reset();
  }
}

customElements.define('charge-form', ChargeForm);
