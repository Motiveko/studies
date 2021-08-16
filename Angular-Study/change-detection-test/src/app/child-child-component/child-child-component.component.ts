import { ChangeDetectionStrategy, Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-child-child-component',
  template: `<h3>손자 id: {{data.id}}</h3>
  <button (click)="click()">손자버튼</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildChildComponentComponent implements DoCheck{

  @Input() data: any;
   
  constructor() { }
  ngDoCheck(): void {
    console.log('손자 doCheck()');
    // console.log(this.data.id)
  }

   click() {
      this.data.id++;
   }

}
