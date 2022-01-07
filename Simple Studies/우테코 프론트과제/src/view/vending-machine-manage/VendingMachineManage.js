import ChargeForm from './ChargeForm';
import ChargeTable from './ChargeTable';
import CurrentCharge from './CurrentChange';

export default class VendingMachineManage extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.append(new ChargeForm());
    this.append(new CurrentCharge());
    this.append(new ChargeTable());
  }
}

customElements.define('vending-machine-manage', VendingMachineManage);
