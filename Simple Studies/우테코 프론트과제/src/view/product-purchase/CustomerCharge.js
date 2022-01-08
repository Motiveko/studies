import { DISPLAY } from '../../constant/constant';
import model from '../../model/model-instance';

export default class CustomerCharge extends HTMLElement {
  constructor() {
    super();
    this.init();
    this.unsubscribe = model.addChangeListener(this.render.bind(this));
  }

  init() {
    this.render();
  }

  render(state) {
    this.innerHTML = '';
    let currentCharge = '';

    if (state?.customer?.charge) {
      currentCharge = state.customer.charge;
    }
    this.innerHTML = `<div id="${DISPLAY.ID_CUSTOMER_CHARGE_AMOUNT}">${DISPLAY.NAME_CUSTOMER_CHARGE_AMOUNT}: ${currentCharge}원</div>`;
  }

  disconnectedCallback() {
    this.unsubscribe();
  }
}

customElements.define('customer-charge', CustomerCharge);
