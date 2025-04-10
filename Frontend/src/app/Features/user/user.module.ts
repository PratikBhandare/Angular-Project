import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RouterModule, RouterStateSnapshot } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AuthGuard } from '../../Core/Guards/auth.guard';
import { SharedModule } from '../../Shared/shared.module';
import { UserCardComponent } from './user-card/user-card.component';
import { ShowProfileComponent } from './show-profile/show-profile.component';
import { UserProfileResolver } from '../../Core/Guards/user-profile-resolver.guard';






@NgModule({
  declarations: [
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    UserCardComponent,
    ShowProfileComponent,
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule,
    SharedModule,
    
  ],providers:[AuthGuard,UserProfileResolver],
  exports:[
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    UserCardComponent,

  ]
})
export class UserModule { 
  constructor(){
    console.log("User Module");
    
  }
}
