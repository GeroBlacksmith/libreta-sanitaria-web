import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient,private storage:StorageService) { }
  
  headers: HttpHeaders = new HttpHeaders({'Access-Control-Allow-Origin': '*', 'Authorization':this.storage.getSession('auth')});
  loginHeaders: HttpHeaders = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
  getUser(username){
    return this.http.get('http://localhost:3000/auth/'+username, {headers: this.headers});
  }
  get() {
    return this.http.get('http://localhost:3000', {headers: this.headers});
  }
  getPets() {
    return this.http.get('http://localhost:3000/pets', {headers: this.headers});
  }

  getMyPets(){
    return this.http.get('http://localhost:3000/pets', {headers: this.headers});
  }
  login(body): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', body,  {headers: this.loginHeaders});
  }
}
