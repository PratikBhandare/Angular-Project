
import { Injectable, OnInit } from '@angular/core';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../Interfaces/user';
import { HttpClient } from '@angular/common/http';
import { RouteService } from './route.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  isLoggedSubject=new BehaviorSubject(false);
  isLogged$ = this.isLoggedSubject.asObservable();

  isAdminSubject=new BehaviorSubject(false);
  isAdmin$ = this.isAdminSubject.asObservable();
  
  loggedUserSubject = new BehaviorSubject({});
  loggedUser$ = this.loggedUserSubject.asObservable();

  tokenSubject = new BehaviorSubject<String>("")
  token$ = this.tokenSubject.asObservable();

  logged!:User;
  islogged!:boolean;
  token!:string;





  constructor(private router:Router,private http:HttpClient,private routeService:RouteService,private cookieService:CookieService, private messageService:MessageService) {

    


    console.log("UserService");

    
  }

  checkLogin(token:string){
    console.log("Comes from App:",token);
    return this.http.post("http://localhost:4000/user/logincheck",{token:"Bearer "+token})
    
  }

 
    login(user:Partial<User>){
      
      
    // console.log(user);
    
      this.http.post("http://localhost:4000/user/login",user,{withCredentials:true}).subscribe((val:any)=>{
      // console.log("This is from http",this.cookieService.get("accestoken"));
      console.log("Noticitaion login:",val);
      

      // console.log("cookie token:",val.cookie.accestoken);
      
      this.islogged=  val.flag;
      this.logged= val.user;
      this.token=val.token;

      console.log(this.islogged);

      if(this.islogged){

        if(this.logged.role==="Admin"){
          this.isAdminSubject.next(true);
        }
        // this.logged.isActive="true"
        // this.cookieService.set("User",JSON.stringify({user:this.logged,token:this.token}),{path:"/",expires:30000000000,secure:true})
        this.cookieService.set("Token",JSON.stringify({token:this.token}),{path:"/",expires:30000000000,secure:true})
        // sessionStorage.setItem("User",JSON.stringify(this.logged))
        this.isLoggedSubject.next(true);
        this.loggedUserSubject.next(this.logged)
        this.tokenSubject.next(this.token);
        // console.log(this.nextRoute);
        this.router.navigate(["/user/profile"])

      
      }else{
        this.isLoggedSubject.next(false);
        alert("Not Valid email or Password..!")

      }
      
    },
    (err)=>{
      console.log(err);
    })

    
    // this.isLoggedSubject.next(true);
    

  }

  register(user:any){
    console.log("this is form data signup");
    // alert(user)
    
    this.http.post("http://localhost:4000/user/signup",user).subscribe((val:any)=>{
      // console.log("after registerbutton:",val);
      if(val.msg){
        this.messageService.add({severity:"success", summary:"success",detail:"User Registerd succesfully.."})
        this.router.navigate(["user/login"])
        // alert()
    }else{
      alert("somthing error..!")
    }
    })

  }

  disableUser(userId:number){
    return this.http.delete(`http://localhost:4000/user/deletuser/${userId}`)
  }

  enableUser(){

  }

  getUserProfile(userId:number){
    console.log(userId);
    
    return this.http.get(`http://localhost:4000/user/getuserdata/${userId}`);
  }

  subscribeUser(authorId:number,userId:number){
    console.log(authorId);
    console.log(userId);

    let body={author:authorId,user:userId,isActive:true}
    console.log(body);
    

    return this.http.post(`http://localhost:4000/subscription/add`,body)

  }

  unSubscribeUser(authorId:number,userId:number){
    console.log(authorId);
    console.log(userId);

    let body={author:authorId,user:userId,isActive:true}
    console.log(body);
    

    return this.http.post(`http://localhost:4000/subscription/remove`,body)

  }


  getUserSubscriptions(userId:number){

    return this.http.get(`http://localhost:4000/user/getusersubscriptions/${userId}`)

  }

  
  
}
