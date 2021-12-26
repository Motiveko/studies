import { ElementFlags } from 'typescript';
import { Events, State } from '..';
import { Todo } from '../getTodos';

let template: HTMLTemplateElement | undefined;

type CreateTodoNode = () => HTMLElement;
const createNewTodoNode: CreateTodoNode = () => {
  if (!template) {
    template = document.querySelector('#todo-item') as HTMLTemplateElement;
  }
  /* eslint-disable */
  return template
    .content            // DocumentFragment
    .firstElementChild  // Element
    ?.cloneNode(true) as HTMLLIElement;
};

const getTodoElement = (todo: Todo, index: number) => {
  const { text, completed } = todo;

  const element = createNewTodoNode();

  element.querySelector('label')!.textContent = text;
  (element.querySelector('input.edit') as HTMLInputElement).value = text;

  if(completed) {
    element.classList.add('completed');
    (element.querySelector('input.toggle') as HTMLInputElement).checked = true;
  }

  // const handler = (e: any) => events.deleteItem(index)
  // element.querySelector('button.destroy')!.addEventListener('click', handler)
  element.dataset.index = String(index);
  return element;
};

export default (targetElement: Element, state: State, events: Events) => {
  const newTodoList = targetElement.cloneNode(true) as Element;
  state.todos.map((todo, index) => (getTodoElement(todo, index))).forEach(element => {
    newTodoList.appendChild(element);
  })
  newTodoList.addEventListener('click', (e) => {
    if((e.target as Element).matches('button.destroy')) {
      events.deleteItem((e.target as HTMLElement).dataset.index);
    }
  } )
  return newTodoList;
};
