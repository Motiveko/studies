import { Component, OnInit } from '@angular/core';
import { routerAnimation } from '../router-animation';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css'],
  animations: [routerAnimation],
})
export class Component2Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
