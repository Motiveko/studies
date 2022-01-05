import model from '../../../model/model-instance';

export default class CurrentChange extends HTMLElement {
  constructor() {
    super();
    model.addChangeListener(this.render.bind(this));
  }

  render(state) {
    this.innerHTML = '';
    let currentChange = '';
    if (state?.changes) {
      const { changes } = state;
      currentChange = Object.keys(changes)
        .map(p => p * changes[p])
        .reduce(this.sum, 0);
    }
    this.innerHTML = `<div id="vending-machine-charge-amount">보유 금액: ${currentChange}원</div>`;
  }

  sum(a, b) {
    return a + b;
  }
}

customElements.define('current-change', CurrentChange);
