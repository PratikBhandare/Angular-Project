import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../../../Interfaces/Blog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../Interfaces/user';
import { MessageService } from 'primeng/api';
import { Comment } from '../../../Interfaces/comment';
import { error, log } from 'console';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { GFormComponent } from '../../../Shared/Components/g-form/g-form.component';
import { NotFoundError } from '@angular/core/primitives/di';
import EventEmitter from 'events';

@Component({
  selector: 'app-show-blog',
  standalone: false,
  templateUrl: './show-blog.component.html',
  styleUrl: './show-blog.component.css'
})
export class SHowBlogComponent implements OnInit, AfterViewInit, OnDestroy {

  visible!: boolean;
  visible2!: boolean;
  loggedUser!:any;

  postId!:any;
  Blog!:Blog;
  avatar:string="";
  blogImg!:string|null;
  CopyUrl:String="";
  authorImg!:string;

  Gform=GFormComponent;
  editBlogContent:boolean=false;
  editBlogDescription:boolean=false;
  editBlogTitle:boolean=false;
  editBLogComment:boolean=false;


  constructor(private router:Router,private route:ActivatedRoute,private blogService:BlogService,private messageService:MessageService,private service:UserService){
    

    console.log("blog show component loaded");
    console.log("service:",this.service);

    this.service.loggedUser$.subscribe((data)=>{
      console.log("inside showblog",data);
      
      this.loggedUser = data
    })
    
    this.route.queryParams.subscribe((val:any)=>{
      console.log(val);
      this.postId=val.postId
      
    });
    console.log(this.postId);
    console.log("data in resolve:",route.snapshot.data['data']);

    if(route.snapshot.data['data'].post){
      this.Blog=route.snapshot.data['data'].post[0];

    }
    
    



    
    
    if(this.Blog===undefined){
      alert("No data Found")
      messageService.add({severity:'warn'})

      this.router.navigate(['notfound'])
    }


    console.log("Blog=",this.Blog);
    this.authorImg="assets/profile-images/"+this.Blog.author.profileImg;
    
    
    // this.blogService.getBlogById(this.postId).subscribe((val:any)=>{
    //   this.Blog=val.post[0];
    // })


    
    // console.log(this.blogService.loggedUser);
    
    

  }
  ngOnInit(): void {

    if(this.loggedUser.id){
      this.avatar="assets/profile-images/"+this.loggedUser.profileImg;
    }
    if(this.Blog){
      this.blogImg="assets/Blog-images/"+this.Blog.img;
    }
    console.log(this.router.url);
    this.CopyUrl="http://localhost:4200/"+this.router.url
    
    
    // console.log("Inside BLog page :",result);
    // this.Blog=result.__zone_symbol__value
    // console.log(this.Blog);
    
  }

  // setting variable for toaster 
  value:boolean=true;
  e = new EventEmitter();
  


  async checkLogin(){
    new Promise((resolve,reject)=>{
    console.log();
    
    if(!this.loggedUser.id){
      setTimeout(() => {
        reject(console.log("Not Logged in"))
      }, 3000);
    
    }else{
      setTimeout(() => {
        resolve(console.log("Logged in"))
      }, 3000);
    }

  }).then(()=>{
    console.log("Logged in");
    this.e.emit("check",true)
  }).catch(()=>{
    console.log("Not Logged In");
    
  });
  
}

  
  async ngAfterViewInit(): Promise<void> {
    // this.e.on("check",(v)=>{
    //   console.log("Event emitted",v);
      
    // })
    // await this.checkLogin();
    // console.log("My Promise",r);
    
   
     

    // if(!this.loggedUser.id){


    //   setTimeout(() => {
    //     if(this.value){
    //     this.messageService.add({ severity: 'error', summary: 'Acces Denied!', detail: 'Log in First' });
        
    //     setTimeout(() => {
    //       this.router.navigate(['/user/login'])
    //     }, 1000);
        

    //     }
        
    //   }, 60000);
    // }
    
  }

  ngOnDestroy(): void {
    console.log("exit...");
    this.value=false;
    
    this.messageService.clear()
  }




   like(){
      

      if(!this.loggedUser.id){
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Log in First' });
        // alert("Login in First..")
        return;
      }
      let like={post:this.Blog,user:this.loggedUser}
      console.log(like);

      let r=this.blogService.like(like);

      r.subscribe((val:any)=>{
        console.log(val);
      if(val.msg){
        for(let i=0;i<this.blogService.Blogs.length;i++){
          if(this.blogService.Blogs[i].id==this.Blog.id){
            this.blogService.Blogs[i].likesCount++;
          }
        }
        this.Blog.likesCount++;
        this.messageService.add({ icon:"pi pi-heart", severity: 'success', summary: 'success', detail: 'liked!!' })

      }else if(val.err=="Alredy Liked..."){
        alert("Alredy Liked...")
      }
      })
  
    }

    

    commentForm=new FormGroup({
      comment:new FormControl("",[Validators.required])
    })

    url="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"

    
    addComment(post:Blog,user:User){
      if(!this.loggedUser.id){
        this.messageService.add({ severity: 'error', summary: 'Acces Denied!', detail: 'Log in First' })
        return;
  
      }
      
      
  
      let comment:Comment={
        content: this.commentForm.value.comment,
        post: post.id,
        author: this.loggedUser,
      }
      console.log(comment);
      
  
      this.blogService.addComment(comment);
      this.Blog.comments.push(comment);
      
      
  
    }

    deletComment(commentId:number){
      console.log(commentId);
      
      let r=this.blogService.deletComment(commentId)
      r.subscribe((val:any)=>{
        console.log(val);
        if(val.msg){
          this.Blog.comments=this.Blog.comments.filter((val:any)=>{return val.id!==commentId})
        }
       
        
      })
    }

    updateComment(data:any){
      console.log(data);
    }

    updateBlog(data:any){
      // console.log("Data in update:",data);
      
      let r=this.blogService.updateBlog(this.Blog.id,{...data,...{authorId:this.Blog.author.id}},this.loggedUser.id);
      r.subscribe((val:any)=>{
        console.log(val);
        if(val.msg){
        this.messageService.add({ severity: 'success', summary: '', detail: 'Updated !' })
         
          // alert()
          this.editBlogDescription=false
          this.editBlogTitle=false
          this.editBlogContent=false

          if(data.title){
            // console.log("title updated");
            this.Blog.title=data.title;

            
          }else if(data.content){
            // console.log("content updated");
            this.Blog.content=data.content;


          }else if(data.description){
            // console.log("description updated");
            this.Blog.description=data.description;

          }
        
        }
      })
    }



    openProfile(userId:number){
      console.log("Clicked");
      
      this.router.navigate(['user/profile/',userId])
    }

    deletBlog(){
      console.log("in card delete");
      
  
      let r=this.blogService.deletBlog(this.Blog.id,this.Blog.author.id)
      r.subscribe((val:any)=>{
        console.log(val);
        if(val.msg){
          this.messageService.add({ severity: 'error', summary: '', detail: 'Deleted !' })
  
        }
      })
  
    }
  

}
