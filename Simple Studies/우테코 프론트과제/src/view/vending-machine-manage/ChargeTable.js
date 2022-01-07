import model from '../../model/model-instance';

const template = document.createElement('template');
template.innerHTML = `<h2>자판기가 보유한 동전</h2>
<table>
  <thead>
    <tr>
      <th>동전</th>
      <th>개수</th>
    </tr>
  </thead>
  <tbody id="coin-quantity">   
  </tbody>
</table>
`;
export default class ChargeTable extends HTMLElement {
  constructor() {
    super();
    model.addChangeListener(this.render.bind(this));
  }

  render(state) {
    this.innerHTML = '';
    const newTemplate = template.content.cloneNode(true);
    if (state?.changes) {
      const coinQuantity = newTemplate.querySelector('#coin-quantity');
      const { changes } = state;
      coinQuantity.innerHTML = this.createCoinQuantity(changes);
    }
    this.appendChild(newTemplate);
  }

  createCoinQuantity(changes) {
    if (!changes) {
      return '';
    }
    return Object.keys(changes)
      .map(coin => ({ coin, quantity: changes[coin] }))
      .map(this.createCoinRow)
      .join('');
  }

  createCoinRow({ coin, quantity }) {
    return `<tr>
          <td>${coin}원</td>
          <td id="vending-machine-coin-${coin}-quantity">${quantity}개</td>
        </tr>`;
  }
}

customElements.define('charge-table', ChargeTable);
