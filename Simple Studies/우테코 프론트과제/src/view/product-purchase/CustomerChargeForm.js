import { DISPLAY } from '../../constant/constant';
import model from '../../model/model-instance';

const template = document.createElement('template');
template.innerHTML = `<h2>${DISPLAY.TITLE_CUSTOMER_CHARGE_FORM}</h2>
<form id="${DISPLAY.ID_CUSTOMER_CHARGE_FORM}">
  <fieldset >
    <legend>${DISPLAY.FORM_CUSTOMER_CHARGE}</legend>
    투입할 금액 : <input type="number" id="${DISPLAY.ID_CUSTOMER_CHARGE_INPUT}" name="charge" placeholder="투입할 금액" />
    <button id="${DISPLAY.ID_CUSTOMER_CHARGE_BUTTON}" type="submit">${DISPLAY.NAME_CUSTOMER_CHARGE_BUTTON}</button>
  </fieldset>
</form>`;

export default class CustomerChargeForm extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.render();
    this.initEvent();
  }

  initEvent() {
    this.addEvent('submit', `form#${DISPLAY.ID_CUSTOMER_CHARGE_FORM}`, e => {
      e.preventDefault();
      const { target } = e;
      this.chargeCoin(target);
    });
  }

  addEvent(event, selector, callback) {
    this.addEventListener(event, e => {
      const { target } = e;
      if (target.matches(selector)) {
        callback(e);
      }
    });
  }

  chargeCoin(form) {
    const { charge } = Object.fromEntries(new FormData(form));
    model.addCustomerCharge(charge);
    form.reset();
  }

  render() {
    this.innerHTML = '';
    const newTemplate = template.content.cloneNode(true);
    this.appendChild(newTemplate);
  }
}
customElements.define('customer-charge-form', CustomerChargeForm);
