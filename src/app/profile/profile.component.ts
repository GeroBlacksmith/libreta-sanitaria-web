import { Component, OnInit } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { AuthService } from "../services/auth.service";
import { HttpService } from "../services/http.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  authUser;
  loggedUser;
  active = false;
  activateProfileProcess = false;
  editing = false;
  profileActivationForm: FormGroup;
  profile = {
    id: "",
    name: "",
    address: "",
    telephone: "",
  };
  constructor(
    private storage: StorageService,
    private auth: AuthService,
    private http: HttpService,
    private form: FormBuilder
  ) {
    this.profileActivationForm = this.form.group({
      name: "",
      address: "",
      telephone: "",
      userid: this.storage.getSession("id"),
    });
  }

  ngOnInit() {
    this.authUser = this.storage.getSession("auth");
    this.loggedUser = this.auth.parseJwt2(this.authUser);
    this.http.setHeadersAuth();
    this.http.getProfileByUserId(this.storage.getSession("id")).subscribe(
      (res: any) => {
        this.storage.saveSession('person', res._id);
        this.active = true;
        this.profile.id = res.id;
        this.profile.name = res.name;
        this.profile.address = res.address;
        this.profile.telephone = res.telephone;
      },
      (erro) => {
        console.log("Vacio");
      }
    );
  }
  submit() {
    if (this.editing) {
      this.http
        .updateProfile(this.profileActivationForm.getRawValue())
        .subscribe((res:any)=>{
          this.editing = false;
          this.active = true;
          this.activateProfileProcess = false;
          this.profile = res;
        })
    } else {
      this.http
        .postProfile(this.profileActivationForm.getRawValue())
        .subscribe((res: any) => {
          this.active = true;
          this.activateProfileProcess = false;
          this.profile = res;
        });
    }
  }
  edit() {
    this.editing = true;
    this.active = false;
    this.activateProfileProcess = true;
    this.profileActivationForm = this.form.group({
      name: this.profile.name,
      address: this.profile.address,
      telephone: this.profile.telephone,
      userid: this.storage.getSession("id"),
    });
  }
}
