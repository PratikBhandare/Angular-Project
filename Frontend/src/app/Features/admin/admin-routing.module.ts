import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { BlogListComponent } from '../blog/blog-list/blog-list.component';
import { RouteService } from '../user/route.service';


const routes: Routes = [
    // {path:"home/blogs",component:BlogListComponent,resolve:{RouteService}},
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 
  
}
