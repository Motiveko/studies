import model from '../../model/model-instance';

const template = document.createElement('template');
template.innerHTML = `<h2>구매할 수 있는 상품 현황</h2>
<table id="product-table">
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
    this.addEvent('click', 'button.purchase-button', this.purchaseProduct.bind(this));
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
    return `<tr class="product-purchase-item">
      <td class="product-purchase-name" data-product-name=${name}>${name}</td>
      <td class="product-purchase-price" data-product-price=${price}>${price}</td>
      <td class="product-purchase-quantity" data-product-price=${quantity}>${quantity}</td>
      <td>
        <button type="text" class="purchase-button" data-product-name=${name}>구매하기</button>
      </td>
    </tr>`;
  }

  disconnectedCallback() {
    this.unsubscribe();
  }
}
customElements.define('product-purchase-table', ProductPurchaseTable);
