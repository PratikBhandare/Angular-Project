import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService implements Resolve<any>{



  constructor( ) { 
    console.log("Route Service.......");
    
  }

  

  state!:string;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("From Resolve...",state.url);
    this.state=state.url;
  }
}
