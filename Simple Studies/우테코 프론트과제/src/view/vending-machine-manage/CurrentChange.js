import { DISPLAY } from '../../constant/constant';
import model from '../../model/model-instance';

export default class CurrentCharge extends HTMLElement {
  constructor() {
    super();
    this.unsubscribe = model.addChangeListener(this.render.bind(this));
  }

  render(state) {
    this.innerHTML = '';
    let currentCharge = '';
    if (state?.changes) {
      const { changes } = state;
      currentCharge = Object.keys(changes)
        .map(p => p * changes[p])
        .reduce(this.sum, 0);
    }
    this.innerHTML = `<div id="${DISPLAY.ID_VM_CHARGE_AMOUNT}">${DISPLAY.NAME_VM_CHARGE_AMOUNT}: ${currentCharge}원</div>`;
  }

  sum(a, b) {
    return a + b;
  }

  disconnectedCallback() {
    this.unsubscribe();
  }
}

customElements.define('current-change', CurrentCharge);
