import List from "./view/List";
import Footer from "./view/Footer";
import App from './view/Application'
import getModelInstance from './model/model-instance'

const model = getModelInstance();
model.addChangeListener((state) => {
  Promise.resolve().then(() => {
    window
      .localStorage
      .setItem('state', JSON.stringify(state));
  })
})

customElements.define('todomvc-list', List);
customElements.define('todomvc-footer', Footer);
customElements.define('todomvc-app', App);

