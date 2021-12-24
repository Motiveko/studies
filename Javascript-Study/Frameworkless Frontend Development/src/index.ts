import { Todo, getTodos } from './getTodos';
import filtersView from './view/filter';
import todosView from './view/todos';
import counterView from './view/counter';

import registry from './registry';

import applyDiff from './applyDiff';

export type State = {
  currentFilter: string;
  todos: Todo[];
};

declare const APP_NAME: string;
declare const VERSION: string;
declare const BUILT_AT: number;

console.log(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  `******${APP_NAME}@${VERSION} IS BUILT AT ${new Date(BUILT_AT).getUTCDate()}******`
);

registry.add('todos', todosView);
registry.add('filter', filtersView);
registry.add('counter', counterView);

const state: State = {
  currentFilter: 'All',
  todos: getTodos()
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp') as HTMLElement;
    const newMain = registry.renderRoot(main, state);
    // main.replaceWith(newMain);
    applyDiff(document.body, main, newMain);
  });
};

setInterval(() => {
  state.todos = getTodos();
  render();
}, 5000);
