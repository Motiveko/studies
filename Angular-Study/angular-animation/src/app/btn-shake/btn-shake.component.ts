import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { shakeTrigger } from './shake.animation';

@Component({
  selector: 'app-btn-shake',
  templateUrl: './btn-shake.component.html',
  styleUrls: ['./btn-shake.component.css'],
  animations: [shakeTrigger],
})
export class BtnShakeComponent {
  cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shakeState = '';
  constructor() {}

  toggle() {
    this.shakeState = 'shake';
  }
}
