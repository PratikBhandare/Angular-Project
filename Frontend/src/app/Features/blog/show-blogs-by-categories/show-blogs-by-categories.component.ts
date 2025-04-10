import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../Interfaces/Blog';
import { BlogService } from '../blog.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-show-blogs-by-categories',
  standalone: false,
  templateUrl: './show-blogs-by-categories.component.html',
  styleUrl: './show-blogs-by-categories.component.css'
})
export class ShowBLogsByCategoriesComponent implements OnInit {
   BlogsArray:Blog[]=[];

   category!:string;
   constructor(private blogService:BlogService, private route:ActivatedRoute,private router:Router){
    // console.log("Cnstructor of categorical display:");
    
    // console.log(this.BlogsArray.length);
    


    // console.log("Params in category block",this.route.snapshot.params["category"]);
    // this.category=
    this.route.paramMap.subscribe(val=>{
      
      this.category=val.get('category')!;
      console.log(val.get('category'));

      let r=blogService.getBlogsByCategory(val.get('category')!).subscribe((val:any)=>{
        this.BlogsArray=val.posts;
        // console.log("inside categorie subject:",this.BlogsArray);
      })
     
      


      
    })

    // this.blogService.getBlogsByCategory(this.category).subscribe((val:any)=>{
    //   this.BlogsArray=val.posts;
    //   console.log("in category array",val);
      
    // })
   }

   ngOnInit(): void {
     console.log("Onint of categorcal:");
     
   }






}
