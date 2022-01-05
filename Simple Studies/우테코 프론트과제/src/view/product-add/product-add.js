import model from '../../model/model-instance';
import ProductAddForm from './product-add-form/product-add-form';
import ProductTable from './product-table/product-table';

export default class ProductAdd extends HTMLElement {
  constructor() {
    super();
    this.init();
    this.unsubscribe = model.addChangeListener(this.render.bind(this));
  }

  init() {
    this.appendChild(new ProductAddForm());
    this.appendChild(new ProductTable());
    this.initEventHandler();
  }

  initEventHandler() {
    // TODO : 구현해야함
  }

  render(newState) {}

  disconnectedCallback() {
    this.unsubscribe();
  }
}

customElements.define('product-add', ProductAdd);
