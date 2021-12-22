import { State } from '.';

type Component = (targetElement: Element, state: State) => Node | Element;
type Registry = {
	[name: string]: Component | undefined;
};
type AddRegistry = (name: string, component: Component) => void;

const registry: Registry = {};

const add: AddRegistry = (name, component) => {
	registry[name] = component;
};

const renderWrapper: (c: Component) => Component = component => {
	return (targetElement, state) => {
		const element = component(targetElement, state) as Element;

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
		return root.cloneNode(true);
	};
	return renderWrapper(cloneComponent)(root, state);
};
export default {
	add,
	renderRoot
};
