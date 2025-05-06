
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../Features/user/user.service';



@Injectable({
  providedIn:"root"
})

export class UserProfileResolver implements Resolve<any>{

  constructor(private userService:UserService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userId=route.params['id']

    return this.userService.getUserProfile(userId)


  }
  
}
