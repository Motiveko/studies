import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {


  isUsernameTaken(username: any): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  isEmailTaken(email: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  
  constructor() { }
}
