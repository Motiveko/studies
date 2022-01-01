import List from "./view/List";
import Footer from "./view/Footer";
import App from './view/Application'

import modelFactory from './model/model';

const model = modelFactory();
export const getModelInstance = () => model;

customElements.define('todomvc-list', List);
customElements.define('todomvc-footer', Footer);
customElements.define('todomvc-app', App);