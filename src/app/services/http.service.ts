import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient,private storage:StorageService) { }
  
  headers = {'Access-Control-Allow-Origin': '*', 'Authorization':this.storage.getSession('auth')};
  loginHeaders: HttpHeaders = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
  apiUrl='http://localhost:3000';

  getUser(username) {
    console.log(username, this.headers);
    return this.http.get(`${this.apiUrl}/auth/${username}`, {headers: this.headers});
  }

  getPets() {
    return this.http.get(`${this.apiUrl}/pets`, {headers: this.headers});
  }

  getMyPets(username) {
    return this.http.get(`${this.apiUrl}/auth/${username}`, {headers: this.headers});
  }
  login(body): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', body,  {headers: this.loginHeaders});
  }
  setHeadersAuth(){
    this.headers.Authorization = this.storage.getSession('auth');
  }
  postProfile(profile) {
    return this.http.post(`${this.apiUrl}/persons`,profile, {headers:this.headers})
  }
  updateProfile(profile){
    return this.http.put(`${this.apiUrl}/persons/${profile.id}/update`,profile, {headers:this.headers});
  }
  getProfileByUserId(id){
    return this.http.get(`${this.apiUrl}/persons/userid/${id}`, {headers: this.headers});
  }
}
