import AppComponent from './view/app';
import ItemManagerComponent from './view/item-manager';
import ChargeChangeComponent from './view/charge-change';
import PurchaseItemComponent from './view/purchase-item';

const routes = [
  {
    url: '/item-manager',
    name: '상품 관리',
    component: (...args) => new ItemManagerComponent(...args)
  },
  {
    url: '/charge-change',
    name: '잔돈 충전',
    component: (...args) => new ChargeChangeComponent(...args)
  },
  {
    url: '/purchase-item',
    name: '상품 구매',
    component: (...args) => new PurchaseItemComponent(...args)
  }
];

document.querySelector('#app').appendChild(new AppComponent(routes));
