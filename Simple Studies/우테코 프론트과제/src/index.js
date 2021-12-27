import VendingMachine from "./view/vending-machine";



window.onload = () => {
  let app = document.querySelector('#id');
  
  window.requestAnimationFrame(() => {
    render();
  })
}

const render = () => {
  console.log(app);
  app.innerHTML = '<app-vending-machine></app-vending-machine>';
}