import { Todo, getTodos } from './getTodos';
import view from './view';

export interface State {
  currentFilter: string;
  todos: Todo[];
}

const state: State = {
  currentFilter: 'All',
  todos: getTodos()
};

const main = document.querySelector('.todoapp');
if (!main) {
  throw Error('앱에 문제가 있습니다.');
}
window.requestAnimationFrame(() => {
  const newMain = view(main, state);
  main.replaceWith(newMain);
});
