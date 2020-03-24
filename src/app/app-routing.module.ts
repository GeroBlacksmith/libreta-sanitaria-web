import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PetComponent } from './pet/pet.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'profile', component: ProfileComponent }, 
  { path: 'pet', component: PetComponent },
  { path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
