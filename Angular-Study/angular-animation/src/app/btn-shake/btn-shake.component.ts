import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

const ShakeAnimation = [
  style({ transform: 'rotate(0)' }),
  animate('0.1s', style({ transform: 'rotate(2deg)' })),
  animate('0.1s', style({ transform: 'rotate(-2deg)' })),
  animate('0.1s', style({ transform: 'rotate(2deg)' })),
  animate('0.1s', style({ transform: 'rotate(0)' })),
];
@Component({
  selector: 'app-btn-shake',
  templateUrl: './btn-shake.component.html',
  styleUrls: ['./btn-shake.component.css'],
  animations: [
    trigger('queryShake', [
      transition('0 <=> 1', [query('.card', ShakeAnimation)]),
    ]),
  ],
})
export class BtnShakeComponent {
  cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shake = false;
  constructor() {}

  toggle() {
    this.shake = !this.shake;
  }
}
