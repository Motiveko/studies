import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  message: string;    // 공유할 데이터입니다.
  constructor() { }
}
