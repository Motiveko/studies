import { DISPLAY } from '../constant/constant';
import routerFactory from '../router/router';

const template = document.createElement('template');
template.innerHTML = `<div class="container">
  <header>
    <h1>${DISPLAY.TITLE_APP}</h1>
  </header>
  <nav></nav>
  <div id="router"></div>
</div>`;
export default class AppComponent extends HTMLElement {
  constructor(routes) {
    super();
    this.routes = routes;
    this.init();
  }

  init() {
    const newTemplate = template.content.cloneNode(true);

    // initialize router
    const routerOutlet = newTemplate.querySelector('#router');
    this.initRouter(routerOutlet);

    // nav button
    const nav = newTemplate.querySelector('nav');
    this.createNavigations().forEach(navButton => nav.appendChild(navButton));
    this.initEvent();

    // render template
    this.appendChild(newTemplate);
  }

  initEvent() {
    this.addEvent('click', 'button[data-navigation]', e => {
      const { target } = e;
      this.router.navigate(target.dataset.navigation);
    });
  }

  addEvent(event, selector, callback) {
    this.addEventListener(event, e => {
      const { target } = e;
      if (target.matches(selector)) {
        callback(e);
      }
    });
  }

  initRouter(routerOutlet) {
    this.router = routerFactory(routerOutlet);
    this.routes.forEach(({ url, component }) => this.router.add(url, component));
    this.router.start();
  }

  createNavigations() {
    if (this.routes) {
      return this.routes.map(route => {
        const { url, name, id } = route;

        const navButton = document.createElement('button');
        navButton.dataset.navigation = url;
        navButton.textContent = name;
        navButton.setAttribute('id', id);

        return navButton;
      });
    }
    return [];
  }
}

customElements.define('app-component', AppComponent);
