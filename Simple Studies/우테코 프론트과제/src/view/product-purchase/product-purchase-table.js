export default class ProductPurchaseTable extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.innerHTML = '<h2>ProductPurchaseTable</h2>';
  }
}
customElements.define('product-purchase-table', ProductPurchaseTable);
