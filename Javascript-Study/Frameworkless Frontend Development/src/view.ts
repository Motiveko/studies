import { State } from '.';
import { Todo } from './getTodos';

const getTodoElement = (todo: Todo) => {
  // 개별 todo 랜더링
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

const getTodoCount = (todos: Todo[]) => {
  // left count 랜더링
  const notCompleted = todos.filter(todo => !todo.completed);
  const { length } = notCompleted;
  if (length === 1) {
    return '1 Item left';
  }
  return `${length} Items left`;
};

export default (targetElement: Element, state: State) => {
  const { currentFilter, todos } = state;

  const element = targetElement.cloneNode(true) as Element;
  const list = element.querySelector('.todo-list');
  const counter = element.querySelector('.todo-count');
  const filters = element.querySelector('.filters');
  console.log(targetElement);
  console.log(list);
  console.log(filters);

  list!.innerHTML = todos.map(getTodoElement).join('');
  counter!.textContent = getTodoCount(todos);

  Array.from(filters!.querySelectorAll('li a')).forEach(a => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected');
    } else {
      a.classList.remove('selected');
    }
  });

  return element;
};
