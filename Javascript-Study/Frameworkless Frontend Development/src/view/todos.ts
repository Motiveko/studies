import { State } from '..';
import { Todo } from '../getTodos';

const getTodoElement = (todo: Todo) => {
  const { text, completed } = todo;
  return `
    <li ${completed ? 'class="completed"' : ''}>
      <div class="view">
        <input
          ${completed ? 'checked' : ''}
          class="toggle"
          type="checkbox">
        <label>${text}</label>
        <button class="destroy"><button>
      </div>
      <input class="edit" value=${text}>
    </li>`;
};

export default (targetElement: Element, state: State) => {
  const newTodoList = targetElement.cloneNode(true) as Element;
  const todosElement = state.todos.map(getTodoElement).join('');
  newTodoList.innerHTML = todosElement;
  return newTodoList;
};
