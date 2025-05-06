import { Component, OnInit } from '@angular/core';
import { constrainedMemory } from 'process';
import { BlogService } from '../../blog/blog.service';
import { UserService } from '../user.service';
import { User } from '../../../Interfaces/user';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-subscriptions',
  standalone: false,
  templateUrl: './my-subscriptions.component.html',
  styleUrl: './my-subscriptions.component.css'
})
export class MySubscriptionsComponent implements OnInit{

  constructor(private blogService:BlogService, private userService:UserService, private router:Router){
    
  }


  loggedUser!:User;

  mySubscriptions:any[]=[]

  getUserSubscriptions(userId:number){
    console.log("Hello",userId);
    
     this.blogService.getUserSubscriptionBlogs(userId).subscribe((val:any)=>{
      console.log("SubscribedBlogs",val.userSubscribedPosts);
      this.mySubscriptions=val.userSubscribedPosts
     })

  }

  ngOnInit(): void {
    this.userService.loggedUser$.subscribe((val:any)=>{
      this.loggedUser=val;
    })
    this.getUserSubscriptions(this.loggedUser.id!);
  }

  openProfile(userId:number){
    console.log("Clicked");
    
    
    this.router.navigate(['user/profile/',userId])
  }


}
