import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveSession(key, value) {
    sessionStorage.setItem(key, value);
  }
  getSession(key) {
    return sessionStorage.getItem(key);
  }
}
