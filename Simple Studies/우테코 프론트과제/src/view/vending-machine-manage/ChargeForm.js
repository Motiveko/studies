import { DISPLAY } from '../../constant/constant';
import model from '../../model/model-instance';

const template = document.createElement('template');
template.innerHTML = `<h2>${DISPLAY.TITLE_VM_CHARGE_FORM}</h2>
<form id="${DISPLAY.ID_VM_CHARGE_FORM}">
  <fieldset>
    <legend>${DISPLAY.FORM_VM_CHARGE}</legend>
    <input type="number" id="${DISPLAY.ID_VM_CHARGE_INPUT}" name="charge" placeholder="자판기가 보유할 금액" />
    <button id="${DISPLAY.ID_VM_CHARGE_BUTTON}" type="submit">충전하기</button>
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
    this.addEvent('submit', `form#${DISPLAY.ID_VM_CHARGE_FORM}`, e => {
      e.preventDefault();
      const { target } = e;
      this.addCharge(target);
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

  addCharge(form) {
    const { charge } = Object.fromEntries(new FormData(form));
    model.addCharge(charge);
    form.reset();
  }
}

customElements.define('charge-form', ChargeForm);
