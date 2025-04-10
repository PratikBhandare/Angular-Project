
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

export class AdminGuard implements CanActivate{
  isAdmin!:boolean;
  
  

  constructor(private router:Router,private userService:UserService,private routeService:RouteService,private messageService:MessageService){
    userService.isAdmin$.subscribe(val=>{
      this.isAdmin=val;
    })
    console.log(this.isAdmin);
  }

  canActivate(route: ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean {
    console.log("adminGuard");
    console.log();
    
    if(this.isAdmin==false){
      // alert("Please Login First...!");
      // this.routeService.nexrRoutSubject.next(state.url);
      this.messageService.add({ severity: 'error', summary: 'Warn', detail: 'You are Not Admin' });

      console.log(state.url);
    
      return false;
    }else{

      console.log("Admin LoggedIn..");
      
      console.log(state.url);
      
      // this.router.navigate([`${state.url}`])
      return true;
    }
  }
  
}
