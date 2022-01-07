import model from '../../model/model-instance';

const template = document.createElement('template');
template.innerHTML = `<h2>금액 투입</h2>
<form id="charge-form">
  <fieldset >
    <legend>금액 투입</legend>
    투입할 금액 : <input type="number" id="charge-input" name="charge" placeholder="투입할 금액" />
    <button id="charge-button" type="submit">투입하기</button>
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
    this.addEvent('submit', 'form#charge-form', e => {
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
