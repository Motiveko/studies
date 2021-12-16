import { State } from '..';
import todosView from './todo';
import counterView from './counter';
import filtersView from './filter';

export default (targetElement: Element, state: State): Element => {
  const element = targetElement.cloneNode(true) as Element;

  const list = element.querySelector('.todo-list');
  const counter = element.querySelector('.todo-count');
  const filters = element.querySelector('.filters');

  list?.replaceWith(todosView(list, state));
  counter?.replaceWith(counterView(counter, state));
  filters?.replaceWith(filtersView(filters, state));

  return element;
};
