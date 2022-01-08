import { DISPLAY } from '../../constant/constant';
import model from '../../model/model-instance';

const template = document.createElement('template');
template.innerHTML = `<h2>${DISPLAY.TITLE_PRODUCT_PURCHASE_TABLE}</h2>
<table id="${DISPLAY.ID_PRODUCT_PURCHASE_TABLE}">
  <tr>
    <th>상품명</th>
    <th>가격</th>
    <th>수량</th>
    <th>구매</th>
  </tr>
</table>
`;
export default class ProductPurchaseTable extends HTMLElement {
  constructor() {
    super();
    this.init();

    this.unsubscribe = model.addChangeListener(this.render.bind(this));
  }

  init() {
    this.initEvents();
  }

  render(state) {
    this.innerHTML = '';
    const newTemplate = template.content.cloneNode(true);
    if (state?.products) {
      const { products } = state;
      newTemplate.querySelector('#product-table').innerHTML += products
        .map(this.createProductRow)
        .join('');
    }
    this.appendChild(newTemplate);
  }

  initEvents() {
    this.addEvent(
      'click',
      `button.${DISPLAY.CLASS_PRODUCT_PURCHASE_BUTTON}`,
      this.purchaseProduct.bind(this)
    );
  }

  purchaseProduct(event) {
    const { productName } = event.target.dataset;
    model.purchaseProduct(productName);
  }

  addEvent(event, selector, callback) {
    this.addEventListener(event, e => {
      const { target } = e;
      if (target.matches(selector)) {
        callback(e);
      }
    });
  }

  createProductRow(product) {
    const { name, price, quantity } = product;
    return `<tr class="${DISPLAY.CLASS_PRODUCT_PURCHASE_ITEM}">
      <td class="${DISPLAY.CLASS_PRODUCT_PURCHASE_NAME}" data-product-name=${name}>${name}</td>
      <td class="${DISPLAY.CLASS_PRODUCT_PURCHASE_PRICE}" data-product-price=${price}>${price}</td>
      <td class="${DISPLAY.CLASS_PRODUCT_MANAGE_QUANTITY}" data-product-price=${quantity}>${quantity}</td>
      <td>
        <button type="text" class="${DISPLAY.CLASS_PRODUCT_PURCHASE_BUTTON}" data-product-name=${name}>${DISPLAY.NAME_PRODUCT_PURCHASE_BUTTON}</button>
      </td>
    </tr>`;
  }

  disconnectedCallback() {
    this.unsubscribe();
  }
}
customElements.define('product-purchase-table', ProductPurchaseTable);
