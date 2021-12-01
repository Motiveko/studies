class ToggleButton extends HTMLElement {

  constructor() {
    super();

    this._isHidden = true;
    this._buttonName = 'toggle btn';
    this._content = document.createElement('div');
    this._content.innerHTML = `<slot></slot>`

    this.attachShadow({mode: 'open'});

  }
  connectedCallback() {

    const button = document.createElement('button');
    this._buttonName = this.getAttribute('buttonName') ?? 'toggle btn';
    button.innerText = this._buttonName;
    button.addEventListener('click', this._toggleContent.bind(this))
    
    this.shadowRoot.appendChild(button)

    if(this.getAttribute('show') === 'true') {
      this.shadowRoot.appendChild(this._content);
      this._isHidden = false;
    }
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