import model from '../../model/model-instance';

const template = document.createElement('template');
template.innerHTML = `<h2>잔돈</h2>
<button id="coin-return-button">반환하기</button>
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
export default class CustomerChargeTable extends HTMLElement {
  constructor() {
    super();
    this.init();
    this.unsubscribe = model.addChangeListener(this.render.bind(this));
  }

  init() {
    this.initEvent();
  }

  render(state) {
    this.innerHTML = '';
    const newTemplate = template.content.cloneNode(true);
    newTemplate.querySelector('#coin-quantity').innerHTML = this.createCoinQuantity(
      state?.customer?.changes
    );
    this.appendChild(newTemplate);
  }

  initEvent() {
    this.addEvent('click', '#coin-return-button', this.returnCharge);
  }

  returnCharge() {
    model.returnCustomerCharge();
  }

  addEvent(event, selector, callback) {
    this.addEventListener(event, e => {
      const { target } = e;
      if (target.matches(selector)) {
        callback(e);
      }
    });
  }

  disconnectedCallback() {
    this.unsubscribe();
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
          <td id="-coin-${coin}-quantity">${quantity}개</td>
        </tr>`;
  }
}

customElements.define('customer-charge-table', CustomerChargeTable);
