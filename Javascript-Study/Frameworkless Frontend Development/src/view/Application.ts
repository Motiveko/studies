import { Todo } from "../getTodos";
import Footer from "./Footer";
import List, { EVENTS } from "./List";

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

  // state
  todos: Todo[] = [];
  currentFilter = ''

  constructor () {
    super()
    this.init();

  }

  init() {
    const tempTemplate = document.createElement('template');
    tempTemplate.innerHTML = APP_TEMPLATE;
    this.template = tempTemplate.content.firstElementChild as HTMLElement;
  }

  _deleteTodo(index: number) {
    
    this.todos.splice(index, 1);
    this._syncAttributes();
  }

  _addTodo(todo: Todo) {
    this.todos.push(todo);
    this._syncAttributes();
  } 
  _syncAttributes() {
    // 상태전파
    this.list.todos = this.todos;
    this.footer.todos = this.todos;
    this.footer.currentFilter = this.currentFilter;
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      this.appendChild(this.template.cloneNode(true));
      
      this.footer = this.querySelector('todomvc-footer') as Footer;
      this.list = this.querySelector('todomvc-list') as List;

      this.querySelector('.new-todo')!.addEventListener('keypress', (e) => {
        if((e as KeyboardEvent).key === 'Enter') {
          this._addTodo({ 
            text: (e.target as HTMLInputElement).value,
            completed: false
          });
          (e.target as HTMLInputElement).value = '';
        }
      })

      this.list.addEventListener(EVENTS.DELETE_ITEM, (e) => {
        const event = e as CustomEvent;
        this._deleteTodo(event.detail.index);
      });
      
      this._syncAttributes();
    })
  }
}