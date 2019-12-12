import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers: HttpHeaders = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('http://localhost:3000', {headers: this.headers});
  }
}
