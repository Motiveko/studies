import { getModelInstance } from "..";
import { Todo } from "../getTodos";
import Footer from "./Footer";
import List from "./List";


export const EVENTS = {
  DELETE_ITEM: 'DELETE_ITEM',
  TOGGLE_ITEM: 'TOGGEL_ITEM',
  CHANGE_FILTER: 'CHANGE_FILTER',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED'
};

const APP_TEMPLATE = `<section class="todoapp">
<header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done" autofocus="">
</header>
<section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
</section>
<label for="toggle-all">
    Mark all as Complete
</label>
<ul class="todo-list" data-component="todos">
    <!-- 여기에 todo list랜더링 예정 -->
    <todomvc-list></todomvc-list>
</ul>
<todomvc-footer></todomvc-footer>
</section>`;

export default class App extends HTMLElement {
  
  template!: HTMLElement;
  
  // component
  list!: List;
  footer!: Footer;
  
  model: ReturnType<typeof getModelInstance>

  constructor () {
    super()
    this.model = getModelInstance();
    this.initTemplate();
  }

  initTemplate() {
    const tempTemplate = document.createElement('template');
    tempTemplate.innerHTML = APP_TEMPLATE;
    this.template = tempTemplate.content.firstElementChild as HTMLElement;
  }


  connectedCallback() {
    window.requestAnimationFrame(() => {
      this.appendChild(this.template.cloneNode(true));
      
      this.footer = this.querySelector('todomvc-footer') as Footer;
      this.list = this.querySelector('todomvc-list') as List;

      this.querySelector('.new-todo')!.addEventListener('keypress', (e) => {
        if((e as KeyboardEvent).key === 'Enter') {
          this.model.addItem((e.target as HTMLInputElement).value);
          (e.target as HTMLInputElement).value = '';
        }
      })

      this.list.addEventListener(EVENTS.DELETE_ITEM, (e) => {
        const event = e as CustomEvent;
        this.model.deleteItem(event.detail.index);
      });
      this.list.addEventListener(EVENTS.TOGGLE_ITEM, (e) => {
        const event = e as CustomEvent;
        this.model.toggleItem(event.detail.index);
      })

      this.footer.addEventListener(EVENTS.CHANGE_FILTER, (e) => {
        const event = e as CustomEvent;
        this.model.changeFilter(event.detail.filter);
      })

      this.footer.addEventListener(EVENTS.CLEAR_COMPLETED, (e) => {
        this.model.clearCompleted(); 
      })

    })
  }
}