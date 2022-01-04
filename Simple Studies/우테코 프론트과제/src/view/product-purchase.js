const template = document.createElement('template');
template.innerHTML = `<p>상품 구매 탭입니다.</p>`;
export default class ProductPurchase extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    const newTemplate = template.content.firstElementChild.cloneNode(true);
    this.appendChild(newTemplate);
  }
}

customElements.define('product-purchase', ProductPurchase);
