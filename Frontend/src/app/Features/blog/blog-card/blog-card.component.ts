import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Blog } from '../../../Interfaces/Blog';
import { log } from 'console';
import { BlogService } from '../blog.service';
import { Comment } from '../../../Interfaces/comment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../Interfaces/user';
import { UserService } from '../../user/user.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-blog-card',
  standalone: false,
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent implements OnChanges  {
  @Input() Blog!:Blog;
  blogContent:String|null="content:";
  visible!: boolean;
  visible2!: boolean;
  loggedUser!:any;

  BlogImg:string|null="";

  commentForm=new FormGroup({
    comment:new FormControl("",[Validators.required])
  })


  constructor(private blogService:BlogService,private userService:UserService,private messageService:MessageService){
    this.userService.loggedUser$.subscribe((val)=>{
      this.loggedUser=val;
    })

    

  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    // console.log("Onchange called..");
    this.BlogImg="assets/Blog-images/"+this.Blog.img;
    
    
  }
  like(){
    
    
    this.blogService.like(this.Blog);

  }

  addComment(post:Blog,user:User){
    if(!this.loggedUser.id){
      this.messageService.add({ severity: 'error', summary: 'Acces Denied!', detail: 'Log in First' })
      return;

    }
    
    

    let comment:Comment={
      content: this.commentForm.value.comment,
      post: post.id,
      author: this.loggedUser.id,
    }
    console.log(comment);
    

    this.blogService.addComment(comment);
    this.Blog.comments.push(comment);
    
    

  }

  openActiveBlog(){
    console.log("active Blog",this.Blog.id);
    // console.log();a
    


    this.blogService.openBlog(this.Blog.id,this.loggedUser.id)
  }

  openDeactiveBlog(){
    console.log("Deactive Blog");
    // this.blogService.openBlog(this.Blog.id)

    

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

  activateBlog(){
    // console.log("button called...");
    
    let r=this.blogService.activateBlog(this.Blog.id)
    r.subscribe((val:any)=>{
      console.log(val);
      if(val.msg){
      this.messageService.add({ severity: 'success', summary: 'Activated..!' })
        
      }
      
    })
  }





  

}
