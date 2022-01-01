import { Template } from "webpack";
import { getModelInstance } from "..";
import { Todo } from "../getTodos";
import { CurrentFilter, State } from "../model/model";
import { EVENTS } from "./Application";

const FOOTER_TEMPLATE = `<footer class="footer">
<span 
class="todo-count"
data-component="counter"
>
<!-- n items left -->
</span>
<ul class="filters" data-component="filters">
    <li>
        <a href="#" data-filter="All" >All</a>
    </li>
    <li>
        <a href="#/active" data-filter="Active">Active</a>
    </li>
    <li>
        <a href="#/completed" data-filter="Completed">Completed</a>
    </li>
</ul>
<button class="clear-completed">
    Clear completed
</button>
</footer>`;

export default class Footer extends HTMLElement {

  footer: HTMLElement | undefined;
  model: ReturnType<typeof getModelInstance>;
  unsubscribe: () => void
  static get observedAttributes() {
    return ['todos, current-filter'];
  }

  constructor() {
    super();
    this.init();
    this.model = getModelInstance();
    this.unsubscribe = this.model.addChangeListener(this._updateFooter.bind(this));
  }


  _updateFooter(state: State) {
    
    const itemsLeft = state.todos.length;
    
    this.footer!
      .querySelector('span.todo-count')!
      .textContent = itemsLeft === 1 
        ? `${itemsLeft} item left`
        : `${itemsLeft} items left`;
    this.footer?.querySelectorAll('li a')
        .forEach(a => {
          if(a.textContent === state.currentFilter) {
            a.classList.add('selected');
          } else {
            a.classList.remove('selected');
          }
        });
  }

  _onFilterClick(filter : CurrentFilter) {
    const event = new CustomEvent(EVENTS.CHANGE_FILTER, {
      detail: {filter}
    })
    this.dispatchEvent(event);
  }
  _onClearCompletedClick() {
    this.dispatchEvent(new CustomEvent(EVENTS.CLEAR_COMPLETED));
  }

  init() {
    const tempTemplate = document.createElement('template');
    tempTemplate.innerHTML = FOOTER_TEMPLATE;
    this.footer = tempTemplate.content.firstElementChild as HTMLElement;
    this.appendChild(this.footer);
    this.footer.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      if(target.matches('li a')) {
        e.preventDefault();
        const filter = target.dataset.filter as CurrentFilter;
        this._onFilterClick(filter);
        return;
      }
      if(target.matches('button.clear-completed')) {
        this._onClearCompletedClick();
      }
    })
  }
}