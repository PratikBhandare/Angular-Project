
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../Features/user/user.service';
import { log } from 'console';
import { stat } from 'fs';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouteService } from '../../Features/user/route.service';
import { MessageService, ToastMessageOptions } from 'primeng/api';



@Injectable({
  providedIn:"root"
})

export class AuthGuard implements CanActivate{
  isLogged!:boolean;

  

  constructor(private router:Router,private userService:UserService,private routeService:RouteService,private messageService:MessageService){
    console.log("authguard");
    
    userService.isLogged$.subscribe(val=>{
      this.isLogged=val;
    })
    console.log(this.isLogged);
  }

  canActivate(route: ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean {
    if(this.isLogged==false){

      this.messageService.add({ severity: 'error', summary: 'Warn', detail: 'Log in First' });

      console.log(state.url);
      
      this.router.navigate([`user/login`])
      return false;
      
    }else{

      console.log("LoggedIn..");
      
      console.log(state.url);
      
  
      return true;
    }
  }
  
}
