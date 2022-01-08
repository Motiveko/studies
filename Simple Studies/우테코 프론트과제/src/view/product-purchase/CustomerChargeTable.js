import { DISPLAY } from '../../constant/constant';
import model from '../../model/model-instance';

const template = document.createElement('template');
template.innerHTML = `<h2>${DISPLAY.TITLE_CUSTOMER_CHARGE_TABLE}</h2>
<button id="${DISPLAY.ID_COIN_RETURN_BUTTON}">${DISPLAY.NAME_COIN_RETURN_BUTTON}</button>
<table>
  <thead>
    <tr>
      <th>동전</th>
      <th>개수</th>
    </tr>
  </thead>
  <tbody id="${DISPLAY.ID_COIN_QUANTITY}">   
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
    newTemplate.querySelector(`#${DISPLAY.ID_COIN_QUANTITY}`).innerHTML = this.createCoinQuantity(
      state?.customer?.changes
    );
    this.appendChild(newTemplate);
  }

  initEvent() {
    this.addEvent('click', `button#${DISPLAY.ID_COIN_RETURN_BUTTON}`, this.returnCharge);
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
