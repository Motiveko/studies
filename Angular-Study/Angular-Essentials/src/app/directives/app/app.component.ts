import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app',
  template: `
    <h2 *myNgIf="condition">Hello {{ name }}</h2>
    <button (click)="condition = !condition">Click</button>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  condition: boolean = false;
  name: string = 'MOTIVEKO';

  constructor() {}

  ngOnInit(): void {}
}
