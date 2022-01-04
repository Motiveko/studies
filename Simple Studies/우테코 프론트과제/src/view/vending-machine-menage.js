const template = document.createElement('template');
template.innerHTML = `<p>잔돈 충전 탭입니다.</p>`;
export default class VendingMachineManage extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    const newTemplate = template.content.firstElementChild.cloneNode(true);
    this.appendChild(newTemplate);
  }
}

customElements.define('vending-machine-manage', VendingMachineManage);
