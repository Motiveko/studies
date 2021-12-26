import { Events, State } from '../index';
let template: HTMLTemplateElement | undefined;

const createAppElement = (events: Events) => {
  if (!template) {
    template = document.querySelector('#todo-app') as HTMLTemplateElement;
  }
  const newTemplate = template.content.firstElementChild?.cloneNode(true) as HTMLElement;
  newTemplate.querySelector('.new-todo')!.addEventListener('keypress', e => {
    if ((e as KeyboardEvent).key === 'Enter') {
      events['addItem']((e.target as HTMLInputElement).value);
    }
  });
  return newTemplate;
};

export default (targetElement: Node, state: State, events: Events) => {
  const newApp = targetElement.cloneNode(true) as HTMLElement;
  newApp.innerHTML = '';
  newApp.appendChild(createAppElement(events));
  return newApp;
};
