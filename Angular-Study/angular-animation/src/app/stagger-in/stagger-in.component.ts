import { Component, OnInit } from '@angular/core';
import { staggerInOut } from './animation';

@Component({
  selector: 'app-stagger-in',
  templateUrl: './stagger-in.component.html',
  styleUrls: ['./stagger-in.component.css'],
  animations: staggerInOut,
})
export class StaggerInComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
