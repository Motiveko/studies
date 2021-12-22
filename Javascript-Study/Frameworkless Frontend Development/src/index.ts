import { Todo, getTodos } from './getTodos';
import filtersView from './view/filter';
import todosView from './view/todos';
import counterView from './view/counter';

import registry from './registry';

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

const main = document.querySelector('.todoapp');
if (!main) {
	throw Error('앱에 문제가 있습니다.');
}
window.requestAnimationFrame(() => {
	const newMain = registry.renderRoot(main, state);
	main.replaceWith(newMain);
});
