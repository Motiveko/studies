export class Modal extends HTMLElement {
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
        }
        #modal {
          z-index : 100;
          position: fixed;
          left: 25%;
          top: 15vh;
          width: 50%;
          background: white;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.26);

          display: flex;
          flex-direction: column;
          justify-content: space-around;

        }

        header {
          padding: 1rem;
        }
        header h2 {
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
          <h2>Please Confirm</h2>        
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button>Cancel</button>
          <button>Okay</button>
        </section>
      </div>
    `;
  }
}

// customElements.define("uc-modal", Modal);
