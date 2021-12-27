export default class PurchaseProduct extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `<div>상품 구매 탭입니다.</div>`;
  }
}

customElements.define('app-purchase-product', PurchaseProduct);