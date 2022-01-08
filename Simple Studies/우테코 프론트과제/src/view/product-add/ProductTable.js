import model from '../../model/model-instance';
import { DISPLAY } from '../../constant/constant';

const template = document.createElement('template');
template.innerHTML = `<h2>${DISPLAY.TITLE_PRODUCT_TABLE}</h2>
<table id=${DISPLAY.ID_PRODUCT_TABLE}>
  <tr>
    <th>상품명</th>
    <th>가격</th>
    <th>수량</th>
  </tr>
</table>
`;

const createProductRow = product => {
  const { name, price, quantity } = product;
  return `<tr class="product-manage-item">
      <td class=${DISPLAY.CLASS_PRODUCT_MANAGE_NAME}>${name}</td>
      <td class=${DISPLAY.CLASS_PRODUCT_MANAGE_PRICE}>${price}</td>
      <td class=$${DISPLAY.CLASS_PRODUCT_MANAGE_QUANTITY}>${quantity}</td>
    </tr>`;
};

export default class ProductTable extends HTMLElement {
  constructor() {
    super();
    this.init();
    // this.unsubscribe = model(this.render.bind(this));
    this.unsubscribe = model.addChangeListener(this.render.bind(this));
  }

  init() {
    this.render();
  }

  render(state) {
    this.innerHTML = '';
    const newTemplate = template.content.cloneNode(true);

    if (!state || !state.products) {
      this.appendChild(newTemplate);
      return;
    }

    const rows = document.createElement('template');
    state.products.forEach(product => {
      rows.innerHTML += createProductRow(product);
    });
    newTemplate.querySelector(`#${DISPLAY.ID_PRODUCT_TABLE}`).appendChild(rows.content);
    this.appendChild(newTemplate);
  }

  disconnectedCallback() {
    this.unsubscribe();
  }
}

customElements.define('product-table', ProductTable);
