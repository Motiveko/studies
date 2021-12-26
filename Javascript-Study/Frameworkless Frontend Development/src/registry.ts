import { State } from '.';

type Component = (targetElement: Element, state: State) => Element;
type Registry = {
  [name: string]: Component | undefined;
};
type AddRegistry = (name: string, component: Component) => void;

const registry: Registry = {};

const add: AddRegistry = (name, component) => {
  registry[name] = renderWrapper(component);
};

/**
 * wrapper 컴포넌트 생성 함수를받아 wrapper와 자식 컴포넌트 생성 함수를 호출하여 element를 반환하는 함수를 반환
 * @param component : wrapper 컴포넌트 생성 함수
 * @returns wrapper 컴포넌트 + 자식 컴포넌트 생성 함수
 */
const renderWrapper: (c: Component) => Component = component => {
  return (targetElement, state) => {
    const element = component(targetElement, state);

    const childComponents = element.querySelectorAll('[data-component]');

    [...childComponents].forEach(target => {
      const name = (target as HTMLElement).dataset.component as string;
      const child = registry[name];

      if (child) {
        target.replaceWith(child(target, state));
      }
    });
    return element;
  };
};

const renderRoot: Component = (root, state) => {
  const cloneComponent: Component = root => {
    return root.cloneNode(true) as Element;
  };
  return renderWrapper(cloneComponent)(root, state);
};
export default {
  add,
  renderRoot
};
