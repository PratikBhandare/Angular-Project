import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SHowBlogComponent } from './show-blog/show-blog.component';
// import { SHowBlogComponent } from '../show-blog/show-blog.component';
import { PopoverModule } from 'primeng/popover';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { RouterModule, RouterStateSnapshot } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { CardContentPipe } from '../../Shared/Pipes/card-content.pipe';
import { DateAgoPipe } from "../../Shared/Pipes/dateTime.pipe";
import { SharedModule } from "../../Shared/shared.module";
import { ShowBLogsByCategoriesComponent } from './show-blogs-by-categories/show-blogs-by-categories.component';





@NgModule({
  declarations: [
    BlogCardComponent,
    BlogListComponent,
    CreateBlogComponent,
    SHowBlogComponent,
    UpdateBlogComponent,
    CardContentPipe,
    ShowBLogsByCategoriesComponent
 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DrawerModule,
    ToastModule,
    MessageModule,
    AvatarModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    CommonModule,
    PopoverModule,
    InputGroupModule,
    InputGroupAddonModule,
    DividerModule,
    DateAgoPipe,
    SharedModule,
    RouterModule,
    FormsModule

],
 
  exports:[
    BlogCardComponent,
    BlogListComponent,
    CreateBlogComponent,
    SHowBlogComponent
  ]
})
export class BlogModule { 
  constructor(){
    console.log("Blog Module Loaded...!!");
    
  }
}
