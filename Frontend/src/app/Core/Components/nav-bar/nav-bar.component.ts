import { Component } from '@angular/core';
import { UserService } from '../../../Features/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  
  isLogged!:boolean;
  loggedUser!:any;
  loggedUserImg!:string;
  constructor(private userService:UserService, private router:Router){
    console.log("Nav called");
    
    userService.isLogged$.subscribe(val=>{
      this.isLogged=val;
    })
    userService.loggedUser$.subscribe((val:any)=>{
      this.loggedUser=val;
      console.log("image in nav:",val.profileImg);
      
      if(val.profileImg){
        this.loggedUserImg="assets/profile-images/"+val.profileImg;
      }
    })
  }

  navigate(path:string){
    this.router.navigate([path])
    console.log("CLicked");
    
  }

}
