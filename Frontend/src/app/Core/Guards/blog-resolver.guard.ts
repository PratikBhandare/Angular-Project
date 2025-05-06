
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Resolve, Router, RouterStateSnapshot } from '@angular/router';




@Injectable({
  providedIn:"root"
})

export class BlogResolver implements Resolve<any>{

  constructor(private router:Router, private http:HttpClient){
   
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let blogId=route.queryParams['postId']
    // let userId=route.queryParams['userId']
    console.log("Inside blog resolve...",blogId);
    // alert("blog resolve guard...")
    
    return this.http.get(`http://localhost:4000/post/getpostbyid/${blogId}`)
  
  }

  
  
}
