import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }
    parseJwt2(token) {
        try {
            return JSON.parse(window.atob(token.split('.')[1]));
        } catch (e) {
            return e.message ? e.message : null;
        }
    }
    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(
          c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
        return JSON.parse(jsonPayload);
      }
    
}
