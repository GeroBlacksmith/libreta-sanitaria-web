import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Libreta Sanitaria de Mascotas';
  loginForm: FormGroup;
  constructor(private http: HttpService, private form: FormBuilder) {  }

  ngOnInit() {
    this.loginForm = this.form.group({
      usermame: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
