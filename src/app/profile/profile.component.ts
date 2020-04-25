import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  authUser;
  loggedUser;
  active = false;
  activateProfileProcess = false;
  profileActivationForm: FormGroup;
  profile = {
    name: '',
    address: '',
    telephone: '',
  };
  constructor(private storage: StorageService, private auth: AuthService, private http: HttpService, private form: FormBuilder) {
    this.profileActivationForm = this.form.group({
      name: '',
      address: '',
      telephone: '',
      userid: this.storage.getSession('id')
    });
  }

  ngOnInit() {
    this.authUser = this.storage.getSession('auth');
    this.loggedUser = this.auth.parseJwt2(this.authUser);
    this.http.setHeadersAuth();
    this.http.getProfileByUserId(this.storage.getSession('id')).subscribe(
      res => {
        this.active = true;
        console.log(res);
        this.profile.name = res.name;
        this.profile.address = res.address;
        this.profile.telephone = res.telephone;
      },
      erro => {
        console.log("Vacio");
      }
    )
  }
  submit() {
    console.log(this.profileActivationForm.getRawValue());
    this.http.postProfile(this.profileActivationForm.getRawValue()).subscribe(
      res => {
        this.active = true;
        this.activateProfileProcess = false;
        this.profile = res;
        console.log(res);
      }
    );
  }

}
