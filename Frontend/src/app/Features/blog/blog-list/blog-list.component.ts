import { AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Blog } from '../../../Interfaces/Blog';
import { BlogService } from '../blog.service';
import { UserService } from '../../user/user.service';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { LoginComponent } from '../../user/login/login.component';
import { RouteService } from '../../user/route.service';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-blog-list',
  standalone: false,
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements  OnInit,OnDestroy,AfterViewInit{


  searchTerm!:string;
  // searchSubject= new BehaviorSubject<string>("");
  selectedCategory!: string;


  isLogged:boolean=false;

  catgory:string=";"


  BlogsArray:Blog[]=[];
  LifeStyleBlogs:Blog[]=[];
  SportsBlogs:Blog[]=[];
  TechnicalBlogs:Blog[]=[];
  // BlogsArray:Blog[]=[];

  searchedBlogs:Blog[]=[];



  userBlogs:Blog[]=[];


  constructor(private blogService:BlogService, private userService:UserService,private routerService:RouteService,private router:Router){

    this.blogService.searchResult$.subscribe(val=>{
      this.searchedBlogs=val;
      console.log("searched result:",this.searchedBlogs);
      console.log(this.searchedBlogs.length);
      
      
    })

    this.userService.isLogged$.subscribe((val)=>{
      this.isLogged=val;
    })
    console.log(this.isLogged);
    
  
    console.log("Bloglist OnINit called...");
    // this.BlogsArray=this.blogService.Blogs;
    this.blogService.Blogs$.subscribe(val=>{

      this.BlogsArray= val;
      console.log("No of Blogs found:",this.BlogsArray.length);
      

      
      // console.log("BLogsarray:",this.BlogsArray[1].category);
      
      this.LifeStyleBlogs=this.BlogsArray.filter((val:any)=>{ return val.category==="lifestyle"})
      console.log(this.BlogsArray);
      
      this.SportsBlogs=this.BlogsArray.filter((val:any)=>{
        console.log(val.category);
        
        return val.category === "Sports"
      })
      
      this.TechnicalBlogs=this.BlogsArray.filter((val:any)=>{ return val.category==='Technical'})

      console.log("sportblogs",this.SportsBlogs);
      
      console.log("in list subscribe",val);
      
    })
    this.blogService.userBlog$.subscribe((val:any)=>{
      this.userBlogs=val;
      console.log("Blogs of user:",this.userBlogs);
    })
    
    
  }

  // searchBlogs(){
  //   // console.log(this.searchTerm);
  //   this.blogService.searchSubject.next(this.searchTerm)
    
  // }

  filterByCategory(a:any){
    console.log(a);
  }




  state:string="";
  ngOnInit(): void {

    this.state=this.routerService.state;
    console.log("From Component",this.state);
    
  }

  ngAfterViewInit(): void {
    console.log("Afterviewinit");
    
  }

  ngOnDestroy(): void {
    console.log("Blog List On destroy called...");
    
    this.state="";
    
  }


  // openCategory(){

  //   this.router.navigate([""],{})
    
  // }


 

        
    

  


  

}
