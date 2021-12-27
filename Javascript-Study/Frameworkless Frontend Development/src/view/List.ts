import { Todo } from '../getTodos';

const TODO_LIST_CONTAINER = `<ul class="todo-list"></ul>`;
const TODO_LIST_ELEMENT = `<li>
    <div class="view">
        <input type="checkbox" class="toggle">
        <label></label>
        <button class="destroy"></button>
    </div>
    <input class="edit">
</li>`;

export const EVENTS = {
  DELETE_ITEM: 'DELETE_ITEM'
};

export default class List extends HTMLElement {
  list: HTMLUListElement | undefined;
  itemTemplate: HTMLElement | undefined;

  static get observedAttributes() {
    return ['todos'];
  }

  get todos() {
    const todos = this.getAttribute('todos');
    if (!todos) {
      return [];
    }
    return JSON.parse(todos);
  }

  set todos(todos: Todo[]) {
    this.setAttribute('todos', JSON.stringify(todos));
  }

  _createNewTodoNode(): HTMLElement {
    return this.itemTemplate!.cloneNode(true) as HTMLElement;
  }

  _getTodoElement(todo: Todo, index: number): HTMLElement {
    const { text, completed } = todo;
    const element = this._createNewTodoNode();
    
    (element.querySelector('input.edit') as HTMLInputElement).value = text;
    element.querySelector('label')!.textContent = text;

    if (completed) {
      element.classList.add('completed');
      (element.querySelector('input.toggle') as HTMLInputElement).checked = true;
    }

    (element.querySelector('button.destroy') as HTMLElement).dataset.index = String(index);
    return element;
  }

  _updateList() {
    this.list!.innerHTML = '';
    this.todos
      .map((todo, index) => this._getTodoElement(todo, index))
      .forEach(el => this.list!.appendChild(el));
  }

  _onDeleteClick(index: number) {
    const event = new CustomEvent(EVENTS.DELETE_ITEM,{
      detail: {
        index
      }  
    });
    this.dispatchEvent(event);
  }

  connectedCallback() {
    this.innerHTML = TODO_LIST_CONTAINER;

    const template = document.createElement('template');
    template.innerHTML = TODO_LIST_ELEMENT;
    this.itemTemplate = template.content.firstElementChild as HTMLElement;
    this.list = this.querySelector('ul.todo-list') as HTMLUListElement;

    this.list.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      if (target.matches('button.destroy')) {

        this._onDeleteClick(Number(target.dataset.index));
      }
    });
    this._updateList();
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
    // attribute가 todos밖에 없을 예정. 오직 상태값에 변화가 있을때만 랜더링한다.
    this._updateList();
  }
}
