const template = document.createElement('template');
template.innerHTML = `<p>상품 관리 탭입니다</p>`;
export default class ItemManagerComponent extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    const newTemplate = template.content.firstElementChild.cloneNode(true);
    this.appendChild(newTemplate);
  }
}

customElements.define('app-item-manager', ItemManagerComponent);
