import { State } from '..';
import { Todo } from '../getTodos';

const getTodoCount = (todos: Todo[]) => {
	const notCompleted = todos.filter(todo => !todo.completed);
	const { length } = notCompleted;
	if (length === 1) {
		return '1 Item left';
	}
	return `${length} Items left`;
};

export default (target: Element, state: State) => {
	const { todos } = state;
	const newCounter = target.cloneNode(true) as Element;
	newCounter.textContent = getTodoCount(todos);
	return newCounter;
};
