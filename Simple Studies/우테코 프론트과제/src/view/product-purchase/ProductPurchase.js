import CustomerCharge from './CustomerCharge';
import CustomerChargeForm from './CustomerChargeForm';
import ProductPurchaseTable from './ProductPurchaseTable';
import CustomerChargeTable from './CustomerChargeTable';

export default class ProductPurchase extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.innerHTML = '';
    this.appendChild(new CustomerChargeForm());
    this.appendChild(new CustomerCharge());
    this.appendChild(new ProductPurchaseTable());
    this.appendChild(new CustomerChargeTable());
  }
}

customElements.define('product-purchase', ProductPurchase);
