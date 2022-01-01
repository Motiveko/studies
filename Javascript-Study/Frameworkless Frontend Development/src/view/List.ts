import { Todo } from '../getTodos';
import getModelInstance  from '../model/model-instance';
import { State } from '../model/model';
import { EVENTS } from './Application';

const TODO_LIST_CONTAINER = `<ul class="todo-list"></ul>`;
const TODO_LIST_ELEMENT = `<li>
    <div class="view">
        <input type="checkbox" class="toggle">
        <label></label>
        <button class="destroy"></button>
    </div>
    <input class="edit">
</li>`;

export default class List extends HTMLElement {
  list: HTMLUListElement | undefined;
  itemTemplate: HTMLElement | undefined;
  model: ReturnType<typeof getModelInstance>
  unsubscribe: () => void;

  constructor() {
    super();
    this._init();
    this.model = getModelInstance();
    this.unsubscribe = this.model.addChangeListener(this._updateList.bind(this));
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

    (element.querySelector('div.view') as HTMLElement).dataset.index = String(index);
    return element;
  }

  // 랜더링 함수 
  _updateList(state: State) {
    const {todos, currentFilter} = state;
    this.list!.innerHTML = '';
    todos
      .filter((todo) => {
        return currentFilter === 'Completed' 
          ? todo.completed
          : currentFilter ==='Active'
            ? !todo.completed
            : true;
      })
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

  _onToggleClick(index: number) {
    const event = new CustomEvent(EVENTS.TOGGLE_ITEM,{
      detail: {
        index
      }  
    });
    this.dispatchEvent(event);
  }
  _init() {
    this.innerHTML = TODO_LIST_CONTAINER;

    const template = document.createElement('template');
    template.innerHTML = TODO_LIST_ELEMENT;
    this.itemTemplate = template.content.firstElementChild as HTMLElement;
    this.list = this.querySelector('ul.todo-list') as HTMLUListElement;

    this.list.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      const index = (e as any).target.parentElement.dataset.index;
      if (target.matches('button.destroy')) {
        // this._onDeleteClick(Number(target.dataset.index));
        this._onDeleteClick(index);
      }
      if (target.matches('input.toggle')) {
        this._onToggleClick(index);
      }
    });
  }

  connectedCallback() {  }

  disconnectedCallback() {
    // TODO : 컴포넌트 지울때 호출하는지 테스트코드 작성
    this.unsubscribe();
  }  
}
