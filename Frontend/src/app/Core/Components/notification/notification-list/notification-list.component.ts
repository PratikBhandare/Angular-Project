import { Component, Input } from '@angular/core';
import { UserService } from '../../../../Features/user/user.service';
import { User } from '../../../../Interfaces/user';

@Component({
  selector: 'app-notification-list',
  standalone: false,
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent {

  NotificationsArray:any[]=[];

  loggedUser!:User;

  constructor(private userService:UserService){

    userService.loggedUser$.subscribe((val:any)=>{
      this.loggedUser=val;
    })
    userService.getUserProfile(this.loggedUser.id!).subscribe((val:any)=>{
      // console.log("Notification list component:",val);
      this.NotificationsArray=val.notifications;
    })

  }

}
