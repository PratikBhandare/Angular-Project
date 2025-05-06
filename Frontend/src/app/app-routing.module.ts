import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './Features/user/profile/profile.component';
import { HomeComponent } from './Core/Components/home/home.component';
import { AuthGuard } from './Core/Guards/auth.guard';
import { AboutComponent } from './Core/Components/about/about.component';
import { ContactComponent } from './Core/Components/contact/contact.component';
import { LoginComponent } from './Features/user/login/login.component';
import { SignupComponent } from './Features/user/signup/signup.component';
import path from 'path';
import { CreateBlogComponent } from './Features/blog/create-blog/create-blog.component';
import { BlogListComponent } from './Features/blog/blog-list/blog-list.component';
import { BlogCardComponent } from './Features/blog/blog-card/blog-card.component';
import { BlogService } from './Features/blog/blog.service';
import { SHowBlogComponent } from './Features/blog/show-blog/show-blog.component';
import { RouteService } from './Features/user/route.service';
import { AdminPanelComponent } from './Features/admin/admin-panel/admin-panel.component';
import { AdminGuard } from './Core/Guards/admin.guard';
import { UsersListComponent } from './Features/admin/users-list/users-list.component';
import { UploadBlogRequestsComponent } from './Features/admin/upload-blog-requests/upload-blog-requests.component';
import { NotFoundComponent } from './Core/Components/not-found/not-found.component';
import { ShowBLogsByCategoriesComponent } from './Features/blog/show-blogs-by-categories/show-blogs-by-categories.component';
import { ShowProfileComponent } from './Features/user/show-profile/show-profile.component';
import { UserProfileResolver } from './Core/Guards/user-profile-resolver.guard';




const routes: Routes = [
  
  {path:"",redirectTo:"/home",pathMatch:"full",},
  {path:"home",component:HomeComponent},
  // {path:"home/blogs",component:BlogListComponent,resolve:{RouteService}},
  // {path:"home/blogs/blogsbycategory/:category",component:ShowBLogsByCategoriesComponent},
  // {path:"openblog",component:SHowBlogComponent,resolve:{data: BlogService}},
  // {path:"blog/",component:BlogListComponent,canActivate:[AuthGuard]},

  // {path:"blogs",loadChildren:()=>import("./Features/blog/blog.module").then((m)=>m.BlogModule)},

  {path:"user",loadChildren:()=>import("./Features/user/user.module").then((m)=>m.UserModule)},

  {path:"adminpanel",component:AdminPanelComponent,canActivate:[AdminGuard],children:[
    {path:"getusers",component:UsersListComponent},
    {path:"getblogrequests",component:UploadBlogRequestsComponent}
  ]},
  
  {path:"about",component:AboutComponent},
  {path:"contact",component:ContactComponent},
  // {path:"notification",component:NotificationComponent},
  // {path:"user/login",component:LoginComponent},
  // {path:"user/signup",component:SignupComponent},

  // {path:"user",children:[{
  //   path:"login",component:LoginComponent
  // }]},
  // {path:"user/profile",component:ProfileComponent,canActivate:[AuthGuard],children:[
  //   {path:"blog/display",component:BlogListComponent,resolve:[RouteService]},
  //   {path:"subscriptions/display",component:SubscriptionListComponent,resolve:[RouteService]}
  // ]},
  // {path:"user/profile/blog/create",component:CreateBlogComponent,canActivate:[AuthGuard]},

  {path:"notfound",component:NotFoundComponent},
  // {path:"**",component:NotFoundComponent},

  // {path:"user/profile/:id",component:ShowProfileComponent, resolve:{data:UserProfileResolver}}
  // {path:"user/profile/:id",component:ShowProfileComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
