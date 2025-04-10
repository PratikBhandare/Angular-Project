import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../Interfaces/user';

@Component({
  selector: 'app-user-card',
  standalone: false,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent implements OnInit{

  @Input() User!:User;

  profileImg!:string;

  ngOnInit(): void {
    if(this.User.id){
      this.profileImg="assets/profile-images/"+this.User.profileImg;
      console.log(this.profileImg);
      
    }
  }


}
