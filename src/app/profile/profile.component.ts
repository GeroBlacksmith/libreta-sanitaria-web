import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  authUser;loggedUser;
  constructor(private storage: StorageService, private auth: AuthService,private http: HttpService) { }

  ngOnInit() {
    this.authUser = this.storage.getSession('auth');
    this.loggedUser = this.auth.parseJwt2(this.authUser);
    this.http.getUser(this.loggedUser.username).subscribe(
      res=>{
        console.log(res);
      },
      error=>{
        console.error(error);
      }
    )
  }

}
