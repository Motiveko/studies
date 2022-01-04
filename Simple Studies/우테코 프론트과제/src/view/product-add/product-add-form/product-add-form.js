import model from '../../../model/model-instance';

const template = document.createElement('template');
template.innerHTML = `<h2>상품 추가하기</h2>
<div class="item-manager-content">
  <form id="item-form">
    <fieldset style="width: 150">
      <legend>상품 등록</legend>
      상품명 : <input type="text" id="product-name-input" name="name" placeholder="상품명" />
      가격 : <input type="text" id="product-price-input" name="price" placeholder="가격" />
      수량 : <input type="text" id="product-quantity-input" name="quantity" placeholder="수량" />
      <button id="product-add-button" type="submit">상품 추가</button>
    </fieldset>
  </form>
</div>`;

export default class ProductAddForm extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    const newTemplate = template.content.cloneNode(true);
    this.appendChild(newTemplate);
    this.initEvent();
  }

  initEvent() {
    this.addEventListener('submit', e => {
      const { target } = e;
      if (target.matches('form#item-form')) {
        e.preventDefault();
        const item = Object.fromEntries(new FormData(target));
        item.price = Number(item.price);
        item.quantity = Number(item.quantity);
        model.addProduct(item);
        target.reset();
      }
    });
  }
}

customElements.define('product-add-form', ProductAddForm);
