import { State } from '..';
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

const getTodoElement = (todo: Todo) => {
  const { text, completed } = todo;

  const element = createNewTodoNode();

  element.querySelector('label')!.textContent = text;
  (element.querySelector('input.edit') as HTMLInputElement).value = text;

  if(completed) {
    element.querySelector('li')?.classList.add('completed');
    (element.querySelector('input.toggle') as HTMLInputElement).checked = true;
  }

  return element;
};

export default (targetElement: Element, state: State) => {
  const newTodoList = targetElement.cloneNode(true) as Element;
  state.todos.map(getTodoElement).forEach(element => {
    newTodoList.appendChild(element);
  })
  return newTodoList;
};
