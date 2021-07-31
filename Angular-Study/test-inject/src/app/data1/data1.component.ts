import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data1',
  templateUrl: './data1.component.html',
  styleUrls: ['./data1.component.css']
})
export class Data1Component implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {}

  get message(): string {
    return this.dataService.message
  }

  set message(newMessage: string) {
    this.dataService.message = newMessage
  }
  
}
