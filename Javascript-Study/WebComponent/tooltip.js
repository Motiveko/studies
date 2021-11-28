class Tooltip extends HTMLElement {
  constructor() {
    super();
    // field 초기화
    this._tooltipContainer;
    this._tooltipText = 'Dummy Text';
    // mode : closed면 접근 불가다. 랜더링도 안되는걸 언제쓰는걸까?
    this.attachShadow({mode: 'open'});

    // const template = document.querySelector('#tooltip-template');
    // // constructor에서 shadow dom에는 접근 가능하다.
    // this.shadowRoot.appendChild(template.content.cloneNode(true));

    // template에 정의한 html을 shadowRoot에 넣는다.
    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: black;
          color: white;
          position: absolute;
          z-index: 10
        }
        
        :host-context(p) {
          font-weight: bold;
        }
        
        :host(.important) {
          background-color: lightgrey;
        }

        ::slotted(.highlight) {
          border-bottom: 1px dotted red; 
        }
        .icon {
          background: lightblue;
          padding : 0.15rem 0.5rem;
          border-radius: 50%
        }
      </style>
      <slot>Some Default</slot> 
      <span class="icon">(?)</span>
    `;
  }
  
  // LifeCycle : Element Attacched to DOM
  connectedCallback() {
    if(this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    const tooltipIcon = this.shadowRoot.querySelector('span'); 
    // const tooltipIcon = document.createElement('span');
    // tooltipIcon.textContent = ' (?)';
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))

    this.shadowRoot.appendChild(tooltipIcon)

    this.style.position = 'relative'
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;

    // style
    // this._tooltipContainer.style.backgroundColor = 'black';
    // this._tooltipContainer.style.color = 'white';
    // this._tooltipContainer.style.position = 'absolute'; 
    // this._tooltipContainer.style.zIndex = 10;
    this.shadowRoot.appendChild(this. _tooltipContainer);
  }
  
  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('uc-tooltip', Tooltip)