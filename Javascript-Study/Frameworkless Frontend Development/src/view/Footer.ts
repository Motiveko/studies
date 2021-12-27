import { Template } from "webpack";
import { Todo } from "../getTodos";

const FOOTER_TEMPLATE = `<footer class="footer">
<span 
class="todo-count"
data-component="counter"
>
<!-- n items left -->
</span>
<ul class="filters" data-component="filters">
    <li>
        <a href="#">All</a>
    </li>
    <li>
        <a href="#/active">Active</a>
    </li>
    <li>
        <a href="#/completed">Completed</a>
    </li>
</ul>
<button class="clear-completed">
    Clear completed
</button>
</footer>`;

export default class Footer extends HTMLElement {

  footer: HTMLElement | undefined;

  static get observedAttributes() {
    return ['todos, current-filter'];
  }

  attributeChangedCallback(name: string, newVal: string, oldVal: string) {
    this._updateFooter();
  }

  get todos() {
    const todos = this.getAttribute('todos');
    if(!todos) {
      return [];
    }
    return JSON.parse(todos);
  }

  set todos(todos: Todo[]) {
    this.setAttribute('todos', JSON.stringify(todos));
  }

  get currentFilter() {
    const currentFilter = this.getAttribute('current-filter');
    if(!currentFilter) {
      return '';
    }
    return currentFilter;
  }

  set currentFilter(filter: string) {
    this.setAttribute('current-filter', filter);
  }

  _updateFooter() {
    const itemsLeft = this.todos.length;
    
    this.footer!
      .querySelector('span.todo-count')!
      .textContent = itemsLeft === 1 
        ? `${itemsLeft} item left`
        : `${itemsLeft} items left`;
    this.footer?.querySelectorAll('li a')
        .forEach(a => {
          if(a.textContent === this.currentFilter) {
            a.classList.add('selected');
          } else {
            a.classList.remove('selected');
          }
        });
  }

  init() {
    const tempTemplate = document.createElement('template');
    tempTemplate.innerHTML = FOOTER_TEMPLATE;
    this.footer = tempTemplate.content.firstElementChild as HTMLElement;
    this.appendChild(this.footer);
  }

  connectedCallback() {
    this.init();
    this._updateFooter(); 
  }
}