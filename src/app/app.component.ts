import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
