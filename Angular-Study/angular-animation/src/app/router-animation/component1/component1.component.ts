import { Component, OnInit } from '@angular/core';
import { componentInOutAnimation } from '../router-animation';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css'],
  animations: [componentInOutAnimation],
})
export class Component1Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
