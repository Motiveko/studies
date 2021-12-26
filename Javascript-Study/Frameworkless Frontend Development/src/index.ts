import { Todo, getTodos } from './getTodos';
import filtersView from './view/filter';
import todosView from './view/todos';
import counterView from './view/counter';
import appView from './view/app';

import registry from './registry';

import applyDiff from './applyDiff';

export type State = {
  currentFilter: string;
  todos: Todo[];
};
export type Events = {
  [key: string]: (...args: any) => void;
};

declare const APP_NAME: string;
declare const VERSION: string;
declare const BUILT_AT: number;

console.log(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  `******${APP_NAME}@${VERSION} IS BUILT AT ${new Date(BUILT_AT).getUTCDate()}******`
);

registry.add('app', appView);
registry.add('todos', todosView);
registry.add('filter', filtersView);
registry.add('counter', counterView);

const state: State = {
  currentFilter: 'All',
  todos: getTodos()
};

const events: Events = {
  deleteItem: (index: number) => {
    state.todos.splice(index, 1);
    render();
  },
  addItem: (text: string) => {
    state.todos.push({
      text,
      completed: false
    });
    render();
  }
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root') as HTMLElement;
    const newMain = registry.renderRoot(main, state, events);
    // main.replaceWith(newMain);
    applyDiff(document.body, main, newMain);
  });
};

render();
