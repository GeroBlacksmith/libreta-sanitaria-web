import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Libreta Sanitaria de Mascotas';
  loginForm: FormGroup;
  userLoggedIn: boolean;
  authUser;

  constructor(private http: HttpService, private form: FormBuilder, private storage: StorageService) {  }

  ngOnInit() {
    this.authUser = this.storage.getSession('auth');
    console.log(this.parseJwt2(this.authUser));
    if (this.authUser) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
    this.loginForm = this.form.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  submit() {
    this.http.login(this.loginForm.value).subscribe(
      res => {
        if (res.access_token) {
          this.storage.saveSession('auth', `Bearer ${res.access_token}`);
        }
      },
      error => {
        console.error(error);
      }
    );
  }
  parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(
      c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    return JSON.parse(jsonPayload);
  }

  parseJwt2(token) {
    try {
      return JSON.parse(window.atob(token.split('.')[1]));
    } catch (e) {
      return e.message ? e.message : null;
    }
  }
}
