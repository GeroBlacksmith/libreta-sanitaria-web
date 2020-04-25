import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { switchMap, flatMap, mergeMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = 'Libreta Sanitaria de Mascotas';
  loginForm: FormGroup;
  userLoggedIn: boolean;
  authUser;
  userLogged = "guest";

  constructor(private auth: AuthService,private http: HttpService, private form: FormBuilder, private storage: StorageService) { }

  ngOnInit() {
    this.authUser = this.storage.getSession('auth');
    if (this.authUser) {
      this.userLoggedIn = true;
      this.userLogged = this.auth.parseJwt2(this.authUser).username;
    } else {
      this.userLoggedIn = false;
    }
    this.loginForm = this.form.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    this.http.login(this.loginForm.value).pipe(
      switchMap(
        res => {
          if (res.access_token){
            const bearerAccessToken = `Bearer ${res.access_token}`;
            this.storage.saveSession('auth', bearerAccessToken);
            this.http.setHeadersAuth();
            const username = this.auth.parseJwt2(bearerAccessToken).username;
            return this.http.getUser(username);
          }
        }
      )
    ).subscribe(
      (res:{_id:string,username:string}) => {
        this.storage.saveSession('user', res.username);
        this.storage.saveSession('id', res._id);
        this.userLoggedIn = true;
        this.userLogged = res.username;
      },
      error=>{
        console.error(error);
      }
    );
    
  }


}
