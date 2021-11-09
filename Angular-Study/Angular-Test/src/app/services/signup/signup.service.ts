import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface SignupData {
  plan: Plan;
  username: string;
  email: string;
  password: string;
  tos: true;
  address: {
    name: string;
    addressLine1?: string;
    addressLine2?: string;
    city: string;
    postcode: string;
    region?: string;
    country: string;
  };
}
export interface PasswordStrength {
  score: number;
  warning: string;
  suggestions: string[];
}

export type Plan = 'personal' | 'business' | 'non-profit';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  getPasswordStrength(password: string): Observable<PasswordStrength> {
    return this.post<PasswordStrength>('/password-strength', {
      password,
    });
  }

  isUsernameTaken(username: any): Observable<boolean> {
    return this.post<{ usernameTaken: boolean }>('/username-taken', {
      username,
    }).pipe(map((result) => result.usernameTaken));
  }

  isEmailTaken(email: string): Observable<boolean> {
    return this.post<{ emailTaken: boolean }>('/email-taken', { email }).pipe(
      map((result) => result.emailTaken)
    );
  }

  signup(data: SignupData): Observable<{ success: true }> {
    return this.post<{ success: true }>('/signup', data);
  }

  private post<Response>(path: string, data: any): Observable<Response> {
    return this.http.post<Response>(
      `${environment.signupServiceUrl}${path}`,
      data
    );
  }
}
