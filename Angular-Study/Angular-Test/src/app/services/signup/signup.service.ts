import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface PasswordStrength {
  score: number;
  warning: string;
  suggestion: string[];
}

export type Plan = 'personal' | 'business' | 'non-profit';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  getPasswordStrength(password: string): Observable<PasswordStrength> {
    throw new Error('Method not implemented.');
  }

  isUsernameTaken(username: any): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  isEmailTaken(email: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  
  private post<Response>(path: string, data: any): Observable<Response> {
    return this.http.post<Response>(`${environment.signupServiceUrl}${path}`, data);
  }
}
