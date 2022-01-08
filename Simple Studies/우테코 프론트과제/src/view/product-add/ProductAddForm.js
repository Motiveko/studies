import { DISPLAY } from '../../constant/constant';
import model from '../../model/model-instance';

const template = document.createElement('template');
template.innerHTML = `<h2>${DISPLAY.TITLE_PRODUCT_ADD_FORM}</h2>
<form id=${DISPLAY.ID_PRODUCT_ADD_FORM}>
  <fieldset >
    <legend>${DISPLAY.FORM_PRODUCT_ADD}</legend>
    상품명 : <input type="text" id=${DISPLAY.ID_PRODUCT_NAME_INPUT} name="name" placeholder="상품명" />
    가격 : <input type="text" id=${DISPLAY.ID_PRODUCT_PRICE_INPUT} name="price" placeholder="가격" />
    수량 : <input type="text" id=${DISPLAY.ID_PRODUCT_QUANTIY_INPUT} name="quantity" placeholder="수량" />
    <button id="${DISPLAY.ID_PRODUCT_ADD_BUTTON}" type="submit">${DISPLAY.NAME_PRODUCT_ADD_BUTTON}</button>
  </fieldset>
</form>`;

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
    this.addEvent('submit', `form#${DISPLAY.ID_PRODUCT_ADD_FORM}`, e => {
      e.preventDefault();
      const { target } = e;
      this.addProductToModel(target);
    });
  }

  addEvent(event, selector, callback) {
    this.addEventListener(event, e => {
      const { target } = e;
      if (target.matches(selector)) {
        callback(e);
      }
    });
  }

  addProductToModel(form) {
    const item = Object.fromEntries(new FormData(form));
    item.price = Number(item.price);
    item.quantity = Number(item.quantity);

    model.addProduct(item);
    form.reset();
  }
}

customElements.define('product-add-form', ProductAddForm);
