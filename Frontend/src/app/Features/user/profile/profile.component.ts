import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../../Interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlogService } from '../../blog/blog.service';
import { CookieService } from 'ngx-cookie-service';
import path from 'path';
import { log } from 'console';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  loggedUser!:User;
  token!:string;

  profileImg!:string;






  constructor(private userService:UserService,private http:HttpClient,private blogService:BlogService,private cookieService:CookieService){
    userService.loggedUser$.subscribe((val:any)=>{
      console.log(val);
      this.loggedUser=val;
      console.log(this.loggedUser);



    }
  )



  userService.token$.subscribe((val:any)=>{
    this.token=val;

  })

  }

  ngOnInit(): void {
    if(this.loggedUser.id){
      this.profileImg="assets/profile-images/"+this.loggedUser.profileImg;
      console.log(this.profileImg);
      
    }
  }


  getPass(){
    console.log("CLikced");
    alert()
    
    // const headers = new HttpHeaders({
    //   'Authorization': this.token,  // Example header
    //   'Content-Type': 'application/json',        // Optional depending on your API
    // });
    // this.http.get("http://localhost:4000/users/getpass",{headers}).subscribe((val)=>{
    //   console.log(val);
    // })
  }

  getUserBlogs(userId:number){
    this.blogService.getUserBlogs(userId);

  }
  // getUserSubscriptions(){
  //   console.log("Here...");
    
  //   this.userService.getUserSubscriptions(this.loggedUser.id!).subscribe((val:any)=>{
  //     console.log(val.result.subscriptions);
  //   })

  // }

  logOut(){
    console.log("button called");
    
    this.cookieService.delete("User","/")
  }

  getValue(msg:any){
    console.log("in profile:",msg);
    
  }

}
