import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-admin-panel',
  standalone: false,
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  

  loggedUser:any;
  profileImg!:string;


  constructor(private userService:UserService){
    console.log("Admin panel ");
    

    userService.loggedUser$.subscribe(val=>{
      this.loggedUser=val
    })

  }

  ngOnInit(): void {
    if(this.loggedUser.id){
      this.profileImg="assets/profile-images/"+this.loggedUser.profileImg;
      // console.log(this.profileImg);
      
    }
  }
}
