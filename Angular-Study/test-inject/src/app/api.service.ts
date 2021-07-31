import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { config } from './config/config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  get(url: string): Observable<any> {
    return this.http.get(`${config.endPoint}/api/${url}`).pipe(
      map(this.handleResponse)
    )
  }

  handleResponse(res: HttpResponse<any>) {
    if(environment.production) {
      return res ? res.body : null;
    } else {
      return res;
    }
  }
}
