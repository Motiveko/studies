class ConfirmLink extends HTMLAnchorElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('click', (e) => {
      if(!confirm('Do you really want to leave?')) {
        // link로 이동을 막는다.
        e.preventDefault();
      }
    });
  }
}

customElements.define('uc-confirm-link', ConfirmLink, { extends: 'a' });