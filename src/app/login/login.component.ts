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
    console.log(this.auth.parseJwt2(this.authUser))
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
    console.log(this.loginForm.value);
    const login$ = this.http.login(this.loginForm.value);
    const user$ = this.http.getUser(this.loginForm.value.username);
    forkJoin([login$,user$]).subscribe(res=>{
      console.log(res);
    })
    // this.http.login(this.loginForm.value).pipe(
    //   mergeMap((res) => {
    //     console.log(res)
    //     if (res.access_token) {
    //       const bearerAccessToken = `Bearer ${res.access_token}`;
    //       this.storage.saveSession('auth', bearerAccessToken);
    //       const username = this.auth.parseJwt2(bearerAccessToken).username;
    //       console.log(username);
    //       return this.http.getUser(username);
    //     }
    //   })
    // )
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //     },
    //     error => {
    //       console.error(error);
    //     }
    //   );
  }


}
