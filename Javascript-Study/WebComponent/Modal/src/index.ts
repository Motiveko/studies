import { Modal } from "./modal";

customElements.define("uc-modal", Modal);

const showBtn = document.querySelector("#showBtn");
showBtn.addEventListener("click", () => {
  const modal: Modal = document.querySelector("uc-modal");
  if (!modal.isOpen) {
    modal.open();
  }
});

const modal = document.querySelector("uc-modal");
modal.addEventListener("confirm", () => {
  console.log("confirmed...");
});

modal.addEventListener("cancel", () => {
  console.log("canceled...");
});
