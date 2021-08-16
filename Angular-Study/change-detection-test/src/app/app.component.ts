import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h2>부모 id : {{data.id}}</h2>
  <button (click)="click()">부모버튼</button>
  <app-child-component [data]="data"></app-child-component>`,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements DoCheck{

  data = {
    id: 1
  }

  ngDoCheck(): void {
    console.log("부모 doCheck()");
  }

  click() {
    console.log('click()');
    // property의 값만 변경
    // this.data.id++; 
    // property의 래퍼런스가 변경
    this.data = { id: this.data.id + 1 }
  }
}
