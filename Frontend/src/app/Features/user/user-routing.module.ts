import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BlogListComponent } from '../blog/blog-list/blog-list.component';
import { AuthGuard } from '../../Core/Guards/auth.guard';
import { CreateBlogComponent } from '../blog/create-blog/create-blog.component';
import { ProfileComponent } from './profile/profile.component';
import { RouteService } from './route.service';

import { ShowProfileComponent } from './show-profile/show-profile.component';
import { UserProfileResolver } from '../../Core/Guards/user-profile-resolver.guard';

const routes: Routes = [
  {path:"user/login",component:LoginComponent},
  {path:"user/signup",component:SignupComponent},
  {path:"user/profile",component:ProfileComponent,canActivate:[AuthGuard],children:[
    {path:"blog/display",component:BlogListComponent,resolve:[RouteService]},
    // {path:"subscriptions/display",component:SubscriptionListComponent}
  ]},
  {path:"user/profile/blog/create",component:CreateBlogComponent,canActivate:[AuthGuard]},
  {path:"user/profile/:id",component:ShowProfileComponent, resolve:{data:UserProfileResolver}}

];


@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class UserRoutingModule { 
  
}
