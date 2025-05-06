import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UploadBlogRequestsComponent } from './upload-blog-requests/upload-blog-requests.component';
import { RouterModule } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { BlogModule } from '../blog/blog.module';
import { UserModule } from '../user/user.module';




@NgModule({
  declarations: [
    AdminPanelComponent,
    UsersListComponent,
    UploadBlogRequestsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DrawerModule,
    BlogModule,
    UserModule
    
  ],
  exports:[
    UsersListComponent
  ]
})
export class AdminModule { }
