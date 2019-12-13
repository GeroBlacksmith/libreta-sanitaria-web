import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers: HttpHeaders = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('http://localhost:3000', {headers: this.headers});
  }

  login(body): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', body,  {headers: this.headers});
  }
}
