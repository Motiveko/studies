import CustomerCharge from './customer-charge';
import CustomerChargeForm from './customer-charge-form';
import ProductPurchaseTable from './product-purchase-table';
import CustomerChargeTable from './customer-charge-table';

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
