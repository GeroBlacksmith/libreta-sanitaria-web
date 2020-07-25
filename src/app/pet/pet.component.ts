import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  pets:Array<any>;
  showAddPetForm=false;
  newPet: FormGroup;
  constructor(private http:HttpService, private router: Router,private storage: StorageService, private form: FormBuilder) {
    this.newPet = this.form.group({
      name:'',
      birthDate:'',
      specie:'',
      race:'',
      color:'',
      propietary:this.storage.getSession('person'),
    })
   }

  ngOnInit() {

    this.http.getPets().subscribe(
      (res:any)=>{
        this.pets=res;
      },
      error=>{
        console.error(error);
        // this.storage.deleteSession();
        // this.router.navigate(['']);
      }
    )
  }
  addPet(){
    this.showAddPetForm = true;
  }
  submit(){
    this.http.postPet(this.newPet.getRawValue())
      .subscribe((res:any)=>{
        this.pets.push(res);
      })
  }

}
