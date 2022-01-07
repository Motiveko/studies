import './css/style.css';
import AppComponent from './view/app';
import ProductAdd from './view/product-add/ProductAdd';
import VendingMachineManage from './view/vending-machine-manage/VendingMachineManage';
import ProductPurchase from './view/product-purchase/ProductPurchase';

window.addEventListener('error', event => {
  const message = event.error?.rawMessage;
  if (message) {
    alert(message);
    event.preventDefault();
  }
});

const routes = [
  {
    id: 'product-add-menu',
    url: '/product-add',
    name: '상품 관리',
    component: (...args) => new ProductAdd(...args)
  },
  {
    id: 'vending-machine-manage-menu',
    url: '/vending-machine-manage',
    name: '잔돈 충전',

    component: (...args) => new VendingMachineManage(...args)
  },
  {
    id: 'product-purchase-menu',
    url: '/product-purchase',
    name: '상품 구매',
    component: (...args) => new ProductPurchase(...args)
  }
];

document.querySelector('#app').appendChild(new AppComponent(routes));
