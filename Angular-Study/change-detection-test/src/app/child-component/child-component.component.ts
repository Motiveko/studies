import { ChangeDetectionStrategy, Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-child-component',
  template: `<h2>자식 id : {{data.id}}</h2>
  <button (click)="click()">자식버튼</button>
  <app-child-child-component [data]="data"></app-child-child-component>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponentComponent implements DoCheck {

  // @Input() data: any;
  @Input()
  set data(data: any) {
    // console.log('자식 : setData()')
    this._data = data;
  }
  
  get data() {
    // console.log("자식 컴포넌트 데이타 getData(), _data.id = " + this._data.id)
    return this._data;
  }

  private _data: any;

  constructor() { }
  

  ngDoCheck(): void {
    console.log(`자식 doCheck() , id : ${this._data.id}`);
  }

  click() {}

}
