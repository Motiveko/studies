import { Todo, getTodos } from './getTodos';
import appView from './view/app';

declare const APP_NAME: string;
declare const VERSION: string;
declare const BUILT_AT: number;

console.log(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  `******${APP_NAME}@${VERSION} IS BUILT AT ${new Date(
    BUILT_AT
  ).getUTCDate()}******`
);

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
