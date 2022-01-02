import List from "./view/List";
import Footer from "./view/Footer";
import App from './view/Application'

import modelFactory, { State } from './model/model'
import eventBusFactory from './model/eventBus'


let initialState: State | undefined; 
try {
  const prevState = window.localStorage.getItem('state');
  initialState = prevState ? JSON.parse(prevState) : null;
} catch (error) {
  console.error(error);
}

const eb = eventBusFactory(modelFactory(initialState))
eb.subscribe((state: State) => {
  window.localStorage.setItem('state', JSON.stringify(state));
})
export const eventBus = eb; 
 
customElements.define('todomvc-list', List);
customElements.define('todomvc-footer', Footer);
customElements.define('todomvc-app', App);

