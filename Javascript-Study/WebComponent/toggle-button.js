class ToggleButton extends HTMLElement {

  constructor() {
    super();
    this._isHidden = true;
    this._content = document.createElement('div');
    this._content.innerHTML = `<slot></slot>`
    this.attachShadow({mode: 'open'});

  }
  connectedCallback() {
    const button = document.createElement('button');
    button.innerText = 'toggle button';
    button.addEventListener('click', this._toggleContent.bind(this))
    this.shadowRoot.appendChild(button)
  }

  _toggleContent() {  
    if(this._isHidden) {
      this.shadowRoot.appendChild(this._content);
    } else {
      this.shadowRoot.removeChild(this._content);
    }
    this._isHidden = !this._isHidden
  }
}

customElements.define('uc-toggle-button', ToggleButton);