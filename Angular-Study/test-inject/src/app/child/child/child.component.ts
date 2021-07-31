import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit ,OnDestroy{

  constructor() { }
  ngOnDestroy(): void {
    console.log('ChildComponent Destroied')
  }

  ngOnInit(): void {
  }

}
