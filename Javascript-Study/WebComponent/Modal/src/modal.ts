export class Modal extends HTMLElement {
  isOpen = false;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
          <style>
        #backdrop {
          position: fixed;
          top: 0;     
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: rgba(0,0,0,0.75);   
          z-index: 10;
          opacity: 0;
          pointer-events: none;
        }

        :host([opened]) #backdrop,
        :host([opened]) #modal {
          opacity: 1;
          pointer-events: all;
        }

        :host([opened]) #modal {
          top: 15vh;
        }

        #modal {
          z-index : 100;
          position: fixed;
          left: 25%;
          top: 10vh;
          width: 50%;
          background: white;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.26);

          display: flex;
          flex-direction: column;
          justify-content: space-around;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease-out;
        } 

        header {
          padding: 1rem;
          border-bottom: 1px solid lightgrey;
        }

        ::slotted([slot="title"]) {
          font-size: 1.25rem;
        }

        #main {
          padding: 1rem;
        }

        #actions {
          padding: 1rem;
          border-top: 1px solid lightgrey;
          display: flex;
          justify-content: flex-end
        }
        #actions button {
          margin: 0 0.25rem
        }
      </style>
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <slot name="title">Defalut Title</slot>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button id="cancel">Cancel</button>
          <button id="confirm">Okay</button>
        </section>
      </div>
    `;

    const slots: NodeListOf<HTMLSlotElement> =
      this.shadowRoot.querySelectorAll("slot");

    slots[1].addEventListener("slotchange", (event) => {
      console.dir(slots[1].assignedElements());
    });

    const cancelBtn = this.shadowRoot.querySelector("#cancel");
    const confirmBtn = this.shadowRoot.querySelector("#confirm");
    const backDrop = this.shadowRoot.querySelector("#backdrop");

    cancelBtn.addEventListener("click", this._cancel.bind(this));
    confirmBtn.addEventListener("click", this._confirm.bind(this));
    backDrop.addEventListener("click", this._cancel.bind(this));
  }

  connectedCallback() {}
  disconnectedCallback() {}

  hide() {
    this.removeAttribute("opened");
    this.isOpen = false;
  }

  _cancel(event: Event) {
    this.hide();
    const cancelEvent = new Event("cancel", { composed: true });
    event.target.dispatchEvent(cancelEvent);
  }

  _confirm(event: Event) {
    this.hide();
    const confirmEvent = new Event("confirm", { composed: true });
    event.target.dispatchEvent(confirmEvent);
  }

  attributeChangedCallback(name: string, oldVal: any, newVal: any) {
    if (oldVal === newVal) {
      return;
    }
    if (name === "opened") {
      if (this.hasAttribute("opened")) {
        this.isOpen = true;
      } else {
        this.isOpen = false;
      }
    }
  }
  static get observedAttributes() {
    return ["opened"];
  }

  open() {
    this.setAttribute("opened", "");
    this.isOpen = true;
  }
}
