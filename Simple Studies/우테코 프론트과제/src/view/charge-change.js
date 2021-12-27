export default class ChargeChange extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = `<div>잔돈 충전 탭입니다.</div>`
  }
}

customElements.define('app-charge-change', ChargeChange);