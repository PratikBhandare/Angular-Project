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

  constructor(private cookieService:CookieService, private userService:UserService){
    console.log("app component");

    if(cookieService.get("User")){
      let user=JSON.parse(cookieService.get("User"));
      console.log(user.user);
      this.userService.loggedUserSubject.next(user.user);
      this.userService.isLoggedSubject.next(true)
      this.userService.tokenSubject.next(user.token);

      console.log(user.user.role);
      
      if(user.user.role==="Admin"){
        console.log("admin is loggedin");
        
        this.userService.isAdminSubject.next(true)
      }

    }
    
    
  }
  title = 'BLogWebsite';

  ngOnInit(): void {
    
  }
}
