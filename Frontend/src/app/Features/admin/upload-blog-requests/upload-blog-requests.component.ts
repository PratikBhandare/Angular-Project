import { Component, OnDestroy } from '@angular/core';
import { AdminService } from '../admin.service';
import { BlogService } from '../../blog/blog.service';
import { Blog } from '../../../Interfaces/Blog';

@Component({
  selector: 'app-upload-blog-requests',
  standalone: false,
  templateUrl: './upload-blog-requests.component.html',
  styleUrl: './upload-blog-requests.component.css'
})
export class UploadBlogRequestsComponent implements OnDestroy {

  constructor(private adminService:AdminService){
    let r=this.adminService.getBlogRequests()
    r.subscribe((val:any)=>{
      // this.BlogsArray=val;
      // console.log("in request fun:",val.posts);
      this.BlogsArray=val.posts
      

    })

  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    
  }

  BlogsArray:Blog[]=[];

  getBlogRequests(){
    console.log("Button hit");
    
    let r=this.adminService.getBlogRequests()
    r.subscribe((val:any)=>{
      // this.BlogsArray=val;
      // console.log("in request fun:",val);
      

    })
  }


}
