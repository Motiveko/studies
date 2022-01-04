import model from '../../../model/model-instance';

const template = document.createElement('template');
template.innerHTML = `<h2>상품 현황</h2>
<table id="product-table">
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
      <td class="product-manage-name">${name}</td>
      <td class="product-manage-price">${price}</td>
      <td class="product-manage-quantity">${quantity}</td>
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
    newTemplate.querySelector('#product-table').appendChild(rows.content);
    this.appendChild(newTemplate);
  }

  disconnectedCallback() {
    this.unsubscribe();
  }
}

customElements.define('product-table', ProductTable);
