import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  pets;
  constructor(private http:HttpService, private router: Router,private storage: StorageService) { }

  ngOnInit() {
    this.http.getPets().subscribe(
      res=>{
        this.pets=res;
      },
      error=>{
        console.error(error);
        // this.storage.deleteSession();
        // this.router.navigate(['']);
      }
    )
  }

}
