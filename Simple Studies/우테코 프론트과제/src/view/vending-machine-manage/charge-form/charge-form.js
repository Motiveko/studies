const template = document.createElement('template');
template.innerHTML = `<h2>자판기 동전 충전하기</h2>
<form id="charge-form">
  <fieldset>
    <legend>잔돈 충전 등록</legend>
    <input type="number" id="vending-machine-charge-input" name="charge" placeholder="자판기가 보유할 금액" />
    <button id="vending-machine-charge-button" type="submit">충전하기</button>

  </fieldset>
</form>
<div id="vending-machine-charge-amount">보유 금액: </div>
`;
export default class ChargeForm extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    const newTemplate = template.content.cloneNode(true);
    this.appendChild(newTemplate);
  }
}

customElements.define('charge-form', ChargeForm);
