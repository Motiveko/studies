
export default class VendingMachine extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <div id="tab">
        <button type="text" data-component="product-manage">상품 관리</button>
        <button type="text" data-component="charge-change">잔돈 충전</button>
        <button type="text" data-component="purchase-product">상품 구매</button>
      </div>
      <div id="content">
      </div>
    `
  }

  /**
   * TDD로 가야한다! 선 테스트코드 작성 후 개발 지금부터라도
   * TODO : 버튼에 이벤트 리스너를 넣고, 버튼 클릭시 data-content값에 해당하는 내용으로 상태 변경 및 VendingMachine 다시랜더링
   * 이 때 diff알고리듬을 이용해서 content부분만 다시 랜더링 되도록 설계해야 한다.
   * 버튼 클릭 이벤트는 #tab에 이벤트 위임을 한다
   * VendingMachine은 property를 지닌다.
   */



}

customElements.define('app-vending-machine', VendingMachine);