import { Component, OnInit } from '@angular/core';
import { UserService } from './Features/user/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

openNotification:boolean=false;


  constructor(private cookieService:CookieService, private userService:UserService){
    console.log("app component");
    console.log("This is Token which is registered:",cookieService.get("Token"));
    // alert()

    if(cookieService.get("Token")){
      console.log(JSON.parse(cookieService.get("Token")));
      let token = JSON.parse(cookieService.get("Token")).token;
      userService.checkLogin(token).subscribe((val:any)=>{
        console.log("From Token cookie:",val.user.User);

        this.userService.loggedUserSubject.next(val.user.User);
      this.userService.isLoggedSubject.next(true)
      this.userService.tokenSubject.next(token);

      console.log(val.user.User.role);
      
      if(val.user.User.role==="Admin"){
        console.log("admin is loggedin");
        
        this.userService.isAdminSubject.next(true)
      }
        
      })
      
    }
    

    // if(cookieService.get("User")){
    //   let user=JSON.parse(cookieService.get("User"));
    //     console.log("From USer cookie:",user.user);
    //   console.log(user.user);
    //   this.userService.loggedUserSubject.next(user.user);
    //   this.userService.isLoggedSubject.next(true)
    //   this.userService.tokenSubject.next(user.token);

    //   console.log(user.user.role);
      
    //   if(user.user.role==="Admin"){
    //     console.log("admin is loggedin");
        
    //     this.userService.isAdminSubject.next(true)
    //   }

    // }
    
    
  }
  title = 'BLogWebsite';

  ngOnInit(): void {
    
  }
}
