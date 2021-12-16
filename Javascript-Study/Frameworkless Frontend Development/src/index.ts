import { Todo, getTodos } from './getTodos';
import appView from './view/app';

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
  const newMain = appView(main, state);
  main.replaceWith(newMain);
});
