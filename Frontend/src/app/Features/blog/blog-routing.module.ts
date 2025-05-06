import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { BlogListComponent } from './blog-list/blog-list.component';
import { RouteService } from '../user/route.service';
import { ShowBLogsByCategoriesComponent } from './show-blogs-by-categories/show-blogs-by-categories.component';
import { SHowBlogComponent } from './show-blog/show-blog.component';
import { BlogService } from './blog.service';
import { BlogResolver } from '../../Core/Guards/blog-resolver.guard';


const routes: Routes = [
  {path:"home/blogs",component:BlogListComponent,resolve:{RouteService}},
  {path:"home/blogs/blogsbycategory/:category",component:ShowBLogsByCategoriesComponent},
  {path:"openblog",component:SHowBlogComponent,resolve:{data: BlogResolver}},
  
];


@NgModule({
  declarations:[],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { 
  
}
