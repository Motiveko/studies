let template: HTMLTemplateElement | undefined;

const createAppElement = () => {
  if (!template) {
    template = document.querySelector('#todo-app') as HTMLTemplateElement;
  }
  return template.content.firstElementChild?.cloneNode(true) as HTMLElement;
};

export default (targetElement: Node) => {
  const newApp = targetElement.cloneNode(true) as HTMLElement;
  newApp.innerHTML = '';
  newApp.appendChild(createAppElement());
  return newApp;
};
