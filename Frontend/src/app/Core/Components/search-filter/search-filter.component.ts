import { Component } from '@angular/core';


import { BehaviorSubject, debounceTime } from 'rxjs';


import { Router } from '@angular/router';
import { Blog } from '../../../Interfaces/Blog';
import { BlogService } from '../../../Features/blog/blog.service';

@Component({
  selector: 'app-search-filter',
  standalone: false,
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent {
filterByCategory(category:string) {
  this.router.navigate([`home/blogs/blogsbycategory`,category])
}

    searchSubject= new BehaviorSubject<string>("");
    searchTerm!:string;
    searchedBlogs:Blog[]=[];
    selectedCategory: string="Select Category";

    

  constructor(private blogService:BlogService,private router:Router){
    // this.searchSubject.pipe(debounceTime(1000)).subscribe(val=>{
    //   console.log(val);
      
    // })

  }

  

  

    searchBlogs(){
      console.log("caleed search");
      
      // console.log(this.searchTerm);
      this.blogService.searchSubject.next(this.searchTerm)
      
    }

    searchBlogsByCategory(category:string){
      // this.blogService.getBlogsByCategory(category)
      this.router.navigate([`blogsbycategory`,category])
    }


}
