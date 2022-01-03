import routerFactory from '../router/router';

const template = document.createElement('template');
template.innerHTML = `<div class="container">
  <header>
    <h1>**** 자판기 ****</h1>
  </header>
  <nav></nav>
  <div id="router"></div>
</div>`;
export default class AppComponent extends HTMLElement {
  constructor(routes) {
    super();
    this.routes = routes;
    this.init(routes);
  }

  init() {
    const newTemplate = template.content.firstElementChild.cloneNode(true);

    // initialize router
    const routerOutlet = newTemplate.querySelector('#router');
    this.initRouter(routerOutlet);

    // nav button
    const nav = newTemplate.querySelector('nav');
    this.createNavigations().forEach(navButton => nav.appendChild(navButton));
    nav.addEventListener('click', e => {
      const { target } = e;
      if (target.matches('button[data-navigation]')) {
        this.router.navigate(target.dataset.navigation);
      }
    });

    // render template
    this.appendChild(newTemplate);
  }

  initRouter(routerOutlet) {
    this.router = routerFactory(routerOutlet);
    this.routes.forEach(({ url, component }) => this.router.add(url, component));
    this.router.start();
  }

  createNavigations() {
    if (this.routes) {
      return this.routes.map(element => {
        const navButton = document.createElement('button');
        navButton.dataset.navigation = element.url;
        navButton.textContent = element.name;
        return navButton;
      });
    }
    return [];
  }
}

customElements.define('app-component', AppComponent);
