import model from '../model/model-instance';

const template = document.createElement('template');
template.innerHTML = `<div>
  <h2>상품 관리 탭입니다</h2>
  <div class="item-manager-content">
    <form id="item-form">
      <fieldset style="width: 150">
        <legend>상품 등록</legend>
        상품명 : <input type="text" name="name" placeholder="상품명" />
        가격 : <input type="text" name="price" placeholder="가격" />
        수량 : <input type="text" name="stock" placeholder="수량" />
        <button type="submit">상품 추가</button>
      </fieldset>
    </form>
  </div>
</div>
`;
export default class ItemManagerComponent extends HTMLElement {
  constructor() {
    super();
    this.init();
    this.unsubscribe = model.addChangeListener(this.render.bind(this));
  }

  init() {
    const newTemplate = template.content.firstElementChild.cloneNode(true);

    this.appendChild(newTemplate);
    this.initEventHandler();
  }

  initEventHandler() {
    this.addEventListener('submit', e => {
      const { target } = e;
      if (target.matches('form#item-form')) {
        e.preventDefault();
        const item = Object.fromEntries(new FormData(target));
        item.price = Number(item.price);
        item.stock = Number(item.stock);
        model.addItem(item);
      }
    });
  }

  render(newState) {
    console.log(newState);
  }

  disconnectedCallback() {
    this.unsubscribe();
  }
}

customElements.define('app-item-manager', ItemManagerComponent);
