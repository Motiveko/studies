import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data2',
  templateUrl: './data2.component.html',
  styleUrls: ['./data2.component.css']
})
export class Data2Component implements OnInit {

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
  checkInput($event: any): any {
    console.log($event)
  }  
}
