const template = document.createElement('template');
template.innerHTML = `<p>잔돈 충전 탭입니다.</p>`;
export default class ChargeChangeComponent extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    const newTemplate = template.content.firstElementChild.cloneNode(true);
    this.appendChild(newTemplate);
  }
}

customElements.define('app-charge-change', ChargeChangeComponent);
