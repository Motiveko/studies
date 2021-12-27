export default class ProductManage extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `<div>상품 관리입니다.</div>`;
  }
}

customElements.define('app-product-manage', ProductManage);