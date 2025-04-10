import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { UserService } from '../../Features/user/user.service';
import { User } from '../../Interfaces/user';

@Injectable()
export class HhtpInterceptorService implements HttpInterceptor{

  token!:String;
  User:any;

  constructor(private userService:UserService) {
    this.userService.token$.subscribe((val)=>{
      this.token=val;
    })
    this.userService.loggedUser$.subscribe(val=>{
      this.User=val;
    })
   }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("In http Interceptor",req);
    
    let modifiedReq=req;

    if(this.token){
      modifiedReq=req.clone({
        setHeaders:{
          Authorization:"Bearer "+this.token,
          User:JSON.stringify(this.User)
        }
      })
    }

    return next.handle(modifiedReq)
    
  }
  
}
