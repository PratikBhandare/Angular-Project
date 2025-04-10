import { ErrorHandler, Injectable } from '@angular/core';
import { Blog } from '../../Interfaces/Blog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserService } from '../user/user.service';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot,Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { log } from 'console';
import { strict } from 'assert';





@Injectable({
  providedIn: 'root'
})
export class BlogService implements Resolve<any>{

  

  Blogs:Blog[]=[

  ];

  searchedBlogs:Blog[]=[]
  searchTerm!:string;
  searchSubject= new BehaviorSubject<string>("");
  private searchResultBlogsSubject=new BehaviorSubject<any>([]);
  searchResult$=this.searchResultBlogsSubject.asObservable()

  BlogsSubject=new BehaviorSubject(this.Blogs);
  Blogs$=this.BlogsSubject.asObservable();

  private userBLogsSubject= new BehaviorSubject<Blog[]>([]);
  userBlog$= this.userBLogsSubject.asObservable();

  loggedUser!:any;

  token!:string;

  constructor(private http:HttpClient,private userService:UserService,private messageService: MessageService,private router:Router) { 


    this.searchSubject.pipe(debounceTime(1000)).subscribe(val=>{
      // this.searchTerm=val;
      console.log("In BLog service",val);

      if(val!==""){
        this.searchBlogs(val);
      }
      
      
    })
    console.log("BlogService");
    userService.loggedUser$.subscribe((val:any)=>{
      this.loggedUser=val;
      console.log(this.loggedUser);
      
    })

    http.get("http://localhost:4000/post/getActiveposts",{withCredentials:true}).subscribe((val:any)=>{
      console.log(val);
      this.Blogs=val.posts;
      this.BlogsSubject.next(this.Blogs);
      
    })

    userService.token$.subscribe((val:any)=>{
      this.token=val;
    })
    
    
  }
  
  createBlog(blog:Blog,formdata:any){
    
    
    console.log(this.token);
    
    // const headers = new HttpHeaders({
    //   'Authorization': "Bearer "+this.token,  // Example header
    //   'Content-Type': 'application/json',        // Optional depending on your API
    // });
    
    try{

      // console.log("in blog:",blog.img);
      // alert()

      formdata.append("postTitle",JSON.stringify(blog.title));
      console.log("postTitle:",formdata.get('postTitle'));
      
     
      
      
      let Blog={...blog,...{author:this.loggedUser}}
      console.log("This is main",blog);

      this.http.post("http://localhost:4000/post/uplodimg",formdata).subscribe((val)=>{
        console.log(val);
        
      })
      

      this.http.post("http://localhost:4000/post/create",Blog).subscribe((val:any)=>{
        console.log(val);
        if(val.msg){
          // this.Blogs.push(blog);
          this.messageService.add({severity:"success", summary:"success",detail:"Post Uploaded Succesfully.."})
        }

      })
      

    }catch(err){
      console.log(err);
      
    }
    
  }

  updateBlog(blogId:number,Blog:Partial<Blog>,userId:number){

    console.log("In update fun",blogId);
    console.log(Blog);
    
    // Blog={...Blog}

  
    
    return this.http.patch(`http://localhost:4000/post/update/${blogId}`,Blog)
  }

  deletBlog(blogId:number,authorId:number){
    console.log("in delet fun");

    const headers = new HttpHeaders({
      "authorId":authorId
    });
    
    
  
    let user=this.loggedUser
    return this.http.delete(`http://localhost:4000/post/delete/${blogId}`,{headers});
  }

  activateBlog(blogId:number){

    return this.http.get(`http://localhost:4000/post/activatepost/${blogId}`)

  }

  searchBlogs(search:string){
    console.log("In service: fun",search);
    
    let searchedArray=[]

    console.log(this.Blogs);
    for(let i=0;i<this.Blogs.length;i++){
      if(this.Blogs[i].title?.toLowerCase().includes(search.toLowerCase())){
        searchedArray.push(this.Blogs[i])
      }
    }

    this.searchResultBlogsSubject.next(searchedArray)
    this.router.navigate(["home/blogs"])
    // return searchedArray

  }







getUserBlogs(userId:number){
    // userId=this.loggedUser.id;
    
    this.http.get(`http://localhost:4000/user/getuserposts/${userId}`).subscribe((val:any)=>{
      console.log(val);
      let blog:Blog[]=val.posts;
      this.userBLogsSubject.next(blog);
      
    })
    
  }

  //for showing  full page Blog on another component

  getBlogById(blogId:number){
    return this.http.get(`http://localhost:4000/post/getpostbyid/${blogId}`)
   
  }

  getBlogsByCategory(category:string){
    return this.http.get(`http://localhost:4000/post/getpostsbycategory/${category}`)
  }



  state!:string;

 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let blogId=route.queryParams['postId']
    // let userId=route.queryParams['userId']
    console.log("Inside blog resolve...",blogId);
    
    return this.http.get(`http://localhost:4000/post/getpostbyid/${blogId}`)
  
  }

 




  like(like:any){
    
    return this.http.post("http://localhost:4000/like/post",like)
  }


  addComment(comment:Partial<Blog>){

    let result:boolean=false;
    this.http.post("http://localhost:4000/comment/add",comment).subscribe(async(val:any)=>{
      console.log(val);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Comment added Succesfully' })
    })
  }

  deletComment(commentId:number){
    return this.http.delete(`http://localhost:4000/comment/delete/${commentId}`)

  }


  openBlog(postId:number,userId:number){
    this.router.navigate(['openblog'],{queryParams:{postId:postId}})
  }
  
}



