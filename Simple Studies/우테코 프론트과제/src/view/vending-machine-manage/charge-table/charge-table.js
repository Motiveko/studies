const template = document.createElement('template');
template.innerHTML = `<h2>자판기가 보유한 동전</h2>`;
export default class ChargeTable extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    const newTemplate = template.content.cloneNode(true);
    this.appendChild(newTemplate);
  }
}

customElements.define('charge-table', ChargeTable);
