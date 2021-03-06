import model from '../../model/model-instance';
import ProductAddForm from './ProductAddForm';
import ProductTable from './ProductTable';

export default class ProductAdd extends HTMLElement {
  constructor() {
    super();
    this.init();
    this.unsubscribe = model.addChangeListener(this.render.bind(this));
  }

  init() {
    this.render();
  }

  render() {
    this.innerHTML = '';
    this.appendChild(new ProductAddForm());
    this.appendChild(new ProductTable());
  }

  disconnectedCallback() {
    this.unsubscribe();
  }
}

customElements.define('product-add', ProductAdd);
