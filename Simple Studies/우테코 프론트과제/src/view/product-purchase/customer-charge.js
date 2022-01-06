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

    if (state?.customerCharge) {
      currentCharge = state.customerCharge;
    }
    this.innerHTML = `<div id="charge-amount">투입한 금액: ${currentCharge}원</div>`;
  }
}

customElements.define('customer-charge', CustomerCharge);
