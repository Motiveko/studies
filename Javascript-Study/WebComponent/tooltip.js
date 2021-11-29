class Tooltip extends HTMLElement {
  constructor() {
    super();
    // field 초기화
    this._tooltipVisible;
    this._tooltipText = 'Dummy Text';
    this._tooltipIcon;
    // mode : closed면 접근 불가다. 랜더링도 안되는걸 언제쓰는걸까?
    this.attachShadow({mode: 'open'});

    // const template = document.querySelector('#tooltip-template');
    // // constructor에서 shadow dom에는 접근 가능하다.
    // this.shadowRoot.appendChild(template.content.cloneNode(true));

    // template에 정의한 html을 shadowRoot에 넣는다.
    this.shadowRoot.innerHTML = `
      <style>
        div {
          font-weight: normal;
          background-color: black;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 100;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1xp 6px rgba(0,0,0,0.26);
        }
        
        :host {
          position: relative
        }
        
        :host-context(p) {
          font-weight: bold;
          padding: 0.15rem
        }
        
        :host(.important) {
          background-color: var(--color-primary, #cccb );
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
    this._tooltipIcon = this.shadowRoot.querySelector('span'); 
    // const tooltipIcon = document.createElement('span');
    // tooltipIcon.textContent = ' (?)';
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

    this.shadowRoot.appendChild(this._tooltipIcon)

  }

  attributeChangedCallback(name, oldValue, newValue) {
    // name은 어트리뷰트 명
    if(oldValue === newValue){
      return 
    }

    if(name === 'text') {
      this._tooltipText = newValue;

    }
  }

  // 변화를 감지할 attribute명을 배열로 반환해야한다.
  static get observedAttributes() {
    return ['text', 'class'];
  }
  
  disconnectedCallback() {
    
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector('div');
    if(this._tooltipVisible) {
      tooltipContainer = document.createElement('div');
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if(tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }
  
  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define('uc-tooltip', Tooltip)