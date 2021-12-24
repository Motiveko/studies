import { State } from '..';

export default (target: Element, state: State) => {
  const newCounter = target.cloneNode(true) as Element;
  const { currentFilter } = state;
  Array.from(newCounter.querySelectorAll('li a')).forEach(a => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected');
    } else {
      a.classList.remove('selected');
    }
  });
  return newCounter;
};
