import ChargeForm from './charge-form/charge-form';
import ChargeTable from './charge-table/charge-table';
import CurrentChange from './current-change/current-change';

export default class VendingMachineManage extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.append(new ChargeForm());
    this.append(new CurrentChange());
    this.append(new ChargeTable());
  }
}

customElements.define('vending-machine-manage', VendingMachineManage);
