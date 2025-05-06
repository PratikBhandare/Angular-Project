import { Component } from '@angular/core';
import { User } from '../../../Interfaces/user';
import { UserService } from '../user.service';
import { get } from 'http';
import { UseStyle } from 'primeng/usestyle';
import { UsersListComponent } from '../../admin/users-list/users-list.component';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../blog/blog.service';
import { MessageService } from 'primeng/api';
import { log } from 'console';

@Component({
  selector: 'app-show-profile',
  standalone: false,
  templateUrl: './show-profile.component.html',
  styleUrl: './show-profile.component.css'
})
export class ShowProfileComponent {

  User!: Partial<User>;
  loggedUser!: User;
  isDisabled: boolean = false;


  constructor(private userService: UserService, private router: ActivatedRoute, private blogService: BlogService, private messageService: MessageService) {
    // this.userService.loggedUser$.subscribe((val:Partial<User>)=>{
    //   this.User=val;
    // })
    // console.log(this.User);

    let userData = router.snapshot.data["data"]
    this.User = userData

    this.isDisabled = Boolean(this.User.isActive);

    console.log(typeof this.User.isActive);

    console.log("Resolved data :", userData);

    userService.loggedUser$.subscribe((val: any) => {
      this.loggedUser = val;
    })




    // let r=userService.getUserProfile().subscribe()




  }
  subscribe(authorId: number,) {
    console.log("in subscribe:", authorId);


    this.userService.subscribeUser(authorId, this.loggedUser.id!).subscribe(val => {
      console.log(val);

    })


  }

  disableUser(userId: number) {
    this.userService.disableUser(userId).subscribe((val: any) => {
      if (val.msg) {
        this.isDisabled = true;
        this.messageService.add({ severity: "success", summary: "success", detail: "User Disabled.." })


      }
    })
  }

  openActiveBlog(blogId: number) {
    console.log("Active Blog");
    this.blogService.openBlog(blogId, this.loggedUser.id!)


  }

  user = {
    username: 'john_doe',
    bio: 'Tech enthusiast. Blogger. Writer. Lover of all things Angular.',
    profilePic: 'https://via.placeholder.com/150', // Placeholder image URL
  };

  blogPosts: any[] = [
    {
      title: 'My First Blog Post',
      date: '2025-04-01',
      content: 'This is my first blog post content...',
      likes: 10,
    },
    {
      title: 'Learning Angular',
      date: '2025-03-25',
      content: 'Today, I started learning Angular and it has been amazing...',
      likes: 25,
    },
    {
      title: 'Web Development Trends',
      date: '2025-03-10',
      content: 'Here are the top web development trends for 2025...',
      likes: 15,
    },
  ];

  isSubscribed: boolean = false;


  ngOnInit(): void {
    console.log("Followers:",this.User.followers);
    
    for(let i=0;i<this.User.followers!.length;i++){
      if(this.loggedUser.id===this.User.followers![i].user.id){
        if(this.User.followers![i].isActive===true){
          this.isSubscribed=true;
        }
      }

    }
  }

  likePost(post: any): void {
    post.likes++;
  }

  Subscribe(): void {
    this.userService.subscribeUser(this.User.id!, this.loggedUser.id!).subscribe((val: any) => {
      console.log(val);
      
      if (val.msg) {
        console.log(val);
        this.isSubscribed = !this.isSubscribed;
        this.blogService.sendNotification({title:`${this.loggedUser.name} Subscribed you..!`,user:this.User.id}).subscribe((val:any)=>{
          if(val.msg){
            console.log(("Message sent succesfully..!"));
            
          }
        })
      }
    })
  }

}
